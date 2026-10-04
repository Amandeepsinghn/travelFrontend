import Link from "next/link";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { stars } from "@/lib/format";
import type { HotelOut } from "@/types/api";

export function HotelCard({ hotel }: { hotel: HotelOut }) {
  return (
    <Link href={`/hotels/${hotel.slug}`} className="tile group block overflow-hidden rounded-3xl">
      <CoverMedia
        src={hotel.cover_image_url}
        alt={hotel.name}
        label={hotel.name}
        className="h-44 w-full"
      />
      <div className="space-y-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
          {hotel.city}
        </p>
        <h3 className="font-[family-name:var(--font-display)] text-xl text-ink transition group-hover:text-lagoon-deep">
          {hotel.name}
        </h3>
        <p className="text-sm text-ink-soft">{stars(hotel.star_rating)}</p>
      </div>
    </Link>
  );
}
