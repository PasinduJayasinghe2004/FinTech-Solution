import { Router } from 'express';
import { login, registerTeacher } from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/register-teacher', registerTeacher);

export default router;
