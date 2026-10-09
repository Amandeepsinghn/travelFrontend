"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { isAdmin } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";

const links = [
  { href: "/destinations", label: "Destinations" },
  { href: "/packages", label: "Packages" },
  { href: "/hotels", label: "Hotels" },
];

const INSTAGRAM_URL = "https://instagram.com/trailpanda04";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const logout = useAuthStore((s) => s.logout);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-foam/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 md:gap-4 md:px-6">
        <Link href="/" className="group min-w-0 shrink flex items-baseline gap-2">
          <span className="truncate font-[family-name:var(--font-display)] text-xl tracking-tight md:text-2xl">
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

        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Trail Panda on Instagram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink transition hover:bg-white/70 hover:text-lagoon md:h-10 md:w-10"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>

          {!hydrated ? (
            <div className="hidden h-9 w-24 animate-pulse rounded-full bg-mist/70 sm:block" />
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
                className="hidden rounded-full px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink sm:inline"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <ButtonLink href="/login" variant="outline" className="hidden sm:inline-flex">
                Log in
              </ButtonLink>
              <ButtonLink href="/register" className="hidden sm:inline-flex">
                Become member
              </ButtonLink>
            </>
          )}

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink ring-1 ring-ink/15 hover:bg-white/70 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-ink/8 bg-foam/95 px-4 py-3 md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-2xl px-3.5 py-2.5 text-sm font-medium",
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

          <div className="mt-3 flex flex-col gap-2 border-t border-ink/8 pt-3">
            {!hydrated ? null : user ? (
              <>
                {isAdmin(user) ? (
                  <ButtonLink href="/admin" variant="secondary">
                    Admin
                  </ButtonLink>
                ) : null}
                <ButtonLink href="/profile" variant="outline">
                  {user.first_name}
                </ButtonLink>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="rounded-full px-3 py-2 text-left text-sm font-medium text-ink-soft hover:text-ink"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <ButtonLink href="/login" variant="outline">
                  Log in
                </ButtonLink>
                <ButtonLink href="/register">Become member</ButtonLink>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
