import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Variant = {
  id: string;
  product_id: string;
  label: string;
  unit: string;
  quantity: number;
  price: number;
  mrp: number | null;
  stock: number;
  minimum_stock: number;
  status: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  ingredients: string | null;
  benefits: string | null;
  storage_instructions: string | null;
  status: boolean;
  category_id: string | null;
  categories?: { id: string; name: string; slug: string } | null;
  product_variants: Variant[];
};

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data;
  },
});

export const productsQuery = (
  opts: { search?: string | undefined; categorySlug?: string | undefined } = {},
) =>
  queryOptions({
    queryKey: ["products", opts.search ?? "", opts.categorySlug ?? ""],
    queryFn: async () => {
      let q = supabase
        .from("products")
        .select("*, categories(id,name,slug), product_variants(*)")
        .eq("status", true)
        .order("name");
      if (opts.search) q = q.ilike("name", `%${opts.search}%`);
      const { data, error } = await q;
      if (error) throw error;
      const rows = (data ?? []) as unknown as Product[];
      const filtered = opts.categorySlug
        ? rows.filter((p) => p.categories?.slug === opts.categorySlug)
        : rows;
      return filtered.map((p) => ({
        ...p,
        product_variants: [...p.product_variants]
          .filter((v) => v.status)
          .sort((a, b) => Number(a.price) - Number(b.price)),
      }));
    },
  });

export const productQuery = (id: string) =>
  queryOptions({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(id,name,slug), product_variants(*)")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const p = data as unknown as Product;
      return {
        ...p,
        product_variants: [...p.product_variants]
          .filter((v) => v.status)
          .sort((a, b) => Number(a.price) - Number(b.price)),
      };
    },
  });

export const offersQuery = queryOptions({
  queryKey: ["offers", "active"],
  queryFn: async () => {
    const nowIso = new Date().toISOString();
    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .eq("status", true)
      .lte("start_date", nowIso)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).filter((o) => !o.end_date || new Date(o.end_date) > new Date());
  },
});

export const bannersQuery = queryOptions({
  queryKey: ["banners", "active"],
  queryFn: async () => {
    const { data, error } = await supabase.from("banners").select("*").eq("status", true);
    if (error) throw error;
    return (data ?? []).filter((b) => !b.end_date || new Date(b.end_date) > new Date());
  },
});

export const deliverySettingsQuery = queryOptions({
  queryKey: ["settings", "delivery"],
  queryFn: async () => {
    const { data } = await supabase
      .from("settings")
      .select("value")
      .eq("key", "delivery")
      .maybeSingle();
    const v = (data?.value ?? {}) as Record<string, unknown>;
    return {
      deliveryCharge: Number(v["delivery_charge"] ?? 30),
      freeThreshold: Number(v["free_delivery_threshold"] ?? 500),
      minimumOrder: Number(v["minimum_order"] ?? 0),
      areas: (v["areas"] as string[]) ?? [],
      pincodes: (v["pincodes"] as string[]) ?? [],
    };
  },
});

export const myOrdersQuery = queryOptions({
  queryKey: ["orders", "mine"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    return data ?? [];
  },
});

export const myAddressesQuery = queryOptions({
  queryKey: ["addresses"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .order("is_default", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});

export const myNotificationsQuery = queryOptions({
  queryKey: ["notifications"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    return data ?? [];
  },
});

export const myProfileQuery = queryOptions({
  queryKey: ["profile"],
  queryFn: async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return null;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", auth.user.id)
      .maybeSingle();
    return data;
  },
});
