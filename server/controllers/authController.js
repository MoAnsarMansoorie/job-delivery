import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/token.js"
import { sendOtpMail } from "../utils/mail.js"

export const registerController = async (req, res) => {
    try {
        const {fullName, email, password, mobile, role} = req.body

        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        };

        if(password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            mobile,
            role
        });

        const token = generateToken(user._id);
        res.cookie("token",token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
            token
        });
        
    } catch (error) {
        console.log(`Error in register`, error);
        return res.status(500).json({
            success: false,
            message: "Server Error in register"
        });
    }
}


export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        };

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        };

        const token = generateToken(user._id);
        res.cookie("token",token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "User loggedIn successfully",
            user,
            token
        });
        
    } catch (error) {
        console.log(`Error in login`, error);
        return res.status(500).json({
            success: false,
            message: "Server Error in login"
        });
    }
}

export const logoutController = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        console.log(`Error in logout`, error);
        return res.status(500).json({   
            success: false,
            message: "Server Error in logout"
        });
    };
};

export const sendOtpController = async (req, res) => {
    try {
        const {email} = req.body

        let user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        };

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5*60*1000;
        user.isOtpVerified = false;

        await user.save();

        await sendOtpMail(email, otp);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp
        });
        
    } catch (error) {
        console.log(`Error in sendOtp`, error);
        return res.status(500).json({   
            success: false,
            message: "Server Error in sendOtp",
            error
        });
    }
}

export const verifyOtpController = async (req, res) => {
    try {
        const {email, otp} = req.body

        let user = await User.findOne({email})
        if(!user || user.resetOtp!=otp || user.otpExpires<Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Invalid/Expired OTP"
            })
        };

        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        })
        
    } catch (error) {
        console.log(`Error in verifyOtp`, error);
        return res.status(500).json({   
            success: false,
            message: "Server Error in verifyOtp",
            error
        });
    }
}

export const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword} = req.body

        let user = await User.findOne({email});
        if(!user || !user.isOtpVerified){
            return res.status(400).json({
                success: false,
                message: "User doesn't exist/OTP verification required"
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = newPassword;
        user.isOtpVerified = false;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully.",
            user
        })
        
    } catch (error) {
        console.log(`Error in resetPassword`, error);
        return res.status(500).json({   
            success: false,
            message: "Server Error in resetPassword",
            error
        });
    }
}