import { PackageCard } from "@/components/packages/PackageCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listPackages } from "@/services/packages";

type Props = { searchParams: Promise<{ destination?: string }> };

export const metadata = {
  title: "Packages",
};

export default async function PackagesPage({ searchParams }: Props) {
  const { destination } = await searchParams;
  const packages = await listPackages(destination).catch(() => []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        eyebrow="Packages"
        title="Trips with the days already written"
        description={
          destination
            ? `Showing packages for “${destination}”.`
            : "Price, duration, and itinerary — live from /api/v1/packages."
        }
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </main>
  );
}
