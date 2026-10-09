import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { PackageForm } from "@/features/admin/PackageForm";
import { listDestinations } from "@/services/destinations";
import { listHotels } from "@/services/hotels";

export const metadata = { title: "New package" };

export default async function NewPackagePage() {
  const [destinations, hotels] = await Promise.all([
    listDestinations().catch(() => []),
    listHotels().catch(() => []),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="New package"
        description="Creates a package with optional days, hotel link, and gallery images."
      />
      {destinations.length ? (
        <PackageForm mode="create" destinations={destinations} hotels={hotels} />
      ) : (
        <p className="text-white/60">Create a destination first before adding packages.</p>
      )}
    </div>
  );
}
