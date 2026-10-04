import { apiFetch } from "@/lib/api";
import type { Token, UserLogin, UserOut, UserRegister } from "@/types/api";

export function register(payload: UserRegister) {
  return apiFetch<UserOut>("/api/v1/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function login(payload: UserLogin) {
  return apiFetch<Token>("/api/v1/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function me(token: string) {
  return apiFetch<UserOut>("/api/v1/auth/me", { token });
}
