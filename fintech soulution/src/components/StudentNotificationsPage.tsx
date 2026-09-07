import React, { useState } from 'react';

interface StudentNotificationsPageProps {
  studentName?: string;
  onLogout?: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToPayments: () => void;
  onNavigateToHistory: () => void;
  onNavigateToProfile: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'PAYMENT_DUE' | 'PAYMENT_SUCCESS' | 'OVERDUE' | 'ANNOUNCEMENT';
  isRead: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'September Tuition Payment Due',
    message: 'Your monthly tuition fee of Rs. 3,000 for Combined Mathematics is due in 5 days (September 15, 2026).',
    date: 'Sep 01, 2026',
    type: 'PAYMENT_DUE',
    isRead: false,
  },
  {
    id: 'notif_2',
    title: 'August Payment Confirmation',
    message: 'Payment of Rs. 3,000 received successfully via Card. Receipt #TP-8241 has been generated.',
    date: 'Aug 10, 2026',
    type: 'PAYMENT_SUCCESS',
    isRead: true,
  },
  {
    id: 'notif_3',
    title: 'Class Rescheduled Announcement',
    message: 'Combined Mathematics revision class has been moved to Saturday 8:00 AM.',
    date: 'Aug 05, 2026',
    type: 'ANNOUNCEMENT',
    isRead: true,
  },
  {
    id: 'notif_4',
    title: 'May Payment Overdue Reminder',
    message: 'Your payment for May 2026 is currently marked as overdue. Please make the payment at your earliest.',
    date: 'Jun 01, 2026',
    type: 'OVERDUE',
    isRead: true,
  },
];

export default function StudentNotificationsPage({
  studentName = "Pasindu",
  onLogout,
  onNavigateToDashboard,
  onNavigateToPayments,
  onNavigateToHistory,
  onNavigateToProfile,
}: StudentNotificationsPageProps) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100/80 p-6 flex flex-col justify-between shrink-0 hidden md:flex min-h-screen select-none">
        <div>
          <div className="flex items-center gap-3.5 mb-9 px-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-blue-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
              <span className="text-white font-display font-black text-xl leading-none">T</span>
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-blue-950">TuitionPay</span>
          </div>

          <nav className="space-y-1.5">
            <button onClick={onNavigateToDashboard} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Dashboard</span>
            </button>
            <button onClick={onNavigateToPayments} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Payments</span>
            </button>
            <button onClick={onNavigateToHistory} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Payment History</span>
            </button>
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold bg-blue-50/90 text-blue-600 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>Notifications</span>
            </button>
            <button onClick={onNavigateToProfile} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>My Profile</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-1.5">
          <button onClick={onLogout} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-display text-xl font-bold text-slate-900">Notifications Center</h1>
            <p className="text-xs text-slate-500">Stay updated on payment dues and class updates</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={markAllAsRead}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              Mark all as read
            </button>
            <div className="flex items-center gap-2.5 bg-slate-100 px-3 py-1.5 rounded-full">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {studentName.charAt(0)}
              </div>
              <span className="text-xs font-bold text-slate-800">{studentName}</span>
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all flex items-start gap-4 ${
                item.isRead
                  ? 'bg-white border-slate-100'
                  : 'bg-blue-50/40 border-blue-100 shadow-sm'
              }`}
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                item.type === 'PAYMENT_DUE' ? 'bg-amber-100 text-amber-700' :
                item.type === 'PAYMENT_SUCCESS' ? 'bg-emerald-100 text-emerald-700' :
                item.type === 'OVERDUE' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                  <span className="text-[11px] text-slate-400 font-medium">{item.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
                {item.type === 'PAYMENT_DUE' && (
                  <button
                    onClick={onNavigateToPayments}
                    className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    <span>Pay Now</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
