import { create } from "zustand";

export const useDetectionStore = create((set) => ({
  isBabyCry: false,
  cryingType: 0,
  setIsBabyCry: (isCrying: boolean) => set({ isBabyCry: isCrying }),
  setCryingType: (type: number) => set({ cryingType: type }),
}));
