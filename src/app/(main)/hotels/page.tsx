import { HotelCard } from "@/components/hotels/HotelCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listHotels } from "@/services/hotels";

type Props = { searchParams: Promise<{ city?: string }> };

export const metadata = {
  title: "Hotels",
};

export default async function HotelsPage({ searchParams }: Props) {
  const { city } = await searchParams;
  const hotels = await listHotels(city).catch(() => []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <SectionHeading
        eyebrow="Hotels"
        title="Places to sleep after the day's stops"
        description={
          city
            ? `Showing hotels in “${city}”.`
            : "Filterable by city via ?city= from the hotels API."
        }
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </main>
  );
}
