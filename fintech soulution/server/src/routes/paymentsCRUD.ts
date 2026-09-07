import { Router, Request, Response } from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET all payments
router.get('/', authenticateToken, (_req: Request, res: Response) => {
  const payments = db.getAllPayments();
  res.json({ success: true, count: payments.length, payments });
});

// GET single payment by ID
router.get('/:id', authenticateToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const payment = db.getAllPayments().find(p => p.id === id);
  if (!payment) {
    return res.status(404).json({ success: false, message: 'Payment record not found' });
  }
  res.json({ success: true, payment });
});

// POST create payment record
router.post('/', authenticateToken, (req: Request, res: Response) => {
  const { studentId, amount, method } = req.body;
  if (!studentId || !amount || !method) {
    return res.status(400).json({ success: false, message: 'studentId, amount, and method are required' });
  }
  const payment = db.addPayment(studentId, Number(amount), method);
  res.status(201).json({ success: true, message: 'Payment created successfully', payment });
});

// PUT update payment record
router.put('/:id', authenticateToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = db.updatePayment(id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Payment record not found' });
  }
  res.json({ success: true, message: 'Payment updated successfully', payment: updated });
});

// DELETE payment record
router.delete('/:id', authenticateToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = db.deletePayment(id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Payment record not found' });
  }
  res.json({ success: true, message: 'Payment deleted successfully' });
});

export default router;
