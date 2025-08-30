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

export const landlordSignup = async(landlordSignupData) => {
    try{
        const response = await axiosInstance.post("/landlord/register", landlordSignupData);
        return response.data;
    }
    catch(err){
        console.log("Error in landlordSignup: ", err.message);
        throw err;
    }
}

export const landlordLogin = async (landlordLoginData) => {
    try{
        const response = await axiosInstance.post("/landlord/login", landlordLoginData);
        return response.data;
    }
    catch(err){
        console.log("Error in landlordLogin: ", err.message);
        throw err;
    }
}

export const tenantSignup = async (tenantSignupData) => {
    try{
        const response = await axiosInstance.post("/tenant/signup", tenantSignupData);
        return response.data;
    }
    catch(err){
        console.log("Error in tenantSignup: ", err.message);
    }
}

export const tenantLogin = async (tenantLoginData) => {
    try{
        const response = await axiosInstance.post("/tenant/login", tenantLoginData);
        return response.data;
    }
    catch(err){
        console.log("Error in tenantLogin: ", err.message);
        throw err;
    }
}

export const logoutUser = async () => {
    try{
        const response = await axiosInstance.post("/logout");
        return response.data;
    }
    catch(err){
        console.log("Error in logoutUser: ", err.message);
        throw err;
    }
}