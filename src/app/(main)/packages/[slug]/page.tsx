import Link from "next/link";
import { notFound } from "next/navigation";
import { CommentSection } from "@/components/comments/CommentSection";
import { PackageContact } from "@/components/packages/PackageContact";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { ApiError } from "@/lib/api";
import { stars } from "@/lib/format";
import { listPackageComments } from "@/services/comments";
import { getPackage } from "@/services/packages";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const pkg = await getPackage(slug);
    return { title: pkg.title };
  } catch {
    return { title: "Package" };
  }
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;

  let pkg;
  try {
    pkg = await getPackage(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const hero =
    pkg.cover_image_url ||
    pkg.media.find((item) => item.media_type === "image")?.url ||
    null;

  const comments = await listPackageComments(slug).catch(() => []);

  return (
    <main>
      <section className="relative min-h-[52vh] overflow-hidden">
        <CoverMedia src={hero} alt={pkg.title} label={pkg.title} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-4 pb-10 md:px-6">
          <Link
            href={`/destinations/${pkg.destination.slug}`}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-sun"
          >
            {pkg.destination.name}
          </Link>
          <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl text-white md:text-6xl">
            {pkg.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {pkg.summary || pkg.description || "Detailed itinerary below."}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_0.8fr] md:px-6">
        <section className="space-y-8">
          {pkg.description ? (
            <div className="panel rounded-3xl p-6">
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">About</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{pkg.description}</p>
            </div>
          ) : null}

          <div className="space-y-4">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">Itinerary</h2>
            {pkg.days.length ? (
              pkg.days
                .slice()
                .sort((a, b) => a.day_number - b.day_number)
                .map((day) => (
                  <article key={day.id} className="panel rounded-3xl p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lagoon">
                      Day {day.day_number}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-ink">{day.title}</h3>
                    {day.description ? (
                      <p className="mt-2 text-ink-soft">{day.description}</p>
                    ) : null}
                    {day.stops?.length ? (
                      <ul className="mt-4 space-y-2 border-t border-ink/8 pt-4">
                        {day.stops
                          .slice()
                          .sort((a, b) => a.sort_order - b.sort_order)
                          .map((stop) => (
                            <li key={stop.id} className="text-sm text-ink-soft">
                              <span className="font-medium text-ink">{stop.name}</span>
                              {stop.location_note ? ` · ${stop.location_note}` : ""}
                              {stop.description ? ` — ${stop.description}` : ""}
                            </li>
                          ))}
                      </ul>
                    ) : null}
                  </article>
                ))
            ) : (
              <p className="text-ink-soft">Itinerary days will show up here once added.</p>
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <PackageContact
            price={pkg.price}
            currency={pkg.currency}
            durationDays={pkg.duration_days}
            durationNights={pkg.duration_nights}
          />

          <div className="panel rounded-3xl p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">Stays</h2>
            <div className="mt-4 space-y-4">
              {pkg.hotels.length ? (
                pkg.hotels
                  .slice()
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((item) => (
                    <Link
                      key={item.id}
                      href={`/hotels/${item.hotel.slug}`}
                      className="block rounded-2xl border border-ink/8 bg-white/50 p-4 transition hover:border-lagoon/30"
                    >
                      <p className="font-semibold text-ink">{item.hotel.name}</p>
                      <p className="mt-1 text-sm text-ink-soft">
                        {item.nights} night{item.nights === 1 ? "" : "s"} · {stars(item.hotel.star_rating)}
                      </p>
                      {item.notes ? <p className="mt-2 text-sm text-ink-soft">{item.notes}</p> : null}
                    </Link>
                  ))
              ) : (
                <p className="text-sm text-ink-soft">No hotels linked yet.</p>
              )}
            </div>
          </div>

          {pkg.media.length ? (
            <div className="panel rounded-3xl p-6">
              <h2 className="font-[family-name:var(--font-display)] text-2xl text-ink">Gallery</h2>
              <div className="mt-4 grid gap-3">
                {pkg.media
                  .slice()
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((item) => (
                    <CoverMedia
                      key={item.id}
                      src={item.url}
                      alt={item.alt_text || pkg.title}
                      className="h-40 w-full rounded-2xl"
                    />
                  ))}
              </div>
            </div>
          ) : null}
        </aside>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-14 md:px-6">
        <CommentSection target="package" slug={slug} initialComments={comments} />
      </div>
    </main>
  );
}
