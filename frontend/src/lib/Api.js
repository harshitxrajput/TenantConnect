import { axiosInstance } from "./Axios";

export const getAuthUser = async () => {
    const endpoints = [
        "/tenant/profile",
        "/landlord/profile"
    ];
  
    for (let endpoint of endpoints) {
        try {
            const res = await axiosInstance.get(endpoint);
            console.log(res.data);
            if (res.data) {
                return {
                    ...res.data,
                    role: endpoint.split("/")[1]
                };
            }
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 404) {
                continue;
            } else {
                throw err;
            }
        }
    }

  
    // No user found
    return null;
};

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