import { t as supabase } from "./client-C9b7jjpj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-CUXl3ju3.js
function queryOptions(options) {
	return options;
}
var categoriesQuery = queryOptions({
	queryKey: ["categories"],
	queryFn: async () => {
		const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true });
		if (error) throw error;
		return data;
	}
});
var productsQuery = (opts = {}) => queryOptions({
	queryKey: [
		"products",
		opts.search ?? "",
		opts.categorySlug ?? ""
	],
	queryFn: async () => {
		let q = supabase.from("products").select("*, categories(id,name,slug), product_variants(*)").eq("status", true).order("name");
		if (opts.search) q = q.ilike("name", `%${opts.search}%`);
		const { data, error } = await q;
		if (error) throw error;
		const rows = data ?? [];
		return (opts.categorySlug ? rows.filter((p) => p.categories?.slug === opts.categorySlug) : rows).map((p) => ({
			...p,
			product_variants: [...p.product_variants].filter((v) => v.status).sort((a, b) => Number(a.price) - Number(b.price))
		}));
	}
});
var productQuery = (id) => queryOptions({
	queryKey: ["product", id],
	queryFn: async () => {
		const { data, error } = await supabase.from("products").select("*, categories(id,name,slug), product_variants(*)").eq("id", id).maybeSingle();
		if (error) throw error;
		if (!data) return null;
		const p = data;
		return {
			...p,
			product_variants: [...p.product_variants].filter((v) => v.status).sort((a, b) => Number(a.price) - Number(b.price))
		};
	}
});
var offersQuery = queryOptions({
	queryKey: ["offers", "active"],
	queryFn: async () => {
		const nowIso = (/* @__PURE__ */ new Date()).toISOString();
		const { data, error } = await supabase.from("offers").select("*").eq("status", true).lte("start_date", nowIso).order("created_at", { ascending: false });
		if (error) throw error;
		return (data ?? []).filter((o) => !o.end_date || new Date(o.end_date) > /* @__PURE__ */ new Date());
	}
});
var deliverySettingsQuery = queryOptions({
	queryKey: ["settings", "delivery"],
	queryFn: async () => {
		const { data } = await supabase.from("settings").select("value").eq("key", "delivery").maybeSingle();
		const v = data?.value ?? {};
		return {
			deliveryCharge: Number(v["delivery_charge"] ?? 30),
			freeThreshold: Number(v["free_delivery_threshold"] ?? 500),
			minimumOrder: Number(v["minimum_order"] ?? 0),
			areas: v["areas"] ?? [],
			pincodes: v["pincodes"] ?? []
		};
	}
});
var myOrdersQuery = queryOptions({
	queryKey: ["orders", "mine"],
	queryFn: async () => {
		const { data, error } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false }).limit(50);
		if (error) throw error;
		return data ?? [];
	}
});
var myAddressesQuery = queryOptions({
	queryKey: ["addresses"],
	queryFn: async () => {
		const { data, error } = await supabase.from("addresses").select("*").order("is_default", { ascending: false });
		if (error) throw error;
		return data ?? [];
	}
});
var myNotificationsQuery = queryOptions({
	queryKey: ["notifications"],
	queryFn: async () => {
		const { data, error } = await supabase.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
		if (error) throw error;
		return data ?? [];
	}
});
var myProfileQuery = queryOptions({
	queryKey: ["profile"],
	queryFn: async () => {
		const { data: auth } = await supabase.auth.getUser();
		if (!auth.user) return null;
		const { data } = await supabase.from("profiles").select("*").eq("id", auth.user.id).maybeSingle();
		return data;
	}
});
//#endregion
export { myOrdersQuery as a, productQuery as c, myNotificationsQuery as i, productsQuery as l, deliverySettingsQuery as n, myProfileQuery as o, myAddressesQuery as r, offersQuery as s, categoriesQuery as t };
