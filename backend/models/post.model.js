import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "authorModel",
        required: true
    },

    authorModel: {
        type: String,
        enum: ["Tenant", "Landlord"],
        required: true
    },

    content: {
        type: String,
        required: true
    },

    images: [String],

    likes: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, refPath: "likesModel" },
            likesModel: { type: String, enum: ["Tenant", "Landlord"] }
        }
    ],

    comment: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, refPath: "commentModel" },
            commentModel: { type: String, enum: ["Tenant", "Landlord"] },
            comment: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],

    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    }
}, { timestamps: true });

const postModel = mongoose.model("Post", postSchema);

export default postModel;