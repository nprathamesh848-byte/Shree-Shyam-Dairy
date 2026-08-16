import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, Loader2, MessageCircle, Package } from "lucide-react";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { RequireAuth } from "@/components/common/RequireAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  BUSINESS,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  inr,
  ORDER_STATUSES,
  STATUS_LABELS,
} from "@/lib/business";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Order Details — Shree Shyam Dairy" },
      { name: "description", content: "Track the status of your dairy order." },
      { property: "og:title", content: "Order Details — Shree Shyam Dairy" },
      { property: "og:description", content: "Track the status of your dairy order." },
    ],
  }),
  component: () => (
    <CustomerLayout>
      <RequireAuth>
        <OrderDetail />
      </RequireAuth>
    </CustomerLayout>
  ),
});

function OrderDetail() {
  const { id } = Route.useParams();
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <EmptyState
          icon={Package}
          title="Order not found"
          description="We couldn't find this order in your account."
          actionLabel="My Orders"
          actionTo="/orders"
        />
      </div>
    );
  }

  const history = (order.status_history ?? []) as Array<{ status: string; at: string }>;
  const cancelled = order.order_status === "cancelled";
  const currentIndex = ORDER_STATUSES.indexOf(order.order_status as (typeof ORDER_STATUSES)[number]);

  const waMessage = buildWhatsAppMessage({
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
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link to="/orders" className="text-sm text-primary">
        ← Back to my orders
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="font-display text-2xl font-bold">{order.order_number}</h1>
          <p className="text-xs text-muted-foreground">
            Placed on {new Date(order.created_at).toLocaleString("en-IN")}
          </p>
        </div>
        <Badge variant={cancelled ? "destructive" : "secondary"} className="rounded-full">
          {STATUS_LABELS[order.order_status] ?? order.order_status}
        </Badge>
      </div>

      {!cancelled && (
        <div className="surface-card mt-5 p-5">
          <h2 className="font-display text-lg font-bold">Order tracking</h2>
          <ol className="mt-4 space-y-4">
            {ORDER_STATUSES.map((s, i) => {
              const done = i <= currentIndex;
              const at = history.find((h) => h.status === s)?.at;
              return (
                <li key={s} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px]",
                      done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="h-3 w-3" /> : i + 1}
                  </span>
                  <div>
                    <p className={cn("text-sm font-medium", !done && "text-muted-foreground")}>
                      {s === "pending" ? "Order Placed" : STATUS_LABELS[s]}
                    </p>
                    {at && (
                      <p className="text-xs text-muted-foreground">
                        {new Date(at).toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className="surface-card mt-5 p-5">
        <h2 className="font-display text-lg font-bold">Items</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {(order.order_items ?? []).map((i) => (
            <li key={i.id} className="flex justify-between gap-3">
              <span>
                {i.product_name} · {i.variant_label} × {i.quantity}
              </span>
              <span className="font-medium">{inr(i.subtotal)}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-3" />
        <dl className="space-y-1 text-sm">
          <Row label="Subtotal" value={inr(order.subtotal)} />
          <Row label="Discount" value={`-${inr(order.discount)}`} />
          <Row label="Delivery charge" value={inr(order.delivery_charge)} />
          <Row label="Total" value={inr(order.total)} bold />
          <Row label="Payment" value="Cash on Delivery" />
        </dl>
      </div>

      <div className="surface-card mt-5 p-5 text-sm">
        <h2 className="font-display text-lg font-bold">Delivery address</h2>
        <p className="mt-2">{order.customer_name} · {order.customer_mobile}</p>
        <p className="text-muted-foreground">
          {order.address_text}
          {order.landmark ? `, ${order.landmark}` : ""}
          <br />
          {order.city} - {order.pincode}
        </p>
      </div>

      <Button asChild variant="outline" className="mt-5 rounded-full">
        <a href={buildWhatsAppUrl(waMessage)} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="mr-2 h-4 w-4" /> Contact Us on WhatsApp ({BUSINESS.phone})
        </a>
      </Button>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={cn("flex justify-between", bold && "text-base font-bold")}>
      <dt className={bold ? "" : "text-muted-foreground"}>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
