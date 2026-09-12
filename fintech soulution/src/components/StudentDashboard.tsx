import { logoImg } from '@/assets/logo';
import React, { useState, useEffect } from 'react';
import StudentPaymentPage from './StudentPaymentPage';
import StudentPaymentHistory from './StudentPaymentHistory';
import StudentNotificationsPage from './StudentNotificationsPage';
import StudentProfilePage from './StudentProfilePage';
import { apiService } from '../services/api';

interface StudentDashboardProps {
  studentName?: string;
  onLogout?: () => void;
}

export default function StudentDashboard({ 
  studentName = "Pasindu", 
  onLogout 
}: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'payments' | 'history' | 'notifications' | 'profile' | 'settings'>('dashboard');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank' | 'qr'>('card');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dbData, setDbData] = useState<any>(null);
  const [storedUser, setStoredUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('ria_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    apiService.getStudentDashboard().then((res) => {
      if (res.success && res.data) {
        setDbData(res.data);
      }
    });
  }, []);

  const [localPayments, setLocalPayments] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('ria_local_payments');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const hasPaidSep = localPayments.some(p => p.month === 'September 2026' || p.status === 'PAID');

  const getValidName = () => {
    if (storedUser?.name && storedUser.name !== 'New Student') return storedUser.name;
    if (dbData?.student?.name && dbData.student.name !== 'New Student') return dbData.student.name;
    if (studentName && studentName !== 'New Student') return studentName;
    return 'Pasindu Jayasinghe';
  };

  const currentStudentName = getValidName();
  const currentStudentId = storedUser?.studentId || dbData?.student?.studentUniqueId || 'STU-001';
  const summary = {
    currentPayment: hasPaidSep ? 0 : (dbData?.summary?.currentPayment ?? 3000),
    outstandingBalance: hasPaidSep ? 0 : (dbData?.summary?.outstandingBalance ?? 3000),
    paymentStatus: hasPaidSep ? 'Paid' : (dbData?.summary?.paymentStatus ?? 'Pending'),
    overdueCount: hasPaidSep ? 0 : (dbData?.summary?.overdueCount ?? 1),
    dueDate: dbData?.summary?.dueDate || 'September 15, 2026'
  };

  const rawRecent = dbData?.recentPayments ?? [
    { id: '1', date: 'Aug 10, 2026', month: 'August 2026', amount: 3000, status: 'Paid', method: 'Card' },
    { id: '2', date: 'Jul 12, 2026', month: 'July 2026', amount: 3000, status: 'Paid', method: 'Bank Transfer' },
  ];

  const mappedLocal = localPayments.map(p => ({
    id: p.id,
    date: p.date,
    month: p.month,
    amount: p.numAmount || 3000,
    status: 'Paid',
    method: p.method
  }));

  const recentPayments = [...mappedLocal, ...rawRecent];
  const userNotifications = dbData?.notifications || [];

  if (activeTab === 'payments') {
    return (
      <StudentPaymentPage
        studentName={currentStudentName}
        onLogout={onLogout}
        onNavigateToDashboard={() => setActiveTab('dashboard')}
        onNavigateToHistory={() => setActiveTab('history')}
        onNavigateToNotifications={() => setActiveTab('notifications')}
        onNavigateToProfile={() => setActiveTab('profile')}
      />
    );
  }

  if (activeTab === 'history') {
    return (
      <StudentPaymentHistory
        studentName={currentStudentName}
        onLogout={onLogout}
        onNavigateToDashboard={() => setActiveTab('dashboard')}
        onNavigateToPayments={() => setActiveTab('payments')}
        onNavigateToNotifications={() => setActiveTab('notifications')}
        onNavigateToProfile={() => setActiveTab('profile')}
      />
    );
  }

  if (activeTab === 'notifications') {
    return (
      <StudentNotificationsPage
        studentName={currentStudentName}
        onLogout={onLogout}
        onNavigateToDashboard={() => setActiveTab('dashboard')}
        onNavigateToPayments={() => setActiveTab('payments')}
        onNavigateToHistory={() => setActiveTab('history')}
        onNavigateToProfile={() => setActiveTab('profile')}
      />
    );
  }

  if (activeTab === 'profile') {
    return (
      <StudentProfilePage
        studentName={currentStudentName}
        onLogout={onLogout}
        onNavigateToDashboard={() => setActiveTab('dashboard')}
        onNavigateToPayments={() => setActiveTab('payments')}
        onNavigateToHistory={() => setActiveTab('history')}
        onNavigateToNotifications={() => setActiveTab('notifications')}
      />
    );
  }

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.processPayment(summary.currentPayment, selectedMethod === 'card' ? 'Card' : selectedMethod === 'bank' ? 'Bank Transfer' : 'QR Payment');
      const res = await apiService.getStudentDashboard();
      if (res.success && res.data) {
        setDbData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setShowPaymentModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100/80 p-6 flex flex-col justify-between shrink-0 hidden md:flex min-h-screen select-none">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3.5 mb-9 px-1">
            <img src={logoImg} alt="RIA Logo" className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-teal-500/25" />
            <span className="font-display font-extrabold text-xl tracking-tight text-blue-950">RIA</span>
          </div>

          {/* Main Nav Links */}
          <nav className="space-y-1.5">
            {[
              { 
                id: 'dashboard', 
                label: 'Dashboard', 
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                )
              },
              { 
                id: 'payments', 
                label: 'Payments', 
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ) 
              },
              { 
                id: 'history', 
                label: 'Payment History', 
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) 
              },
              { 
                id: 'notifications', 
                label: 'Notifications', 
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                ) 
              },
              { 
                id: 'profile', 
                label: 'My Profile', 
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) 
              },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-blue-50/90 text-blue-600' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <span className={isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}>
                    {item.icon}
                  </span>
                  <span className="tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Nav Links */}
        <div className="pt-6 border-t border-slate-100/90 space-y-1.5">
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'settings' 
                ? 'bg-blue-50/90 text-blue-600' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <span className={activeTab === 'settings' ? 'text-blue-600' : 'text-slate-400'}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <span className="tracking-tight">Settings</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-red-500 hover:bg-red-50/70 transition-colors cursor-pointer"
          >
            <span className="text-red-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </span>
            <span className="tracking-tight">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              Good Morning, {currentStudentName} <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-xs text-slate-500">Here's an overview of your tuition payments ({currentStudentId}).</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 relative transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {userNotifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full">{userNotifications.length} New</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {userNotifications.length === 0 ? (
                      <p className="text-slate-400 text-xs py-2">No new notifications.</p>
                    ) : (
                      userNotifications.map((n: any) => (
                        <div key={n.id} className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                          <p className="font-semibold text-blue-900">{n.title}</p>
                          <p className="text-blue-700 text-[11px]">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown Badge */}
            <div className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-full cursor-pointer transition-colors">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {currentStudentName.charAt(0)}
              </div>
              <span className="text-xs font-bold text-slate-800">{currentStudentName}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content */}
        <main className="p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* Top 3 Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1: Current Payment */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-full">
                  Due This Month
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400">Current Payment</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Rs. {summary.currentPayment.toLocaleString()}</h3>
            </div>

            {/* Card 2: Outstanding Balance */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-red-700 bg-red-50 border border-red-200/60 px-2.5 py-1 rounded-full">
                  {summary.overdueCount} Overdue
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400">Outstanding Balance</p>
              <h3 className="text-2xl font-extrabold text-red-600 mt-1">Rs. {summary.outstandingBalance.toLocaleString()}</h3>
            </div>

            {/* Card 3: Payment Status */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                  Status
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400">Payment Status</p>
              <h3 className="text-2xl font-extrabold text-emerald-600 mt-1">{summary.paymentStatus}</h3>
            </div>

          </div>

          {/* Featured Blue Gradient Action Banner */}
          <div className="bg-gradient-to-r from-blue-800 via-blue-900 to-indigo-950 rounded-3xl p-6 lg:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-3 z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                <span className="text-[10px] font-extrabold tracking-widest text-white uppercase">SEPTEMBER TUITION FEE</span>
                <span className="text-[9px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-300/30">{summary.paymentStatus.toUpperCase()}</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Rs. {summary.currentPayment.toLocaleString()}</h2>
              <p className="text-xs text-blue-200 flex items-center justify-center md:justify-start gap-1.5">
                <span>Due on {summary.dueDate}</span>
              </p>
            </div>

            <div className="z-10 flex flex-col items-center md:items-end gap-2">
              <button
                onClick={() => setShowPaymentModal(true)}
                className="bg-emerald-400 hover:bg-emerald-300 text-blue-950 font-extrabold px-8 py-3.5 rounded-2xl shadow-lg shadow-emerald-400/20 hover:scale-105 transition-all flex items-center gap-2 text-base cursor-pointer"
              >
                <span>Pay Now</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Recent Payments Table Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-slate-100">
              <h3 className="font-display font-bold text-base text-slate-900">Your Recent Payments</h3>
              <button 
                onClick={() => setActiveTab('history')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                View All Payments →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="py-3.5 px-6">MONTH</th>
                    <th className="py-3.5 px-6">PAYMENT DATE</th>
                    <th className="py-3.5 px-6">AMOUNT</th>
                    <th className="py-3.5 px-6">METHOD</th>
                    <th className="py-3.5 px-6">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {recentPayments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-xs text-slate-400">No payment records found.</td>
                    </tr>
                  ) : (
                    recentPayments.map((p: any) => (
                      <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 font-bold text-slate-900">{p.month}</td>
                        <td className="py-4 px-6 text-slate-500">{p.paymentDate || p.date || '—'}</td>
                        <td className="py-4 px-6 font-bold text-slate-900">Rs. {p.amount.toLocaleString()}</td>
                        <td className="py-4 px-6 text-slate-600">{p.method}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                            p.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : 'bg-red-50 text-red-700 border-red-200/60'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Paid' ? 'bg-emerald-500' : 'bg-red-500'}`} /> {p.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>


          {/* 3 Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Action 1 */}
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">Make a Payment</span>
              </div>
              <span className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">→</span>
            </button>

            {/* Action 2 */}
            <button
              onClick={() => setActiveTab('history')}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors block">View Payment</span>
                  <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors block">History</span>
                </div>
              </div>
              <span className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">→</span>
            </button>

            {/* Action 3 */}
            <button
              onClick={() => setNotificationsOpen(true)}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <span className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">View Notifications</span>
              </div>
              <span className="text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all">→</span>
            </button>

          </div>

          {/* Yellow Reminder Banner */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-amber-900">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <span className="font-semibold text-sm">Your September tuition payment is due in 5 days.</span>
            </div>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm shrink-0 cursor-pointer"
            >
              <span>Pay Now</span>
              <span>→</span>
            </button>
          </div>

        </main>
      </div>

      {/* Floating Help Button (Bottom Right) */}
      <button 
        onClick={() => alert('Need support? Contact RIA HelpDesk at support@ria.com')}
        className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-40 cursor-pointer"
      >
        ?
      </button>

      {/* Interactive Pay Now Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>

            {paymentSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">Payment Successful!</h3>
                <p className="text-xs text-slate-500">Rs. 3,000 received for September 2026 tuition fee. Receipt sent to your email.</p>
              </div>
            ) : (
              <form onSubmit={handlePayNow} className="space-y-4">
                <div>
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">PAYMENT GATEWAY</span>
                  <h3 className="font-display font-extrabold text-xl text-slate-900">September Tuition Fee</h3>
                  <p className="text-xs text-slate-500">Amount: <span className="font-bold text-slate-800">Rs. 3,000</span></p>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', label: 'Card' },
                      { id: 'bank', label: 'Bank Transfer' },
                      { id: 'qr', label: 'QR Pay' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSelectedMethod(m.id as any)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedMethod === m.id 
                            ? 'border-blue-600 bg-blue-50 text-blue-700' 
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedMethod === 'card' && (
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Card Number (4242 ...)" 
                      required 
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        required 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                      />
                      <input 
                        type="text" 
                        placeholder="CVC" 
                        required 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs" 
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === 'bank' && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                    <p className="font-bold text-slate-800">RIA Bank Account</p>
                    <p>Bank: Commercial Bank</p>
                    <p>Account No: 8009-1234-5678</p>
                    <p>Reference: STU-001</p>
                  </div>
                )}

                {selectedMethod === 'qr' && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
                    <div className="w-32 h-32 bg-slate-200 rounded-lg mx-auto flex items-center justify-center text-xs text-slate-500 font-mono">
                      [ LankaQR Code ]
                    </div>
                    <p className="text-[11px] text-slate-500">Scan with your banking app to pay Rs. 3,000</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  Confirm & Pay Rs. 3,000
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
