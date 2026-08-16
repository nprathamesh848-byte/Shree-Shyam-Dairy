import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useAuth, t as Button } from "./useAuth-C45ONHlH.mjs";
import { s as inr } from "./business-U2QbWJX3.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { N as LoaderCircle, f as ShoppingCart, z as House } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-D0Ixz3IV.mjs";
import { t as Label } from "./label-CowN4eUm.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-DrxOICHT.mjs";
import { t as CustomerLayout } from "./CustomerLayout-CoFIWceo.mjs";
import { t as EmptyState } from "./EmptyState-zsqcacva.mjs";
import { t as Separator } from "./separator-fwwYpY1r.mjs";
import { n as deliverySettingsQuery, o as myProfileQuery, r as myAddressesQuery } from "./queries-2vMK7IUA.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
import { a as validateCoupon, i as useServerFn, r as placeOrder } from "./orders.functions-BP6ONnQr.mjs";
import { o as useCart } from "./router-gfFey6HA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-CKAPeIuf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var formSchema = objectType({
	name: stringType().trim().min(2, "Enter your full name").max(80),
	mobile: stringType().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
	address: stringType().trim().min(5, "Enter your delivery address").max(400),
	landmark: stringType().trim().max(120).optional(),
	city: stringType().trim().min(2, "Enter your city").max(80),
	pincode: stringType().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
	instructions: stringType().trim().max(300).optional()
});
function CheckoutPage() {
	const { items, subtotal, clear } = useCart();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { data: settings } = useQuery(deliverySettingsQuery);
	const { data: profile } = useQuery({
		...myProfileQuery,
		enabled: !!user
	});
	const { data: addresses } = useQuery({
		...myAddressesQuery,
		enabled: !!user
	});
	const submitOrder = useServerFn(placeOrder);
	const checkCoupon = useServerFn(validateCoupon);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		mobile: "",
		address: "",
		landmark: "",
		city: "",
		pincode: "",
		instructions: ""
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [coupon, setCoupon] = (0, import_react.useState)("");
	const [discount, setDiscount] = (0, import_react.useState)(0);
	const [appliedCode, setAppliedCode] = (0, import_react.useState)(null);
	const [checking, setChecking] = (0, import_react.useState)(false);
	const [placing, setPlacing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (profile) setForm((f) => ({
			...f,
			name: f.name || profile.name || "",
			mobile: f.mobile || profile.mobile || ""
		}));
	}, [profile]);
	(0, import_react.useEffect)(() => {
		const def = addresses?.find((a) => a.is_default) ?? addresses?.[0];
		if (def) setForm((f) => ({
			...f,
			name: f.name || def.name,
			mobile: f.mobile || def.mobile,
			address: f.address || def.address,
			landmark: f.landmark || def.landmark || "",
			city: f.city || def.city,
			pincode: f.pincode || def.pincode
		}));
	}, [addresses]);
	const afterDiscount = Math.max(subtotal - discount, 0);
	const deliveryCharge = settings && afterDiscount >= settings.freeThreshold ? 0 : settings?.deliveryCharge ?? 30;
	const total = afterDiscount + deliveryCharge;
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: ShoppingCart,
			title: "Cart Empty",
			description: "Your cart is empty. Explore our fresh dairy products.",
			actionLabel: "Shop Products",
			actionTo: "/products"
		})
	}) });
	const applyCoupon = async () => {
		if (!coupon.trim()) return;
		setChecking(true);
		try {
			const res = await checkCoupon({ data: {
				code: coupon.trim(),
				subtotal
			} });
			if (res.error || !res.code) {
				setDiscount(0);
				setAppliedCode(null);
				toast.error(res.error ?? "This coupon code is not valid.");
			} else {
				setDiscount(res.discount);
				setAppliedCode(res.code);
				toast.success("Offer applied successfully.");
			}
		} catch {
			toast.error("Unable to check this coupon. Please try again.");
		} finally {
			setChecking(false);
		}
	};
	const submit = async (e) => {
		e.preventDefault();
		if (placing) return;
		const parsed = formSchema.safeParse(form);
		if (!parsed.success) {
			const errs = {};
			parsed.error.issues.forEach((i) => {
				errs[String(i.path[0])] = i.message;
			});
			setErrors(errs);
			toast.error("Please check your delivery details.");
			return;
		}
		setErrors({});
		setPlacing(true);
		try {
			const result = await submitOrder({ data: {
				items: items.map((i) => ({
					variantId: i.variantId,
					quantity: i.quantity
				})),
				customer: {
					name: parsed.data.name,
					mobile: parsed.data.mobile,
					address: parsed.data.address,
					landmark: parsed.data.landmark ?? "",
					city: parsed.data.city,
					pincode: parsed.data.pincode,
					instructions: parsed.data.instructions ?? ""
				},
				couponCode: appliedCode ?? ""
			} });
			clear();
			toast.success("Order placed successfully.");
			navigate({
				to: "/order-success/$orderNumber",
				params: { orderNumber: result.order.order_number }
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : "";
			toast.error(message.includes("no longer available") || message.includes("Minimum order") ? message : "Unable to place order. Please try again.");
		} finally {
			setPlacing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerLayout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold",
					children: "Checkout"
				}), !user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Ordering as guest.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "font-medium text-primary",
							children: "Log in"
						}),
						" ",
						"to track your orders."
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-card space-y-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: "Delivery information"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Full Name",
								error: errors["name"],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Mobile Number",
								error: errors["mobile"],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "numeric",
									maxLength: 10,
									value: form.mobile,
									onChange: (e) => setForm({
										...form,
										mobile: e.target.value
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Delivery Address",
							error: errors["address"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								value: form.address,
								onChange: (e) => setForm({
									...form,
									address: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Landmark (optional)",
									error: errors["landmark"],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.landmark,
										onChange: (e) => setForm({
											...form,
											landmark: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "City",
									error: errors["city"],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: form.city,
										onChange: (e) => setForm({
											...form,
											city: e.target.value
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Pincode",
									error: errors["pincode"],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										inputMode: "numeric",
										maxLength: 6,
										value: form.pincode,
										onChange: (e) => setForm({
											...form,
											pincode: e.target.value
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Delivery instructions (optional)",
							error: errors["instructions"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 2,
								value: form.instructions,
								onChange: (e) => setForm({
									...form,
									instructions: e.target.value
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "surface-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold",
						children: "Payment Method"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-start gap-3 rounded-2xl border-2 border-primary bg-secondary/50 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "Cash on Delivery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Pay in cash when your order is delivered."
						})] })]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "surface-card h-fit p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Order summary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm",
					children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								i.productName,
								" · ",
								i.variantLabel,
								" × ",
								i.quantity
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inr(i.price * i.quantity) })]
					}, i.variantId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Coupon code",
						value: coupon,
						onChange: (e) => setCoupon(e.target.value.toUpperCase()),
						className: "rounded-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						className: "rounded-full",
						onClick: applyCoupon,
						disabled: checking,
						children: checking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Apply"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Subtotal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: inr(subtotal) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
								className: "text-muted-foreground",
								children: ["Discount", appliedCode ? ` (${appliedCode})` : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: ["-", inr(discount)] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Delivery charge"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: deliveryCharge === 0 ? "FREE" : inr(deliveryCharge) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-base font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: inr(total) })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "mt-4 w-full rounded-full",
					disabled: placing,
					children: placing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Placing Order..."] }) : "Place Order"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-[11px] text-muted-foreground",
					children: "Final prices are confirmed by our system before your order is created."
				})
			]
		})]
	}) });
}
function Field({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-sm",
				children: label
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			}) : null
		]
	});
}
//#endregion
export { CheckoutPage as component };
