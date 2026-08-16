import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, IndianRupee, Package, ShoppingBag, Users } from "lucide-react";

import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { inr, STATUS_LABELS } from "@/lib/business";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Shree Shyam Dairy" },
      { name: "description", content: "Business overview for Shree Shyam Dairy." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard — Shree Shyam Dairy" },
      { property: "og:description", content: "Business overview for Shree Shyam Dairy." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  ),
});

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: async () => {
      const [orders, products, customers, variants] = await Promise.all([
        supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(500),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("product_variants").select("*, products(name)").order("stock"),
      ]);
      const rows = orders.data ?? [];
      const today = startOfToday();
      const todays = rows.filter((o) => o.created_at >= today);
      const revenue = rows
        .filter((o) => o.order_status !== "cancelled")
        .reduce((s, o) => s + Number(o.total), 0);
      const lowStock = (variants.data ?? []).filter(
        (v) => Number(v.stock) <= Number(v.minimum_stock),
      );
      return {
        todaysOrders: todays.length,
        todaysRevenue: todays
          .filter((o) => o.order_status !== "cancelled")
          .reduce((s, o) => s + Number(o.total), 0),
        pending: rows.filter((o) => o.order_status === "pending").length,
        revenue,
        products: products.count ?? 0,
        customers: customers.count ?? 0,
        recent: rows.slice(0, 8),
        lowStock,
      };
    },
  });

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Today at a glance" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Today's Orders" value={String(data.todaysOrders)} icon={ShoppingBag} />
        <Stat label="Today's Revenue" value={inr(data.todaysRevenue)} icon={IndianRupee} />
        <Stat label="Pending Orders" value={String(data.pending)} icon={AlertTriangle} />
        <Stat label="Total Revenue" value={inr(data.revenue)} icon={IndianRupee} />
        <Stat label="Products" value={String(data.products)} icon={Package} />
        <Stat label="Customers" value={String(data.customers)} icon={Users} />
        <Stat label="Low Stock Items" value={String(data.lowStock.length)} icon={AlertTriangle} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="surface-card p-5">
          <h2 className="font-display text-lg font-bold">Recent orders</h2>
          <ul className="mt-3 divide-y text-sm">
            {data.recent.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 py-2">
                <Link to="/admin/orders" className="min-w-0">
                  <span className="block truncate font-medium">{o.order_number}</span>
                  <span className="text-xs text-muted-foreground">{o.customer_name}</span>
                </Link>
                <div className="text-right">
                  <span className="block font-semibold">{inr(o.total)}</span>
                  <Badge variant="secondary" className="rounded-full text-[10px]">
                    {STATUS_LABELS[o.order_status] ?? o.order_status}
                  </Badge>
                </div>
              </li>
            ))}
            {data.recent.length === 0 && (
              <li className="py-4 text-muted-foreground">No orders yet.</li>
            )}
          </ul>
        </section>

        <section className="surface-card p-5">
          <h2 className="font-display text-lg font-bold">Low stock alerts</h2>
          <ul className="mt-3 divide-y text-sm">
            {data.lowStock.slice(0, 10).map((v) => (
              <li key={v.id} className="flex items-center justify-between gap-3 py-2">
                <span className="min-w-0 truncate">
                  {(v as { products?: { name?: string } }).products?.name} · {v.label}
                </span>
                <Badge variant="destructive" className="rounded-full">
                  {v.stock} left
                </Badge>
              </li>
            ))}
            {data.lowStock.length === 0 && (
              <li className="py-4 text-muted-foreground">All items are well stocked.</li>
            )}
          </ul>
        </section>
      </div>
    </>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}
