import express from "express";
import { loginController, registerController, logoutController } from "../controllers/authController.js";

const router = express.Router();

// Register Route
router.post("/register", registerController); 
// Login Route
router.post("/login", loginController);
// Logout Route
router.post("/logout", logoutController);

export default router;