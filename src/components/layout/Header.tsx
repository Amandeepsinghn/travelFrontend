"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { isAdmin } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";

const links = [
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/hotels", label: "Hotels" },
];

export function Header() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-foam/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight">
            <span className="text-ink">Trail</span>{" "}
            <span className="text-lagoon">Panda</span>
          </span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-lagoon sm:inline">
            journey
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition",
                  active
                    ? "bg-lagoon/10 text-lagoon-deep"
                    : "text-ink-soft hover:bg-white/70 hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {!hydrated ? (
            <div className="h-9 w-24 animate-pulse rounded-full bg-mist/70" />
          ) : user ? (
            <>
              {isAdmin(user) ? (
                <ButtonLink href="/admin" variant="secondary" className="hidden sm:inline-flex">
                  Admin
                </ButtonLink>
              ) : null}
              <ButtonLink href="/profile" variant="outline" className="hidden sm:inline-flex">
                {user.first_name}
              </ButtonLink>
              <button
                type="button"
                onClick={logout}
                className="rounded-full px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <ButtonLink href="/login" variant="outline" className="hidden sm:inline-flex">
                Log in
              </ButtonLink>
              <ButtonLink href="/register">Sign up</ButtonLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
