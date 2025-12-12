import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "owner", "deliveryBoy"],
        required: true
    },
    resetOtp: {
        type: String,
        default: null
    },
    otpExpires: {
        type: Date,
        default: null
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const User = mongoose.model("User", userSchema)
export default User;