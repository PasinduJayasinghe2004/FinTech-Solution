import logoImg from '@/assets/logo.jpg';
import React, { useState } from 'react';

interface PaymentManagementProps {
  teacherName?: string;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToStudents?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToNotifications?: () => void;
}

interface PaymentRecord {
  id: string;
  studentName: string;
  studentId: string;
  initials: string;
  avatarBg: string;
  month: string;
  amount: string;
  method: string;
  date: string;
  status: 'PAID' | 'PROCESSING' | 'PENDING' | 'OVERDUE';
}

const mockPayments: PaymentRecord[] = [
  { id: 'TXN-901', studentName: 'Kasun Perera', studentId: 'STU-001', initials: 'K', avatarBg: 'bg-blue-600', month: 'September 2026', amount: 'Rs. 3,000', method: 'Card Payment', date: 'Sep 04, 2026', status: 'PAID' },
  { id: 'TXN-902', studentName: 'Dilani Jayasuriya', studentId: 'STU-018', initials: 'D', avatarBg: 'bg-pink-600', month: 'September 2026', amount: 'Rs. 3,500', method: 'Bank Transfer', date: 'Sep 03, 2026', status: 'PAID' },
  { id: 'TXN-903', studentName: 'Ishara Gunawardena', studentId: 'STU-041', initials: 'I', avatarBg: 'bg-indigo-600', month: 'September 2026', amount: 'Rs. 3,000', method: 'QR Payment', date: 'Sep 02, 2026', status: 'PROCESSING' },
  { id: 'TXN-904', studentName: 'Nimal Silva', studentId: 'STU-002', initials: 'N', avatarBg: 'bg-emerald-600', month: 'September 2026', amount: 'Rs. 3,000', method: '—', date: '—', status: 'PENDING' },
  { id: 'TXN-905', studentName: 'Sanduni Rathnayake', studentId: 'STU-024', initials: 'S', avatarBg: 'bg-orange-500', month: 'September 2026', amount: 'Rs. 3,000', method: '—', date: '—', status: 'PENDING' },
  { id: 'TXN-906', studentName: 'Amal Fernando', studentId: 'STU-003', initials: 'A', avatarBg: 'bg-purple-600', month: 'August 2026', amount: 'Rs. 3,000', method: '—', date: '—', status: 'OVERDUE' },
  { id: 'TXN-907', studentName: 'Tharindu Bandara', studentId: 'STU-037', initials: 'T', avatarBg: 'bg-cyan-600', month: 'August 2026', amount: 'Rs. 2,500', method: '—', date: '—', status: 'OVERDUE' },
];

export default function PaymentManagement({
  teacherName = "Mr. Anil",
  onLogout,
  onNavigateToDashboard,
  onNavigateToStudents,
  onNavigateToAnalytics,
  onNavigateToNotifications
}: PaymentManagementProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'payments' | 'analytics' | 'notifications' | 'settings'>('payments');
  const [filterTab, setFilterTab] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Modals & Action Toast
  const [showCreatePaymentModal, setShowCreatePaymentModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const [newPayment, setNewPayment] = useState({
    studentName: 'Kasun Perera',
    amount: '3000',
    method: 'Card Payment',
    month: 'September 2026'
  });

  const triggerSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 2500);
  };

  const handleCreatePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCreatePaymentModal(false);
    triggerSuccess(`Payment record of Rs. ${newPayment.amount} created successfully!`);
  };

  const handleBulkReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReminderModal(false);
    triggerSuccess('Bulk payment reminders sent to 16 pending students!');
  };

  // Filter payments
  const filteredPayments = mockPayments.filter(p => {
    const matchesSearch = p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterTab === 'paid') return matchesSearch && (p.status === 'PAID' || p.status === 'PROCESSING');
    if (filterTab === 'pending') return matchesSearch && p.status === 'PENDING';
    if (filterTab === 'overdue') return matchesSearch && p.status === 'OVERDUE';
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      
      {/* Toast Notification */}
      {actionSuccessMsg && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-medium text-sm flex items-center gap-2 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100/80 p-6 flex flex-col justify-between shrink-0 hidden md:flex min-h-screen select-none">
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3.5 mb-9 px-1">
            <img src={logoImg} alt="TuitionPay Logo" className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-teal-500/25" />
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-blue-950 block leading-none">TuitionPay</span>
            </div>
          </div>

          {/* Navigation Items */}
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
                id: 'students',
                label: 'Students',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
                id: 'analytics',
                label: 'Analytics',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                id: 'notifications',
                label: 'Reminders',
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                )
              },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    if (item.id === 'dashboard' && onNavigateToDashboard) onNavigateToDashboard();
                    if (item.id === 'students' && onNavigateToStudents) onNavigateToStudents();
                    if (item.id === 'analytics' && onNavigateToAnalytics) onNavigateToAnalytics();
                    if (item.id === 'notifications' && onNavigateToNotifications) onNavigateToNotifications();
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-blue-50/90 text-blue-600' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <span className={isActive ? 'text-blue-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Links */}
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
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">Payment Management</h1>
            <p className="text-xs text-slate-400 mt-0.5">Track and manage all your student tuition payments.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 relative transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white">
                  5
                </span>
              </button>
            </div>

            {/* Profile Badge */}
            <div className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-full cursor-pointer transition-colors">
              <div className="w-7 h-7 rounded-full bg-cyan-600 text-white font-bold text-xs flex items-center justify-center">
                AK
              </div>
              <span className="text-xs font-bold text-slate-800">{teacherName}</span>
              <span className="text-slate-400 text-xs">∨</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* Top 4 Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Total Collected */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Total Collected</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">Rs. 256,000</h3>
              </div>
              <p className="text-xs font-semibold text-emerald-600 mt-3 flex items-center gap-1">
                <span>↑ +18% vs last month</span>
              </p>
            </div>

            {/* Card 2: Expected Revenue */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Expected Revenue</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">Rs. 300,000</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                For September 2026
              </p>
            </div>

            {/* Card 3: Pending Payments */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Pending Payments</p>
                <h3 className="text-3xl font-extrabold text-amber-600 mt-1">Rs. 32,000</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                12 students pending
              </p>
            </div>

            {/* Card 4: Overdue Payments */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Overdue Payments</p>
                <h3 className="text-3xl font-extrabold text-red-600 mt-1">Rs. 16,000</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                5 students overdue
              </p>
            </div>

          </div>

          {/* Progress Bar Card: September Payment Collection */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-extrabold text-lg text-slate-900">September Payment Collection</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="font-bold text-slate-800">Rs. 256,000</span> collected out of <span className="font-bold text-slate-800">Rs. 300,000</span> expected
                </p>
              </div>
              <span className="text-2xl font-black text-emerald-600 font-display">85%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '85%' }} />
            </div>
            
            <p className="text-[11px] text-slate-400 font-medium">16 students still need to complete payment.</p>
          </div>

          {/* Quick 3 CTA Action Buttons Row (Exact from User Image) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* CTA 1: Create Payment Record */}
            <button
              onClick={() => setShowCreatePaymentModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold p-4 rounded-2xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              <span className="text-lg font-bold">+</span>
              <span>Create Payment Record</span>
            </button>

            {/* CTA 2: Send Bulk Reminder */}
            <button
              onClick={() => setShowReminderModal(true)}
              className="bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-extrabold p-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              <span>Send Bulk Reminder</span>
            </button>

            {/* CTA 3: Export Payment Report */}
            <button
              onClick={() => triggerSuccess('Payment report exported to PDF / CSV successfully!')}
              className="bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 font-extrabold p-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
            >
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export Payment Report</span>
            </button>

          </div>

          {/* Payment Filter Tabs + Search + Filter Dropdowns Container */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden space-y-4 p-6">
            
            {/* Filter Tabs Header */}
            <div className="flex items-center gap-6 border-b border-slate-100 pb-3 text-xs font-bold text-slate-500">
              <button
                onClick={() => setFilterTab('all')}
                className={`pb-3 -mb-3 transition-colors cursor-pointer border-b-2 ${
                  filterTab === 'all' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent hover:text-slate-800'
                }`}
              >
                All Payments <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] ml-1">128</span>
              </button>
              
              <button
                onClick={() => setFilterTab('paid')}
                className={`pb-3 -mb-3 transition-colors cursor-pointer border-b-2 ${
                  filterTab === 'paid' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent hover:text-slate-800'
                }`}
              >
                Paid <span className="text-slate-400 font-normal ml-1">(112)</span>
              </button>

              <button
                onClick={() => setFilterTab('pending')}
                className={`pb-3 -mb-3 transition-colors cursor-pointer border-b-2 ${
                  filterTab === 'pending' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent hover:text-slate-800'
                }`}
              >
                Pending <span className="text-slate-400 font-normal ml-1">(11)</span>
              </button>

              <button
                onClick={() => setFilterTab('overdue')}
                className={`pb-3 -mb-3 transition-colors cursor-pointer border-b-2 ${
                  filterTab === 'overdue' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent hover:text-slate-800'
                }`}
              >
                Overdue <span className="text-slate-400 font-normal ml-1">(5)</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by student name, Student ID, or transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-medium text-slate-800 outline-none focus:border-blue-500"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
                <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer">
                  <option>Date Range</option>
                  <option>This Month</option>
                  <option>Last Month</option>
                </select>

                <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer">
                  <option>Payment Method</option>
                  <option>Card</option>
                  <option>Bank Transfer</option>
                  <option>QR Payment</option>
                </select>

                <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer">
                  <option>Payment Status</option>
                  <option>Paid</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                </select>

                <select className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer">
                  <option>Amount</option>
                  <option>Rs. 2,500</option>
                  <option>Rs. 3,000</option>
                  <option>Rs. 3,500</option>
                </select>

                <button className="flex items-center gap-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer">
                  <span>⚙</span> More Filters
                </button>
              </div>

              <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 outline-none cursor-pointer">
                <option>Sort by: Latest Payment</option>
                <option>Sort by: Amount High-Low</option>
              </select>
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/60 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="py-4 px-4">STUDENT</th>
                    <th className="py-4 px-4">ID</th>
                    <th className="py-4 px-4">MONTH</th>
                    <th className="py-4 px-4">AMOUNT</th>
                    <th className="py-4 px-4">METHOD</th>
                    <th className="py-4 px-4">DATE</th>
                    <th className="py-4 px-4">STATUS</th>
                    <th className="py-4 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Student */}
                      <td className="py-4 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${p.avatarBg} text-white font-extrabold text-xs flex items-center justify-center shrink-0`}>
                            {p.initials}
                          </div>
                          <span>{p.studentName}</span>
                        </div>
                      </td>

                      {/* ID */}
                      <td className="py-4 px-4 text-xs text-slate-400 font-mono">{p.studentId}</td>

                      {/* Month */}
                      <td className="py-4 px-4 text-xs text-slate-600 font-medium">{p.month}</td>

                      {/* Amount */}
                      <td className="py-4 px-4 font-extrabold text-slate-900">{p.amount}</td>

                      {/* Method */}
                      <td className="py-4 px-4 text-xs text-slate-600">{p.method}</td>

                      {/* Date */}
                      <td className="py-4 px-4 text-xs text-slate-500">{p.date}</td>

                      {/* Status Pill */}
                      <td className="py-4 px-4">
                        {p.status === 'PAID' && (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-200/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> PAID
                          </span>
                        )}
                        {p.status === 'PROCESSING' && (
                          <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-[10px] font-black px-3 py-1 rounded-full border border-slate-200 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" /> PROCESSING
                          </span>
                        )}
                        {p.status === 'PENDING' && (
                          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-black px-3 py-1 rounded-full border border-amber-200/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> PENDING
                          </span>
                        )}
                        {p.status === 'OVERDUE' && (
                          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-[10px] font-black px-3 py-1 rounded-full border border-red-200/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> OVERDUE
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-3 text-xs font-semibold">
                          {(p.status === 'PENDING' || p.status === 'OVERDUE') && (
                            <button 
                              onClick={() => triggerSuccess(`Reminder sent to ${p.studentName}`)}
                              className="text-amber-600 hover:text-amber-700 font-bold hover:underline cursor-pointer"
                            >
                              Send Reminder
                            </button>
                          )}
                          <button 
                            onClick={() => triggerSuccess(`Viewing details for transaction ${p.id}`)}
                            className="text-blue-600 hover:text-blue-700 font-bold hover:underline cursor-pointer"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
              <span>Showing 1-7 of 128 payments</span>
              
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                >
                  Previous
                </button>

                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 rounded-xl font-bold transition-all cursor-pointer ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <span className="px-1 text-slate-400">...</span>

                <button
                  onClick={() => setCurrentPage(13)}
                  className={`w-7 h-7 rounded-xl font-bold transition-all cursor-pointer ${
                    currentPage === 13
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  13
                </button>

                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-blue-600 hover:bg-slate-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>

      {/* MODAL: Create Payment Record */}
      {showCreatePaymentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowCreatePaymentModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
            <h3 className="font-display font-extrabold text-xl text-slate-900 mb-1">Create Payment Record</h3>
            <p className="text-xs text-slate-500 mb-4">Record tuition payment manually for a student</p>

            <form onSubmit={handleCreatePaymentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Student</label>
                <select 
                  value={newPayment.studentName}
                  onChange={(e) => setNewPayment({...newPayment, studentName: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                >
                  <option>Kasun Perera (STU-001)</option>
                  <option>Dilani Jayasuriya (STU-018)</option>
                  <option>Nimal Silva (STU-002)</option>
                  <option>Amal Fernando (STU-003)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Amount (Rs.)</label>
                  <input 
                    type="number" 
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Method</label>
                  <select 
                    value={newPayment.method}
                    onChange={(e) => setNewPayment({...newPayment, method: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option>Card Payment</option>
                    <option>Bank Transfer</option>
                    <option>QR Payment</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer mt-2 text-sm"
              >
                Save Payment Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Send Bulk Reminder */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowReminderModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
            <h3 className="font-display font-extrabold text-xl text-slate-900 mb-1">Send Bulk Payment Reminder</h3>
            <p className="text-xs text-slate-500 mb-4">Send payment notices to all 16 pending/overdue students</p>

            <form onSubmit={handleBulkReminderSubmit} className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900">
                <p className="font-bold">Message Content:</p>
                <p className="mt-1 text-[11px] text-amber-800">
                  "TuitionPay Alert: Your monthly tuition fee payment is pending. Please log in to complete your payment."
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

    </div>
  );
}
