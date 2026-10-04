export const SERVER_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

/** Browser calls go through the Next rewrite to avoid CORS. */
export function getApiBase(): string {
  if (typeof window === "undefined") {
    return SERVER_API_URL;
  }
  return "/backend";
}
