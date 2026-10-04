"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { isAdmin } from "@/lib/auth";
import { useAuthStore } from "@/stores/auth";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useAuthStore((s) => s.hydrated);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [hydrated, user, router, pathname]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a3d2c] text-white/70">
        Loading admin…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a3d2c] text-white/70">
        Redirecting to login…
      </div>
    );
  }

  if (!isAdmin(user)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#1a3d2c] px-4 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sun">
          Admin only
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl">
          Your account isn&apos;t an admin
        </h1>
        <p className="max-w-md text-white/70">
          Signed in as {user.email} with role <span className="text-white">{user.role}</span>.
          The API returns <code className="text-sun">admin access required</code> for writes.
        </p>
        <div className="flex gap-3">
          <ButtonLink href="/" variant="ghost">
            Back home
          </ButtonLink>
          <Link href="/profile" className="rounded-full px-4 py-2 text-sm text-white/70 hover:text-white">
            Profile
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
