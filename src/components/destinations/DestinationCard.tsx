import Link from "next/link";
import { CoverMedia } from "@/components/ui/CoverMedia";
import type { DestinationOut } from "@/types/api";

export function DestinationCard({ destination }: { destination: DestinationOut }) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="tile group block overflow-hidden rounded-3xl">
      <CoverMedia
        src={destination.cover_image_url}
        alt={destination.name}
        label={destination.name}
        className="h-36 w-full"
      />
      <div className="space-y-1 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
          {[destination.state, destination.country].filter(Boolean).join(", ")}
        </p>
        <h3 className="font-[family-name:var(--font-display)] text-xl text-ink transition group-hover:text-lagoon-deep">
          {destination.name}
        </h3>
        <p className="line-clamp-1 text-sm leading-relaxed text-ink-soft">
          {destination.description || "Open this destination to browse packages."}
        </p>
      </div>
    </Link>
  );
}
