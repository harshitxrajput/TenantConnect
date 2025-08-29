import mongoose from "mongoose";

const mantainenceRequestSchema = new mongoose.Schema({
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

    category: {
        type: String,
        enum: [
            "plumbing",
            "electrical",
            "appliance",
            "structural",
            "cleaning",
            "security",
            "other"
        ],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    attachments: [
        { type: String }
    ],

    status: {
        type: String,
        enum: ["submitted", "in_progress", "resolved", "rejected"],
        default: "submitted"
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "medium"
    },

    estimatedCost: { type: Number },

    actualCost: { type: Number },

    paidBy: {
        type: String,
        enum: ["tenant", "landlord", "shared"],
        default: "landlord"
    },

    requestDate: {
        type: Date,
        default: Date.now
    },

    resolvedDate: {
        type: Date
    },

    landlordNotes: {
        type: String
    },

    tenantFeedback: {
        type: String
    }
}, { timestamps: true });

const mantainenceRequestModel = mongoose.model("Maintainence-Request", mantainenceRequestSchema);

export default mantainenceRequestModel;