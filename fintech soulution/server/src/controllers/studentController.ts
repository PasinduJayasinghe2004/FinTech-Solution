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
  const currentFee = 3000;
  const overduePayments = payments.filter((p) => p.status === 'Overdue');
  const outstandingBalance = overduePayments.reduce((acc, curr) => acc + curr.amount, 3000);
  const hasPaidThisMonth = payments.some((p) => p.month.includes('September') && p.status === 'Paid');

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
        currentPayment: currentFee,
        outstandingBalance,
        paymentStatus: hasPaidThisMonth ? 'Paid This Month' : 'Pending',
        overdueCount: overduePayments.length + (hasPaidThisMonth ? 0 : 1),
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
