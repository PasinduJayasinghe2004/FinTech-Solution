import { Router, Request, Response } from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET all students
router.get('/', authenticateToken, (_req: Request, res: Response) => {
  const students = db.getAllStudents();
  res.json({ success: true, count: students.length, students });
});

// GET single student by ID
router.get('/:id', authenticateToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const student = db.getStudentById(id);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  res.json({ success: true, student });
});

// POST create new student
router.post('/', authenticateToken, (req: Request, res: Response) => {
  const { name, email, subject, phone, teacherId } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }
  const student = db.addStudent({
    userId: `usr_${Date.now()}`,
    teacherId: teacherId || 'usr_tch_1',
    name,
    email,
    subject: subject || 'General Tuition',
    phone: phone || '+94 77 000 0000',
    status: 'ACTIVE',
  });
  res.status(201).json({ success: true, message: 'Student created successfully', student });
});

// PUT update student
router.put('/:id', authenticateToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = db.updateStudent(id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  res.json({ success: true, message: 'Student updated successfully', student: updated });
});

// DELETE student
router.delete('/:id', authenticateToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = db.deleteStudent(id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  res.json({ success: true, message: 'Student deleted successfully' });
});

export default router;
