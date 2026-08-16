import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { inr } from "@/lib/business";
import { useCart } from "@/lib/cart";
import { deliverySettingsQuery } from "@/lib/queries";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Shree Shyam Dairy" },
      { name: "description", content: "Review your dairy order before checkout." },
      { property: "og:title", content: "Your Cart — Shree Shyam Dairy" },
      { property: "og:description", content: "Review your dairy order before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQuantity, removeItem } = useCart();
  const { data: settings } = useQuery(deliverySettingsQuery);
  const deliveryCharge =
    settings && subtotal >= settings.freeThreshold ? 0 : (settings?.deliveryCharge ?? 30);
  const total = subtotal + (items.length ? deliveryCharge : 0);

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-display text-3xl font-bold">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              icon={ShoppingCart}
              title="Cart Empty"
              description="Your cart is waiting for some fresh goodness."
              actionLabel="Shop Products"
              actionTo="/products"
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.variantId} className="surface-card flex gap-3 p-3">
                  <img
                    src={item.image ?? ""}
                    alt={item.productName}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold leading-tight">{item.productName}</p>
                        <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
                        <p className="mt-1 text-sm font-medium">{inr(item.price)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                        onClick={() => removeItem(item.variantId)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={() => setQuantity(item.variantId, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={() =>
                            setQuantity(item.variantId, Math.min(item.quantity + 1, item.stock))
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm font-bold">{inr(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="surface-card h-fit p-5">
              <h2 className="font-display text-lg font-bold">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{inr(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Discount</dt>
                  <dd>Apply coupon at checkout</dd>
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
              {settings && subtotal < settings.freeThreshold ? (
                <div className="mt-4 rounded-2xl bg-secondary p-3">
                  <p className="text-xs font-medium">
                    Add {inr(settings.freeThreshold - subtotal)} more to get FREE delivery 🚚
                  </p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-background">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (subtotal / settings.freeThreshold) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p className="mt-4 rounded-2xl bg-secondary p-3 text-xs font-semibold text-primary">
                  🎉 Congratulations! You unlocked FREE delivery.
                </p>
              )}

              <Button asChild className="mt-4 w-full rounded-full">
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="mt-2 w-full rounded-full">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </aside>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
