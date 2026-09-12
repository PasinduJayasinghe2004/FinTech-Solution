import { Response } from 'express';
import { db } from '../db/database.js';
import { AuthRequest } from '../middleware/auth.js';

export const getStudentDashboard = (req: AuthRequest, res: Response) => {
  const studentId = req.user?.studentId || 'STU-001';
  const student = db.getStudentById(studentId);
  const payments = db.getPaymentsByStudent(studentId);
  const notifications = db.getNotifications(studentId);

  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }

  // Calculate metrics
  const currentFee = 3000; // default monthly tuition fee
  const overduePayments = payments.filter((p) => p.status === 'Overdue');
  const overdueTotal = overduePayments.reduce((acc, curr) => acc + curr.amount, 0);
  const hasPaidThisMonth = payments.some((p) => p.month.includes('September') && p.status === 'Paid');

  // Outstanding = overdue amounts + current month fee if not yet paid
  const outstandingBalance = hasPaidThisMonth ? overdueTotal : overdueTotal + currentFee;

  return res.json({
    success: true,
    data: {
      student: {
        name: student.name,
        studentUniqueId: student.studentUniqueId,
        subject: student.subject,
        email: student.email,
      },
      summary: {
        currentPayment: hasPaidThisMonth ? 0 : currentFee,
        outstandingBalance,
        paymentStatus: hasPaidThisMonth ? 'Paid' : 'Pending',
        overdueCount: overduePayments.length,
        dueDate: 'September 15, 2026',
      },
      recentPayments: payments,
      notifications,
    },
  });
};

export const processPayment = (req: AuthRequest, res: Response) => {
  const studentId = req.user?.studentId || 'STU-001';
  const { amount, method } = req.body;

  if (!amount || !method) {
    return res.status(400).json({ success: false, message: 'Amount and method are required' });
  }

  const payment = db.addPayment(studentId, Number(amount), method);

  return res.json({
    success: true,
    message: 'Payment processed successfully',
    payment,
  });
};

export const getPaymentHistory = (req: AuthRequest, res: Response) => {
  const studentId = req.user?.studentId || 'STU-001';
  const payments = db.getPaymentsByStudent(studentId);

  return res.json({
    success: true,
    payments,
  });
};

export const updateStudentProfile = (req: AuthRequest, res: Response) => {
  const studentId = req.user?.studentId || 'STU-001';
  const updates = req.body;

  const updatedStudent = db.updateStudent(studentId, updates);
  if (!updatedStudent) {
    return res.status(404).json({ success: false, message: 'Student profile not found' });
  }

  return res.json({
    success: true,
    message: 'Student profile updated successfully',
    student: updatedStudent,
  });
};
