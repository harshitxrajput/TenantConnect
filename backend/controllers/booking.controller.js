import bookingModel from "../models/booking.model";
import propertyModel from "../models/property.model";

export const createBookingRequestController = async (req, res) => {
    try{
        const tenantId = req.user?._id;
        const{ propertyId } = req.params;
        const {
            startDate,
            endDate,
            rentAmount,
            securityDeposit,
            specialRequests
        } = req.body;

        const property = await propertyModel.findById(propertyId).populate("landlord");
        if(!property){
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        const landlordId = property.landlord._id;

        const existingBooking = await bookingModel.findOne({
            tenant: tenantId,
            property: propertyId,
            status: "pending"
        });
        if(existingBooking){
            return res.status(400).json({ success: false, message: "You already have a pending booking for this property" });
        }

        const booking = await bookingModel.create({
            tenant: tenantId,
            landlord: landlordId,
            property: propertyId,
            startDate: startDate,
            endDate: endDate,
            rentAmount: rentAmount,
            securityDeposit: securityDeposit,
            specialRequests: specialRequests
        });

        res.status(201).json({ success: true, message: "Booking requested successfully", booking: booking });
    }
    catch(err){
        console.log("Error in createBookingRequestController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getTenantRequestsController = async (req, res) => {
    try{
        const tenantId = req.user?._id;
        
        const bookings = await bookingModel.find({ tenant: tenantId })
            .populate("property", "title address rentAmount")
            .populate("landlord", "name email phone")
            .sort({ createdAt: -1 });

        if(bookings.length === 0){
            return res.status(200).json({ success: true, message: "No requests for now" });
        }

        res.status(200).json({ success: true, count: bookings.length, bookings: bookings });
    }
    catch(err){
        console.log("Error in getTenantRequestsController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const cancelTenantBookingController = async (req, res) => {
    try{
        const tenantId = req.user?._id;
        const { bookingId } = req.params;

        const booking = await bookingModel.findOne({ tenant: tenantId, _id: bookingId });
        if(!booking){
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if(booking.status !== "pending"){
            return res.status(400).json({ success: false, message: `Cannot cancel a ${booking.status} booking` });
        }

        booking.status = "cancelled";
        await booking.save();

        res.status(200).json({ success: true, message: "Booking request cancelled successfully", booking: booking });
    }
    catch(err){
        console.log("Error in cancelTenantBookingController: ", err.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}