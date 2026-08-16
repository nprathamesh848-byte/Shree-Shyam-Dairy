import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { O as isRedirect, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as stringType, i as objectType, n as literalType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { a as TSS_SERVER_FUNCTION, o as createServerFn, s as getServerFnById } from "./server-CAfyAO3b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-BP6ONnQr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var placeOrderSchema = objectType({
	items: arrayType(objectType({
		variantId: stringType().uuid(),
		quantity: numberType().int().min(1).max(50)
	})).min(1).max(50),
	customer: objectType({
		name: stringType().trim().min(2).max(80),
		mobile: stringType().trim().regex(/^[6-9]\d{9}$/),
		address: stringType().trim().min(5).max(400),
		landmark: stringType().trim().max(120).optional().or(literalType("")),
		city: stringType().trim().min(2).max(80),
		pincode: stringType().trim().regex(/^\d{6}$/),
		instructions: stringType().trim().max(300).optional().or(literalType(""))
	}),
	couponCode: stringType().trim().max(30).optional().or(literalType(""))
});
var validateCoupon = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	code: stringType().trim().min(1).max(30),
	subtotal: numberType().min(0)
}).parse(d)).handler(createSsrRpc("59d1d095cafaabc189e89c8516cd35801bb0a15fb2f4d6f729b2d2e3fae8629a"));
var placeOrder = createServerFn({ method: "POST" }).inputValidator((d) => placeOrderSchema.parse(d)).handler(createSsrRpc("a6485a0caa6c7276b8f38fd2e39c7cd965ae3addca5ff318987f97661206380a"));
var markWhatsAppSent = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ orderNumber: stringType().trim().min(3).max(40) }).parse(d)).handler(createSsrRpc("11f995a8bfc43eee2f810f00bfc4a898b23bf6eadf646160b1be4d5b1baf9928"));
var getOrderByNumber = createServerFn({ method: "POST" }).inputValidator((d) => objectType({ orderNumber: stringType().trim().min(3).max(40) }).parse(d)).handler(createSsrRpc("f3cad7f3bb15e3a2eb2560c545d20daf509d00d9eaea6979b3e91e0a4fe248d4"));
createServerFn({ method: "POST" }).handler(createSsrRpc("cf5769294b4a5130952775a0b61021c833692841181fa9ccd8fc50e289e05fb1"));
//#endregion
export { validateCoupon as a, useServerFn as i, markWhatsAppSent as n, placeOrder as r, getOrderByNumber as t };
