import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    rentalAgreement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RentalAgreement", // ✅ match the exact model name
        required: true
    },

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

    // Payment Details
    amount: {
        type: Number,
        required: true,
    },

    currency: {
        type: String,
        enum: ["INR", "USD", "EUR"],
        default: "INR",
    },

    dueDate: {
        type: Date,
        required: true,
    },

    paymentDate: {
        type: Date,
    },

    paymentMethod: {
        type: String,
        enum: [
            "bank_transfer",
            "upi",
            "credit_card",
            "debit_card",
            "cash",
            "cheque",
            "other"
        ],
        default: "bank_transfer",
    },

    transactionId: {
        type: String,
        unique: true,
        sparse: true,
    },

    // Payment Status
    status: {
        type: String,
        enum: ["pending", "paid", "overdue", "failed", "refunded"],
        default: "pending",
    },

    // Invoice / Receipt
    receiptFile: {
        type: String,
    },
    receiptUrl: {
        type: String,
    }
}, { timestamps: true });

paymentSchema.index({ tenant: 1, landlord: 1, property: 1 });
paymentSchema.index({ transactionId: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
