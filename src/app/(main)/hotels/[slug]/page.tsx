import { notFound } from "next/navigation";
import { CommentSection } from "@/components/comments/CommentSection";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { ApiError } from "@/lib/api";
import { stars } from "@/lib/format";
import { listHotelComments } from "@/services/comments";
import { getHotel } from "@/services/hotels";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const hotel = await getHotel(slug);
    return { title: hotel.name };
  } catch {
    return { title: "Hotel" };
  }
}

export default async function HotelDetailPage({ params }: Props) {
  const { slug } = await params;

  let hotel;
  try {
    hotel = await getHotel(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const comments = await listHotelComments(slug).catch(() => []);

  return (
    <main>
      <section className="relative min-h-[46vh] overflow-hidden">
        <CoverMedia
          src={hotel.cover_image_url}
          alt={hotel.name}
          label={hotel.name}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
        <div className="relative mx-auto flex min-h-[46vh] max-w-6xl flex-col justify-end px-4 pb-10 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
            {hotel.city}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl text-white md:text-6xl">
            {hotel.name}
          </h1>
          <p className="mt-3 text-white/85">{stars(hotel.star_rating)}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-8 px-4 py-14 md:px-6">
        <div className="panel space-y-4 rounded-3xl p-6">
          {hotel.address ? (
            <p className="text-ink-soft">
              <span className="font-semibold text-ink">Address · </span>
              {hotel.address}
            </p>
          ) : null}
          <p className="leading-relaxed text-ink-soft">
            {hotel.description || "No description yet for this hotel."}
          </p>
          {hotel.amenities ? (
            <p className="text-ink-soft">
              <span className="font-semibold text-ink">Amenities · </span>
              {hotel.amenities}
            </p>
          ) : null}
        </div>

        <CommentSection target="hotel" slug={slug} initialComments={comments} />
      </section>
    </main>
  );
}
