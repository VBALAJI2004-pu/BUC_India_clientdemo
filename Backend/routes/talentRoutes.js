import express from "express";
import { submitTalent, getAllTalents, deleteTalent } from "../controllers/talentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { talentUpload } from "../middleware/cloudinaryConfig.js";

const router = express.Router();

// Public: submit talent registration with visual assets
router.post(
  "/",
  talentUpload.fields([
    { name: "talentImage", maxCount: 1 },
    { name: "talentVideo", maxCount: 1 }
  ]),
  submitTalent
);

// Admin only: get all talent registrations
router.get("/", protect, getAllTalents);

// Admin only: delete a talent registration
router.delete("/:id", protect, deleteTalent);

export default router;
