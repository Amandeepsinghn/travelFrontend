import { apiFetch } from "@/lib/api";
import type { HotelCreate, HotelOut, HotelUpdate } from "@/types/api";

export function listHotels(city?: string) {
  const query = city ? `?city=${encodeURIComponent(city)}` : "";
  return apiFetch<HotelOut[]>(`/api/v1/hotels${query}`, {
    next: { revalidate: 30 },
  });
}

export function getHotel(slug: string) {
  return apiFetch<HotelOut>(`/api/v1/hotels/${slug}`, {
    next: { revalidate: 30 },
  });
}

export function createHotel(payload: HotelCreate, token: string) {
  return apiFetch<HotelOut>("/api/v1/hotels", {
    method: "POST",
    body: payload,
    token,
  });
}

export function updateHotel(id: number, payload: HotelUpdate, token: string) {
  return apiFetch<HotelOut>(`/api/v1/hotels/${id}`, {
    method: "PATCH",
    body: payload,
    token,
  });
}
