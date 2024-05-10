import { create } from "zustand";

export const useDetectionPoseStore = create((set) => ({
  isBabyFace: true,
  setIsBabyFace: (isFace: boolean) => set({ isBabyFace: isFace }),
}));
