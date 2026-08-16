import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Bell, LogOut, MapPin } from "lucide-react";
import { toast } from "sonner";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { RequireAuth } from "@/components/common/RequireAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { myProfileQuery } from "@/lib/queries";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { claimAdminRole } from "@/lib/orders.functions";

export const Route = createFileRoute("/profile/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Profile — Shree Shyam Dairy" },
      { name: "description", content: "Manage your Shree Shyam Dairy account details." },
      { property: "og:title", content: "My Profile — Shree Shyam Dairy" },
      { property: "og:description", content: "Manage your Shree Shyam Dairy account details." },
    ],
  }),
  component: () => (
    <CustomerLayout>
      <RequireAuth>
        <ProfilePage />
      </RequireAuth>
    </CustomerLayout>
  ),
});

function ProfilePage() {
  const { data: profile } = useQuery(myProfileQuery);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [saving, setSaving] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const claimAdmin = useServerFn(claimAdminRole);

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setMobile(profile.mobile ?? "");
    }
  }, [profile]);

  const save = async () => {
    if (!profile) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ name: name.trim(), mobile: mobile.trim() })
      .eq("id", profile.id);
    setSaving(false);
    if (error) {
      toast.error("Unable to save your profile. Please try again.");
      return;
    }
    toast.success("Profile updated successfully.");
    void queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  const handleClaimAdmin = async () => {
    setClaiming(true);
    try {
      const res = await claimAdmin();
      if (res.granted) {
        toast.success("Admin access granted! Redirecting to dashboard...");
        window.location.href = "/admin";
      } else {
        toast.error("You are not authorized for admin access.");
      }
    } catch {
      toast.error("Failed to check admin status.");
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold">My Profile</h1>

      <section className="surface-card mt-6 space-y-4 p-5">
        <h2 className="font-display text-lg font-bold">Personal information</h2>
        <div className="space-y-1.5">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Mobile</Label>
          <Input value={mobile} maxLength={10} onChange={(e) => setMobile(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input value={profile?.email ?? ""} readOnly className="bg-muted" />
        </div>
        <Button className="rounded-full" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </section>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Button asChild variant="outline" className="justify-start rounded-2xl py-6">
          <Link to="/profile/addresses">
            <MapPin className="mr-2 h-4 w-4" /> My Addresses
          </Link>
        </Button>
        <Button asChild variant="outline" className="justify-start rounded-2xl py-6">
          <Link to="/notifications">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </Link>
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-4 items-start">
        <Button 
          variant="secondary" 
          onClick={handleClaimAdmin} 
          disabled={claiming}
          className="rounded-full"
        >
          {claiming ? "Checking..." : "Claim Admin Access"}
        </Button>
        <Button variant="ghost" className="text-destructive" onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </Button>
      </div>
    </div>
  );
}
