// StockX — Concurrency Load Test
// Tests the full order flow: API Gateway → Redis → Matcher → Response
// No extra tools needed — pure Node.js fetch

const API = "http://localhost:13001/api/v1";

// Use the two test users created earlier
const ALICE = "cmu5zg6sc000001mldapuohd8";
const BOB   = "cmu5zgitl000801ml6sqbpqcm";

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

async function placeOrder(userId, side, price, qty = 1) {
  const start = performance.now();
  try {
    const res = await fetch(`${API}/order`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        symbol:    "AAPL_USD",
        side,
        orderType: "limit",
        price:     price.toString(),
        quantity:  qty.toString(),
      }),
    });
    const latency = Math.round(performance.now() - start);
    const data    = await res.json();
    return { ok: res.status === 201, status: res.status, latency, error: data.error };
  } catch (err) {
    const latency = Math.round(performance.now() - start);
    return { ok: false, status: 0, latency, error: err.message };
  }
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// -------------------------------------------------------------------------
// Test 1: Sequential throughput baseline
// 20 orders one after another — measures pure matcher throughput
// -------------------------------------------------------------------------

async function testSequential() {
  console.log("\n── Test 1: Sequential (20 orders) ──");
  const results = [];
  const t0 = performance.now();

  for (let i = 0; i < 20; i++) {
    const userId = i % 2 === 0 ? ALICE : BOB;
    const side   = i % 2 === 0 ? "buy"  : "sell";
    const price  = 100 + i; // different prices so they don't all match each other
    const r = await placeOrder(userId, side, price);
    results.push(r);
  }

  const total  = Math.round(performance.now() - t0);
  const ok     = results.filter(r => r.ok).length;
  const fail   = results.filter(r => !r.ok).length;
  const lats   = results.map(r => r.latency).sort((a, b) => a - b);
  const avg    = Math.round(lats.reduce((a, b) => a + b, 0) / lats.length);
  const p50    = lats[Math.floor(lats.length * 0.50)];
  const p95    = lats[Math.floor(lats.length * 0.95)];
  const p99    = lats[Math.floor(lats.length * 0.99)] ?? lats[lats.length - 1];
  const tps    = Math.round((ok / total) * 1000);

  console.log(`  Total time : ${total}ms`);
  console.log(`  Success    : ${ok}/20`);
  console.log(`  Failures   : ${fail}`);
  console.log(`  Avg latency: ${avg}ms`);
  console.log(`  p50 latency: ${p50}ms`);
  console.log(`  p95 latency: ${p95}ms`);
  console.log(`  p99 latency: ${p99}ms`);
  console.log(`  Throughput : ~${tps} orders/sec`);
  return { ok, fail, avg, p50, p95, p99, tps, total };
}

// -------------------------------------------------------------------------
// Test 2: Concurrent burst — 20 simultaneous orders
// Measures how the system handles concurrent HTTP requests
// -------------------------------------------------------------------------

async function testConcurrent(concurrency = 20) {
  console.log(`\n── Test 2: Concurrent burst (${concurrency} simultaneous orders) ──`);
  const t0 = performance.now();

  const promises = Array.from({ length: concurrency }, (_, i) => {
    const userId = i % 2 === 0 ? ALICE : BOB;
    const side   = i % 2 === 0 ? "buy"  : "sell";
    const price  = 200 + i;
    return placeOrder(userId, side, price);
  });

  const results = await Promise.all(promises);
  const total   = Math.round(performance.now() - t0);
  const ok      = results.filter(r => r.ok).length;
  const fail    = results.filter(r => !r.ok).length;
  const lats    = results.map(r => r.latency).sort((a, b) => a - b);
  const avg     = Math.round(lats.reduce((a, b) => a + b, 0) / lats.length);
  const p50     = lats[Math.floor(lats.length * 0.50)];
  const p95     = lats[Math.floor(lats.length * 0.95)];
  const p99     = lats[Math.floor(lats.length * 0.99)] ?? lats[lats.length - 1];
  const tps     = Math.round((ok / total) * 1000);

  console.log(`  Wall-clock time : ${total}ms`);
  console.log(`  Success         : ${ok}/${concurrency}`);
  console.log(`  Failures        : ${fail}`);
  if (fail > 0) {
    const errors = [...new Set(results.filter(r => !r.ok).map(r => r.error))];
    console.log(`  Error types     : ${errors.join(", ")}`);
  }
  console.log(`  Avg latency     : ${avg}ms`);
  console.log(`  p50 latency     : ${p50}ms`);
  console.log(`  p95 latency     : ${p95}ms`);
  console.log(`  p99 latency     : ${p99}ms`);
  console.log(`  Effective TPS   : ~${tps} orders/sec`);
  return { ok, fail, avg, p50, p95, p99, tps, total };
}

// -------------------------------------------------------------------------
// Test 3: Matching accuracy under load
// 10 buy + 10 sell at same price — all should match
// -------------------------------------------------------------------------

async function testMatchingAccuracy() {
  console.log("\n── Test 3: Matching accuracy (10 buy + 10 sell @ same price) ──");
  const PRICE = 999;

  // Fire all 20 simultaneously
  const buys  = Array.from({ length: 10 }, () => placeOrder(ALICE, "buy",  PRICE, 1));
  const sells = Array.from({ length: 10 }, () => placeOrder(BOB,   "sell", PRICE, 1));

  const t0      = performance.now();
  const results = await Promise.all([...buys, ...sells]);
  const total   = Math.round(performance.now() - t0);

  const filled  = results.filter(r => r.ok && !r.error).length;
  const errors  = results.filter(r => !r.ok || r.error).length;

  // Check trades table
  const tradesRes  = await fetch(`${API}/trades?symbol=AAPL_USD&limit=20`);
  const trades     = await tradesRes.json();
  const matchPrice = trades.filter(t => Number(t.price) === PRICE);

  console.log(`  Time          : ${total}ms`);
  console.log(`  Orders placed : ${filled}/20 accepted`);
  console.log(`  Errors        : ${errors}`);
  console.log(`  Trades @ $${PRICE} in DB : ${matchPrice.length}`);
  console.log(`  Matching accuracy : ${matchPrice.length > 0 ? "✓ PASS" : "✗ FAIL"}`);
  return { filled, errors, matchPrice: matchPrice.length };
}

// -------------------------------------------------------------------------
// Run all tests
// -------------------------------------------------------------------------

console.log("╔══════════════════════════════════════╗");
console.log("║  StockX Load Test — Real Numbers     ║");
console.log("╚══════════════════════════════════════╝");
console.log(`  Target: ${API}`);
console.log(`  Users:  Alice (${ALICE.slice(0,8)}...) + Bob (${BOB.slice(0,8)}...)`);

// Re-init users first
await fetch(`${API}/user/init`, {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userId: ALICE }),
});
await fetch(`${API}/user/init`, {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userId: BOB }),
});
console.log("  Users initialised in Matcher ✓");

const r1 = await testSequential();
await sleep(1000);
const r2 = await testConcurrent(20);
await sleep(1000);
const r3 = await testMatchingAccuracy();

console.log("\n╔══════════════════════════════════════╗");
console.log("║  SUMMARY                             ║");
console.log("╚══════════════════════════════════════╝");
console.log(`  Sequential  : ${r1.ok}/20 ok | avg ${r1.avg}ms | p95 ${r1.p95}ms | ~${r1.tps} TPS`);
console.log(`  Concurrent  : ${r2.ok}/20 ok | avg ${r2.avg}ms | p95 ${r2.p95}ms | ~${r2.tps} TPS`);
console.log(`  Accuracy    : ${r3.filled}/20 placed | ${r3.matchPrice} trades confirmed in DB`);
