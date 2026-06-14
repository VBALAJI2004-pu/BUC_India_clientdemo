import express from "express";
import { requestOTP, verifyOTP } from "../controllers/otpController.js";

const router = express.Router();

router.post("/send", requestOTP);
router.post("/verify", verifyOTP);

export default router;
