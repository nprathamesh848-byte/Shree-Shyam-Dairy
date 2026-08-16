import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BadgeIndianRupee,
  Heart,
  Leaf,
  MessageCircle,
  Milk,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import heroImage from "@/assets/hero-dairy-bright.jpg";
import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { ProductCard } from "@/components/customer/ProductCard";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BUSINESS, contactWhatsAppUrl, inr } from "@/lib/business";
import { categoriesQuery, offersQuery, productsQuery } from "@/lib/queries";
import { categoryImage } from "@/lib/product-images";
import { categoryTint } from "@/lib/category-style";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shree Shyam Dairy — Fresh Milk, Curd & Paneer Delivered" },
      {
        name: "description",
        content:
          "Order fresh cow milk, curd, paneer, lassi, butter and ghee from Shree Shyam Dairy in Baramati. Cash on delivery, order via WhatsApp.",
      },
      { property: "og:title", content: "Shree Shyam Dairy — Fresh Dairy Delivered" },
      {
        property: "og:description",
        content: "Fresh Milk, Curd, Paneer, Lassi and More — Delivered Fresh. Cash on delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const TRUST = [
  { icon: Leaf, title: "Fresh Every Day", text: "Fresh dairy products, prepared daily." },
  { icon: Truck, title: "Fast Delivery", text: "Delivered right to your doorstep." },
  { icon: BadgeIndianRupee, title: "Cash on Delivery", text: "Pay when your order arrives." },
  { icon: MessageCircle, title: "WhatsApp Ordering", text: "Easy ordering through WhatsApp." },
];

const WHY = [
  { icon: Milk, title: "Fresh Products", text: "Dairy prepared and delivered with care." },
  { icon: Leaf, title: "Quality First", text: "Quality products for your family." },
  { icon: Truck, title: "Reliable Delivery", text: "Get your order delivered conveniently." },
  { icon: Heart, title: "Trusted Local Dairy", text: "Serving the local community with care." },
];

const STEPS = [
  { n: "01", title: "Choose Products", text: "Browse fresh dairy products." },
  { n: "02", title: "Add to Cart", text: "Select your preferred quantity." },
  { n: "03", title: "Place Order", text: "Checkout using Cash on Delivery." },
  { n: "04", title: "Receive Your Order", text: "Get fresh products at your doorstep." },
];

const REVIEWS = [
  {
    name: "Rahul Patil",
    initials: "RP",
    rating: 5,
    text: "Fresh milk and paneer every time. Very convenient ordering on WhatsApp.",
  },
  {
    name: "Sneha Kulkarni",
    initials: "SK",
    rating: 5,
    text: "The curd is thick and tasty, exactly like homemade. Delivery is always on time.",
  },
  {
    name: "Amit Jadhav",
    initials: "AJ",
    rating: 4,
    text: "Good quality ghee and butter at fair prices. Cash on delivery makes it simple.",
  },
];

function SectionHead({ title, subtitle, to }: { title: string; subtitle: string; to?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {to ? (
        <Link to={to as "/products"} className="shrink-0 text-sm font-semibold text-primary">
          View all
        </Link>
      ) : null}
    </div>
  );
}

function Home() {
  const categories = useQuery(categoriesQuery);
  const products = useQuery(productsQuery());
  const offers = useQuery(offersQuery);

  return (
    <CustomerLayout>
      {/* HERO */}
      <section className="hero-gradient">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2">
          <div>
            <span className="rise-in inline-flex items-center gap-2 rounded-full bg-background px-3.5 py-1.5 text-xs font-semibold text-primary shadow-[var(--shadow-soft)]">
              <Leaf className="h-3.5 w-3.5" /> Farm Fresh • Daily Delivery
            </span>
            <h1
              className="rise-in mt-5 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Fresh Dairy
              <br />
              <span className="text-primary">Delivered Daily!</span>
            </h1>
            <p
              className="rise-in mt-4 max-w-md text-base text-muted-foreground"
              style={{ animationDelay: "160ms" }}
            >
              Pure, healthy &amp; delicious dairy products delivered fresh to your doorstep.
            </p>
            <div className="rise-in mt-7 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              <Button asChild size="lg" className="rounded-full px-7 shadow-[var(--shadow-soft)]">
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary bg-background px-7 text-primary hover:bg-secondary"
              >
                <Link to="/offers">View Offers</Link>
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-muted-foreground">
              {[
                { icon: Truck, label: "Free delivery above ₹500" },
                { icon: BadgeIndianRupee, label: "Cash on delivery" },
                { icon: MessageCircle, label: `WhatsApp orders: ${BUSINESS.phone}` },
              ].map((b, i) => (
                <li
                  key={b.label}
                  className="rise-in flex items-center gap-1.5"
                  style={{ animationDelay: `${320 + i * 90}ms` }}
                >
                  <b.icon className="h-4 w-4 text-primary" /> {b.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="float-slow absolute -left-3 top-6 z-10 hidden rounded-2xl bg-background/95 px-4 py-2.5 shadow-[var(--shadow-lift)] sm:block">
              <p className="text-xs text-muted-foreground">Today&apos;s milk</p>
              <p className="font-display text-sm font-bold">100% Fresh Cow Milk</p>
            </div>
            <img
              src={heroImage}
              alt="Fresh milk, paneer, curd, butter and ghee from Shree Shyam Dairy"
              width={1280}
              height={1024}
              className="rise-in w-full rounded-[2rem] object-cover shadow-[var(--shadow-lift)]"
            />
            <div className="float-slow absolute -bottom-4 right-4 z-10 hidden items-center gap-2 rounded-2xl bg-background/95 px-4 py-2.5 shadow-[var(--shadow-lift)] sm:flex">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="text-xs font-semibold">Pure &amp; hygienic</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 70}>
              <div className="surface-card flex h-full items-start gap-3 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <t.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <SectionHead title="Shop by Category" subtitle="Fresh favorites for every family" to="/products" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.isLoading
            ? Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-3xl" />)
            : categories.data
                ?.filter((c) => c.status)
                .map((c, i) => (
                  <Reveal key={c.id} delay={i * 45}>
                    <Link
                      to="/products"
                      search={{ category: c.slug, q: undefined }}
                      className={`group flex h-full flex-col items-center gap-3 rounded-3xl border border-border p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${categoryTint(c.name)}`}
                    >
                      <div className="w-full overflow-hidden rounded-2xl bg-background/60">
                        <img
                          src={c.image || categoryImage(c.name)}
                          alt={c.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = categoryImage(c.name);
                          }}
                          className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-110"

                        />
                      </div>
                      <span className="pb-1 text-sm font-semibold">{c.name}</span>
                    </Link>
                  </Reveal>
                ))}
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <SectionHead
          title="Popular Products"
          subtitle="Fresh picks loved by our customers"
          to="/products"
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.isLoading
            ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-3xl" />)
            : products.data?.slice(0, 8).map((p, i) => (
                <Reveal key={p.id} delay={i * 50}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
        </div>
      </section>

      {/* OFFERS */}
      {offers.data && offers.data.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-8">
          <SectionHead title="Fresh Offers For You" subtitle="Save more on every dairy order" to="/offers" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offers.data.slice(0, 3).map((o, i) => (
              <Reveal key={o.id} delay={i * 70}>
                <div className="surface-card flex h-full flex-col gap-2 bg-accent/10 p-5 transition-transform duration-300 hover:-translate-y-1">
                  <p className="font-display text-3xl font-bold text-primary">
                    {o.discount_type === "percentage"
                      ? `${Number(o.discount_value)}% OFF`
                      : `${inr(o.discount_value)} OFF`}
                  </p>
                  <p className="font-semibold">{o.name}</p>
                  <p className="text-sm text-muted-foreground">{o.description}</p>
                  {o.coupon_code ? (
                    <p className="mt-1 w-fit rounded-full border border-dashed border-primary px-3 py-1 text-xs font-bold tracking-wider text-primary">
                      {o.coupon_code}
                    </p>
                  ) : null}
                  <Button asChild className="mt-auto w-fit rounded-full px-6">
                    <Link to="/products">Shop Now</Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* WHATSAPP BANNER */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <Reveal>
          <div className="surface-card flex flex-col items-start gap-5 bg-secondary p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <MessageCircle className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold">Need Help With Your Order?</h2>
                <p className="mt-1 max-w-lg text-sm text-muted-foreground">
                  Order directly through WhatsApp and we&apos;ll help you with your dairy requirements.
                </p>
                <p className="mt-2 text-sm font-semibold">{BUSINESS.phone}</p>
              </div>
            </div>
            <Button asChild size="lg" className="rounded-full px-7">
              <a href={contactWhatsAppUrl()} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Order on WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* WHY CHOOSE US */}
      <section className="cream-section py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
            Why Choose {BUSINESS.name}?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div className="surface-card h-full p-6 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-secondary text-primary">
                    <w.icon className="h-7 w-7" />
                  </span>
                  <p className="mt-4 font-display text-lg font-bold">{w.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">How It Works</h2>
        <div className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute inset-x-16 top-7 hidden border-t border-dashed border-border lg:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} className="relative">
              <div className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background font-display text-lg font-bold text-primary shadow-[var(--shadow-soft)]">
                  {s.n}
                </span>
                <p className="mt-4 font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FRESHNESS STORY */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-border cream-section p-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Our promise
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold">Freshness You Can Trust</h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                From our dairy to your doorstep. Milk, curd, paneer and lassi prepared every morning and
                delivered the same day — nothing stored, nothing stale.
              </p>
              <Button asChild className="mt-6 rounded-full px-6">
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Milk", "Curd", "Paneer", "Lassi"].map((n) => (
                <div key={n} className="overflow-hidden rounded-2xl bg-background">
                  <img
                    src={categoryImage(n)}
                    alt={`Fresh ${n.toLowerCase()}`}
                    loading="lazy"
                    className="h-32 w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <p className="py-2 text-center text-sm font-semibold">{n}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">What Our Customers Say</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <figure className="surface-card h-full p-6">
                <Quote className="h-6 w-6 text-primary/40" />
                <blockquote className="mt-3 text-sm text-muted-foreground">{r.text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    {r.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{r.name}</span>
                    <span className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className={
                            s < r.rating ? "h-3.5 w-3.5 fill-accent text-accent" : "h-3.5 w-3.5 text-border"
                          }
                        />
                      ))}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </CustomerLayout>
  );
}
