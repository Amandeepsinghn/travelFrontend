import { getApiBase } from "@/config/env";
import { ApiError } from "@/lib/api";
import type { ApiErrorBody, UploadFolder, UploadOut } from "@/types/api";

function messageFromBody(body: ApiErrorBody | null, fallback: string): string {
  if (!body?.detail) return fallback;
  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.detail)) {
    return body.detail.map((item) => item.msg).join(", ") || fallback;
  }
  return fallback;
}

export async function uploadImage(
  file: File,
  folder: UploadFolder,
  token: string,
): Promise<UploadOut> {
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);

  const response = await fetch(`${getApiBase()}/api/v1/uploads/image`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  const text = await response.text();
  const data = text ? (JSON.parse(text) as ApiErrorBody | UploadOut) : null;

  if (!response.ok) {
    const errorBody = (data as ApiErrorBody) ?? null;
    throw new ApiError(
      response.status,
      messageFromBody(errorBody, `Upload failed (${response.status})`),
      errorBody,
    );
  }

  return data as UploadOut;
}
