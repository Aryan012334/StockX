/**
 * ID Generation Tests
 *
 * Snowflake IDs were removed in the CortexCookie refactor and replaced with
 * crypto.randomUUID() throughout the codebase.
 *
 * These tests verify the UUID-based ID generation used by the matcher service
 * satisfies the same correctness properties the Snowflake tests checked:
 *   - uniqueness
 *   - correct format
 *   - no collisions under load
 */

import { describe, it, expect } from "vitest";
import { generateOrderId }      from "../../helpers/engine-test-factory.js";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("Order ID Generation (UUID v4)", () => {
  it("should generate a valid UUID v4", () => {
    const id = generateOrderId();
    expect(UUID_REGEX.test(id)).toBe(true);
  });

  it("should generate unique IDs", () => {
    const ids = new Set<string>();
    const count = 10_000;
    for (let i = 0; i < count; i++) ids.add(generateOrderId());
    expect(ids.size).toBe(count);
  });

  it("should generate string IDs (not bigint)", () => {
    const id = generateOrderId();
    expect(typeof id).toBe("string");
  });

  it("should generate different IDs on consecutive calls", () => {
    const a = generateOrderId();
    const b = generateOrderId();
    expect(a).not.toBe(b);
  });

  it("should not produce empty or null IDs", () => {
    for (let i = 0; i < 100; i++) {
      const id = generateOrderId();
      expect(id).toBeTruthy();
      expect(id.length).toBeGreaterThan(0);
    }
  });
});
