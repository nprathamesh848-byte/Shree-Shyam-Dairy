import { Link } from "@tanstack/react-router";
import { Loader2, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
        <LockKeyhole className="mb-4 h-10 w-10 text-primary" />
        <h1 className="font-display text-2xl font-bold">Please sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Log in to your Shree Shyam Dairy account to continue.
        </p>
        <div className="mt-6 flex gap-2">
          <Button asChild className="rounded-full">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/signup">Create account</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
