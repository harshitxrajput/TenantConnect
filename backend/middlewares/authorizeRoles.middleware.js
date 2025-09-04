export const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
        try{
            const user = req.user;
            if(!user){
                return res.status(401).json({ success: false, message: "Not authenticated" });
            }

            if(!allowedRoles.includes(user.role)){
                return res.status(403).json({ success: false, message: "Access denied: Insufficient permission" });
            }

            next();
        }
        catch(err){
            console.log("Error in authorizeRoles middleware: ", err.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}