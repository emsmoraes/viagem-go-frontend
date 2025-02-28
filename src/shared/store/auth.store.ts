/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import api from "../services/axios/api";
import { User } from "../models/user.model";

interface StoreAuth {
  token?: string;
  user?: User;
  authenticate: (token: string, user: User) => void;
  load: () => { logged: boolean; user: User | undefined };
  logout: () => void;
}

export const authStore = create<StoreAuth>()(
  persist(
    (set, get) => ({
      authentication: undefined,

      authenticate: (token: string, user: User): void => {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        set((state) => ({
          ...state,
          token,
          user,
        }));
      },

      load: (): { logged: boolean; user: User | undefined } => {
        const token = get()?.token || undefined;
        const user = get()?.user || undefined;

        if (!token || !user) {
          sessionStorage.clear();
          return { logged: false, user: undefined };
        }

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        return { logged: true, user };
      },
      logout: (): void => {
        delete api.defaults.headers.common.Authorization;
        set((state) => ({
          ...state,
          token: undefined,
          user: undefined,
        }));
        sessionStorage.clear();
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
