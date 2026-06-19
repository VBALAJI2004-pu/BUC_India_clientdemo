import express from "express";
import {
  getPublicInfluencers,
  getAllInfluencers,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer,
} from "../controllers/safetyInfluencerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { contentUpload } from "../middleware/cloudinaryConfig.js";

const router = express.Router();

router.get("/public", getPublicInfluencers);
router.get("/", protect, getAllInfluencers);
router.post("/", protect, contentUpload.single("profilePhoto"), createInfluencer);
router.put("/:id", protect, contentUpload.single("profilePhoto"), updateInfluencer);
router.delete("/:id", protect, deleteInfluencer);

export default router;
