import express from 'express';
import { login, logout, checkAuth } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', protect, checkAuth);

export default router;
