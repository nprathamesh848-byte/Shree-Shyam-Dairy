import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Home, Loader2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { inr } from "@/lib/business";
import { useCart } from "@/lib/cart";
import { placeOrder, validateCoupon } from "@/lib/orders.functions";
import { deliverySettingsQuery, myAddressesQuery, myProfileQuery } from "@/lib/queries";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/checkout")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Checkout — Shree Shyam Dairy" },
      {
        name: "description",
        content: "Enter delivery details and place your cash on delivery order.",
      },
      { property: "og:title", content: "Checkout — Shree Shyam Dairy" },
      { property: "og:description", content: "Cash on delivery checkout for fresh dairy orders." },
    ],
  }),
  component: CheckoutPage,
});

const formSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  address: z.string().trim().min(5, "Enter your delivery address").max(400),
  landmark: z.string().trim().max(120).optional(),
  city: z.string().trim().min(2, "Enter your city").max(80),
  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  instructions: z.string().trim().max(300).optional(),
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: settings } = useQuery(deliverySettingsQuery);
  const { data: profile } = useQuery({ ...myProfileQuery, enabled: !!user });
  const { data: addresses } = useQuery({ ...myAddressesQuery, enabled: !!user });

  const submitOrder = useServerFn(placeOrder);
  const checkCoupon = useServerFn(validateCoupon);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
    instructions: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm((f) => ({
        ...f,
        name: f.name || profile.name || "",
        mobile: f.mobile || profile.mobile || "",
      }));
    }
  }, [profile]);

  useEffect(() => {
    const def = addresses?.find((a) => a.is_default) ?? addresses?.[0];
    if (def) {
      setForm((f) => ({
        ...f,
        name: f.name || def.name,
        mobile: f.mobile || def.mobile,
        address: f.address || def.address,
        landmark: f.landmark || def.landmark || "",
        city: f.city || def.city,
        pincode: f.pincode || def.pincode,
      }));
    }
  }, [addresses]);

  const afterDiscount = Math.max(subtotal - discount, 0);
  const deliveryCharge =
    settings && afterDiscount >= settings.freeThreshold ? 0 : (settings?.deliveryCharge ?? 30);
  const total = afterDiscount + deliveryCharge;

  if (items.length === 0) {
    return (
      <CustomerLayout>
        <div className="mx-auto max-w-3xl px-4 py-16">
          <EmptyState
            icon={ShoppingCart}
            title="Cart Empty"
            description="Your cart is empty. Explore our fresh dairy products."
            actionLabel="Shop Products"
            actionTo="/products"
          />
        </div>
      </CustomerLayout>
    );
  }

  const applyCoupon = async () => {
    if (!coupon.trim()) return;
    setChecking(true);
    try {
      const res = await checkCoupon({ data: { code: coupon.trim(), subtotal } });
      if (res.error || !res.code) {
        setDiscount(0);
        setAppliedCode(null);
        toast.error(res.error ?? "This coupon code is not valid.");
      } else {
        setDiscount(res.discount);
        setAppliedCode(res.code);
        toast.success("Offer applied successfully.");
      }
    } catch {
      toast.error("Unable to check this coupon. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (placing) return;
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[String(i.path[0])] = i.message;
      });
      setErrors(errs);
      toast.error("Please check your delivery details.");
      return;
    }
    setErrors({});
    setPlacing(true);
    try {
      const result = await submitOrder({
        data: {
          items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
          customer: {
            name: parsed.data.name,
            mobile: parsed.data.mobile,
            address: parsed.data.address,
            landmark: parsed.data.landmark ?? "",
            city: parsed.data.city,
            pincode: parsed.data.pincode,
            instructions: parsed.data.instructions ?? "",
          },
          couponCode: appliedCode ?? "",
        },
      });
      clear();
      toast.success("Order placed successfully.");
      navigate({
        to: "/order-success/$orderNumber",
        params: { orderNumber: result.order.order_number },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      toast.error(
        message.includes("no longer available") || message.includes("Minimum order")
          ? message
          : "Unable to place order. Please try again.",
      );
    } finally {
      setPlacing(false);
    }
  };

  return (
    <CustomerLayout>
      <form
        onSubmit={submit}
        className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]"
      >
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl font-bold">Checkout</h1>
            {!user && (
              <p className="mt-1 text-sm text-muted-foreground">
                Ordering as guest.{" "}
                <Link to="/login" className="font-medium text-primary">
                  Log in
                </Link>{" "}
                to track your orders.
              </p>
            )}
          </div>

          <section className="surface-card space-y-4 p-5">
            <h2 className="font-display text-lg font-bold">Delivery information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name" error={errors["name"]}>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label="Mobile Number" error={errors["mobile"]}>
                <Input
                  inputMode="numeric"
                  maxLength={10}
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Delivery Address" error={errors["address"]}>
              <Textarea
                rows={3}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Landmark (optional)" error={errors["landmark"]}>
                <Input
                  value={form.landmark}
                  onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                />
              </Field>
              <Field label="City" error={errors["city"]}>
                <Input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </Field>
              <Field label="Pincode" error={errors["pincode"]}>
                <Input
                  inputMode="numeric"
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Delivery instructions (optional)" error={errors["instructions"]}>
              <Textarea
                rows={2}
                value={form.instructions}
                onChange={(e) => setForm({ ...form, instructions: e.target.value })}
              />
            </Field>
          </section>

          <section className="surface-card p-5">
            <h2 className="font-display text-lg font-bold">Payment Method</h2>
            <div className="mt-3 flex items-start gap-3 rounded-2xl border-2 border-primary bg-secondary/50 p-4">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Home className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold">Cash on Delivery</p>
                <p className="text-sm text-muted-foreground">
                  Pay in cash when your order is delivered.
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="surface-card h-fit p-5">
          <h2 className="font-display text-lg font-bold">Order summary</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.variantId} className="flex justify-between gap-2">
                <span className="text-muted-foreground">
                  {i.productName} · {i.variantLabel} × {i.quantity}
                </span>
                <span>{inr(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-3" />
          <div className="flex gap-2">
            <Input
              placeholder="Coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              className="rounded-full"
            />
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={applyCoupon}
              disabled={checking}
            >
              {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
            </Button>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{inr(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Discount{appliedCode ? ` (${appliedCode})` : ""}
              </dt>
              <dd>-{inr(discount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery charge</dt>
              <dd>{deliveryCharge === 0 ? "FREE" : inr(deliveryCharge)}</dd>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-base font-bold">
              <dt>Total</dt>
              <dd>{inr(total)}</dd>
            </div>
          </dl>
          <Button type="submit" className="mt-4 w-full rounded-full" disabled={placing}>
            {placing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing Order...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Final prices are confirmed by our system before your order is created.
          </p>
        </aside>
      </form>
    </CustomerLayout>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
