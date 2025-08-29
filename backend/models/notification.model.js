import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "userType",
        required: true
    },

    userType: {
        type: String,
        enum: ["Tenant", "Landlord"],
        required: true
    },

    title: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "payment_due",
            "payment_received",
            "lease_signed",
            "lease_expiring",
            "maintenance_request",
            "maintenance_update",
            "general"
        ],
        default: "general"
    },

    link: {
        type: String
    },

    isRead: {
        type: Boolean,
        default: false
    },

    sentAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const notificationModel = mongoose.model("Notification", notificationSchema);

export default notificationModel;