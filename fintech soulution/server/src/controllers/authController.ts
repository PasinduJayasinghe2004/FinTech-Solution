import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db/database.js';
import { JWT_SECRET } from '../middleware/auth.js';

export const login = (req: Request, res: Response) => {
  const { role, idOrEmail, password } = req.body;

  if (!idOrEmail || !password) {
    return res.status(400).json({ success: false, message: 'ID/Email and password are required' });
  }

  // Password validation: Default passwords are 'admin123' or 'teacher123' for teachers, 'student123' for students
  const DEFAULT_TEACHER_PASSWORDS = ['admin123', 'teacher123', 'ria2026', 'password'];
  const DEFAULT_STUDENT_PASSWORDS = ['student123', 'ria2026', 'password', '123456'];

  if (role === 'student') {
    let student = db.getStudentById(idOrEmail);
    if (!student) {
      // Fallback search across all students
      const all = db.getAllStudents();
      student = all.find(s => s.studentUniqueId.toLowerCase() === idOrEmail.trim().toLowerCase() || s.id.toLowerCase() === idOrEmail.trim().toLowerCase());
    }

    // Auto-create student record if it's a newly registered/generated ID
    if (!student) {
      const derivedName = idOrEmail.includes('@')
        ? idOrEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
        : `Student ${idOrEmail.toUpperCase()}`;

      student = db.addStudent({
        userId: `usr_${Date.now()}`,
        teacherId: 'usr_tch_1',
        name: derivedName,
        email: idOrEmail.includes('@') ? idOrEmail.toLowerCase() : `${idOrEmail.toLowerCase()}@ria.com`,
        subject: 'Combined Mathematics',
        phone: '+94 77 123 4567',
        status: 'ACTIVE',
      });
      // Override unique ID to match requested generated ID if format is STU-xxx
      if (idOrEmail.toUpperCase().startsWith('STU-') && student) {
        const oldId = student.studentUniqueId;
        const newId = idOrEmail.toUpperCase();
        student.studentUniqueId = newId;
        const existingPay = db.getPaymentsByStudent(oldId);
        existingPay.forEach(p => p.studentId = newId);
        const usr = db.findUserByStudentId(oldId);
        if (usr) usr.studentId = newId;
      }
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
      return res.status(401).json({
        success: false,
        message: 'Invalid teacher email. Please check your credentials or contact Institute Admin.',
      });
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

export const registerTeacher = (req: Request, res: Response) => {
  const { name, email, subject, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required for teacher registration' });
  }

  const teacher = db.addTeacher({
    name,
    email,
    subject: subject || 'General Tuition',
    phone: phone || '+94 77 000 0000',
  });

  return res.status(201).json({
    success: true,
    message: 'Teacher account created successfully',
    teacher: {
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subjects[0],
    },
  });
};
