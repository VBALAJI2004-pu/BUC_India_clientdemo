import express from "express";
import { resetPassword } from "../controllers/userAuthController.js";

const router = express.Router();

// Forgot password is also handled by OTP routes (sending OTP)
// This route is for the actual password reset after verifying OTP
router.post("/reset-password", resetPassword);

export default router;
