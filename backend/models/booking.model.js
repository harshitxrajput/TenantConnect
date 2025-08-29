import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },

    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Landlord",
        required: true
    },

    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "cancelled", "completed"],
        default: "pending"
    },

    rentAmount: {
        type: Number,
        required: true
    },

    securityDeposit: {
        type: Number,
        default: 0
    },

    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "refunded"],
        default: "unpaid"
    },

    specialRequests: {
        type: String,
        trim: true
    },
}, { timestamps: true });

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;