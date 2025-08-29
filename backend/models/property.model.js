import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    type: {
        type: String,
        enum: ["Appartment", "House", "PG", "Commercial", "other"],
        required: true
    },

    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        pincode: { type: String, trim: true },
        country: { type: String, default: "India" }
    },

    location: {
        type: {
            type: String,
            enum: ["Point"],   // GeoJSON type
            default: "Point"
        },
        coordinates: {
            type: [Number],   // [longitude, latitude]
            required: true
        }
    },

    size: {
        type: Number, // in square feet
        required: true
    },

    bedrooms: {
        type: Number,
        default: 0
    },

    bathrooms: {
        type: Number,
        default: 0
    },

    amenities: [
        {
            type: String,
            trim: true
        }
    ],

    rentAmount: {
        type: Number,
        required: true
    },

    securityDeposit: {
        type: Number,
        default: 0
    },

    paymentCycle: {
        type: String,
        enum: ["Monthly", "Quarterly", "Yearly"],
        default: "Monthly"
    },

    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "landlord",
        required: true
    },

    tenants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "tenant"
        }
    ],

    propertyDocuments: {
        ownershipProof: { type: String },   // Upload URL
        electricityBill: { type: String },
        taxReceipt: { type: String },
        propertyImage: [{ type: String }]  // Array of images
    },

    availabilityStatus: {
        type: String,
        enum: ["Available", "Rented", "Under Maintenance"],
        default: "Available"
    },

    listedDate: {
        type: Date,
        default: Date.now
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reviews"
        }
    ]
}, { timestamps: true });

const propertyModel = mongoose.model('Property', propertySchema);