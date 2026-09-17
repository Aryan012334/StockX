import { prisma }           from "@stockx/execution-service";
import { getServerSession } from "next-auth";
import { authOptions }      from "@/lib/auth";
import { redirect }         from "next/navigation";
import { Badge }            from "@/components/ui/badge";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { ClipboardList }    from "lucide-react";

const PAGE_SIZE = 15;

const STATUS_STYLE: Record<string, string> = {
  OPEN:             "bg-[var(--brand-cyan)]/10 text-[var(--brand-cyan)]",
  PARTIALLY_FILLED: "bg-amber-500/10 text-amber-400",
  FILLED:           "bg-emerald-500/10 text-emerald-500",
  CANCELLED:        "bg-muted/40 text-muted-foreground",
  EXPIRED:          "bg-muted/40 text-muted-foreground",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page ?? 1));
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [orders, totalOrders] = await Promise.all([
    prisma.order.findMany({
      where:   { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: PAGE_SIZE,
    }),
    prisma.order.count({ where: { userId } }),
  ]);

  const totalPages = Math.ceil(totalOrders / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      <div className="flex items-center gap-3">
        <ClipboardList className="size-6 text-muted-foreground" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground">Your complete order history</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-foreground">Order History</h2>
          <span className="text-sm text-muted-foreground">{totalOrders} order{totalOrders !== 1 && "s"} total</span>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-xl border border-border bg-card py-16 text-center text-sm text-muted-foreground">
            No orders yet — start trading on the{" "}
            <a href="/markets" className="text-[var(--brand-cyan)] hover:underline">markets page</a>.
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm whitespace-nowrap">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground">
                      <th className="px-6 py-4 font-medium">Symbol</th>
                      <th className="px-6 py-4 font-medium">Side</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 text-right font-medium">Price</th>
                      <th className="px-6 py-4 text-right font-medium">Qty</th>
                      <th className="px-6 py-4 text-right font-medium">Filled</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orders.map((o) => (
                      <tr key={o.id} className="transition-colors hover:bg-muted/30">
                        <td className="px-6 py-4 font-semibold text-foreground">
                          <a href={`/trade/${o.symbol}`} className="hover:text-[var(--brand-cyan)]">
                            {o.symbol}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={`rounded-full border-transparent px-2.5 py-1 text-xs font-medium ${
                            o.side === "BUY" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                          }`}>
                            {o.side}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 capitalize text-muted-foreground">{o.orderType.toLowerCase()}</td>
                        <td className="px-6 py-4 text-right font-mono text-foreground">
                          ${Number(o.price).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-foreground">
                          {Number(o.quantity)}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-foreground">
                          {Number(o.filledQty)}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={`rounded-full border-transparent px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[o.status] ?? ""}`}>
                            {o.status.replace("_", " ")}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {o.createdAt.toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href={`?page=${currentPage - 1}`}
                      aria-disabled={currentPage === 1}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  <PaginationItem className="flex items-center px-4 text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href={`?page=${currentPage + 1}`}
                      aria-disabled={currentPage === totalPages}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </div>
  );
}
