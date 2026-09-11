import { Router, Request, Response } from 'express';
import { db } from '../db/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Send message / notification to student + email/sms simulation log
router.post('/send', authenticateToken, (req: Request, res: Response) => {
  const { studentId, title, message, channel } = req.body;

  if (!studentId || !message) {
    return res.status(400).json({ success: false, message: 'Student ID and message content are required' });
  }

  const student = db.getStudentById(studentId);
  const targetId = student ? student.studentUniqueId : studentId;
  const msgTitle = title || 'Message from Teacher';

  // 1. Create In-App Notification entry
  const notif = db.addNotification(targetId, msgTitle, message, 'SYSTEM');

  // 2. Simulate External Dispatch (Email / SMS)
  const dispatchChannel = channel || 'Email & SMS';
  const timestamp = new Date().toISOString();
  console.log(`[DISPATCH SIMULATION - ${dispatchChannel.toUpperCase()}]`);
  console.log(`Time: ${timestamp}`);
  console.log(`To Student: ${student ? `${student.name} (${student.email} / ${student.phone})` : targetId}`);
  console.log(`Subject: ${msgTitle}`);
  console.log(`Body: ${message}`);
  console.log(`------------------------------------`);

  return res.json({
    success: true,
    message: `Message dispatched successfully via ${dispatchChannel}!`,
    deliveryDetails: {
      notificationId: notif.id,
      studentId: targetId,
      studentName: student ? student.name : targetId,
      channelSent: dispatchChannel,
      simulatedEmail: student ? student.email : 'sent',
      simulatedSms: student ? student.phone : 'sent',
      sentAt: timestamp
    }
  });
});

export default router;
