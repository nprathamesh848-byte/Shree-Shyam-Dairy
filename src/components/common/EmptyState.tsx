import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border cream-section px-6 py-16 text-center">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary text-primary">
        <Icon className="h-8 w-8" />
      </span>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && actionTo ? (
        <Button asChild className="mt-6 rounded-full px-6">
          <Link to={actionTo as "/"}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}
