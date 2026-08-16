import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Clock,
  Home,
  LayoutGrid,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Percent,
  Phone,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/lib/cart";
import { BUSINESS, contactWhatsAppUrl } from "@/lib/business";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/products", label: "Products", icon: LayoutGrid },
  { to: "/offers", label: "Offers", icon: Percent },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/orders", label: "Orders", icon: Package },
  { to: "/profile", label: "Profile", icon: User },
] as const;

const FOOTER_CATEGORIES = ["Milk", "Curd", "Paneer", "Lassi", "Ghee", "Butter"];

function CartBadge({ count, className }: { count: number; className?: string }) {
  const [pop, setPop] = useState(false);
  useEffect(() => {
    if (count === 0) return;
    setPop(true);
    const t = window.setTimeout(() => setPop(false), 380);
    return () => window.clearTimeout(t);
  }, [count]);
  if (count === 0) return null;
  return (
    <span
      className={cn(
        "flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground",
        pop && "badge-pop",
        className,
      )}
    >
      {count}
    </span>
  );
}

export function CustomerLayout({ children }: { children: React.ReactNode }) {
  const { count } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/products", search: { q: term || undefined, category: undefined } });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-border/60 glass-bar">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3 py-3">
            <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5">
              <img
                src="/favicon.png"
                alt="Shree Shyam Dairy logo"
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="block font-display text-[15px] sm:text-base font-bold leading-tight truncate">
                  {BUSINESS.name}
                </span>
                <span className="hidden sm:flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Baramati, Pune
                  </span>
                  <span className="hidden items-center gap-1 lg:flex">
                    <Clock className="h-3 w-3" /> {BUSINESS.hours}
                  </span>
                </span>
              </div>
            </Link>

            <form
              onSubmit={submitSearch}
              className="relative mx-auto hidden w-full max-w-md md:block"
            >
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search milk, paneer, ghee..."
                className="h-11 rounded-full border-border bg-secondary/50 pl-11 focus-visible:bg-background"
                aria-label="Search products"
              />
            </form>

            <nav className="ml-auto hidden items-center gap-1 md:flex">
              <Button asChild variant="ghost" size="sm" className="rounded-full font-medium">
                <Link to="/products">Products</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="rounded-full font-medium">
                <Link to="/offers" className="gap-1.5">
                  Offers
                  <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-accent-foreground">
                    HOT
                  </span>
                </Link>
              </Button>
            </nav>

            <Button
              asChild
              variant="ghost"
              size="icon"
              className="relative ml-auto rounded-full md:ml-0"
            >
              <Link to="/cart" aria-label={`Cart, ${count} items`}>
                <ShoppingCart className="h-5 w-5" />
                <CartBadge count={count} className="absolute -right-0.5 -top-0.5" />
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Profile menu"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-2xl">
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/notifications">
                        <Bell className="mr-2 h-4 w-4" /> Notifications
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login">Log in</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/signup">Create account</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="pb-3 md:hidden">
            <form onSubmit={submitSearch} className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search milk, paneer, ghee..."
                className="h-11 rounded-full border-border bg-secondary/50 pl-11 focus-visible:bg-background"
                aria-label="Search products"
              />
            </form>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-20 border-t border-border cream-section">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src="/favicon.png" alt="" width={40} height={40} className="h-10 w-10 rounded-xl" />
              <p className="font-display text-lg font-bold">{BUSINESS.name}</p>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Fresh dairy products delivered to your doorstep — pure, healthy and made with care.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" /> Open daily {BUSINESS.hours}
            </p>
          </div>

          <div className="text-sm">
            <p className="font-semibold">Quick Links</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-primary">
                  Offers
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-primary">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="font-semibold">Categories</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {FOOTER_CATEGORIES.map((c) => (
                <li key={c}>
                  <Link
                    to="/products"
                    search={{ q: c, category: undefined }}
                    className="hover:text-primary"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <p className="font-semibold">Contact</p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {BUSINESS.address}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${BUSINESS.phone}`} className="hover:text-primary">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <a
                  href={contactWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${BUSINESS.email}`} className="break-all hover:text-primary">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/70 py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BUSINESS.name} · Cash on delivery only
        </div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border glass-bar md:hidden">
        <ul className="mx-auto flex max-w-lg">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <li key={item.to} className="flex-1">
                <Link
                  to={item.to}
                  className={cn(
                    "relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-semibold transition-colors",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-12 items-center justify-center rounded-full transition-colors",
                      active && "bg-secondary",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </span>
                  {item.label}
                  {item.to === "/cart" && (
                    <CartBadge
                      count={count}
                      className="absolute right-2 top-0.5 h-4 min-w-4 text-[10px]"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
