import { apiFetch } from "@/lib/api";
import type { CommentCreate, CommentOut } from "@/types/api";

export function listPackageComments(slug: string) {
  return apiFetch<CommentOut[]>(`/api/v1/packages/${encodeURIComponent(slug)}/comments`, {
    cache: "no-store",
  });
}

export function createPackageComment(
  slug: string,
  payload: CommentCreate,
  token: string,
) {
  return apiFetch<CommentOut>(
    `/api/v1/packages/${encodeURIComponent(slug)}/comments`,
    {
      method: "POST",
      body: payload,
      token,
    },
  );
}

export function listHotelComments(slug: string) {
  return apiFetch<CommentOut[]>(`/api/v1/hotels/${encodeURIComponent(slug)}/comments`, {
    cache: "no-store",
  });
}

export function createHotelComment(
  slug: string,
  payload: CommentCreate,
  token: string,
) {
  return apiFetch<CommentOut>(
    `/api/v1/hotels/${encodeURIComponent(slug)}/comments`,
    {
      method: "POST",
      body: payload,
      token,
    },
  );
}

export function deleteComment(id: number, token: string) {
  return apiFetch<void>(`/api/v1/comments/${id}`, {
    method: "DELETE",
    token,
  });
}
