"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authApi from "@/services/auth";
import type { UserLogin, UserOut, UserRegister } from "@/types/api";

type AuthState = {
  token: string | null;
  user: UserOut | null;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  login: (payload: UserLogin) => Promise<void>;
  register: (payload: UserRegister) => Promise<void>;
  refreshMe: () => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      login: async (payload) => {
        const token = await authApi.login(payload);
        set({ token: token.access_token });
        const user = await authApi.me(token.access_token);
        set({ user });
      },
      register: async (payload) => {
        await authApi.register(payload);
        await get().login({
          email: payload.email,
          password: payload.password,
        });
      },
      refreshMe: async () => {
        const token = get().token;
        if (!token) {
          set({ user: null });
          return;
        }
        try {
          const user = await authApi.me(token);
          set({ user });
        } catch {
          set({ token: null, user: null });
        }
      },
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: "travel-panda-auth",
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
        void state?.refreshMe();
      },
    },
  ),
);
