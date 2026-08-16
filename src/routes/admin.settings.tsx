import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { BUSINESS } from "@/lib/business";

export const Route = createFileRoute("/admin/settings")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Settings — Admin | Shree Shyam Dairy" },
      { name: "description", content: "Business, delivery and contact settings." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Settings — Admin | Shree Shyam Dairy" },
      { property: "og:description", content: "Business, delivery and contact settings." },
    ],
  }),
  component: () => (
    <AdminLayout>
      <AdminSettings />
    </AdminLayout>
  ),
});

type Delivery = {
  delivery_charge: number;
  free_delivery_threshold: number;
  minimum_order: number;
  areas: string;
  pincodes: string;
};

function AdminSettings() {
  const queryClient = useQueryClient();
  const [delivery, setDelivery] = useState<Delivery>({
    delivery_charge: 30,
    free_delivery_threshold: 500,
    minimum_order: 0,
    areas: "",
    pincodes: "",
  });
  const [saving, setSaving] = useState(false);

  const { data } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data: rows } = await supabase.from("settings").select("*");
      return rows ?? [];
    },
  });

  useEffect(() => {
    const row = data?.find((r) => r.key === "delivery");
    if (!row) return;
    const v = (row.value ?? {}) as Record<string, unknown>;
    setDelivery({
      delivery_charge: Number(v["delivery_charge"] ?? 30),
      free_delivery_threshold: Number(v["free_delivery_threshold"] ?? 500),
      minimum_order: Number(v["minimum_order"] ?? 0),
      areas: ((v["areas"] as string[]) ?? []).join(", "),
      pincodes: ((v["pincodes"] as string[]) ?? []).join(", "),
    });
  }, [data]);

  const save = async () => {
    setSaving(true);
    const value = {
      delivery_charge: Number(delivery.delivery_charge) || 0,
      free_delivery_threshold: Number(delivery.free_delivery_threshold) || 0,
      minimum_order: Number(delivery.minimum_order) || 0,
      areas: delivery.areas.split(",").map((s) => s.trim()).filter(Boolean),
      pincodes: delivery.pincodes.split(",").map((s) => s.trim()).filter(Boolean),
    };
    const { error } = await supabase
      .from("settings")
      .upsert({ key: "delivery", value }, { onConflict: "key" });
    setSaving(false);
    if (error) {
      toast.error("Could not save delivery settings.");
      return;
    }
    toast.success("Delivery settings saved.");
    void queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
    void queryClient.invalidateQueries({ queryKey: ["settings", "delivery"] });
  };

  return (
    <>
      <AdminPageHeader title="Settings" description="Delivery rules and business contact details" />

      <section className="surface-card max-w-2xl space-y-4 p-5">
        <h2 className="font-display text-lg font-bold">Delivery</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Delivery charge (₹)</Label>
            <Input
              type="number"
              value={delivery.delivery_charge}
              onChange={(e) => setDelivery({ ...delivery, delivery_charge: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Free above (₹)</Label>
            <Input
              type="number"
              value={delivery.free_delivery_threshold}
              onChange={(e) =>
                setDelivery({ ...delivery, free_delivery_threshold: Number(e.target.value) })
              }
            />
          </div>
          <div className="space-y-1.5">
            <Label>Minimum order (₹)</Label>
            <Input
              type="number"
              value={delivery.minimum_order}
              onChange={(e) => setDelivery({ ...delivery, minimum_order: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Delivery areas (comma separated)</Label>
          <Textarea
            rows={2}
            value={delivery.areas}
            onChange={(e) => setDelivery({ ...delivery, areas: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Serviceable pincodes (comma separated)</Label>
          <Textarea
            rows={2}
            value={delivery.pincodes}
            onChange={(e) => setDelivery({ ...delivery, pincodes: e.target.value })}
          />
        </div>
        <Button className="rounded-full" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save delivery settings"}
        </Button>
      </section>

      <section className="surface-card mt-4 max-w-2xl space-y-2 p-5 text-sm">
        <h2 className="font-display text-lg font-bold">Business details</h2>
        <p>
          <span className="text-muted-foreground">Name:</span> {BUSINESS.name}
        </p>
        <p>
          <span className="text-muted-foreground">Phone / WhatsApp:</span> {BUSINESS.phone}
        </p>
        <p>
          <span className="text-muted-foreground">Email:</span> {BUSINESS.email}
        </p>
        <p>
          <span className="text-muted-foreground">Address:</span> {BUSINESS.address}
        </p>
        <p>
          <span className="text-muted-foreground">Hours:</span> {BUSINESS.hours}
        </p>
      </section>
    </>
  );
}
