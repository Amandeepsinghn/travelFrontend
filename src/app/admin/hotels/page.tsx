import Link from "next/link";
import { AdminDeleteButton } from "@/features/admin/AdminDeleteButton";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { StatusPill } from "@/features/admin/StatusPill";
import { listHotels } from "@/services/hotels";

export const metadata = { title: "Hotels" };

export default async function AdminHotelsPage() {
  const hotels = await listHotels().catch(() => []);

  return (
    <div>
      <AdminPageHeader
        title="Hotels"
        description="POST · PATCH · DELETE /api/v1/hotels/{id}"
        actionHref="/admin/hotels/new"
        actionLabel="New hotel"
      />
      <div className="admin-panel overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Stars</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {hotels.length ? (
              hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td className="font-medium text-white">{hotel.name}</td>
                  <td className="text-white/55">{hotel.city}</td>
                  <td className="text-white/55">{hotel.star_rating ?? "—"}</td>
                  <td>
                    <StatusPill active={hotel.is_active} />
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/hotels/${hotel.slug}/edit`}
                        className="text-sm font-semibold text-[#f4b42a] hover:text-white"
                      >
                        Edit
                      </Link>
                      <AdminDeleteButton
                        resource="hotel"
                        id={hotel.id}
                        label={hotel.name}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-white/50">
                  No hotels yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
