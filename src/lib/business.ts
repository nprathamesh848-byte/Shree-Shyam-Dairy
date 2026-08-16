export const BUSINESS = {
  name: "Shree Shyam Dairy",
  phone: "9158619237",
  whatsapp: "919158619237",
  email: "chavannikk@gmail.com",
  address: "Shree shyam dairy, indira mangal karyalay, Jasvanti complex girivihar gate line, samor, Nandurbar, Maharashtra 425412",
  hours: "6:00 AM - 9:00 PM",
} as const;

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number] | "cancelled";

export const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function inr(value: number | string | null | undefined): string {
  const n = Number(value ?? 0);
  return `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

export type WhatsAppOrder = {
  order_number: string;
  customer_name: string;
  customer_mobile: string;
  address_text: string;
  landmark?: string | null;
  city?: string | null;
  pincode?: string | null;
  subtotal: number | string;
  discount: number | string;
  delivery_charge: number | string;
  total: number | string;
  items: Array<{
    product_name: string;
    variant_label: string;
    quantity: number;
    price: number | string;
    subtotal: number | string;
  }>;
};

export function buildWhatsAppMessage(order: WhatsAppOrder): string {
  const lines: string[] = [];
  lines.push(`Hello ${BUSINESS.name},`);
  lines.push("I would like to place an order.");
  lines.push("");
  lines.push(`Order ID: ${order.order_number}`);
  lines.push(`Customer Name: ${order.customer_name}`);
  lines.push(`Mobile: ${order.customer_mobile}`);
  lines.push("");
  lines.push("Delivery Address:");
  lines.push(order.address_text);
  if (order.landmark) lines.push(`Landmark: ${order.landmark}`);
  lines.push([order.city, order.pincode].filter(Boolean).join(" - "));
  lines.push("");
  lines.push("Items:");
  order.items.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.product_name}`);
    lines.push(`   Variant: ${item.variant_label}`);
    lines.push(`   Quantity: ${item.quantity}`);
    lines.push(`   Price: ${inr(item.price)}`);
    lines.push(`   Subtotal: ${inr(item.subtotal)}`);
  });
  lines.push("");
  lines.push(`Subtotal: ${inr(order.subtotal)}`);
  lines.push(`Discount: ${inr(order.discount)}`);
  lines.push(`Delivery Charge: ${inr(order.delivery_charge)}`);
  lines.push(`Total Amount: ${inr(order.total)}`);
  lines.push("");
  lines.push("Payment Method:");
  lines.push("Cash on Delivery");
  lines.push("");
  lines.push("Thank you.");
  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function contactWhatsAppUrl(): string {
  return `https://wa.me/${BUSINESS.whatsapp}`;
}
