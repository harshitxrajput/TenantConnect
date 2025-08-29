import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [{
        participantId: { type: mongoose.Schema.Types.ObjectId, refPath: "participants.participantModel", required: true },
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

const conversationModel = mongoose.model("Conversation", conversationSchema);

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },

    sender: {
        senderId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "sender.senderModel" },
        senderModel: { type: String, required: true, enum: ["Tenant", "Landlord"] }
    },

    messageType: {
        type: String,
        enum: ["text", "image", "file"],
        default: "text"
    },

    text: {
        type: String,
        trim: true
    },

    mediaUrl: {
        type: String
    },

    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const messageModel = mongoose.model("Message", messageSchema);

export {conversationModel, messageModel};