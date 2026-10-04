import { AdminPageHeader } from "@/features/admin/AdminPageHeader";
import { DestinationForm } from "@/features/admin/DestinationForm";

export const metadata = { title: "New destination" };

export default function NewDestinationPage() {
  return (
    <div>
      <AdminPageHeader title="New destination" description="Creates a destination via the admin API." />
      <DestinationForm mode="create" />
    </div>
  );
}
