import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { StatusPill } from "@/features/admin/StatusPill";
import { formatPrice } from "@/lib/format";
import { listPackages } from "@/services/packages";

export const metadata = { title: "Packages" };

export default async function AdminPackagesPage() {
  const packages = await listPackages().catch(() => []);

  return (
    <div>
      <AdminPageHeader
        title="Packages"
        description="POST /api/v1/packages · PATCH /api/v1/packages/{id}"
        actionHref="/admin/packages/new"
        actionLabel="New package"
      />
      <div className="admin-panel overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {packages.length ? (
              packages.map((pkg) => (
                <tr key={pkg.id}>
                  <td className="font-medium text-white">{pkg.title}</td>
                  <td className="text-white/55">
                    {pkg.duration_days}D / {pkg.duration_nights}N
                  </td>
                  <td className="text-white/55">{formatPrice(pkg.price, pkg.currency)}</td>
                  <td>
                    <StatusPill active={pkg.is_active} />
                  </td>
                  <td className="text-right">
                    <Link
                      href={`/admin/packages/${pkg.slug}/edit`}
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
                  No packages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
