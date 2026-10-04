import { getApiBase } from "@/config/env";
import type { ApiErrorBody } from "@/types/api";

export class ApiError extends Error {
  status: number;
  body: ApiErrorBody | null;

  constructor(status: number, message: string, body: ApiErrorBody | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  token?: string | null;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

function messageFromBody(body: ApiErrorBody | null, fallback: string): string {
  if (!body?.detail) return fallback;
  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.detail)) {
    return body.detail.map((item) => item.msg).join(", ") || fallback;
  }
  return fallback;
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, token, cache, next } = options;
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${getApiBase()}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache,
    next,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  const data = text ? (JSON.parse(text) as ApiErrorBody | T) : null;

  if (!response.ok) {
    const errorBody = (data as ApiErrorBody) ?? null;
    throw new ApiError(
      response.status,
      messageFromBody(errorBody, `Request failed (${response.status})`),
      errorBody,
    );
  }

  return data as T;
}
