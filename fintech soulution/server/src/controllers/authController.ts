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
    const student = db.getStudentById(idOrEmail);
    const user = db.findUserByStudentId(idOrEmail);

    if (!user || !student) {
      return res.status(401).json({ success: false, message: 'Invalid Student ID or credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        studentId: student.studentUniqueId,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: student.name,
        email: student.email,
        role: 'ROLE_STUDENT',
        studentId: student.studentUniqueId,
        subject: student.subject,
      },
    });
  } else {
    // Teacher login
    const user = db.findUserByEmail(idOrEmail);

    if (!user || user.role !== 'ROLE_TEACHER') {
      return res.status(401).json({ success: false, message: 'Invalid Teacher email or credentials' });
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
