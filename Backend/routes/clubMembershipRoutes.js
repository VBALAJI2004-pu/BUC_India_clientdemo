import express from 'express';
import {
  getMyClub,
  joinClub,
  leaveClub,
  getAllMemberships,
} from '../controllers/clubMembershipController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: user-centric endpoints
router.get('/me', getMyClub);
router.post('/:clubId/join', joinClub);
router.post('/:clubId/leave', leaveClub);

// Admin: view all memberships & exit reasons
router.get('/', protect, getAllMemberships);

export default router;
