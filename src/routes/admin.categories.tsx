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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/categories")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Categories — Admin | Shree Shyam Dairy" },
      { name: "description", content: "Manage dairy product categories." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Categories — Admin | Shree Shyam Dairy" },
      { property: "og:description", content: "Manage dairy product categories." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <AdminCategories />
    </AdminLayout>
  ),
});

type Form = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  sort_order: number;
  status: boolean;
};

const EMPTY: Form = { name: "", slug: "", description: "", image: "", sort_order: 0, status: true };

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function AdminCategories() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<Form>(EMPTY);
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => {
      const { data: rows, error } = await supabase.from("categories").select("*").order("sort_order");
      if (error) throw error;
      return rows ?? [];
    },
  });

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
    void queryClient.invalidateQueries({ queryKey: ["categories"] });
  };

  const save = async () => {
    if (form.name.trim().length < 2) {
      toast.error("Please enter a category name.");
      return;
    }
    const payload = {
      name: form.name.trim(),
      slug: slugify(form.slug || form.name),
      description: form.description.trim() || null,
      image: form.image.trim() || null,
      sort_order: Number(form.sort_order) || 0,
      status: form.status,
    };
    const { error } = form.id
      ? await supabase.from("categories").update(payload).eq("id", form.id)
      : await supabase.from("categories").insert(payload);
    if (error) {
      toast.error("Could not save the category.");
      return;
    }
    toast.success("Category saved.");
    setOpen(false);
    setForm(EMPTY);
    refresh();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      toast.error("Category is in use and cannot be deleted.");
      return;
    }
    toast.success("Category deleted.");
    refresh();
  };

  return (
    <>
      <AdminPageHeader
        title="Categories"
        description="Organise your product catalogue"
        action={
          <Button
            className="rounded-full"
            onClick={() => {
              setForm(EMPTY);
              setOpen(true);
            }}
          >
            Add category
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {data?.map((c) => (
          <div key={c.id} className="surface-card flex items-start justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-semibold">
                {c.name}
                {!c.status && <Badge variant="secondary">Hidden</Badge>}
              </p>
              <p className="truncate text-xs text-muted-foreground">/{c.slug}</p>
              {c.description && (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
              )}
            </div>
            <div className="flex shrink-0 gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit"
                onClick={() => {
                  setForm({
                    id: c.id,
                    name: c.name,
                    slug: c.slug,
                    description: c.description ?? "",
                    image: c.image ?? "",
                    sort_order: c.sort_order ?? 0,
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
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit category" : "Add category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Slug (optional)</Label>
              <Input
                value={form.slug}
                placeholder={slugify(form.name)}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
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
            <div className="space-y-1.5">
              <Label>Image URL</Label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Sort order</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.status} onCheckedChange={(v) => setForm({ ...form, status: v })} />
              <Label>Visible to customers</Label>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-full" onClick={save}>
              Save category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
