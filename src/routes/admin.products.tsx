import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { inr } from "@/lib/business";

export const Route = createFileRoute("/admin/products")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Products — Admin | Shree Shyam Dairy" },
      { name: "description", content: "Create and edit dairy products and their variants." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Products — Admin | Shree Shyam Dairy" },
      { property: "og:description", content: "Create and edit dairy products and their variants." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <AdminProducts />
    </AdminLayout>
  ),
});

type VariantRow = {
  id?: string;
  label: string;
  unit: string;
  quantity: number;
  price: number;
  mrp: number | null;
  stock: number;
  minimum_stock: number;
  status: boolean;
};

type ProductRow = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  ingredients: string | null;
  benefits: string | null;
  storage_instructions: string | null;
  status: boolean;
  category_id: string | null;
  product_variants: Array<VariantRow & { id: string }>;
};

type Form = {
  id?: string;
  name: string;
  description: string;
  image: string;
  ingredients: string;
  benefits: string;
  storage_instructions: string;
  category_id: string;
  status: boolean;
  variants: VariantRow[];
};

const EMPTY_VARIANT: VariantRow = {
  label: "",
  unit: "ml",
  quantity: 500,
  price: 0,
  mrp: null,
  stock: 0,
  minimum_stock: 5,
  status: true,
};

const EMPTY: Form = {
  name: "",
  description: "",
  image: "",
  ingredients: "",
  benefits: "",
  storage_instructions: "",
  category_id: "",
  status: true,
  variants: [{ ...EMPTY_VARIANT }],
};

function AdminProducts() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").order("sort_order");
      return data ?? [];
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      const { data: rows, error } = await supabase
        .from("products")
        .select("*, product_variants(*)")
        .order("name");
      if (error) throw error;
      return (rows ?? []) as unknown as ProductRow[];
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (data ?? []).filter((p) => !q || p.name.toLowerCase().includes(q));
  }, [data, search]);

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    void queryClient.invalidateQueries({ queryKey: ["products"] });
    void queryClient.invalidateQueries({ queryKey: ["admin", "inventory"] });
  };

  const save = async () => {
    if (form.name.trim().length < 2) {
      toast.error("Enter a product name.");
      return;
    }
    if (form.variants.length === 0 || form.variants.some((v) => !v.label.trim() || v.price <= 0)) {
      toast.error("Each variant needs a label and a price above zero.");
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      image: form.image.trim() || null,
      ingredients: form.ingredients.trim() || null,
      benefits: form.benefits.trim() || null,
      storage_instructions: form.storage_instructions.trim() || null,
      category_id: form.category_id || null,
      status: form.status,
    };

    let productId = form.id;
    if (productId) {
      const { error } = await supabase.from("products").update(payload).eq("id", productId);
      if (error) {
        setSaving(false);
        toast.error("Could not save the product.");
        return;
      }
    } else {
      const { data: inserted, error } = await supabase.from("products").insert(payload).select("id").single();
      if (error || !inserted) {
        setSaving(false);
        toast.error("Could not create the product.");
        return;
      }
      productId = inserted.id;
    }

    const keepIds = form.variants.filter((v) => v.id).map((v) => v.id as string);
    const existing = data?.find((p) => p.id === productId)?.product_variants ?? [];
    const toDelete = existing.filter((v) => !keepIds.includes(v.id)).map((v) => v.id);
    if (toDelete.length > 0) await supabase.from("product_variants").delete().in("id", toDelete);

    for (const v of form.variants) {
      const vPayload = {
        product_id: productId,
        label: v.label.trim(),
        unit: v.unit,
        quantity: Number(v.quantity) || 0,
        price: Number(v.price),
        mrp: v.mrp === null || v.mrp === undefined || Number.isNaN(Number(v.mrp)) ? null : Number(v.mrp),
        stock: Number(v.stock) || 0,
        minimum_stock: Number(v.minimum_stock) || 0,
        status: v.status,
      };
      if (v.id) await supabase.from("product_variants").update(vPayload).eq("id", v.id);
      else await supabase.from("product_variants").insert(vPayload);
    }

    setSaving(false);
    toast.success("Product saved.");
    setOpen(false);
    setForm(EMPTY);
    refresh();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error("This product has orders and cannot be deleted. Set it inactive instead.");
      return;
    }
    toast.success("Product deleted.");
    refresh();
  };

  const toggleStatus = async (p: ProductRow) => {
    await supabase.from("products").update({ status: !p.status }).eq("id", p.id);
    refresh();
  };

  const setVariant = (index: number, patch: Partial<VariantRow>) =>
    setForm((f) => ({
      ...f,
      variants: f.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    }));

  return (
    <>
      <AdminPageHeader
        title="Products"
        description={`${filtered.length} products`}
        action={
          <Button
            className="rounded-full"
            onClick={() => {
              setForm(EMPTY);
              setOpen(true);
            }}
          >
            Add product
          </Button>
        }
      />

      <Input
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-xs"
      />

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="surface-card flex flex-wrap items-center gap-4 p-4">
              {p.image && (
                <img src={p.image} alt={p.name} className="h-14 w-14 rounded-xl object-cover" loading="lazy" />
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 font-semibold">
                  {p.name}
                  {!p.status && <Badge variant="secondary">Inactive</Badge>}
                </p>
                <p className="text-xs text-muted-foreground">
                  {p.product_variants.length} variants ·{" "}
                  {p.product_variants.map((v) => `${v.label} ${inr(v.price)}`).join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={p.status} onCheckedChange={() => toggleStatus(p)} />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Edit"
                  onClick={() => {
                    setForm({
                      id: p.id,
                      name: p.name,
                      description: p.description ?? "",
                      image: p.image ?? "",
                      ingredients: p.ingredients ?? "",
                      benefits: p.benefits ?? "",
                      storage_instructions: p.storage_instructions ?? "",
                      category_id: p.category_id ?? "",
                      status: p.status,
                      variants: p.product_variants.map((v) => ({ ...v })),
                    });
                    setOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => remove(p.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit product" : "Add product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select
                  value={form.category_id}
                  onValueChange={(v) => setForm({ ...form, category_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Image URL</Label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label>Ingredients</Label>
                <Textarea
                  rows={2}
                  value={form.ingredients}
                  onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Benefits</Label>
                <Textarea
                  rows={2}
                  value={form.benefits}
                  onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Storage</Label>
                <Textarea
                  rows={2}
                  value={form.storage_instructions}
                  onChange={(e) => setForm({ ...form, storage_instructions: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.status} onCheckedChange={(v) => setForm({ ...form, status: v })} />
              <Label>Active</Label>
            </div>

            <div className="rounded-2xl border p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold">Variants</h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setForm({ ...form, variants: [...form.variants, { ...EMPTY_VARIANT }] })}
                >
                  <Plus className="mr-1 h-4 w-4" /> Add variant
                </Button>
              </div>
              <div className="mt-3 space-y-3">
                {form.variants.map((v, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-3 sm:grid-cols-4">
                    <Field label="Label">
                      <Input value={v.label} onChange={(e) => setVariant(i, { label: e.target.value })} />
                    </Field>
                    <Field label="Unit">
                      <Select value={v.unit} onValueChange={(u) => setVariant(i, { unit: u })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["ml", "litre", "gm", "kg", "piece", "dozen"].map((u) => (
                            <SelectItem key={u} value={u}>
                              {u}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Quantity">
                      <Input
                        type="number"
                        value={v.quantity}
                        onChange={(e) => setVariant(i, { quantity: Number(e.target.value) })}
                      />
                    </Field>
                    <Field label="Price">
                      <Input
                        type="number"
                        value={v.price}
                        onChange={(e) => setVariant(i, { price: Number(e.target.value) })}
                      />
                    </Field>
                    <Field label="MRP">
                      <Input
                        type="number"
                        value={v.mrp ?? ""}
                        onChange={(e) =>
                          setVariant(i, { mrp: e.target.value === "" ? null : Number(e.target.value) })
                        }
                      />
                    </Field>
                    <Field label="Stock">
                      <Input
                        type="number"
                        value={v.stock}
                        onChange={(e) => setVariant(i, { stock: Number(e.target.value) })}
                      />
                    </Field>
                    <Field label="Min stock">
                      <Input
                        type="number"
                        value={v.minimum_stock}
                        onChange={(e) => setVariant(i, { minimum_stock: Number(e.target.value) })}
                      />
                    </Field>
                    <div className="flex items-end justify-between gap-2">
                      <label className="flex items-center gap-2 text-xs">
                        <Switch
                          checked={v.status}
                          onCheckedChange={(s) => setVariant(i, { status: s })}
                        />
                        Active
                      </label>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Remove variant"
                        onClick={() =>
                          setForm({ ...form, variants: form.variants.filter((_, x) => x !== i) })
                        }
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-full" onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
