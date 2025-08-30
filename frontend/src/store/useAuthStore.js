import { create } from "zustand";

const useAuthStore = create((set) => ({
    authUser: null,

    setAuthUser: (authUser) => set({ authUser }),
    clearAuthUser: () => set({ authUser: null }),
}));

export default useAuthStore;