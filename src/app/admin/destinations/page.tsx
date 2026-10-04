import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { StatusPill } from "@/features/admin/StatusPill";
import { listDestinations } from "@/services/destinations";

export const metadata = { title: "Destinations" };

export default async function AdminDestinationsPage() {
  const destinations = await listDestinations().catch(() => []);

  return (
    <div>
      <AdminPageHeader
        title="Destinations"
        description="POST /api/v1/destinations · PATCH /api/v1/destinations/{id}"
        actionHref="/admin/destinations/new"
        actionLabel="New destination"
      />
      <div className="admin-panel overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Location</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {destinations.length ? (
              destinations.map((destination) => (
                <tr key={destination.id}>
                  <td className="font-medium text-white">{destination.name}</td>
                  <td className="text-white/55">{destination.slug}</td>
                  <td className="text-white/55">
                    {[destination.state, destination.country].filter(Boolean).join(", ")}
                  </td>
                  <td>
                    <StatusPill active={destination.is_active} />
                  </td>
                  <td className="text-right">
                    <Link
                      href={`/admin/destinations/${destination.slug}/edit`}
                      className="text-sm font-semibold text-[#f4b42a] hover:text-white"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-white/50">
                  No destinations yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
