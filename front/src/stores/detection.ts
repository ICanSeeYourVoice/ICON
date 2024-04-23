import { create } from "zustand";

export const useDetectionStore = create((set) => ({
  isBabyCry: false,
  setIsBabyCry: (isCrying: boolean) => set({ isBabyCry: isCrying }),
  initDetection: () => set({ isBabyCry: false }),
}));
