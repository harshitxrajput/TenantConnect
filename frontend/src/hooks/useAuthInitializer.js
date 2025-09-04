// hooks/useAuthInitializer.js
import { useEffect } from "react";
import { getAuthUser } from "../lib/Api.js";
import useAuthStore from "../store/useAuthStore.js";

export default function useAuthInitializer() {
    const authUser = useAuthStore((state) => state.authUser);
    const setAuthUser = useAuthStore((state) => state.setAuthUser);
    const setAuthLoaded = useAuthStore((state) => state.setAuthLoaded);

    useEffect(() => {
        if (!authUser) {
            getAuthUser()
            .then((data) => {
                setAuthUser(data ?? null);
            })
            .catch(() => {
                setAuthUser(null);
            });
        }
        else{
            setAuthLoaded();
        }
    }, []);
}
