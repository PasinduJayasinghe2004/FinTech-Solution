import { Request, Response } from 'express';
import { db } from '../db/database.js';

export const getTeacherDashboard = (_req: Request, res: Response) => {
  const students = db.getAllStudents();
  const allPayments = db.getAllPayments();

  const totalStudents = students.length;
  const paidThisMonth = allPayments
    .filter((p) => p.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const outstandingBalance = allPayments
    .filter((p) => p.status === 'Overdue')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const pendingPayments = allPayments.filter((p) => p.status === 'Pending' || p.status === 'Overdue').length;

  return res.json({
    success: true,
    metrics: {
      totalStudents,
      paidThisMonth,
      outstandingBalance,
      pendingPayments,
    },
    recentTransactions: allPayments.slice(0, 5),
    students,
  });
};

export const getAllStudents = (_req: Request, res: Response) => {
  const students = db.getAllStudents();
  return res.json({ success: true, students });
};

export const addStudent = (req: Request, res: Response) => {
  const { name, email, subject, phone, teacherId } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  const newStudent = db.addStudent({
    userId: `usr_${Date.now()}`,
    teacherId: teacherId || 'usr_tch_1',
    name,
    email,
    subject: subject || 'General Tuition',
    phone: phone || '+94 77 000 0000',
    status: 'ACTIVE',
  });

  return res.status(201).json({
    success: true,
    message: 'Student created successfully',
    student: newStudent,
  });
};

export const getTeacherProfile = (req: Request, res: Response) => {
  const teacherId = (req as any).user?.id || 'usr_tch_1';
  const profile = db.getTeacherProfile(teacherId);
  return res.json({ success: true, profile });
};

export const updateTeacherProfile = (req: Request, res: Response) => {
  const teacherId = (req as any).user?.id || 'usr_tch_1';
  const updates = req.body;
  const updatedProfile = db.updateTeacherProfile(teacherId, updates);
  return res.json({
    success: true,
    message: 'Teacher profile updated successfully',
    profile: updatedProfile,
  });
};
