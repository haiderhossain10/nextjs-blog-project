import { create } from "zustand";

export const useNavStore = create((set) => ({
    isActive: false,
    toggle: () =>
        set((state: { isActive: boolean }) => ({ isActive: !state.isActive })),
}));
