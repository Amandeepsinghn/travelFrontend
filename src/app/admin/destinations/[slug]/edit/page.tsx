import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { DestinationForm } from "@/features/admin/DestinationForm";
import { ApiError } from "@/lib/api";
import { getDestination } from "@/services/destinations";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: `Edit ${slug}` };
}

export default async function EditDestinationPage({ params }: Props) {
  const { slug } = await params;

  let destination;
  try {
    destination = await getDestination(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <div>
      <AdminPageHeader
        title={`Edit ${destination.name}`}
        description={`PATCH /api/v1/destinations/${destination.id}`}
      />
      <DestinationForm mode="edit" initial={destination} />
    </div>
  );
}
