import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  notification: { title: "", body: "" },
  setNotification: (notification: { title: string; body: string }) =>
    set({ notification: notification }),
}));
