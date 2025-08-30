import landlordModel from '../models/landlord.model.js';

export const registerLandlordController = async (req, res) => {
    try{
        const { name, phone, email, password } = req.body;

        const existingLandlord = await landlordModel.findOne({ email: email });
        if(existingLandlord){
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await landlordModel.hashPassword(password);
        const newLandlord = await landlordModel.create({
            name: name,
            phone: phone,
            email: email,
            password: hashedPassword
        });
        
        const token = newLandlord.generateAuthToken();
        const landlordResponse = newLandlord.toObject();
        delete landlordResponse.password;

        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.MODE === "production",
            sameSite: "strict"
        });

        return res.status(201).json({ success: true, message: "Landlord signedup successfully", landlord: newLandlord })
    }
    catch(err){
        console.log("Error in registerLandlordController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const loginLandlordController = async (req, res) => {
    try{
        const { email, password } = req.body;

        const existingLandlord = await landlordModel.findOne({ email: email }).select("+password");
        if(!existingLandlord){
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordCorrect = await existingLandlord.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(401).json({ success: false, message: "Invalid Email or Password" });
        }

        const token = existingLandlord.generateAuthToken();
        res.cookie("jwt", token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: process.env.MODE === "production",
            sameSite: "strict"
        })

        res.status(200).json({ success: true, message: "Login Successful", landlord: existingLandlord, token: token });
    }
    catch(err){
        console.log("Error in loginLandlordController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getLandlordProfileController = async (req, res) => {
    try{

    }
    catch(err){
        console.log("Erorr in getLandlordProfileController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}