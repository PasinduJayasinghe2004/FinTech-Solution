import { Router } from 'express';
import { getStudentDashboard, processPayment, getPaymentHistory } from '../controllers/studentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Protect student routes with JWT token authentication
router.get('/dashboard', authenticateToken, getStudentDashboard);
router.post('/pay', authenticateToken, processPayment);
router.get('/history', authenticateToken, getPaymentHistory);

export default router;
