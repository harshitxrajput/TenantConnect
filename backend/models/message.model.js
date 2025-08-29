import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{
        participantId: { type: mongoose.Schema.Types.ObjectId, refPath: "userModel", required: true },
        participantModel: { type: String, enum: ["Tenant", "Landlord"], required: true }
    }],

    isGroup: {
        type: Boolean,
        default: false,
    },

    groupName: {
        type: String,
        required: function(){
            return this.isGroup;
        }
    },

    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
}, { timestamps: true });