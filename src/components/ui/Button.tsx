import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon disabled:opacity-50";

const variants = {
  primary: "bg-lagoon text-white hover:bg-[#4a7228] hover:text-white",
  secondary: "bg-ink text-foam hover:bg-ink-soft hover:text-foam",
  ghost: "bg-white/20 text-white ring-1 ring-white/40 hover:bg-white/30",
  outline: "bg-transparent text-ink ring-1 ring-ink/15 hover:bg-white/70",
} as const;

type Variant = keyof typeof variants;

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
}: Common & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
