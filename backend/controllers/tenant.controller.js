import tenantModel from "../models/tenant.model.js";

export const registerTenantController = async (req, res) => {
    try{
        const { name, phone, email, password } = req.body;

        const existingTenant = await tenantModel.findOne({ email: email });
        if(existingTenant){
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await tenantModel.hashPassword(password);
        const newTenant = await tenantModel.create({
            name: name,
            phone: phone,
            email: email,
            password: hashedPassword
        });

        const token = newTenant.generateAuthToken();
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.MODE === "production",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({ success: true, message: "Tenant signedup successfully", newTenant: newTenant, token: token });
    }
    catch(err){
        console.log("Error in registerTenantController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const loginTenantController = async (req, res) => {
    try{
        const { email, password } = req.body;

        const existingTenant = await tenantModel.findOne({ email: email });
        if(!existingTenant){
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await existingTenant.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(401).json({ success: false, message: "Invalid Email or Password" });
        }

        const token = existingTenant.generateAuthToken();
        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.MODE === "production",
            sameSite: "strict"
        });

        res.status(200).json({ success: true, message: "Login successful", tenant: existingTenant, token: token });
    }
    catch(err){
        console.log("Error in loginTenantController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getTenantProfileController = async (req, res) => {
    try{
        const userId = req.user?._id;

        const tenantProfile = await tenantModel.findById(userId);
        if(!tenantProfile){
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, profile: tenantProfile });
    }
    catch(err){
        console.log("Error in getTenantProfileController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}