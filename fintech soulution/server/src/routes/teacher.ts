import { Router } from 'express';
import { getTeacherDashboard, getAllStudents, addStudent, getTeacherProfile, updateTeacherProfile } from '../controllers/teacherController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', authenticateToken, getTeacherDashboard);
router.get('/students', authenticateToken, getAllStudents);
router.post('/students', authenticateToken, addStudent);

router.get('/profile', authenticateToken, getTeacherProfile);
router.put('/profile', authenticateToken, updateTeacherProfile);

export default router;
