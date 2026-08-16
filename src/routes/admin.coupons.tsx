import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { inr } from "@/lib/business";

export const Route = createFileRoute("/admin/coupons")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Coupons — Admin | Shree Shyam Dairy" },
      { name: "description", content: "Manage discount coupon codes." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Coupons — Admin | Shree Shyam Dairy" },
      { property: "og:description", content: "Manage discount coupon codes." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <AdminCoupons />
    </AdminLayout>
  ),
});

type Form = {
  id?: string;
  code: string;
  discount_type: string;
  discount_value: number;
  minimum_order: number;
  maximum_discount: string;
  usage_limit: string;
  expiry_date: string;
  status: boolean;
};

const EMPTY: Form = {
  code: "",
  discount_type: "percentage",
  discount_value: 10,
  minimum_order: 0,
  maximum_discount: "",
  usage_limit: "",
  expiry_date: "",
  status: true,
};

function AdminCoupons() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);

  const { data } = useQuery({
    queryKey: ["admin", "coupons"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("coupons")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return rows ?? [];
    },
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin", "coupons"] });

  const save = async () => {
    const code = form.code.trim().toUpperCase();
    if (code.length < 3) {
      toast.error("Coupon code must be at least 3 characters.");
      return;
    }
    const payload = {
      code,
      discount_type: form.discount_type as never,
      discount_value: Number(form.discount_value),
      minimum_order: Number(form.minimum_order) || 0,
      maximum_discount: form.maximum_discount === "" ? null : Number(form.maximum_discount),
      usage_limit: form.usage_limit === "" ? null : Number(form.usage_limit),
      expiry_date: form.expiry_date ? new Date(form.expiry_date).toISOString() : null,
      status: form.status,
    };
    const { error } = form.id
      ? await supabase.from("coupons").update(payload).eq("id", form.id)
      : await supabase.from("coupons").insert(payload);
    if (error) {
      toast.error("Could not save the coupon. The code may already exist.");
      return;
    }
    toast.success("Coupon saved.");
    setOpen(false);
    setForm(EMPTY);
    void refresh();
  };

  const remove = async (id: string) => {
    await supabase.from("coupons").delete().eq("id", id);
    toast.success("Coupon deleted.");
    void refresh();
  };

  return (
    <>
      <AdminPageHeader
        title="Coupons"
        description="Discount codes customers can apply at checkout"
        action={
          <Button
            className="rounded-full"
            onClick={() => {
              setForm(EMPTY);
              setOpen(true);
            }}
          >
            Add coupon
          </Button>
        }
      />

      <div className="surface-card overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Min order</th>
              <th className="p-3">Used</th>
              <th className="p-3">Expiry</th>
              <th className="p-3">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.map((c) => (
              <tr key={c.id}>
                <td className="p-3 font-mono font-semibold">{c.code}</td>
                <td className="p-3">
                  {c.discount_type === "percentage"
                    ? `${c.discount_value}%${c.maximum_discount ? ` (max ${inr(c.maximum_discount)})` : ""}`
                    : inr(c.discount_value)}
                </td>
                <td className="p-3">{inr(c.minimum_order ?? 0)}</td>
                <td className="p-3">
                  {c.used_count ?? 0}
                  {c.usage_limit ? ` / ${c.usage_limit}` : ""}
                </td>
                <td className="p-3 text-muted-foreground">
                  {c.expiry_date ? new Date(c.expiry_date).toLocaleDateString("en-IN") : "—"}
                </td>
                <td className="p-3">
                  <Badge variant={c.status ? "secondary" : "outline"} className="rounded-full">
                    {c.status ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="p-3 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Edit"
                    onClick={() => {
                      setForm({
                        id: c.id,
                        code: c.code,
                        discount_type: c.discount_type,
                        discount_value: Number(c.discount_value),
                        minimum_order: Number(c.minimum_order ?? 0),
                        maximum_discount: c.maximum_discount === null ? "" : String(c.maximum_discount),
                        usage_limit: c.usage_limit === null ? "" : String(c.usage_limit),
                        expiry_date: c.expiry_date ? c.expiry_date.slice(0, 10) : "",
                        status: c.status,
                      });
                      setOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => remove(c.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
            {(!data || data.length === 0) && (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={7}>
                  No coupons yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit coupon" : "Add coupon"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1.5">
              <Label>Code</Label>
              <Input
                className="font-mono uppercase"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Discount type</Label>
              <Select
                value={form.discount_type}
                onValueChange={(v) => setForm({ ...form, discount_type: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Value</Label>
              <Input
                type="number"
                value={form.discount_value}
                onChange={(e) => setForm({ ...form, discount_value: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Minimum order</Label>
              <Input
                type="number"
                value={form.minimum_order}
                onChange={(e) => setForm({ ...form, minimum_order: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Max discount</Label>
              <Input
                type="number"
                value={form.maximum_discount}
                onChange={(e) => setForm({ ...form, maximum_discount: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Usage limit</Label>
              <Input
                type="number"
                value={form.usage_limit}
                onChange={(e) => setForm({ ...form, usage_limit: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Expiry date</Label>
              <Input
                type="date"
                value={form.expiry_date}
                onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
              />
            </div>
            <div className="col-span-2 flex items-center gap-3">
              <Switch checked={form.status} onCheckedChange={(v) => setForm({ ...form, status: v })} />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-full" onClick={save}>
              Save coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
