import { Router } from 'express';
import { getStudentDashboard, processPayment, getPaymentHistory, updateStudentProfile } from '../controllers/studentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Protect student routes with JWT token authentication
router.get('/dashboard', authenticateToken, getStudentDashboard);
router.post('/pay', authenticateToken, processPayment);
router.get('/history', authenticateToken, getPaymentHistory);
router.put('/profile', authenticateToken, updateStudentProfile);

export default router;
