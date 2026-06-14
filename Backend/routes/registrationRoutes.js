import express from 'express';
import { createRegistration, getRegistrations, deleteRegistration } from '../controllers/registrationController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/cloudinaryConfig.js';

const router = express.Router();

router.post('/', upload.fields([{ name: 'licenseImage', maxCount: 1 }, { name: 'profileImage', maxCount: 1 }]), createRegistration);
router.get('/', protect, getRegistrations);
router.get('/user', getRegistrations);
router.delete('/:id', protect, deleteRegistration);

export default router;
