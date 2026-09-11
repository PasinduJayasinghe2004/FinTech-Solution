import { Router, Request, Response } from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/analytics — returns computed analytics from August 2026 onwards
router.get('/', authenticateToken, (_req: Request, res: Response) => {
  const allPayments = db.getAllPayments();
  const allStudents = db.getAllStudents();

  // Filter payments from August 2026 onwards
  const MONTHS_ORDER = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fromMonth = 'August';
  const fromYear = 2026;

  const recentPayments = allPayments.filter(p => {
    const parts = p.month?.split(' ') || [];
    const month = parts[0];
    const year = parseInt(parts[1] || '0');
    if (year > fromYear) return true;
    if (year === fromYear) return MONTHS_ORDER.indexOf(month) >= MONTHS_ORDER.indexOf(fromMonth);
    return false;
  });

  // KPI calculations
  const totalRevenue = recentPayments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalStudents = allStudents.length;

  const paidCount = recentPayments.filter(p => p.status === 'Paid').length;
  const pendingCount = recentPayments.filter(p => p.status === 'Pending').length;
  const overdueCount = recentPayments.filter(p => p.status === 'Overdue').length;
  const totalPayments = recentPayments.length;

  const collectionRate = totalPayments > 0
    ? Math.round((paidCount / totalPayments) * 100)
    : 0;

  const outstandingRevenue = recentPayments
    .filter(p => p.status === 'Pending' || p.status === 'Overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  // Monthly breakdown (group by month label)
  const monthlyMap: Record<string, { paid: number; pending: number; overdue: number; revenue: number }> = {};
  recentPayments.forEach(p => {
    const label = p.month || 'Unknown';
    if (!monthlyMap[label]) monthlyMap[label] = { paid: 0, pending: 0, overdue: 0, revenue: 0 };
    if (p.status === 'Paid') { monthlyMap[label].paid++; monthlyMap[label].revenue += p.amount; }
    if (p.status === 'Pending') monthlyMap[label].pending++;
    if (p.status === 'Overdue') monthlyMap[label].overdue++;
  });

  const monthlyBreakdown = Object.entries(monthlyMap).map(([month, data]) => {
    const total = data.paid + data.pending + data.overdue;
    return {
      month,
      paid: data.paid,
      pending: data.pending,
      overdue: data.overdue,
      revenue: data.revenue,
      collectionRate: total > 0 ? Math.round((data.paid / total) * 100) : 0,
    };
  });

  // Students requiring attention (pending/overdue)
  const attentionStudentIds = [...new Set(
    recentPayments.filter(p => p.status === 'Overdue' || p.status === 'Pending').map(p => p.studentId)
  )];

  const studentsRequiringAttention = attentionStudentIds.map(sid => {
    const student = allStudents.find(s => s.studentUniqueId === sid);
    const studentPayments = recentPayments.filter(p => p.studentId === sid);
    const overdue = studentPayments.filter(p => p.status === 'Overdue');
    const pending = studentPayments.filter(p => p.status === 'Pending');
    const outstanding = [...overdue, ...pending].reduce((sum, p) => sum + p.amount, 0);
    return {
      studentId: sid,
      name: student?.name || 'Unknown',
      status: overdue.length > 0 ? 'OVERDUE' : 'PENDING',
      outstanding,
      overdueCount: overdue.length,
    };
  });

  res.json({
    success: true,
    fromMonth: `${fromMonth} ${fromYear}`,
    kpi: {
      totalRevenue,
      totalStudents,
      paidCount,
      pendingCount,
      overdueCount,
      collectionRate,
      outstandingRevenue,
      paidPercent: totalPayments > 0 ? Math.round((paidCount / totalPayments) * 100) : 0,
      pendingPercent: totalPayments > 0 ? Math.round((pendingCount / totalPayments) * 100) : 0,
      overduePercent: totalPayments > 0 ? Math.round((overdueCount / totalPayments) * 100) : 0,
    },
    monthlyBreakdown,
    studentsRequiringAttention,
  });
});

export default router;
