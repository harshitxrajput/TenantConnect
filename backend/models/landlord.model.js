import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const landlordSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "landlord"
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },

    phone: {
        type: Number,
        required: true,
        match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"],
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false
    },

    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        pincode: { type: String, trim: true },
        country: { type: String, deafult: "India" }
    },

    documents: {
        aadharCard: { type: String },
        panCard: { type: String },
        ownershipProof: [ { type: String } ],
        profileImage: { type: String }
    },

    properties: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property"
        }
    ],

    paymentDetails: {
        bankName: { type: String, trim: true },
        accountHolder: { type: String, trim: true },
        accountNumber: { type: String, trim: true },
        ifscCode: { type: String, trim: true },
        upiId: { type: String, trim: true },
        preferredMethod: {
            type: String,
            enum: ["Bank Transfer", "UPI", "Cash"],
            default: "UPI"
        }
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

landlordSchema.statics.hashPassword = async function(password){
    return bcrypt.hash(password, 12);
}

landlordSchema.methods.comparePassword = function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
}

landlordSchema.methods.generateAuthToken = function(){
    return jwt.sign({ _id: this._id, role: this.role, email: this.email }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
}

const landlordModel = mongoose.model("Landlord", landlordSchema);

export default landlordModel;