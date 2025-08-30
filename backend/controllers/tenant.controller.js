export const registerTenantController = async (req, res) => {
    try{

    }
    catch(err){
        console.log("Error in registerTenantController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const loginTenantController = async (req, res) => {
    try{

    }
    catch(err){
        console.log("Error in loginTenantController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getTenantProfileController = async (req, res) => {
    try{

    }
    catch(err){
        console.log("Error in getTenantProfileController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}