import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { inr, STATUS_LABELS } from "@/lib/business";

export const Route = createFileRoute("/admin/reports")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reports — Admin | Shree Shyam Dairy" },
      { name: "description", content: "Sales and product performance reports." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Reports — Admin | Shree Shyam Dairy" },
      { property: "og:description", content: "Sales and product performance reports." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <AdminReports />
    </AdminLayout>
  ),
});

const RANGES = [
  { key: "7", label: "Last 7 days" },
  { key: "30", label: "Last 30 days" },
  { key: "90", label: "Last 90 days" },
  { key: "all", label: "All time" },
] as const;

function AdminReports() {
  const [range, setRange] = useState<string>("30");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "reports"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("orders")
        .select("id,total,order_status,created_at, order_items(product_name,variant_label,quantity,subtotal)")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      return rows ?? [];
    },
  });

  const report = useMemo(() => {
    if (!data) return null;
    const cutoff =
      range === "all" ? 0 : Date.now() - Number(range) * 24 * 60 * 60 * 1000;
    const rows = data.filter((o) => new Date(o.created_at).getTime() >= cutoff);
    const valid = rows.filter((o) => o.order_status !== "cancelled");
    const revenue = valid.reduce((s, o) => s + Number(o.total), 0);

    const byStatus: Record<string, number> = {};
    for (const o of rows) byStatus[o.order_status] = (byStatus[o.order_status] ?? 0) + 1;

    const byDay = new Map<string, number>();
    for (const o of valid) {
      const d = new Date(o.created_at).toLocaleDateString("en-IN");
      byDay.set(d, (byDay.get(d) ?? 0) + Number(o.total));
    }

    const products = new Map<string, { qty: number; revenue: number }>();
    for (const o of valid) {
      for (const i of o.order_items ?? []) {
        const key = `${i.product_name} · ${i.variant_label}`;
        const prev = products.get(key) ?? { qty: 0, revenue: 0 };
        products.set(key, { qty: prev.qty + i.quantity, revenue: prev.revenue + Number(i.subtotal) });
      }
    }

    return {
      orders: rows.length,
      revenue,
      avg: valid.length ? revenue / valid.length : 0,
      byStatus,
      byDay: [...byDay.entries()].slice(0, 14),
      topProducts: [...products.entries()].sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 10),
    };
  }, [data, range]);

  const exportCsv = () => {
    if (!report) return;
    const lines = ["Product,Quantity,Revenue"];
    for (const [name, s] of report.topProducts) lines.push(`"${name}",${s.qty},${s.revenue}`);
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ssd-report-${range}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading || !report) {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="Reports"
        description="Sales performance"
        action={
          <Button variant="outline" className="rounded-full" onClick={exportCsv}>
            Export CSV
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {RANGES.map((r) => (
          <Button
            key={r.key}
            size="sm"
            variant={range === r.key ? "default" : "outline"}
            onClick={() => setRange(r.key)}
          >
            {r.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card label="Orders" value={String(report.orders)} />
        <Card label="Revenue" value={inr(report.revenue)} />
        <Card label="Average order value" value={inr(report.avg)} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="surface-card p-5">
          <h2 className="font-display text-lg font-bold">Orders by status</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {Object.entries(report.byStatus).map(([s, n]) => (
              <li key={s} className="flex justify-between">
                <span className="text-muted-foreground">{STATUS_LABELS[s] ?? s}</span>
                <span className="font-semibold">{n}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="surface-card p-5">
          <h2 className="font-display text-lg font-bold">Daily revenue</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {report.byDay.map(([d, v]) => (
              <li key={d} className="flex justify-between">
                <span className="text-muted-foreground">{d}</span>
                <span className="font-semibold">{inr(v)}</span>
              </li>
            ))}
            {report.byDay.length === 0 && <li className="text-muted-foreground">No sales in this range.</li>}
          </ul>
        </section>
      </div>

      <section className="surface-card mt-4 p-5">
        <h2 className="font-display text-lg font-bold">Top products</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {report.topProducts.map(([name, s]) => (
            <li key={name} className="flex justify-between gap-3">
              <span className="min-w-0 truncate text-muted-foreground">{name}</span>
              <span className="shrink-0 font-semibold">
                {s.qty} sold · {inr(s.revenue)}
              </span>
            </li>
          ))}
          {report.topProducts.length === 0 && <li className="text-muted-foreground">No data yet.</li>}
        </ul>
      </section>
    </>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-card p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}
