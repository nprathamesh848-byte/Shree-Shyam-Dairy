import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { Button } from "@/components/ui/button";
import { BUSINESS, buildWhatsAppMessage, buildWhatsAppUrl, inr } from "@/lib/business";
import { getOrderByNumber, markWhatsAppSent } from "@/lib/orders.functions";

export const Route = createFileRoute("/order-success/$orderNumber")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Order Placed — Shree Shyam Dairy" },
      { name: "description", content: "Your cash on delivery order has been received." },
      { property: "og:title", content: "Order Placed — Shree Shyam Dairy" },
      { property: "og:description", content: "Your cash on delivery order has been received." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { orderNumber } = Route.useParams();
  const fetchOrder = useServerFn(getOrderByNumber);
  const flagWhatsApp = useServerFn(markWhatsAppSent);
  const [whatsAppFailed, setWhatsAppFailed] = useState(false);
  const opened = useRef(false);

  const { data: order, isLoading } = useQuery({
    queryKey: ["order-success", orderNumber],
    queryFn: () => fetchOrder({ data: { orderNumber } }),
  });

  const message = order
    ? buildWhatsAppMessage({
        order_number: order.order_number,
        customer_name: order.customer_name,
        customer_mobile: order.customer_mobile,
        address_text: order.address_text,
        landmark: order.landmark,
        city: order.city,
        pincode: order.pincode,
        subtotal: order.subtotal,
        discount: order.discount,
        delivery_charge: order.delivery_charge,
        total: order.total,
        items: (order.order_items ?? []).map((i) => ({
          product_name: i.product_name,
          variant_label: i.variant_label,
          quantity: i.quantity,
          price: i.price,
          subtotal: i.subtotal,
        })),
      })
    : "";

  useEffect(() => {
    if (!order || opened.current) return;
    opened.current = true;
    try {
      const win = window.open(buildWhatsAppUrl(message), "_blank", "noopener");
      if (!win) {
        setWhatsAppFailed(true);
      } else {
        void flagWhatsApp({ data: { orderNumber } });
      }
    } catch {
      setWhatsAppFailed(true);
    }
  }, [order, message, orderNumber, flagWhatsApp]);

  if (isLoading) {
    return (
      <CustomerLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-xl px-4 py-12 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
        <h1 className="mt-4 font-display text-3xl font-bold">Order Placed Successfully 🎉</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your order has been received.</p>

        <div className="surface-card mt-6 space-y-2 p-6 text-left">
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="font-mono text-xl font-bold">{orderNumber}</p>
          {order && (
            <>
              <p className="pt-2 text-sm text-muted-foreground">Total</p>
              <p className="text-lg font-bold">{inr(order.total)}</p>
            </>
          )}
          <p className="pt-2 text-sm text-muted-foreground">Payment</p>
          <p className="font-semibold">Cash on Delivery</p>
        </div>

        {whatsAppFailed && (
          <div className="mt-4 rounded-2xl border border-warning bg-warning/15 p-4 text-sm">
            <p className="font-semibold">Your order has been successfully created.</p>
            <p className="mt-1 text-muted-foreground">
              We couldn't open WhatsApp automatically. Your order is still saved. Contact us on{" "}
              {BUSINESS.phone}.
            </p>
          </div>
        )}

        <p className="mt-5 text-sm text-muted-foreground">
          Please send the pre-filled WhatsApp message to confirm your order with {BUSINESS.name}.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full">
            <a
              href={buildWhatsAppUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => void flagWhatsApp({ data: { orderNumber } })}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {whatsAppFailed ? "Contact Us on WhatsApp" : "Open WhatsApp"}
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/orders">View My Order</Link>
          </Button>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </CustomerLayout>
  );
}
