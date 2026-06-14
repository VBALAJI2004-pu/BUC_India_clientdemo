import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/cloudinaryConfig.js';

const router = express.Router();

router.get('/', getEvents);
router.post('/', protect, upload.single('banner'), createEvent);
router.put('/:id', protect, upload.single('banner'), updateEvent);
router.delete('/:id', protect, deleteEvent);

export default router;
