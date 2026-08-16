import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./useAuth-C45ONHlH.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as Search, w as PackageSearch } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-D0Ixz3IV.mjs";
import { t as Skeleton } from "./skeleton-DAHqFqkY.mjs";
import { t as CustomerLayout } from "./CustomerLayout-CoFIWceo.mjs";
import { t as EmptyState } from "./EmptyState-zsqcacva.mjs";
import { l as productsQuery, t as categoriesQuery } from "./queries-2vMK7IUA.mjs";
import { t as ProductCard } from "./ProductCard-DRnYUitq.mjs";
import { n as Route } from "./router-gfFey6HA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.index-CgytlOEI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductsPage() {
	const { q, category } = Route.useSearch();
	const navigate = Route.useNavigate();
	const [term, setTerm] = (0, import_react.useState)(q ?? "");
	const [debounced, setDebounced] = (0, import_react.useState)(q ?? "");
	(0, import_react.useEffect)(() => setTerm(q ?? ""), [q]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setDebounced(term.trim()), 350);
		return () => clearTimeout(t);
	}, [term]);
	const categories = useQuery(categoriesQuery);
	const products = useQuery(productsQuery({
		search: debounced || void 0,
		categorySlug: category
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "Our Products"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Fresh from the dairy every morning · Cash on delivery"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-5 max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: term,
					onChange: (e) => setTerm(e.target.value),
					placeholder: "Search products…",
					className: "h-11 rounded-full pl-9"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/products",
					search: {
						q,
						category: void 0
					},
					className: cn("rounded-full border px-3 py-1.5 text-sm font-medium", !category ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"),
					children: "All"
				}), categories.data?.filter((c) => c.status).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/products",
					search: {
						q,
						category: c.slug
					},
					className: cn("rounded-full border px-3 py-1.5 text-sm font-medium", category === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"),
					children: c.name
				}, c.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: products.isLoading ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 rounded-3xl" }, i)) : products.data?.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			}),
			!products.isLoading && products.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: PackageSearch,
					title: "No products found",
					description: "We couldn't find anything matching your search. Try a different product name."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-sm font-medium text-primary",
						onClick: () => {
							setTerm("");
							navigate({ search: {
								q: void 0,
								category: void 0
							} });
						},
						children: "Clear filters"
					})
				})]
			})
		]
	}) });
}
//#endregion
export { ProductsPage as component };
