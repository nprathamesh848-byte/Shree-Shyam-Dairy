import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { inr, ORDER_STATUSES, STATUS_LABELS } from "@/lib/business";

export const Route = createFileRoute("/admin/orders")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Orders — Admin | Shree Shyam Dairy" },
      { name: "description", content: "Manage and fulfil customer dairy orders." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Orders — Admin | Shree Shyam Dairy" },
      { property: "og:description", content: "Manage and fulfil customer dairy orders." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <AdminOrders />
    </AdminLayout>
  ),
});

type OrderRow = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_mobile: string;
  address_text: string;
  landmark: string | null;
  city: string | null;
  pincode: string | null;
  subtotal: number;
  discount: number;
  delivery_charge: number;
  total: number;
  order_status: string;
  created_at: string;
  notes: string | null;
  order_items: Array<{
    id: string;
    product_name: string;
    variant_label: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
};

function AdminOrders() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<OrderRow | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false })
        .limit(300);
      if (error) throw error;
      return (rows ?? []) as unknown as OrderRow[];
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (data ?? []).filter(
      (o) =>
        (status === "all" || o.order_status === status) &&
        (!q ||
          o.order_number.toLowerCase().includes(q) ||
          o.customer_name.toLowerCase().includes(q) ||
          o.customer_mobile.includes(q)),
    );
  }, [data, status, search]);

  const updateStatus = async (order: OrderRow, next: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ order_status: next as never })
      .eq("id", order.id);
    if (error) {
      toast.error("Could not update the order status.");
      return;
    }
    toast.success(`Order ${order.order_number} marked ${STATUS_LABELS[next]}.`);
    void queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    setSelected(null);
  };

  return (
    <>
      <AdminPageHeader title="Orders" description={`${filtered.length} orders`} />
      <div className="mb-4 flex flex-wrap gap-3">
        <Input
          placeholder="Search order no, name or mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {[...ORDER_STATUSES, "cancelled"].map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Date</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td className="p-3 font-medium">{o.order_number}</td>
                  <td className="p-3">
                    {o.customer_name}
                    <span className="block text-xs text-muted-foreground">{o.customer_mobile}</span>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {new Date(o.created_at).toLocaleDateString("en-IN")}
                  </td>
                  <td className="p-3 font-semibold">{inr(o.total)}</td>
                  <td className="p-3">
                    <Badge
                      variant={o.order_status === "cancelled" ? "destructive" : "secondary"}
                      className="rounded-full"
                    >
                      {STATUS_LABELS[o.order_status] ?? o.order_status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="outline" onClick={() => setSelected(o)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-muted-foreground" colSpan={6}>
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.order_number}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">{selected.customer_name}</p>
                  <p className="text-muted-foreground">{selected.customer_mobile}</p>
                  <p className="text-muted-foreground">
                    {selected.address_text}
                    {selected.landmark ? `, ${selected.landmark}` : ""}, {selected.city} - {selected.pincode}
                  </p>
                </div>
                <ul className="space-y-1">
                  {selected.order_items.map((i) => (
                    <li key={i.id} className="flex justify-between gap-3">
                      <span>
                        {i.product_name} · {i.variant_label} × {i.quantity}
                      </span>
                      <span>{inr(i.subtotal)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{inr(selected.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span>-{inr(selected.discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{inr(selected.delivery_charge)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total (COD)</span>
                    <span>{inr(selected.total)}</span>
                  </div>
                </div>
                {selected.notes && (
                  <p className="rounded-xl bg-muted p-3 text-muted-foreground">Note: {selected.notes}</p>
                )}
                <div>
                  <p className="mb-2 font-medium">Update status</p>
                  <div className="flex flex-wrap gap-2">
                    {[...ORDER_STATUSES, "cancelled"].map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={selected.order_status === s ? "default" : "outline"}
                        onClick={() => updateStatus(selected, s)}
                      >
                        {STATUS_LABELS[s]}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
