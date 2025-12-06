import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/token.js"

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