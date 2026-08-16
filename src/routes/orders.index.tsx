import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { RequireAuth } from "@/components/common/RequireAuth";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { inr, STATUS_LABELS } from "@/lib/business";
import { myOrdersQuery } from "@/lib/queries";

export const Route = createFileRoute("/orders/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Orders | Shree Shyam Dairy" },
      { name: "description", content: "Track your dairy orders and delivery status." },
      { property: "og:title", content: "My Orders — Shree Shyam Dairy" },
      { property: "og:description", content: "Track your dairy orders and delivery status." },
    ],
  }),
  component: () => (
    <CustomerLayout>
      <RequireAuth>
        <OrdersPage />
      </RequireAuth>
    </CustomerLayout>
  ),
});

function OrdersPage() {
  const { data, isLoading } = useQuery(myOrdersQuery);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold">My Orders</h1>

      {isLoading ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-3xl" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <ul className="mt-6 space-y-3">
          {data.map((o) => (
            <li key={o.id}>
              <Link
                to="/orders/$id"
                params={{ id: o.id }}
                className="surface-card block p-5 transition-shadow hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-sm font-bold">{o.order_number}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(o.created_at).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    {STATUS_LABELS[o.order_status] ?? o.order_status}
                  </Badge>
                </div>
                <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">
                  {(o.order_items ?? [])
                    .map((i) => `${i.product_name} (${i.variant_label}) × ${i.quantity}`)
                    .join(", ")}
                </p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cash on Delivery</span>
                  <span className="font-bold">{inr(o.total)}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6">
          <EmptyState
            icon={Package}
            title="No Orders"
            description="You haven't placed any orders yet."
            actionLabel="Start Shopping"
            actionTo="/products"
          />
        </div>
      )}
    </div>
  );
}
