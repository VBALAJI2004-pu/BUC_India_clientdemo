import express from "express";
import {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/membershipApplicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", submitApplication);
router.get("/", protect, getAllApplications);
router.patch("/:id/status", protect, updateApplicationStatus);
router.delete("/:id", protect, deleteApplication);

export default router;
