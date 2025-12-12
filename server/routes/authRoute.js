import express from "express";
import { loginController, registerController, logoutController, sendOtpController, verifyOtpController, resetPasswordController } from "../controllers/authController.js";

const router = express.Router();

// Register Route
router.post("/register", registerController); 
// Login Route
router.post("/login", loginController);
// Logout Route
router.get("/logout", logoutController);

router.post("/send-otp", sendOtpController);
router.post("/verify-otp", verifyOtpController);
router.post("/reset-password", resetPasswordController);

export default router;