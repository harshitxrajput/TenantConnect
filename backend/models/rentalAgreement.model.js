import mongoose from "mongoose";

const rentalAgreementSchema = new mongoose.Schema({
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Landlord",
        required: true
    },

    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true
    },

    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true
    },

    // Agreement Details
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    rentAmount: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      required: true,
      default: 0,
    },

    paymentFrequency: {
      type: String,
      enum: ["monthly", "quarterly", "yearly"],
      default: "monthly",
    },

    paymentDueDate: {
      type: Number, // e.g., 5 -> rent due on 5th of each month
      default: 5,
    },

    // Agreement Status
    status: {
      type: String,
      enum: ["active", "terminated", "expired", "pending"],
      default: "pending",
    },

    // Documents
    agreementDocuments: [
      {
        fileName: String,
        fileUrl: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    // Signatures
    landlordSigned: {
      type: Boolean,
      default: false,
    },

    tenantSigned: {
      type: Boolean,
      default: false,
    },
}, { timestamps: true });

const rentalAgreementModel = mongoose.model("Rental-Agreement", rentalAgreementSchema);