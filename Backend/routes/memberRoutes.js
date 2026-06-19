import express from "express";
import { getPublicMembers } from "../controllers/memberController.js";

const router = express.Router();

router.get("/public", getPublicMembers);

export default router;
