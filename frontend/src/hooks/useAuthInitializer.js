// hooks/useAuthInitializer.js
import { useEffect } from "react";
import { getAuthUser } from "../lib/Api.js";
import useAuthStore from "../store/useAuthStore.js";

export default function useAuthInitializer() {
    const authUser = useAuthStore((state) => state.authUser);
    const setAuthUser = useAuthStore((state) => state.setAuthUser);

    useEffect(() => {
        if (!authUser) {
            getAuthUser()
            .then((data) => {
                setAuthUser(data ?? null);
                console.log(data);
            })
            .catch(() => {
                setAuthUser(null);
            });
        }
    }, []);
}
