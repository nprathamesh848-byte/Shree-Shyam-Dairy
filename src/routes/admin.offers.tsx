import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/offers")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Offers — Admin | Shree Shyam Dairy" },
      { name: "description", content: "Create promotional offers for customers." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Offers — Admin | Shree Shyam Dairy" },
      { property: "og:description", content: "Create promotional offers for customers." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <AdminOffers />
    </AdminLayout>
  ),
});

type Form = {
  id?: string;
  title: string;
  description: string;
  terms: string;
  discount_type: string;
  discount_value: number;
  minimum_order: number;
  start_date: string;
  end_date: string;
  status: boolean;
};

const EMPTY: Form = {
  title: "",
  description: "",
  terms: "",
  discount_type: "percentage",
  discount_value: 10,
  minimum_order: 0,
  start_date: new Date().toISOString().slice(0, 10),
  end_date: "",
  status: true,
};

function AdminOffers() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);

  const { data } = useQuery({
    queryKey: ["admin", "offers"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("offers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return rows ?? [];
    },
  });

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "offers"] });
    void queryClient.invalidateQueries({ queryKey: ["offers"] });
  };

  const save = async () => {
    if (form.title.trim().length < 2) {
      toast.error("Enter an offer title.");
      return;
    }
    const payload = {
      name: form.title.trim(),
      description: form.description.trim() || null,
      terms: form.terms.trim() || null,
      discount_type: form.discount_type as never,
      discount_value: Number(form.discount_value),
      minimum_order: Number(form.minimum_order) || 0,
      start_date: new Date(form.start_date).toISOString(),
      end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
      status: form.status,
    };
    const { error } = form.id
      ? await supabase.from("offers").update(payload).eq("id", form.id)
      : await supabase.from("offers").insert(payload);
    if (error) {
      toast.error("Could not save the offer.");
      return;
    }
    toast.success("Offer saved.");
    setOpen(false);
    setForm(EMPTY);
    refresh();
  };

  const remove = async (id: string) => {
    await supabase.from("offers").delete().eq("id", id);
    toast.success("Offer deleted.");
    refresh();
  };

  return (
    <>
      <AdminPageHeader
        title="Offers"
        description="Promotions shown on the offers page"
        action={
          <Button
            className="rounded-full"
            onClick={() => {
              setForm(EMPTY);
              setOpen(true);
            }}
          >
            Add offer
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {data?.map((o) => (
          <div key={o.id} className="surface-card flex items-start justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-semibold">
                {o.name}
                {!o.status && <Badge variant="secondary">Inactive</Badge>}
              </p>
              <p className="text-sm text-muted-foreground">
                {o.discount_type === "percentage"
                  ? `${o.discount_value}% off`
                  : `₹${o.discount_value} off`}
                {Number(o.minimum_order) > 0 ? ` · min ₹${o.minimum_order}` : ""}
              </p>
              {o.description && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{o.description}</p>
              )}
            </div>
            <div className="flex shrink-0 gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit"
                onClick={() => {
                  setForm({
                    id: o.id,
                    title: o.name,
                    description: o.description ?? "",
                    terms: o.terms ?? "",
                    discount_type: o.discount_type,
                    discount_value: Number(o.discount_value),
                    minimum_order: Number(o.minimum_order ?? 0),
                    start_date: o.start_date.slice(0, 10),
                    end_date: o.end_date ? o.end_date.slice(0, 10) : "",
                    status: o.status,
                  });
                  setOpen(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => remove(o.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit offer" : "Add offer"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
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
                <Label>Discount value</Label>
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
                <Label>Terms</Label>
                <Input
                  value={form.terms}
                  onChange={(e) => setForm({ ...form, terms: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Start date</Label>
                <Input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>End date</Label>
                <Input
                  type="date"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.status}
                onCheckedChange={(v) => setForm({ ...form, status: v })}
              />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-full" onClick={save}>
              Save offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
