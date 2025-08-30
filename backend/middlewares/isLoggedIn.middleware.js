import jwt from 'jsonwebtoken';

import landlordModel from '../models/landlord.model.js';
import tenantModel from '../models/tenant.model.js';

export const isLoggedIn = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        let user;
        if(decoded.role === "landlord"){
            user = await landlordModel.findById(decoded._id).select("-password");
        }
        else if(decoded.role === "tenant"){
            user = await tenantModel.findById(decoded._id).select("-password");
        }
        else{
          return res.status(401).json({ success: false, message: "Unauthorized - Invalid role" });
        }

        if(!user){
            return res.status(401).json({ success: false, message: "Unauthorized - User not found" });
        }

        req.user = user;
        next();
    }
    catch(err){
        console.error("Error in isLoggedIn middleware:", err.message);
        return res.status(401).json({ success: false, message: "Unauthorized - Invalid or expired token" });
    }
}