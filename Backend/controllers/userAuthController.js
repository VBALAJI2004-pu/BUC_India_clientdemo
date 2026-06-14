import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcryptjs";

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Verify OTP one last time
    const otpRecord = await Otp.findOne({
      email: email.toLowerCase(),
      otp,
      type: "forgot_password",
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Delete OTP record
    await Otp.deleteMany({
      email: email.toLowerCase(),
      type: "forgot_password",
    });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
};
