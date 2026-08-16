import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MapPin, Pencil, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { RequireAuth } from "@/components/common/RequireAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { myAddressesQuery } from "@/lib/queries";

export const Route = createFileRoute("/profile/addresses")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Addresses — Shree Shyam Dairy" },
      { name: "description", content: "Save and manage your delivery addresses." },
      { property: "og:title", content: "My Addresses — Shree Shyam Dairy" },
      { property: "og:description", content: "Save and manage your delivery addresses." },
    ],
  }),
  component: () => (
    <CustomerLayout>
      <RequireAuth>
        <AddressesPage />
      </RequireAuth>
    </CustomerLayout>
  ),
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/),
  address: z.string().trim().min(5).max(400),
  landmark: z.string().trim().max(120),
  city: z.string().trim().min(2).max(80),
  pincode: z.string().trim().regex(/^\d{6}$/),
  type: z.string(),
});

type FormState = z.infer<typeof schema> & { id?: string; is_default: boolean };

const EMPTY: FormState = {
  name: "",
  mobile: "",
  address: "",
  landmark: "",
  city: "",
  pincode: "",
  type: "home",
  is_default: false,
};

function AddressesPage() {
  const { data, isLoading } = useQuery(myAddressesQuery);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["addresses"] });

  const save = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Please fill all address fields correctly.");
      return;
    }
    setSaving(true);
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;
    const payload = { ...parsed.data, is_default: form.is_default, user_id: auth.user.id };
    const { error } = form.id
      ? await supabase.from("addresses").update(payload).eq("id", form.id)
      : await supabase.from("addresses").insert(payload);
    if (!error && form.is_default) {
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", auth.user.id)
        .neq("id", form.id ?? "00000000-0000-0000-0000-000000000000");
    }
    setSaving(false);
    if (error) {
      toast.error("Unable to save the address. Please try again.");
      return;
    }
    toast.success("Address saved successfully.");
    setOpen(false);
    setForm(EMPTY);
    void refresh();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("addresses").delete().eq("id", id);
    if (error) {
      toast.error("Unable to delete this address.");
      return;
    }
    toast.success("Address removed.");
    void refresh();
  };

  const setDefault = async (id: string) => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;
    await supabase.from("addresses").update({ is_default: false }).eq("user_id", auth.user.id);
    await supabase.from("addresses").update({ is_default: true }).eq("id", id);
    toast.success("Default address updated.");
    void refresh();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/profile" className="text-sm text-primary">
        ← Back to profile
      </Link>
      <div className="mt-3 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">My Addresses</h1>
        <Dialog
          open={open}
          onOpenChange={(o) => {
            setOpen(o);
            if (!o) setForm(EMPTY);
          }}
        >
          <DialogTrigger asChild>
            <Button className="rounded-full">Add address</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{form.id ? "Edit address" : "Add address"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Labeled label="Full name">
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Labeled>
              <Labeled label="Mobile">
                <Input
                  maxLength={10}
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
              </Labeled>
              <Labeled label="Address">
                <Textarea
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </Labeled>
              <Labeled label="Landmark">
                <Input
                  value={form.landmark}
                  onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                />
              </Labeled>
              <div className="grid grid-cols-2 gap-3">
                <Labeled label="City">
                  <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </Labeled>
                <Labeled label="Pincode">
                  <Input
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  />
                </Labeled>
              </div>
              <Labeled label="Type">
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </Labeled>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_default}
                  onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
                />
                Set as default address
              </label>
            </div>
            <DialogFooter>
              <Button onClick={save} disabled={saving} className="rounded-full">
                {saving ? "Saving…" : "Save address"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {!isLoading && (!data || data.length === 0) ? (
        <div className="mt-6">
          <EmptyState
            icon={MapPin}
            title="No addresses yet"
            description="Add a delivery address to check out faster next time."
          />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {data?.map((a) => (
            <li key={a.id} className="surface-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 font-semibold">
                    {a.name}
                    <Badge variant="secondary" className="rounded-full capitalize">
                      {a.type}
                    </Badge>
                    {a.is_default && <Badge className="rounded-full">Default</Badge>}
                  </p>
                  <p className="text-sm text-muted-foreground">{a.mobile}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {a.address}
                    {a.landmark ? `, ${a.landmark}` : ""}, {a.city} - {a.pincode}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  {!a.is_default && (
                    <Button variant="ghost" size="icon" onClick={() => setDefault(a.id)} aria-label="Set default">
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Edit"
                    onClick={() => {
                      setForm({
                        id: a.id,
                        name: a.name,
                        mobile: a.mobile,
                        address: a.address,
                        landmark: a.landmark ?? "",
                        city: a.city,
                        pincode: a.pincode,
                        type: a.type,
                        is_default: a.is_default,
                      });
                      setOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Delete" onClick={() => remove(a.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
