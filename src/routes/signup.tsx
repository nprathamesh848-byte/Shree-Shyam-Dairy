import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign Up — Shree Shyam Dairy" },
      { name: "description", content: "Create an account for faster dairy checkout and order tracking." },
      { property: "og:title", content: "Sign Up — Shree Shyam Dairy" },
      { property: "og:description", content: "Create an account for faster dairy checkout and order tracking." },
    ],
  }),
  component: () => (
    <CustomerLayout>
      <SignupPage />
    </CustomerLayout>
  ),
});

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/),
  email: z.string().trim().email().max(255),
  password: z.string().min(6).max(72),
});

function SignupPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [form, setForm] = useState({ name: "", mobile: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/", replace: true });
  }, [loading, user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Check your details: valid name, 10-digit mobile, email and 6+ character password.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { name: parsed.data.name, mobile: parsed.data.mobile },
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created. Welcome to Shree Shyam Dairy!");
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="font-display text-3xl font-bold">Create account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Fresh dairy, delivered to your door.</p>
      <form className="surface-card mt-6 space-y-4 p-5" onSubmit={submit}>
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="mobile">Mobile</Label>
          <Input
            id="mobile"
            maxLength={10}
            inputMode="numeric"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <Button type="submit" className="w-full rounded-full" disabled={busy}>
          {busy ? "Creating account…" : "Sign up"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary">
          Log in
        </Link>
      </p>
    </div>
  );
}
