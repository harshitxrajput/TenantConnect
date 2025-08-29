export const registerLandlordController = async (req, res) => {
    try{

    }
    catch(err){
        console.log("Error in registerLandlordController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}