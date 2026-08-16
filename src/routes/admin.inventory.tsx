import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { inr } from "@/lib/business";

export const Route = createFileRoute("/admin/inventory")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Inventory — Admin | Shree Shyam Dairy" },
      { name: "description", content: "Track stock levels for every dairy variant." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Inventory — Admin | Shree Shyam Dairy" },
      { property: "og:description", content: "Track stock levels for every dairy variant." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <AdminInventory />
    </AdminLayout>
  ),
});

type Row = {
  id: string;
  label: string;
  price: number;
  stock: number;
  minimum_stock: number;
  products: { name: string } | null;
};

function AdminInventory() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [lowOnly, setLowOnly] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "inventory"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("product_variants")
        .select("id,label,price,stock,minimum_stock, products(name)")
        .order("stock");
      if (error) throw error;
      return (rows ?? []) as unknown as Row[];
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (data ?? []).filter(
      (r) =>
        (!q || `${r.products?.name ?? ""} ${r.label}`.toLowerCase().includes(q)) &&
        (!lowOnly || Number(r.stock) <= Number(r.minimum_stock)),
    );
  }, [data, search, lowOnly]);

  const saveStock = async (row: Row) => {
    const value = Number(drafts[row.id]);
    if (!Number.isFinite(value) || value < 0) {
      toast.error("Enter a valid stock quantity.");
      return;
    }
    const { error } = await supabase
      .from("product_variants")
      .update({ stock: value })
      .eq("id", row.id);
    if (error) {
      toast.error("Could not update stock.");
      return;
    }
    toast.success(`Stock updated for ${row.products?.name} ${row.label}.`);
    setDrafts((d) => {
      const next = { ...d };
      delete next[row.id];
      return next;
    });
    void queryClient.invalidateQueries({ queryKey: ["admin", "inventory"] });
    void queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  return (
    <>
      <AdminPageHeader title="Inventory" description="Update stock levels in one place" />
      <div className="mb-4 flex flex-wrap gap-3">
        <Input
          placeholder="Search product or variant"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button variant={lowOnly ? "default" : "outline"} onClick={() => setLowOnly((v) => !v)}>
          Low stock only
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Variant</th>
                <th className="p-3">Price</th>
                <th className="p-3">Min</th>
                <th className="p-3">Stock</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((r) => {
                const low = Number(r.stock) <= Number(r.minimum_stock);
                return (
                  <tr key={r.id}>
                    <td className="p-3 font-medium">{r.products?.name}</td>
                    <td className="p-3">{r.label}</td>
                    <td className="p-3">{inr(r.price)}</td>
                    <td className="p-3 text-muted-foreground">{r.minimum_stock}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          className="h-9 w-24"
                          value={drafts[r.id] ?? String(r.stock)}
                          onChange={(e) => setDrafts({ ...drafts, [r.id]: e.target.value })}
                        />
                        {low && <Badge variant="destructive">Low</Badge>}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={drafts[r.id] === undefined}
                        onClick={() => saveStock(r)}
                      >
                        Save
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-muted-foreground" colSpan={6}>
                    No variants found.
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
