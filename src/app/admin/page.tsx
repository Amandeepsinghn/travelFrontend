import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { listDestinations } from "@/services/destinations";
import { listHotels } from "@/services/hotels";
import { listPackages } from "@/services/packages";

export default async function AdminDashboardPage() {
  const [destinations, hotels, packages] = await Promise.all([
    listDestinations().catch(() => []),
    listHotels().catch(() => []),
    listPackages().catch(() => []),
  ]);

  const cards = [
    {
      label: "Destinations",
      count: destinations.length,
      href: "/admin/destinations",
      hint: "Places travelers browse first",
    },
    {
      label: "Hotels",
      count: hotels.length,
      href: "/admin/hotels",
      hint: "Stays linked into packages",
    },
    {
      label: "Packages",
      count: packages.length,
      href: "/admin/packages",
      hint: "Priced itineraries on the site",
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Overview"
        description="Create and update catalog content. Writes hit the FastAPI admin-protected endpoints."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="admin-panel transition hover:border-white/20 hover:bg-white/6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              {card.label}
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-4xl text-white">
              {card.count}
            </p>
            <p className="mt-2 text-sm text-white/55">{card.hint}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
