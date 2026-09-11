import { logoImg } from '@/assets/logo';
import React, { useState } from 'react';
import { apiService } from '../services/api';

interface NotificationsPageProps {
  teacherName?: string;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToStudents?: () => void;
  onNavigateToPayments?: () => void;
  onNavigateToAnalytics?: () => void;
}

interface NotificationItem {
  id: string;
  type: 'overdue' | 'received' | 'due_soon' | 'student_added' | 'reminder_delivered' | 'report_ready';
  title: string;
  description: string;
  time: string;
  unread: boolean;
  actionType?: 'send_reminder' | 'view_student' | 'view_payment' | 'view_students' | 'view_report';
}

const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    type: 'overdue',
    title: 'Payment Overdue',
    description: 'Amal Fernando (STU-024) has an overdue payment of Rs. 3,000.',
    time: '2 hours ago',
    unread: true,
    actionType: 'send_reminder'
  },
  {
    id: 'n2',
    type: 'received',
    title: 'Payment Received',
    description: 'Kasun Perera (STU-001) completed a payment of Rs. 3,000.',
    time: '10 minutes ago',
    unread: true,
    actionType: 'view_payment'
  },
  {
    id: 'n3',
    type: 'due_soon',
    title: 'Payment Due Soon',
    description: '12 student payments are due within the next 3 days.',
    time: 'Today',
    unread: true,
    actionType: 'view_students'
  },
  {
    id: 'n4',
    type: 'received',
    title: 'Payment Received',
    description: 'Sanduni Jayasuriya (STU-014) completed a payment of Rs. 3,500.',
    time: '3 hours ago',
    unread: true,
    actionType: 'view_payment'
  },
  {
    id: 'n5',
    type: 'overdue',
    title: 'Payment Overdue',
    description: 'Nimal Silva (STU-052) has an overdue payment of Rs. 6,000.',
    time: '5 hours ago',
    unread: true,
    actionType: 'send_reminder'
  },
  {
    id: 'n6',
    type: 'student_added',
    title: 'New Student Added',
    description: 'Nimal Silva was successfully added to your student list.',
    time: 'Yesterday',
    unread: false,
    actionType: 'view_student'
  },
  {
    id: 'n7',
    type: 'reminder_delivered',
    title: 'Reminder Delivered',
    description: 'Your bulk reminder was delivered to 12 students.',
    time: 'Yesterday',
    unread: false
  },
  {
    id: 'n8',
    type: 'report_ready',
    title: 'Monthly Report Ready',
    description: 'Your September revenue report is ready to download.',
    time: '2 days ago',
    unread: false,
    actionType: 'view_report'
  }
];

export default function NotificationsPage({
  teacherName = "Mr. Anil",
  onLogout,
  onNavigateToDashboard,
  onNavigateToStudents,
  onNavigateToPayments,
  onNavigateToAnalytics
}: NotificationsPageProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'payments' | 'analytics' | 'notifications' | 'settings'>('notifications');
  const [filterCategory, setFilterCategory] = useState<'all' | 'unread' | 'payments' | 'reminders' | 'system'>('all');
  const [notificationsList, setNotificationsList] = useState(mockNotifications);

  // Preference Toggles
  const [preferences, setPreferences] = useState({
    paymentReceived: true,
    paymentDueSoon: true,
    overduePayments: true,
    newStudentActivity: true,
  });

  // Action Modals & Toasts
  const [showIndividualReminderModal, setShowIndividualReminderModal] = useState(false);
  const [showBulkReminderModal, setShowBulkReminderModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedStudentForMsg, setSelectedStudentForMsg] = useState<{ id: string; name: string } | null>(null);
  const [msgTitle, setMsgTitle] = useState('');
  const [msgContent, setMsgContent] = useState('');
  const [msgChannel, setMsgChannel] = useState('In-App & Email & SMS');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const triggerSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 2500);
  };

  const handleMarkAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, unread: false })));
    triggerSuccess('All notifications marked as read!');
  };

  const handleMarkSingleAsRead = (id: string) => {
    setNotificationsList(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    triggerSuccess('Notification marked as read!');
  };

  const handleOpenSendReminder = (studentName: string, studentId: string) => {
    setSelectedStudentForMsg({ id: studentId, name: studentName });
    setMsgTitle('Payment Overdue Reminder');
    setMsgContent(`Dear ${studentName},\n\nThis is a notice regarding your overdue payment of Rs. 3,000. Please complete your payment as soon as possible via card or bank transfer.`);
    setShowMessageModal(true);
  };

  const handleSendMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForMsg) return;
    setSendingMsg(true);

    try {
      const res = await apiService.sendMessage(
        selectedStudentForMsg.id,
        msgTitle,
        msgContent,
        msgChannel
      );

      if (res.success) {
        triggerSuccess(`Reminder sent to ${selectedStudentForMsg.name} (${msgChannel})!`);
        setShowMessageModal(false);
      } else {
        triggerSuccess(res.message || 'Failed to send message');
      }
    } catch (err) {
      triggerSuccess('Failed to send message');
    } finally {
      setSendingMsg(false);
    }
  };

  // Dynamic counts
  const unreadCount = notificationsList.filter(n => n.unread).length;
  const paymentsCount = notificationsList.filter(n => n.type === 'received' || n.type === 'overdue' || n.type === 'due_soon').length;
  const remindersCount = notificationsList.filter(n => n.type === 'reminder_delivered' || n.type === 'overdue').length;
  const systemCount = notificationsList.filter(n => n.type === 'student_added' || n.type === 'report_ready').length;

  // Filter list
  const filteredNotifications = notificationsList.filter(n => {
    if (filterCategory === 'unread') return n.unread;
    if (filterCategory === 'payments') return n.type === 'received' || n.type === 'overdue' || n.type === 'due_soon';
    if (filterCategory === 'reminders') return n.type === 'reminder_delivered' || n.type === 'overdue';
    if (filterCategory === 'system') return n.type === 'student_added' || n.type === 'report_ready';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {actionSuccessMsg && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-medium text-sm flex items-center gap-2 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Page Heading & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Reminders & Notifications</h1>
          <p className="text-xs text-slate-500">Stay updated with student payments and send automated fee reminders.</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleMarkAllAsRead}
            className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-all cursor-pointer"
          >
            Mark All as Read
          </button>
          <button 
            onClick={() => setShowBulkReminderModal(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>🔔 Send Bulk Reminder</span>
          </button>
        </div>
      </div>

      {/* Section 1: Top 4 KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Unread Notifications */}
            <div 
              onClick={() => setFilterCategory('unread')}
              className={`bg-white p-5 rounded-3xl border ${filterCategory === 'unread' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-100'} shadow-sm relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-blue-300 transition-all`}
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">{unreadCount}</h3>
                <p className="text-xs font-bold text-slate-800 mt-1">Unread Notifications</p>
              </div>
              <p className="text-xs text-slate-400 mt-2">Requires your attention</p>
            </div>

            {/* Card 2: Payments Received */}
            <div 
              onClick={() => setFilterCategory('payments')}
              className={`bg-white p-5 rounded-3xl border ${filterCategory === 'payments' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-100'} shadow-sm relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-emerald-300 transition-all`}
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">8</h3>
                <p className="text-xs font-bold text-slate-800 mt-1">Payments Received</p>
              </div>
              <p className="text-xs text-slate-400 mt-2">Today</p>
            </div>

            {/* Card 3: Pending Payments */}
            <div 
              onClick={() => setFilterCategory('reminders')}
              className={`bg-white p-5 rounded-3xl border ${filterCategory === 'reminders' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-100'} shadow-sm relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-amber-300 transition-all`}
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">{remindersCount}</h3>
                <p className="text-xs font-bold text-slate-800 mt-1">Reminders & Pending</p>
              </div>
              <p className="text-xs text-slate-400 mt-2">Reminders sent & pending</p>
            </div>

            {/* Card 4: Overdue Payments */}
            <div 
              onClick={() => setFilterCategory('payments')}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-red-300 transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900">2</h3>
                <p className="text-xs font-bold text-slate-800 mt-1">Overdue Payments</p>
              </div>
              <p className="text-xs text-slate-400 mt-2">Require immediate attention</p>
            </div>

          </div>

          {/* Section 2: Top Quick CTA Button Controls (Exact matching Image 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <button
              onClick={() => setShowIndividualReminderModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-4 py-3 rounded-2xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <span>🔔</span>
              <span>Send Individual Reminder</span>
            </button>

            <button
              onClick={() => setShowBulkReminderModal(true)}
              className="bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-extrabold px-4 py-3 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <span>📢</span>
              <span>Send Bulk Reminder</span>
            </button>

            <button
              onClick={handleMarkAllAsRead}
              className="bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-extrabold px-4 py-3 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <span>✓</span>
              <span>Mark All as Read</span>
            </button>

            <button
              onClick={() => triggerSuccess('Notification Preferences updated')}
              className="bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-extrabold px-4 py-3 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <span>⚙</span>
              <span>Notification Settings</span>
            </button>

          </div>

          {/* Section 3: Filter Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-2xl transition-all cursor-pointer ${
                filterCategory === 'all' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              All <span className="ml-1 opacity-80">{notificationsList.length}</span>
            </button>

            <button
              onClick={() => setFilterCategory('unread')}
              className={`px-4 py-2 rounded-2xl transition-all cursor-pointer ${
                filterCategory === 'unread' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              Unread <span className="ml-1 opacity-80">{unreadCount}</span>
            </button>

            <button
              onClick={() => setFilterCategory('payments')}
              className={`px-4 py-2 rounded-2xl transition-all cursor-pointer ${
                filterCategory === 'payments' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              Payments <span className="ml-1 opacity-80">{paymentsCount}</span>
            </button>

            <button
              onClick={() => setFilterCategory('reminders')}
              className={`px-4 py-2 rounded-2xl transition-all cursor-pointer ${
                filterCategory === 'reminders' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              Reminders <span className="ml-1 opacity-80">{remindersCount}</span>
            </button>

            <button
              onClick={() => setFilterCategory('system')}
              className={`px-4 py-2 rounded-2xl transition-all cursor-pointer ${
                filterCategory === 'system' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              System <span className="ml-1 opacity-80">{systemCount}</span>
            </button>
          </div>

          {/* Section 4: Notification Activity Stream Cards (Exact matching Image 1 & 2) */}
          <div className="space-y-4">
            {filteredNotifications.map((n) => (
              <div 
                key={n.id} 
                className={`p-5 rounded-3xl border transition-all ${
                  n.unread ? 'bg-white border-blue-100 shadow-sm' : 'bg-white/80 border-slate-100'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  
                  {/* Left Icon + Text */}
                  <div className="flex items-start gap-3.5">
                    {/* Icon by Type */}
                    {n.type === 'overdue' && (
                      <div className="w-9 h-9 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                    )}

                    {n.type === 'received' && (
                      <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    {n.type === 'due_soon' && (
                      <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}

                    {n.type === 'student_added' && (
                      <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                    )}

                    {n.type === 'reminder_delivered' && (
                      <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}

                    {n.type === 'report_ready' && (
                      <div className="w-9 h-9 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                    )}

                    {/* Content */}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{n.description}</p>

                      {/* Action buttons inside card */}
                      <div className="flex items-center gap-3 mt-3 text-xs font-bold">
                        {n.actionType === 'send_reminder' && (
                          <button
                            onClick={() => handleOpenSendReminder(n.title.includes('Amal') ? 'Amal Fernando' : 'Nimal Silva', n.title.includes('Amal') ? 'STU-024' : 'STU-052')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-xl shadow-sm cursor-pointer"
                          >
                            Send Reminder
                          </button>
                        )}

                        {n.actionType === 'send_reminder' && (
                          <button
                            onClick={() => onNavigateToStudents && onNavigateToStudents()}
                            className="text-slate-700 hover:text-slate-900 px-2 py-1 cursor-pointer"
                          >
                            View Student
                          </button>
                        )}

                        {n.actionType === 'view_payment' && (
                          <button
                            onClick={() => onNavigateToPayments && onNavigateToPayments()}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-1.5 rounded-xl cursor-pointer"
                          >
                            View Payment
                          </button>
                        )}

                        {n.actionType === 'view_students' && (
                          <button
                            onClick={() => onNavigateToStudents && onNavigateToStudents()}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-1.5 rounded-xl cursor-pointer"
                          >
                            View Students
                          </button>
                        )}

                        {n.actionType === 'view_student' && (
                          <button
                            onClick={() => onNavigateToStudents && onNavigateToStudents()}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-1.5 rounded-xl cursor-pointer"
                          >
                            View Student
                          </button>
                        )}

                        {n.actionType === 'view_report' && (
                          <button
                            onClick={() => onNavigateToAnalytics && onNavigateToAnalytics()}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-1.5 rounded-xl cursor-pointer"
                          >
                            View Report
                          </button>
                        )}

                        {n.unread && (
                          <button
                            onClick={() => handleMarkSingleAsRead(n.id)}
                            className="text-slate-400 hover:text-slate-600 text-xs font-semibold cursor-pointer"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Time + Blue Dot */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-slate-400 font-medium">{n.time}</span>
                    {n.unread && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Section 5: Notification Preferences Toggles Card (Exact matching Image 2) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-lg text-slate-900">Notification Preferences</h3>

            <div className="space-y-4 text-xs font-semibold text-slate-700">
              
              <div className="flex items-center justify-between">
                <span>Payment Received</span>
                <button
                  type="button"
                  onClick={() => setPreferences({ ...preferences, paymentReceived: !preferences.paymentReceived })}
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${
                    preferences.paymentReceived ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    preferences.paymentReceived ? 'left-5.5' : 'left-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>Payment Due Soon</span>
                <button
                  type="button"
                  onClick={() => setPreferences({ ...preferences, paymentDueSoon: !preferences.paymentDueSoon })}
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${
                    preferences.paymentDueSoon ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    preferences.paymentDueSoon ? 'left-5.5' : 'left-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>Overdue Payments</span>
                <button
                  type="button"
                  onClick={() => setPreferences({ ...preferences, overduePayments: !preferences.overduePayments })}
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${
                    preferences.overduePayments ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    preferences.overduePayments ? 'left-5.5' : 'left-0.5'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>New Student Activity</span>
                <button
                  type="button"
                  onClick={() => setPreferences({ ...preferences, newStudentActivity: !preferences.newStudentActivity })}
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer relative ${
                    preferences.newStudentActivity ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    preferences.newStudentActivity ? 'left-5.5' : 'left-0.5'
                  }`} />
                </button>
              </div>

              <button 
                onClick={() => triggerSuccess('Preferences saved!')}
                className="text-blue-600 hover:underline font-bold block pt-1 cursor-pointer"
              >
                Manage Preferences →
              </button>
            </div>
          </div>

          {/* Section 6: Reminder History Table (Exact matching Image 2) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-lg text-slate-900">Reminder History</h3>

            <div className="divide-y divide-slate-100 text-xs">
              
              {/* Row 1 */}
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Kasun Perera</h5>
                  <p className="text-slate-400 mt-0.5">Payment Reminder · Email + In-App</p>
                  <p className="text-[11px] text-slate-400">Sep 04, 2026</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 font-extrabold px-3 py-1 rounded-full text-[10px]">
                  Delivered
                </span>
              </div>

              {/* Row 2 */}
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Amal Fernando</h5>
                  <p className="text-slate-400 mt-0.5">Overdue Reminder · Email</p>
                  <p className="text-[11px] text-slate-400">Sep 03, 2026</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 font-extrabold px-3 py-1 rounded-full text-[10px]">
                  Delivered
                </span>
              </div>

              {/* Row 3 */}
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 text-sm">Nimal Silva</h5>
                  <p className="text-slate-400 mt-0.5">Overdue Reminder · Email + In-App</p>
                </div>
                <span className="bg-amber-50 text-amber-700 font-extrabold px-3 py-1 rounded-full text-[10px]">
                  Pending
                </span>
              </div>

            </div>
          </div>

      {/* MODAL 1: Send Individual Reminder */}
      {showIndividualReminderModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowIndividualReminderModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
            <h3 className="font-display font-extrabold text-xl text-slate-900 mb-1">Send Individual Reminder</h3>
            <p className="text-xs text-slate-500 mb-4">Notify a specific student via Email & SMS</p>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const studentSelect = form.querySelector('select') as HTMLSelectElement;
                const val = studentSelect?.value || 'Amal Fernando (STU-024)';
                const studentId = val.includes('STU-001') ? 'STU-001' : val.includes('STU-052') ? 'STU-052' : 'STU-024';
                
                const res = await apiService.sendMessage(
                  studentId,
                  'Tuition Fee Reminder',
                  `Dear student, this is a reminder regarding your tuition payment for RIA Institute. Please settle your fee at your earliest convenience.`,
                  'In-App & Email & SMS'
                );

                setShowIndividualReminderModal(false);
                if (res.success) {
                  triggerSuccess(`Individual reminder delivered to ${val}!`);
                } else {
                  triggerSuccess(`Failed to deliver reminder: ${res.message || 'Error'}`);
                }
              }} 
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Student</label>
                <select className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium">
                  <option value="STU-024">Amal Fernando (STU-024)</option>
                  <option value="STU-052">Nimal Silva (STU-052)</option>
                  <option value="STU-001">Kasun Perera (STU-001)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer mt-2 text-sm"
              >
                Send Reminder
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Send Bulk Reminder */}
      {showBulkReminderModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowBulkReminderModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
            <h3 className="font-display font-extrabold text-xl text-slate-900 mb-1">Send Bulk Payment Reminder</h3>
            <p className="text-xs text-slate-500 mb-4">Send notices to all pending/overdue students</p>

            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                setShowBulkReminderModal(false);
                await Promise.all([
                  apiService.sendMessage('STU-001', 'Tuition Fee Reminder', 'RIA: Your tuition fee payment is due. Please log in to complete your payment.', 'In-App & Email & SMS'),
                  apiService.sendMessage('STU-002', 'Tuition Fee Reminder', 'RIA: Your tuition fee payment is due. Please log in to complete your payment.', 'In-App & Email & SMS'),
                  apiService.sendMessage('STU-003', 'Tuition Fee Reminder', 'RIA: Your tuition fee payment is due. Please log in to complete your payment.', 'In-App & Email & SMS')
                ]);
                triggerSuccess('Bulk reminders dispatched to all pending students!');
              }} 
              className="space-y-3 text-xs"
            >
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900">
                <p className="font-bold">Automated Message:</p>
                <p className="mt-1 text-[11px] text-amber-800">
                  "RIA: Your tuition fee payment for September 2026 is due. Please log in to complete your payment."
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl shadow-lg shadow-amber-500/30 transition-all cursor-pointer mt-2 text-sm"
              >
                Send Reminders Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Send Message Modal */}
      {showMessageModal && selectedStudentForMsg && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowMessageModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">Send Message / Reminder</h3>
                <p className="text-xs text-slate-500">Recipient: <strong className="text-slate-800">{selectedStudentForMsg.name} ({selectedStudentForMsg.id})</strong></p>
              </div>
            </div>

            <form onSubmit={handleSendMessageSubmit} className="space-y-4 text-xs mt-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Send Via Channel</label>
                <select
                  value={msgChannel}
                  onChange={(e) => setMsgChannel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold outline-none"
                >
                  <option value="In-App & Email & SMS">⚡ In-App Notification + Simulated Email & SMS</option>
                  <option value="Email Only">📧 Email Only</option>
                  <option value="SMS Only">📱 SMS Only</option>
                  <option value="In-App Only">🔔 In-App Notification Only</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject / Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="Subject" 
                  value={msgTitle}
                  onChange={(e) => setMsgTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Message Content</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Type message..." 
                  value={msgContent}
                  onChange={(e) => setMsgContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2.5 text-slate-500 hover:text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingMsg}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {sendingMsg ? <span>Sending...</span> : <span>Send Message</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
