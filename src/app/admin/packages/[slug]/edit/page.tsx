import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { PackageForm } from "@/features/admin/PackageForm";
import { ApiError } from "@/lib/api";
import { listDestinations } from "@/services/destinations";
import { listHotels } from "@/services/hotels";
import { getPackage } from "@/services/packages";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: `Edit ${slug}` };
}

export default async function EditPackagePage({ params }: Props) {
  const { slug } = await params;

  let pkg;
  try {
    pkg = await getPackage(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const [destinations, hotels] = await Promise.all([
    listDestinations().catch(() => []),
    listHotels().catch(() => []),
  ]);

  return (
    <div>
      <AdminPageHeader
        title={`Edit ${pkg.title}`}
        description={`PATCH /api/v1/packages/${pkg.id}`}
      />
      <PackageForm
        mode="edit"
        destinations={destinations}
        hotels={hotels}
        initial={pkg}
      />
    </div>
  );
}
