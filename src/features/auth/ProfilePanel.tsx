"use client";

import Link from "next/link";
import { Button, ButtonLink } from "@/components/ui/Button";
import { isAdmin } from "@/lib/auth";
import { useAuthStore } from "@/stores/auth";

export function ProfilePanel() {
  const hydrated = useAuthStore((s) => s.hydrated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (!hydrated) {
    return <div className="h-28 animate-pulse rounded-2xl bg-mist/70" />;
  }

  if (!user) {
    return (
      <div className="space-y-4">
        <p className="text-ink-soft">You're not signed in.</p>
        <div className="flex gap-3">
          <ButtonLink href="/login">Log in</ButtonLink>
          <ButtonLink href="/register" variant="outline">
            Sign up
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
          {user.role}
        </p>
        <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-ink">
          {user.first_name} {user.last_name}
        </h2>
        <p className="mt-2 text-ink-soft">{user.email}</p>
      </div>
      <dl className="grid gap-2 text-sm text-ink-soft">
        <div className="flex justify-between gap-4 border-t border-ink/8 pt-3">
          <dt>Status</dt>
          <dd className="font-medium text-ink">{user.is_active ? "Active" : "Inactive"}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-ink/8 pt-3">
          <dt>Member since</dt>
          <dd className="font-medium text-ink">
            {new Date(user.created_at).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </dd>
        </div>
      </dl>
      <div className="flex flex-wrap gap-3 pt-2">
        {isAdmin(user) ? (
          <ButtonLink href="/admin" variant="secondary">
            Admin panel
          </ButtonLink>
        ) : null}
        <Link href="/packages" className="text-sm font-semibold text-lagoon hover:text-lagoon-deep">
          Browse packages
        </Link>
        <Button type="button" variant="outline" onClick={logout}>
          Log out
        </Button>
      </div>
    </div>
  );
}
