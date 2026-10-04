import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { HotelForm } from "@/features/admin/HotelForm";

export const metadata = { title: "New hotel" };

export default function NewHotelPage() {
  return (
    <div>
      <AdminPageHeader title="New hotel" description="Creates a hotel via the admin API." />
      <HotelForm mode="create" />
    </div>
  );
}
