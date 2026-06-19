import express from "express";
import {
  getPublicProfiles,
  getAllProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/internationalProfileController.js";
import { protect } from "../middleware/authMiddleware.js";
import { contentUpload } from "../middleware/cloudinaryConfig.js";

const router = express.Router();

router.get("/public", getPublicProfiles);
router.get("/", protect, getAllProfiles);
router.post("/", protect, contentUpload.single("profilePhoto"), createProfile);
router.put("/:id", protect, contentUpload.single("profilePhoto"), updateProfile);
router.delete("/:id", protect, deleteProfile);

export default router;
