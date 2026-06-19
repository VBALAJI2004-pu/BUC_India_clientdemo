import express from "express";
import { getPublicUsers } from "../controllers/userDirectoryController.js";

const router = express.Router();

router.get("/public", getPublicUsers);

export default router;
