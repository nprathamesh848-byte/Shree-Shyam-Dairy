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
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/banners")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Banners — Admin | Shree Shyam Dairy" },
      { name: "description", content: "Manage homepage promotional banners." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Banners — Admin | Shree Shyam Dairy" },
      { property: "og:description", content: "Manage homepage promotional banners." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <AdminBanners />
    </AdminLayout>
  ),
});

type Form = {
  id?: string;
  title: string;
  image: string;
  link: string;
  subtitle: string;
  start_date: string;
  end_date: string;
  status: boolean;
};

const EMPTY: Form = {
  title: "",
  image: "",
  link: "",
  subtitle: "",
  start_date: new Date().toISOString().slice(0, 10),
  end_date: "",
  status: true,
};

function AdminBanners() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);

  const { data } = useQuery({
    queryKey: ["admin", "banners"],
    queryFn: async () => {
      const { data: rows, error } = await supabase.from("banners").select("*").order("start_date", { ascending: false });
      if (error) throw error;
      return rows ?? [];
    },
  });

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", "banners"] });
    void queryClient.invalidateQueries({ queryKey: ["banners"] });
  };

  const save = async () => {
    if (!form.title.trim() || !form.image.trim()) {
      toast.error("A banner title and image URL are required.");
      return;
    }
    const payload = {
      title: form.title.trim(),
      image: form.image.trim(),
      button_link: form.link.trim() || null,
      subtitle: form.subtitle.trim() || null,
      start_date: new Date(form.start_date).toISOString(),
      end_date: form.end_date ? new Date(form.end_date).toISOString() : null,
      status: form.status,
    };
    const { error } = form.id
      ? await supabase.from("banners").update(payload).eq("id", form.id)
      : await supabase.from("banners").insert(payload);
    if (error) {
      toast.error("Could not save the banner.");
      return;
    }
    toast.success("Banner saved.");
    setOpen(false);
    setForm(EMPTY);
    refresh();
  };

  const remove = async (id: string) => {
    await supabase.from("banners").delete().eq("id", id);
    toast.success("Banner deleted.");
    refresh();
  };

  return (
    <>
      <AdminPageHeader
        title="Banners"
        description="Promotional images shown on the home page"
        action={
          <Button
            className="rounded-full"
            onClick={() => {
              setForm(EMPTY);
              setOpen(true);
            }}
          >
            Add banner
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {data?.map((b) => (
          <div key={b.id} className="surface-card overflow-hidden">
            <img src={b.image ?? ""} alt={b.title} className="h-32 w-full object-cover" loading="lazy" />
            <div className="flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-semibold">
                  {b.title}
                  {!b.status && <Badge variant="secondary">Inactive</Badge>}
                </p>
                <p className="truncate text-xs text-muted-foreground">{b.button_link ?? "No link"}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Edit"
                  onClick={() => {
                    setForm({
                      id: b.id,
                      title: b.title,
                      image: b.image ?? "",
                      link: b.button_link ?? "",
                      subtitle: b.subtitle ?? "",
                      start_date: b.start_date.slice(0, 10),
                      end_date: b.end_date ? b.end_date.slice(0, 10) : "",
                      status: b.status,
                    });
                    setOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => remove(b.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {(!data || data.length === 0) && (
          <p className="text-sm text-muted-foreground">No banners yet.</p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit banner" : "Add banner"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Image URL</Label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Link</Label>
              <Input
                value={form.link}
                placeholder="/products"
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>Subtitle</Label>
                <Input
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Start</Label>
                <Input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>End</Label>
                <Input
                  type="date"
                  value={form.end_date}
                  onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.status} onCheckedChange={(v) => setForm({ ...form, status: v })} />
              <Label>Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button className="rounded-full" onClick={save}>
              Save banner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
