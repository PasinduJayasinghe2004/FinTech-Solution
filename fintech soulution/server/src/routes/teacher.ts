import { Router } from 'express';
import { getTeacherDashboard, getAllStudents, addStudent } from '../controllers/teacherController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', authenticateToken, getTeacherDashboard);
router.get('/students', authenticateToken, getAllStudents);
router.post('/students', authenticateToken, addStudent);

export default router;
