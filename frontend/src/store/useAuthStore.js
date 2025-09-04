import { create } from "zustand";

const useAuthStore = create((set) => ({
    authUser: null,
    isAuthLoaded: false,
    setAuthUser: (authUser) => set({ authUser, isAuthLoaded: true }),
    clearAuthUser: () => set({ authUser: null, isAuthLoaded: true }),
    setAuthLoaded: () => set({ isAuthLoaded: true })
}));

export default useAuthStore;