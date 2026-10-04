import type { Metadata } from "next";
import { AdminGate } from "@/features/admin/AdminGate";
import { AdminShell } from "@/features/admin/AdminShell";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s · Admin · Travel Panda",
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGate>
      <AdminShell>{children}</AdminShell>
    </AdminGate>
  );
}
