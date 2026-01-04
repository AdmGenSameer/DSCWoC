import express from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import {
  submitContact,
  getAllContacts,
  updateContactStatus,
  deleteContact,
  getContactStats
} from '../controllers/contact.controller.js';

const router = express.Router();

// Public route - submit contact form
router.post('/submit', submitContact);

// Admin routes - require authentication + admin role
router.use(authenticate, requireAdmin);

router.get('/', getAllContacts);
router.get('/stats', getContactStats);
router.patch('/:id/status', updateContactStatus);
router.delete('/:id', deleteContact);

export default router;