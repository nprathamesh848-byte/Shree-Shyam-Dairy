import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PackageSearch, Search } from "lucide-react";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { ProductCard } from "@/components/customer/ProductCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { categoriesQuery, productsQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

type ProductSearch = { q?: string | undefined; category?: string | undefined };

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    q: typeof search["q"] === "string" && search["q"] ? search["q"] : undefined,
    category:
      typeof search["category"] === "string" && search["category"] ? search["category"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Fresh Cow Milk | Shree Shyam Dairy" },
      {
        name: "description",
        content: "Browse fresh milk, curd, paneer, lassi, buttermilk, butter, ghee and cheese.",
      },
      { property: "og:title", content: "All Dairy Products — Shree Shyam Dairy" },
      { property: "og:description", content: "Browse our full range of fresh dairy products." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { q, category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [term, setTerm] = useState(q ?? "");
  const [debounced, setDebounced] = useState(q ?? "");

  useEffect(() => setTerm(q ?? ""), [q]);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(term.trim()), 350);
    return () => clearTimeout(t);
  }, [term]);

  const categories = useQuery(categoriesQuery);
  const products = useQuery(
    productsQuery({ search: debounced || undefined, categorySlug: category }),
  );

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="font-display text-3xl font-bold">Our Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fresh from the dairy every morning · Cash on delivery
        </p>

        <div className="relative mt-5 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search products…"
            className="h-11 rounded-full pl-9"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/products"
            search={{ q: q, category: undefined }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium",
              !category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card",
            )}
          >
            All
          </Link>
          {categories.data
            ?.filter((c) => c.status)
            .map((c) => (
              <Link
                key={c.id}
                to="/products"
                search={{ q: q, category: c.slug }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium",
                  category === c.slug
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card",
                )}
              >
                {c.name}
              </Link>
            ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-3xl" />
              ))
            : products.data?.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        {!products.isLoading && products.data?.length === 0 && (
          <div className="mt-6">
            <EmptyState
              icon={PackageSearch}
              title="No products found"
              description="We couldn't find anything matching your search. Try a different product name."
            />
            <div className="mt-4 text-center">
              <button
                className="text-sm font-medium text-primary"
                onClick={() => {
                  setTerm("");
                  navigate({ search: { q: undefined, category: undefined } });
                }}
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
