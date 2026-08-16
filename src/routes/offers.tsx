import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Percent, Tag } from "lucide-react";
import { toast } from "sonner";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { inr } from "@/lib/business";
import { offersQuery } from "@/lib/queries";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & Coupons — Shree Shyam Dairy" },
      { name: "description", content: "Live discounts on milk, paneer, lassi and more at Shree Shyam Dairy." },
      { property: "og:title", content: "Offers & Coupons — Shree Shyam Dairy" },
      { property: "og:description", content: "Save on fresh dairy with our running offers." },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  const { data, isLoading } = useQuery(offersQuery);

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="font-display text-3xl font-bold">Offers</h1>
        <p className="mt-1 text-sm text-muted-foreground">Apply the coupon code at checkout to save.</p>

        {isLoading ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-3xl" />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {data.map((o) => (
              <article key={o.id} className="surface-card flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-bold">{o.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{o.description}</p>
                  </div>
                  <Badge className="rounded-full bg-accent text-accent-foreground">
                    {o.discount_type === "percentage"
                      ? `${Number(o.discount_value)}% OFF`
                      : `${inr(o.discount_value)} OFF`}
                  </Badge>
                </div>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {Number(o.minimum_order) > 0 && <li>Minimum order {inr(o.minimum_order)}</li>}
                  {o.maximum_discount && <li>Maximum discount {inr(o.maximum_discount)}</li>}
                  {o.end_date && <li>Valid till {new Date(o.end_date).toLocaleDateString("en-IN")}</li>}
                  {o.terms && <li>{o.terms}</li>}
                </ul>
                {o.coupon_code && (
                  <div className="mt-auto flex items-center justify-between rounded-2xl border border-dashed border-primary/40 bg-secondary/50 px-4 py-2">
                    <span className="flex items-center gap-2 font-mono text-sm font-bold">
                      <Tag className="h-4 w-4" /> {o.coupon_code}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full"
                      onClick={() => {
                        navigator.clipboard?.writeText(o.coupon_code!);
                        toast.success("Coupon code copied.");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              icon={Percent}
              title="No active offers"
              description="No active offers available right now. Check back soon!"
              actionLabel="Shop Products"
              actionTo="/products"
            />
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
