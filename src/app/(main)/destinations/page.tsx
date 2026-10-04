import { DestinationCard } from "@/components/destinations/DestinationCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listDestinations } from "@/services/destinations";

export const metadata = {
  title: "Destinations",
};

export default async function DestinationsPage() {
  const destinations = await listDestinations().catch(() => []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        eyebrow="Destinations"
        title="Pick a place on the map in your head"
        description="Every destination links to its packages and local hotels."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </main>
  );
}
