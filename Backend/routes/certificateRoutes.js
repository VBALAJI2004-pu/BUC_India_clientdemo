import express from 'express';
import {
  getCertificates,
  createOrUpdateCertificate,
} from '../controllers/certificateController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// BUC owner admin only
router.get('/', protect, getCertificates);
router.post('/', protect, createOrUpdateCertificate);

export default router;
