import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageCard } from "@/components/packages/PackageCard";
import { CoverMedia } from "@/components/ui/CoverMedia";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ApiError } from "@/lib/api";
import { getDestination } from "@/services/destinations";
import { listPackages } from "@/services/packages";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const destination = await getDestination(slug);
    return { title: destination.name };
  } catch {
    return { title: "Destination" };
  }
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;

  let destination;
  try {
    destination = await getDestination(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const packages = await listPackages(destination.slug).catch(() => []);

  return (
    <main>
      <section className="relative min-h-[48vh] overflow-hidden">
        <CoverMedia
          src={destination.cover_image_url}
          alt={destination.name}
          label={destination.name}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-6xl flex-col justify-end px-4 pb-10 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
            {[destination.state, destination.country].filter(Boolean).join(" · ")}
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl text-white md:text-6xl">
            {destination.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            {destination.description || "Browse packages for this destination."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <SectionHeading title="Packages here" description="Filtered by destination slug from the API." />
          <Link href="/packages" className="text-sm font-semibold text-lagoon hover:text-lagoon-deep">
            All packages
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.length ? (
            packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)
          ) : (
            <p className="text-ink-soft">No packages for this destination yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
