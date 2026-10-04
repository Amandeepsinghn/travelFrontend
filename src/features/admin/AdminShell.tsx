"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";

const nav = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/hotels", label: "Hotels" },
  { href: "/admin/packages", label: "Packages" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="min-h-screen bg-[#1a3d2c] text-[#f6f0e4]">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-white/10 px-5 py-6 lg:border-b-0 lg:border-r">
          <Link href="/admin" className="block">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f4b42a]">
              Admin
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-white">
              Trail Panda
            </p>
          </Link>

          <nav className="mt-8 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-white/12 text-white"
                      : "text-white/60 hover:bg-white/6 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 space-y-2 border-t border-white/10 pt-6 text-sm">
            <p className="text-white/50">{user?.email}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="text-white/70 hover:text-white">
                View site
              </Link>
              <button
                type="button"
                onClick={logout}
                className="text-white/70 hover:text-white"
              >
                Log out
              </button>
            </div>
          </div>
        </aside>

        <main className="px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
