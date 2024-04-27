import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  notification: { title: "", body: "" },
  setNotification: (notification: { title: string; body: string }) =>
    set({ notification: notification }),
}));

interface TokenProps {
  token: string | null;
  setToken: (token: string) => void;
}

export const useTokenStore = create<TokenProps>((set) => ({
  token: null,
  setToken: (token: string) => set({ token }),
}));
