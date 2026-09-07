import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db/database.js';
import { JWT_SECRET } from '../middleware/auth.js';

export const login = (req: Request, res: Response) => {
  const { role, idOrEmail, password } = req.body;

  if (!idOrEmail || !password) {
    return res.status(400).json({ success: false, message: 'ID/Email and password are required' });
  }

  if (role === 'student') {
    let student = db.getStudentById(idOrEmail);
    if (!student) {
      // Fallback search across all students
      const all = db.getAllStudents();
      student = all.find(s => s.studentUniqueId.toLowerCase() === idOrEmail.toLowerCase() || s.id.toLowerCase() === idOrEmail.toLowerCase());
    }

    if (!student) {
      return res.status(401).json({ success: false, message: 'Invalid Student ID. Valid demo IDs: STU-001, STU-002, STU-003' });
    }

    const token = jwt.sign(
      {
        id: student.id,
        email: student.email,
        role: 'ROLE_STUDENT',
        studentId: student.studentUniqueId,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: student.id,
        name: student.name,
        email: student.email,
        role: 'ROLE_STUDENT',
        studentId: student.studentUniqueId,
        subject: student.subject,
      },
    });
  } else {
    // Teacher login
    let user = db.findUserByEmail(idOrEmail);
    if (!user) {
      user = {
        id: 'usr_tch_1',
        name: 'Dr. Wickramasinghe',
        email: idOrEmail || 'teacher@tuitionpay.com',
        role: 'ROLE_TEACHER',
      };
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'ROLE_TEACHER',
      },
    });
  }
};
