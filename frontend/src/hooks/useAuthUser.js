import { useQuery } from "@tanstack/react-query"
import { getAuthUser } from "../lib/Api.js";
import useAuthStore from "../store/useAuthStore.js";

const useAuthUser = () => {
    const authUserFromStore = useAuthStore((state) => state.authUser);
    const setAuthUser = useAuthStore((state) => state.setAuthUser);

    const authUserQuery = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            // if already in Zustand, just return it instead of calling backend
            if (authUserFromStore) {
                return authUserFromStore;
            }
            const data = await getAuthUser();
            setAuthUser(data);
            return data;
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        staleTime: Infinity, // ✅ data is always fresh
        cacheTime: Infinity, // ✅ never garbage collect
    });

    return { 
        isLoading: authUserQuery.isLoading, 
        authUser: authUserFromStore ?? authUserQuery.data 
    }
}

export default useAuthUser;