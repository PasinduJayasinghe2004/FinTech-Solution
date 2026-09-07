import React, { useState } from 'react';
import StudentManagement from './StudentManagement';

interface TeacherDashboardProps {
  teacherName?: string;
  onLogout?: () => void;
}

export default function TeacherDashboard({
  teacherName = "Mr. Anil",
  onLogout
}: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'payments' | 'analytics' | 'notifications' | 'settings'>('dashboard');

  if (activeTab === 'students') {
    return (
      <StudentManagement 
        teacherName={teacherName} 
        onLogout={onLogout} 
        onNavigateToDashboard={() => setActiveTab('dashboard')} 
      />
    );
  }
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Modals
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showCreatePaymentModal, setShowCreatePaymentModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Form states
  const [newStudent, setNewStudent] = useState({ name: '', id: '', subject: 'Mathematics', phone: '', fee: '3000' });
  const [newPayment, setNewPayment] = useState({ studentName: 'Kasun Perera', amount: '3000', method: 'Card', note: 'Monthly tuition fee' });

  const triggerSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 2500);
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddStudentModal(false);
    triggerSuccess(`Student ${newStudent.name || 'New Student'} added successfully!`);
    setNewStudent({ name: '', id: '', subject: 'Mathematics', phone: '', fee: '3000' });
  };

  const handleCreatePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCreatePaymentModal(false);
    triggerSuccess(`Payment request of Rs. ${newPayment.amount} created!`);
  };

  const handleSendReminderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReminderModal(false);
    triggerSuccess('Payment reminder SMS & Notifications sent to 16 pending students!');
  };

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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-blue-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
              <span className="text-white font-display font-black text-xl leading-none">T</span>
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-blue-950 block leading-none">TuitionPay</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1 block">Teacher Portal</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
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
                  onClick={() => setActiveTab(item.id as any)}
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
            <h1 className="font-display text-xl font-bold text-slate-900 flex items-center gap-2">
              Good Morning, Teacher <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-xs text-slate-500">Here's what's happening with your tuition business today.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Icon Button */}
            <button className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notification Bell Badge */}
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

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full">5 New</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                      <p className="font-semibold text-emerald-900">New Payment Received</p>
                      <p className="text-emerald-700 text-[11px]">Kasun Perera paid Rs. 3,000 via Card.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                      <p className="font-semibold text-amber-900">Reminder Auto-Sent</p>
                      <p className="text-amber-700 text-[11px]">16 students received SMS payment alert.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown Badge */}
            <div className="flex items-center gap-2.5 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-full cursor-pointer transition-colors">
              <div className="w-7 h-7 rounded-full bg-cyan-600 text-white font-bold text-xs flex items-center justify-center">
                AK
              </div>
              <span className="text-xs font-bold text-slate-800">{teacherName}</span>
              <span className="text-slate-400 text-xs">∨</span>
            </div>
          </div>
        </header>

        {/* Dashboard Main Scrollable Area */}
        <main className="p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* Top 4 Stat Cards Grid (Exact matching mockups) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Total Students */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Total Students</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">128</h3>
              </div>
              <p className="text-xs font-semibold text-emerald-600 mt-3 flex items-center gap-1">
                <span>+12 this month</span>
              </p>
            </div>

            {/* Card 2: Monthly Revenue */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Monthly Revenue</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">Rs. 256,000</h3>
              </div>
              <p className="text-xs font-semibold text-emerald-600 mt-3 flex items-center gap-1">
                <span>↑ +18% vs last month</span>
              </p>
            </div>

            {/* Card 3: Outstanding Balance */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Outstanding Balance</p>
                <h3 className="text-3xl font-extrabold text-red-600 mt-1">Rs. 48,000</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                16 students pending
              </p>
            </div>

            {/* Card 4: Payment Completion */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Payment Completion</p>
                  <h3 className="text-3xl font-extrabold text-slate-900 mt-1">87%</h3>
                  <p className="text-xs text-slate-400 mt-2">112 of 128 paid</p>
                </div>
                {/* Mini Circle Progress Gauge */}
                <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-blue-100 flex items-center justify-center">
                  <span className="text-[10px] font-extrabold text-blue-700">87%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Actions Grid (Exact 4 Cards from Image 5) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Action 1: Add Student */}
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-3xl shadow-lg shadow-blue-600/20 transition-all flex flex-col justify-between h-28 text-left cursor-pointer group"
            >
              <span className="text-2xl font-bold text-white group-hover:scale-110 transition-transform origin-left">+</span>
              <span className="font-extrabold text-base">Add Student</span>
            </button>

            {/* Action 2: Create Payment */}
            <button
              onClick={() => setShowCreatePaymentModal(true)}
              className="bg-white hover:bg-slate-50 border border-slate-100 p-5 rounded-3xl shadow-sm transition-all flex flex-col justify-between h-28 text-left cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-extrabold text-base text-teal-600">Create Payment</span>
            </button>

            {/* Action 3: Send Reminder */}
            <button
              onClick={() => setShowReminderModal(true)}
              className="bg-white hover:bg-slate-50 border border-slate-100 p-5 rounded-3xl shadow-sm transition-all flex flex-col justify-between h-28 text-left cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <span className="font-extrabold text-base text-amber-600">Send Reminder</span>
            </button>

            {/* Action 4: View Analytics */}
            <button
              onClick={() => setActiveTab('analytics')}
              className="bg-white hover:bg-slate-50 border border-slate-100 p-5 rounded-3xl shadow-sm transition-all flex flex-col justify-between h-28 text-left cursor-pointer group"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-extrabold text-base text-blue-600">View Analytics</span>
            </button>

          </div>

          {/* Charts Row: Revenue Overview & Payment Status (Exact matching images 2 & 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Bar Chart Card: Revenue Overview (2 Columns wide) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900">Revenue Overview</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Monthly payment performance</p>
                </div>
                <div className="flex items-center gap-2">
                  <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-1.5 outline-none cursor-pointer">
                    <option>Last 6 Months</option>
                    <option>Year 2026</option>
                  </select>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600" />
                  <span>Total revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-100" />
                  <span>Expected revenue</span>
                </div>
              </div>

              {/* SVG Custom Bar Chart matching user image 2 */}
              <div className="pt-2">
                <svg viewBox="0 0 500 180" className="w-full h-48">
                  {/* Grid lines */}
                  {[0, 45, 90, 135].map((y) => (
                    <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#f1f5f9" strokeWidth="1.5" />
                  ))}
                  
                  {/* Bars grouped by month */}
                  {[
                    { label: 'Apr', exp: 110, tot: 95 },
                    { label: 'May', exp: 115, tot: 105 },
                    { label: 'Jun', exp: 118, tot: 100 },
                    { label: 'Jul', exp: 125, tot: 118 },
                    { label: 'Aug', exp: 122, tot: 110 },
                    { label: 'Sep', exp: 145, tot: 130 },
                  ].map((d, i) => {
                    const groupX = i * 80 + 20;
                    const expH = d.exp;
                    const totH = d.tot;
                    return (
                      <g key={d.label}>
                        {/* Expected Revenue (Light blue bar on left) */}
                        <rect
                          x={groupX} y={150 - expH} width={28} height={expH} rx={6}
                          fill="#dbeafe"
                        />
                        {/* Total Revenue (Dark blue bar on right) */}
                        <rect
                          x={groupX + 32} y={150 - totH} width={28} height={totH} rx={6}
                          fill="#2563eb"
                        />
                        <text x={groupX + 30} y={170} textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">
                          {d.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Donut Chart Card: Payment Status (Exact matching image 3) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">Payment Status</h3>
                <p className="text-xs text-slate-400 mt-0.5">This month</p>
              </div>

              {/* Donut Ring graphic */}
              <div className="flex flex-col items-center justify-center my-2">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    {/* Paid (87%) - Emerald */}
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="#10b981" strokeWidth="10"
                      strokeDasharray="218.6 251.3"
                      strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                    {/* Pending (9%) - Amber */}
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="#f59e0b" strokeWidth="10"
                      strokeDasharray="22.6 251.3"
                      strokeDashoffset="-218.6"
                      strokeLinecap="round"
                    />
                    {/* Overdue (4%) - Red */}
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="#ef4444" strokeWidth="10"
                      strokeDasharray="10.1 251.3"
                      strokeDashoffset="-241.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-black text-slate-900 block leading-none">87%</span>
                    <span className="text-xs text-slate-400 font-semibold mt-1 block">Paid</span>
                  </div>
                </div>
              </div>

              {/* Status Breakdown Legend (Matching image 3 stats) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-600">Paid</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">87%</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-slate-600">Pending</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">9%</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-slate-600">Overdue</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">4%</span>
                </div>
              </div>
            </div>

          </div>

          {/* Recent Payments Table Card (Exact matching Image 4) */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <h3 className="font-display font-extrabold text-xl text-slate-900">Recent Payments</h3>
              <button 
                onClick={() => setActiveTab('payments')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                View All Payments →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="py-4 px-6">STUDENT</th>
                    <th className="py-4 px-6">ID</th>
                    <th className="py-4 px-6">AMOUNT</th>
                    <th className="py-4 px-6">METHOD</th>
                    <th className="py-4 px-6">DATE</th>
                    <th className="py-4 px-6">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  
                  {/* Row 1 */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                          K
                        </div>
                        <span>Kasun Perera</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400 font-mono">STU-001</td>
                    <td className="py-4 px-6 font-extrabold text-slate-900">Rs. 3,000</td>
                    <td className="py-4 px-6 text-slate-600">Card</td>
                    <td className="py-4 px-6 text-slate-500 text-xs">Sep 04, 2026</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Paid
                      </span>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                          N
                        </div>
                        <span>Nimal Silva</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400 font-mono">STU-002</td>
                    <td className="py-4 px-6 font-extrabold text-slate-900">Rs. 3,000</td>
                    <td className="py-4 px-6 text-slate-600">Bank Transfer</td>
                    <td className="py-4 px-6 text-slate-500 text-xs">Sep 03, 2026</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Paid
                      </span>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                          A
                        </div>
                        <span>Amal Fernando</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400 font-mono">STU-003</td>
                    <td className="py-4 px-6 font-extrabold text-slate-900">Rs. 3,000</td>
                    <td className="py-4 px-6 text-slate-600">QR Payment</td>
                    <td className="py-4 px-6 text-slate-500 text-xs">Sep 02, 2026</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Paid
                      </span>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                          D
                        </div>
                        <span>Dilani Jayasuriya</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400 font-mono">STU-018</td>
                    <td className="py-4 px-6 font-extrabold text-slate-900">Rs. 3,000</td>
                    <td className="py-4 px-6 text-slate-600">Card</td>
                    <td className="py-4 px-6 text-slate-500 text-xs">Sep 01, 2026</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Paid
                      </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* MODAL 1: Add Student */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowAddStudentModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
            <h3 className="font-display font-extrabold text-xl text-slate-900 mb-1">Add New Student</h3>
            <p className="text-xs text-slate-500 mb-4">Enroll a student into your tuition class</p>

            <form onSubmit={handleAddStudentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Kasun Perera" 
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student ID</label>
                  <input 
                    type="text" 
                    placeholder="STU-042" 
                    value={newStudent.id}
                    onChange={(e) => setNewStudent({...newStudent, id: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select 
                    value={newStudent.subject}
                    onChange={(e) => setNewStudent({...newStudent, subject: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                  >
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="0771234567" 
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monthly Fee (Rs.)</label>
                  <input 
                    type="number" 
                    placeholder="3000" 
                    value={newStudent.fee}
                    onChange={(e) => setNewStudent({...newStudent, fee: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer mt-2 text-sm"
              >
                Add Student
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Create Payment */}
      {showCreatePaymentModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowCreatePaymentModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
            <h3 className="font-display font-extrabold text-xl text-slate-900 mb-1">Record Manual Payment</h3>
            <p className="text-xs text-slate-500 mb-4">Record cash or bank deposit payment from a student</p>

            <form onSubmit={handleCreatePaymentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Student</label>
                <select 
                  value={newPayment.studentName}
                  onChange={(e) => setNewPayment({...newPayment, studentName: e.target.value})}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                >
                  <option>Kasun Perera (STU-001)</option>
                  <option>Nimal Silva (STU-002)</option>
                  <option>Amal Fernando (STU-003)</option>
                  <option>Dilani Jayasuriya (STU-018)</option>
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
                    <option>Card</option>
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                    <option>QR Payment</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl shadow-lg shadow-teal-600/30 transition-all cursor-pointer mt-2 text-sm"
              >
                Record Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Send Reminder */}
      {showReminderModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowReminderModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
            <h3 className="font-display font-extrabold text-xl text-slate-900 mb-1">Send Payment Reminders</h3>
            <p className="text-xs text-slate-500 mb-4">Notify 16 pending students via SMS & Push notification</p>

            <form onSubmit={handleSendReminderSubmit} className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900">
                <p className="font-bold">Reminder Message Preview:</p>
                <p className="mt-1 text-[11px] text-amber-800">
                  "Dear Student/Parent, your tuition fee of Rs. 3,000 for September 2026 is pending. Please complete your payment via TuitionPay portal."
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-xl shadow-lg shadow-amber-500/30 transition-all cursor-pointer mt-2 text-sm"
              >
                Send Reminders to 16 Students
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
