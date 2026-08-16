import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { inr } from "@/lib/business";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { productImage } from "@/lib/product-images";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const variants = product.product_variants;
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [pickerOpen, setPickerOpen] = useState(false);
  const variant = variants.find((v) => v.id === variantId) ?? variants[0];
  const mrp = variant?.mrp ? Number(variant.mrp) : null;
  const price = Number(variant?.price ?? 0);
  const off = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const outOfStock = !variant || variant.stock <= 0;
  const image = product.image || productImage(product.name);

  const add = () => {
    if (!variant) return;
    addItem({
      productId: product.id,
      variantId: variant.id,
      productName: product.name,
      variantLabel: variant.label,
      price: Number(variant.price),
      mrp: variant.mrp ? Number(variant.mrp) : null,
      image,
      stock: variant.stock,
    });
    toast.success(`${product.name} added to cart`, { description: variant.label });
  };

  const onAddClick = () => {
    if (variants.length > 1 && !pickerOpen) {
      setPickerOpen(true);
      return;
    }
    setPickerOpen(false);
    add();
  };

  return (
    <article className="surface-card group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link to="/products/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square overflow-hidden bg-secondary/50">
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = productImage(product.name);
            }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {off > 0 ? (
            <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground shadow-[var(--shadow-soft)]">
              {off}% OFF
            </span>
          ) : (
            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-bold text-primary shadow-[var(--shadow-soft)]">
              Fresh
            </span>
          )}
          {outOfStock && (
            <span className="absolute right-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[11px] font-bold text-destructive-foreground">
              Sold out
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link to="/products/$id" params={{ id: product.id }}>
          <h3 className="font-display text-base font-bold leading-tight">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground">{variant?.label}</p>

        {pickerOpen && variants.length > 1 && (
          <div className="flex flex-wrap gap-1.5 rounded-2xl bg-secondary/60 p-2">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                  v.id === variant?.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50",
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div>
            <p className="text-lg font-bold">{inr(price)}</p>
            {mrp && mrp > price ? (
              <p className="text-xs text-muted-foreground line-through">{inr(mrp)}</p>
            ) : null}
          </div>
          <Button
            size="icon"
            className="h-11 w-11 rounded-full shadow-[var(--shadow-soft)] transition-transform hover:scale-105 active:scale-95"
            disabled={outOfStock}
            onClick={onAddClick}
            aria-label={
              pickerOpen || variants.length === 1
                ? `Add ${product.name} to cart`
                : `Choose size for ${product.name}`
            }
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
