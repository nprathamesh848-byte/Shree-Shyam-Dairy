import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";

import { CustomerLayout } from "@/components/customer/CustomerLayout";
import { EmptyState } from "@/components/common/EmptyState";
import { RequireAuth } from "@/components/common/RequireAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { myNotificationsQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Notifications — Shree Shyam Dairy" },
      { name: "description", content: "Order updates and new offers from Shree Shyam Dairy." },
      { property: "og:title", content: "Notifications — Shree Shyam Dairy" },
      { property: "og:description", content: "Order updates and new offers." },
    ],
  }),
  component: () => (
    <CustomerLayout>
      <RequireAuth>
        <NotificationsPage />
      </RequireAuth>
    </CustomerLayout>
  ),
});

function NotificationsPage() {
  const { data, isLoading } = useQuery(myNotificationsQuery);
  const queryClient = useQueryClient();

  const markAllRead = async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;
    await supabase.from("notifications").update({ is_read: true }).eq("user_id", auth.user.id);
    void queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Notifications</h1>
        {data && data.length > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllRead}>
            Mark all read
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      ) : data && data.length > 0 ? (
        <ul className="mt-6 space-y-3">
          {data.map((n) => (
            <li
              key={n.id}
              className={cn("surface-card p-4", !n.is_read && "border-primary/40 bg-secondary/40")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(n.created_at).toLocaleString("en-IN")}
                  </p>
                </div>
                <Badge variant="secondary" className="rounded-full capitalize">
                  {n.type}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6">
          <EmptyState
            icon={Bell}
            title="No notifications"
            description="You're all caught up. Order updates and offers will appear here."
            actionLabel="Shop Products"
            actionTo="/products"
          />
        </div>
      )}
    </div>
  );
}
