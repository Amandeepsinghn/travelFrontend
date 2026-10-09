import { ArrowRight } from "lucide-react";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { ContactSection } from "@/components/layout/ContactSection";
import { PackageCard } from "@/components/packages/PackageCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listDestinations } from "@/services/destinations";
import { listPackages } from "@/services/packages";

export default async function HomePage() {
  const [destinations, packages] = await Promise.all([
    listDestinations().catch(() => []),
    listPackages().catch(() => []),
  ]);

  return (
    <main>
      <section className="relative h-[min(92vh,920px)] min-h-[560px] overflow-hidden bg-[#1a3d2c]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pandaV2.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/55 md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/45 via-transparent to-transparent md:block" />

        {/* Mobile: centered brand + explore */}
        <div className="relative flex h-full w-full flex-col items-center px-6 pt-[18vh] text-center md:hidden">
          <h1 className="animate-rise font-[family-name:var(--font-display)] text-5xl tracking-tight drop-shadow-[0_4px_18px_rgba(26,61,44,0.45)]">
            <span className="text-white">Trail</span>{" "}
            <span className="text-sun">Panda</span>
          </h1>
          <div className="animate-rise-delay mt-5">
            <ButtonLink href="/destinations" className="min-w-[10rem] px-8">
              Explore
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden strokeWidth={2.25} />
            </ButtonLink>
          </div>
        </div>

        {/* Desktop: left copy + both CTAs */}
        <div className="relative hidden h-full w-full items-center justify-start px-4 md:flex md:px-10 lg:px-16">
          <div className="flex w-full max-w-md flex-col items-start text-left">
            <h1 className="animate-rise font-[family-name:var(--font-display)] text-5xl tracking-tight">
              <span className="text-white">Trail</span>{" "}
              <span className="text-sun">Panda</span>
            </h1>
            <p className="animate-rise-delay mt-4 inline-flex max-w-full rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold tracking-wide text-white ring-1 ring-white/40">
              Packages that already know the route.
            </p>
            <p className="animate-rise-late mt-2 inline-flex max-w-full rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold tracking-wide text-white ring-1 ring-white/40">
              Quiet beaches, hillside stays, and day-by-day itineraries.
            </p>
            <div className="animate-rise-late mt-5 flex flex-wrap justify-start gap-3">
              <ButtonLink href="/destinations">Explore destinations</ButtonLink>
              <ButtonLink href="/packages" variant="primary" className="bg-sun text-ink hover:bg-sun/90">
                Browse packages
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <SectionHeading
          eyebrow="Where to go"
          title="Destinations"
          description="Start with a place. We'll show the packages that live there."
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.length ? (
            destinations.slice(0, 6).map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))
          ) : (
            <p className="text-ink-soft">No destinations yet. Is the API up on :8000?</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
        <SectionHeading
          eyebrow="Ready to book"
          title="Packages"
          description="Duration, price, and stays — pulled live from the API."
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packages.length ? (
            packages.slice(0, 6).map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)
          ) : (
            <p className="text-ink-soft">No packages yet.</p>
          )}
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
