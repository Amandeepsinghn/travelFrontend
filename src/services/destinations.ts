import { apiFetch } from "@/lib/api";
import type {
  DestinationCreate,
  DestinationOut,
  DestinationUpdate,
} from "@/types/api";

export function listDestinations() {
  return apiFetch<DestinationOut[]>("/api/v1/destinations", {
    next: { revalidate: 30 },
  });
}

export function getDestination(slug: string) {
  return apiFetch<DestinationOut>(`/api/v1/destinations/${slug}`, {
    next: { revalidate: 30 },
  });
}

export function createDestination(payload: DestinationCreate, token: string) {
  return apiFetch<DestinationOut>("/api/v1/destinations", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateDestination(
  id: number,
  payload: DestinationUpdate,
  token: string,
) {
  return apiFetch<DestinationOut>(`/api/v1/destinations/${id}`, {
    method: "PATCH",
    body: payload,
    token,
  });
}

export function deleteDestination(id: number, token: string) {
  return apiFetch<void>(`/api/v1/destinations/${id}`, {
    method: "DELETE",
    token,
  });
}
