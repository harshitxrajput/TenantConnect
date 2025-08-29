import mongoose from "mongoose";

const roommateRequestSchema = new mongoose.Schema({
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },

    requestedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },

    propertyPreferences: {
        city: String,
        budgetRange: {
            min: Number,
            max: Number
        },
        roomType: { type: String, enum: ["Private", "Shared", "Any"], default: "Any" }
    },

    lifestylePreferences: {
        smoking: Boolean,
        pets: Boolean,
        genderPreference: { type: String, enum: ["Male", "Female", "Any"], default: "Any" }
    },

    status: { type: String, enum: ["Active", "Matched", "Closed"], default: "Active" },

    message: {
        type: String
    },

    matchedProperty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }
}, { timestamps: true });

const roommateRequestModel = mongoose.model("Roommate-Request", roommateRequestSchema);

export default roommateRequestModel;