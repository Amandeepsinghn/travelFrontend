import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { HotelForm } from "@/features/admin/HotelForm";
import { ApiError } from "@/lib/api";
import { getHotel } from "@/services/hotels";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: `Edit ${slug}` };
}

export default async function EditHotelPage({ params }: Props) {
  const { slug } = await params;

  let hotel;
  try {
    hotel = await getHotel(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <div>
      <AdminPageHeader
        title={`Edit ${hotel.name}`}
        description={`PATCH /api/v1/hotels/${hotel.id}`}
      />
      <HotelForm mode="edit" initial={hotel} />
    </div>
  );
}
