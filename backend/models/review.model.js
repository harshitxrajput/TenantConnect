import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviewerModel",
        required: true
    },

    reviewerModel: {
        type: String,
        enum: ["Tenant", "Landlord"],
        required: true
    },

    reviewFor: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "reviewForModel",
        required: true
    },

    reviewForModel: {
        type: String,
        enum: ["Property", "Tenant", "Landlord"],
        required: true
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    comment: {
        type: String,
        trim: true
    },

    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    }
}, { timestamps: true });

const reviewModel = mongoose.model("Review", reviewSchema);

export default reviewModel;