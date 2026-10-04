import Link from "next/link";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { formatDuration, formatPrice } from "@/lib/format";
import type { PackageOut } from "@/types/api";

export function PackageCard({ pkg }: { pkg: PackageOut }) {
  return (
    <Link href={`/packages/${pkg.slug}`} className="tile group block overflow-hidden rounded-3xl">
      <CoverMedia
        src={pkg.cover_image_url}
        alt={pkg.title}
        label={pkg.title}
        className="h-36 w-full"
      />
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-ink transition group-hover:text-lagoon-deep">
            {pkg.title}
          </h3>
          <p className="shrink-0 text-sm font-semibold text-lagoon-deep">
            {formatPrice(pkg.price, pkg.currency)}
          </p>
        </div>
        <p className="line-clamp-2 text-sm text-ink-soft">
          {pkg.summary || pkg.description || "View itinerary and stays."}
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/55">
          {formatDuration(pkg.duration_days, pkg.duration_nights)}
        </p>
      </div>
    </Link>
  );
}
