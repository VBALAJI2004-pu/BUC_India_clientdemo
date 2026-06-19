import express from "express";
import {
  getCategories,
  getTopics,
  getTopicById,
  createTopic,
  createReply,
  toggleTopicLike,
  toggleReplyLike,
  getRecentDiscussions,
  adminDeleteTopic,
  adminUpdateTopic,
  adminDeleteReply,
} from "../controllers/forumController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/topics", getTopics);
router.get("/topics/recent", getRecentDiscussions);
router.get("/topics/:id", getTopicById);
router.post("/topics", createTopic);
router.post("/topics/:id/replies", createReply);
router.post("/topics/:id/like", toggleTopicLike);
router.post("/replies/:id/like", toggleReplyLike);

router.delete("/topics/:id", protect, adminDeleteTopic);
router.patch("/topics/:id", protect, adminUpdateTopic);
router.delete("/replies/:id", protect, adminDeleteReply);

export default router;
