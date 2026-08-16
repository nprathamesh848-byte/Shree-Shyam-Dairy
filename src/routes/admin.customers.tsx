import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { inr } from "@/lib/business";

export const Route = createFileRoute("/admin/customers")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Customers — Admin | Shree Shyam Dairy" },
      { name: "description", content: "View customers and their order history." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Customers — Admin | Shree Shyam Dairy" },
      { property: "og:description", content: "View customers and their order history." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <AdminCustomers />
    </AdminLayout>
  ),
});

function AdminCustomers() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "customers"],
    queryFn: async () => {
      const [profiles, orders] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("user_id,total,order_status,created_at"),
      ]);
      const byUser = new Map<string, { count: number; total: number; last: string }>();
      for (const o of orders.data ?? []) {
        if (!o.user_id) continue;
        const prev = byUser.get(o.user_id) ?? { count: 0, total: 0, last: o.created_at };
        byUser.set(o.user_id, {
          count: prev.count + 1,
          total: prev.total + (o.order_status === "cancelled" ? 0 : Number(o.total)),
          last: o.created_at > prev.last ? o.created_at : prev.last,
        });
      }
      return (profiles.data ?? []).map((p) => ({
        ...p,
        stats: byUser.get(p.id) ?? { count: 0, total: 0, last: "" },
      }));
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (data ?? []).filter(
      (c) =>
        !q ||
        (c.name ?? "").toLowerCase().includes(q) ||
        (c.email ?? "").toLowerCase().includes(q) ||
        (c.mobile ?? "").includes(q),
    );
  }, [data, search]);

  return (
    <>
      <AdminPageHeader title="Customers" description={`${filtered.length} registered customers`} />
      <Input
        placeholder="Search name, email or mobile"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-xs"
      />

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Orders</th>
                <th className="p-3">Lifetime value</th>
                <th className="p-3">Last order</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td className="p-3 font-medium">{c.name ?? "—"}</td>
                  <td className="p-3 text-muted-foreground">
                    {c.email}
                    <span className="block">{c.mobile ?? ""}</span>
                  </td>
                  <td className="p-3">{c.stats.count}</td>
                  <td className="p-3 font-semibold">{inr(c.stats.total)}</td>
                  <td className="p-3 text-muted-foreground">
                    {c.stats.last ? new Date(c.stats.last).toLocaleDateString("en-IN") : "—"}
                  </td>
                  <td className="p-3 text-right">
                    {c.mobile && (
                      <Button asChild size="sm" variant="outline">
                        <a
                          href={`https://wa.me/91${c.mobile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          WhatsApp
                        </a>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-muted-foreground" colSpan={6}>
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
