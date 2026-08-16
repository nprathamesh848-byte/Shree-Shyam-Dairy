import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Minus, PackageSearch, Plus } from "lucide-react";
import { toast } from "sonner";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { inr } from "@/lib/business";
import { useCart } from "@/lib/cart";
import { productQuery } from "@/lib/queries";
import { productImage } from "@/lib/product-images";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$id")({
  head: () => ({
    meta: [
      { title: "Product Details — Shree Shyam Dairy" },
      { name: "description", content: "Fresh dairy product details, variants, pricing and stock." },
      { property: "og:title", content: "Product Details — Shree Shyam Dairy" },
      { property: "og:description", content: "Fresh dairy product details, variants and pricing." },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { data: product, isLoading } = useQuery(productQuery(id));
  const [variantId, setVariantId] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  if (isLoading) {
    return (
      <CustomerLayout>
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-2">
          <Skeleton className="aspect-square rounded-3xl" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </CustomerLayout>
    );
  }

  if (!product) {
    return (
      <CustomerLayout>
        <div className="mx-auto max-w-3xl px-4 py-16">
          <EmptyState
            icon={PackageSearch}
            title="Product not found"
            description="This product is no longer available."
            actionLabel="Shop Products"
            actionTo="/products"
          />
        </div>
      </CustomerLayout>
    );
  }

  const variants = product.product_variants;
  const variant = variants.find((v) => v.id === variantId) ?? variants[0];
  const price = Number(variant?.price ?? 0);
  const mrp = variant?.mrp ? Number(variant.mrp) : null;
  const off = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const outOfStock = !variant || variant.stock <= 0;

  const add = () => {
    if (!variant) return;
    addItem(
      {
        productId: product.id,
        variantId: variant.id,
        productName: product.name,
        variantLabel: variant.label,
        price,
        mrp,
        image: product.image || productImage(product.name),
        stock: variant.stock,
      },
      qty,
    );
    toast.success("Product added to cart.");
  };

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Link to="/products" className="text-sm text-primary">
          ← Back to products
        </Link>
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          <div className="surface-card overflow-hidden">
            <img
              src={product.image || productImage(product.name)}
              alt={product.name}
              className="aspect-square w-full object-cover"
              width={800}
              height={800}
            />
          </div>

          <div>
            {product.categories && (
              <Badge variant="secondary" className="rounded-full">
                {product.categories.name}
              </Badge>
            )}
            <h1 className="mt-2 font-display text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-3xl font-bold">{inr(price)}</span>
              {mrp && mrp > price ? (
                <>
                  <span className="text-base text-muted-foreground line-through">{inr(mrp)}</span>
                  <Badge className="rounded-full bg-accent text-accent-foreground">
                    {off}% OFF
                  </Badge>
                </>
              ) : null}
            </div>
            <p
              className={cn(
                "mt-1 text-sm font-semibold",
                outOfStock ? "text-destructive" : "text-success",
              )}
            >
              {outOfStock ? "Out of stock" : `In stock (${variant.stock} available)`}
            </p>

            <div className="mt-5">
              <p className="text-sm font-semibold">Select variant</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium",
                      v.id === variant?.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card",
                    )}
                  >
                    {v.label} — {inr(v.price)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-sm font-semibold">Quantity</span>
              <div className="flex items-center rounded-full border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setQty(Math.min(qty + 1, variant?.stock ?? 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="rounded-full" disabled={outOfStock} onClick={add}>
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                disabled={outOfStock}
                onClick={() => {
                  add();
                  navigate({ to: "/checkout" });
                }}
              >
                Buy Now
              </Button>
            </div>

            <dl className="mt-8 space-y-4 text-sm">
              {product.ingredients && (
                <div>
                  <dt className="font-semibold">Ingredients</dt>
                  <dd className="text-muted-foreground">{product.ingredients}</dd>
                </div>
              )}
              {product.benefits && (
                <div>
                  <dt className="font-semibold">Benefits</dt>
                  <dd className="text-muted-foreground">{product.benefits}</dd>
                </div>
              )}
              {product.storage_instructions && (
                <div>
                  <dt className="font-semibold">Storage instructions</dt>
                  <dd className="text-muted-foreground">{product.storage_instructions}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
