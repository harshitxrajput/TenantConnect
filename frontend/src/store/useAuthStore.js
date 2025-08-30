import { create } from "zustand";

const useAuthStore = create((set) => ({
    authUser: null,
    isLoading: true,

    setAuthUser: (authUser) => set({ authUser, isLoading: false }),
    clearAuthUser: () => set({ authUser: null, isLoading: false }),
}));

export default useAuthStore;