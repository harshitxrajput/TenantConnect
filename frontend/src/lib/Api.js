import { axiosInstance } from "./Axios";

export const getAuthUser = async () => {
    //Tenant Profile
    try{
        const tenantResponse = await axiosInstance.get("/tenant/profile");
        if(tenantResponse?.data)
        {
            return { role: "Tenant", user: tenantResponse.data }
        }
    }
    catch(err){
        console.log("Not a tenant: ", err.message);
        return null;
    }

    //Landlord Profile
    try{
        const landlordResponse = await axiosInstance.get("/landlord/profile");
        if(landlordResponse?.data){
            return { role: "Landlord", user: landlordResponse.data };
        }
    }
    catch(err){
        console.log("Not a landlord: ", err.message);
    }
}

export const landlordSignup = async(tenantSignupData) => {
    try{
        const response = await axiosInstance.post("/landlord/register");
        return response.data;
    }
    catch(err){
        console.log("Error in useTenantSignup: ", err.message);
        throw err;
    }
}