import type { UserOut } from "@/types/api";

export function isAdmin(user: UserOut | null | undefined): boolean {
  return user?.role?.toLowerCase() === "admin";
}
