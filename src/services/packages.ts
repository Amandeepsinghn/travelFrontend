import { apiFetch } from "@/lib/api";
import type {
  PackageCreate,
  PackageDetailOut,
  PackageOut,
  PackageUpdate,
} from "@/types/api";

export function listPackages(destinationSlug?: string) {
  const query = destinationSlug
    ? `?destination_slug=${encodeURIComponent(destinationSlug)}`
    : "";
  return apiFetch<PackageOut[]>(`/api/v1/packages${query}`, {
    next: { revalidate: 30 },
  });
}

export function getPackage(slug: string) {
  return apiFetch<PackageDetailOut>(`/api/v1/packages/${slug}`, {
    next: { revalidate: 30 },
  });
}

export function createPackage(payload: PackageCreate, token: string) {
  return apiFetch<PackageDetailOut>("/api/v1/packages", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updatePackage(
  id: number,
  payload: PackageUpdate,
  token: string,
) {
  return apiFetch<PackageDetailOut>(`/api/v1/packages/${id}`, {
    method: "PATCH",
    body: payload,
    token,
  });
}
