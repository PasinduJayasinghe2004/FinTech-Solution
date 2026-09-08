import React, { useState } from 'react';

interface AnalyticsDashboardProps {
  teacherName?: string;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToStudents?: () => void;
  onNavigateToPayments?: () => void;
  onNavigateToNotifications?: () => void;
}

export default function AnalyticsDashboard({
  teacherName = "Mr. Anil",
  onLogout,
  onNavigateToDashboard,
  onNavigateToStudents,
  onNavigateToPayments,
  onNavigateToNotifications
}: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'payments' | 'analytics' | 'notifications' | 'settings'>('analytics');
  const [timeRange, setTimeRange] = useState('Last 6 Months');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const triggerSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 2500);
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
            </div>
          </div>

          {/* Navigation Links */}
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
                    if (item.id === 'payments' && onNavigateToPayments) onNavigateToPayments();
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
            <h1 className="font-display text-2xl font-bold text-slate-900">Analytics & Reports</h1>
            <p className="text-xs text-slate-400 mt-0.5">Understand your tuition business performance with real-time insights.</p>
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

        {/* Scrollable Main Area */}
        <main className="p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* Time Range Filter Bar Header */}
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-2 bg-white border border-slate-200/80 px-3 py-1.5 rounded-2xl shadow-sm text-xs font-semibold text-slate-700">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="outline-none bg-transparent cursor-pointer"
              >
                <option>Last 6 Months</option>
                <option>Year 2026</option>
                <option>Last 3 Months</option>
              </select>
            </div>
          </div>

          {/* Section 1: Top 4 KPI Cards (Exact matching Image 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Total Revenue */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                    ↑ 18.5%
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-400">Total Revenue</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">Rs. 1,560,000</h3>
              </div>
              <p className="text-xs text-slate-400 mt-3">+18.5% compared to previous period</p>
            </div>

            {/* Card 2: Average Monthly Revenue */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Average Monthly Revenue</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">Rs. 260,000</h3>
              </div>
              <p className="text-xs text-slate-400 mt-3">Based on the last 6 months</p>
            </div>

            {/* Card 3: Payment Collection Rate */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-slate-400">Payment Collection Rate</p>
                  <h3 className="text-3xl font-extrabold text-slate-900 mt-1">87.5%</h3>
                  <p className="text-xs text-slate-400 mt-3">112 of 128 students paid</p>
                </div>
                {/* Mini Donut Badge */}
                <div className="w-11 h-11 rounded-full border-4 border-emerald-500 border-t-emerald-200 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-emerald-700">88%</span>
                </div>
              </div>
            </div>

            {/* Card 4: Outstanding Revenue */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200/60 uppercase">
                    Action needed
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-400">Outstanding Revenue</p>
                <h3 className="text-3xl font-extrabold text-red-600 mt-1">Rs. 48,000</h3>
              </div>
              <p className="text-xs text-slate-400 mt-3">16 payments require attention</p>
            </div>

          </div>

          {/* Section 2: Revenue Performance Line Chart (Exact matching Image 1) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">Revenue Performance</h3>
                <p className="text-xs text-slate-400 mt-0.5">Track your tuition income over time.</p>
              </div>
              <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-1 bg-blue-600 rounded-full" />
                  <span className="text-slate-800">Actual</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 border-b-2 border-dashed border-slate-400" />
                  <span className="text-slate-400">Expected</span>
                </div>
              </div>
            </div>

            {/* Custom SVG Line Chart with Gradient Fill */}
            <div className="pt-4">
              <svg viewBox="0 0 600 200" className="w-full h-56">
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[20, 60, 100, 140, 180].map((y) => (
                  <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#f1f5f9" strokeWidth="1.5" />
                ))}

                {/* Expected Line (Dashed Slate) */}
                <path
                  d="M 20 150 L 120 135 L 220 120 L 320 100 L 420 80 L 580 40"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />

                {/* Gradient Area under Actual curve */}
                <path
                  d="M 20 160 L 120 140 L 220 130 L 320 110 L 420 90 L 580 95 L 580 180 L 20 180 Z"
                  fill="url(#blueGradient)"
                />

                {/* Actual Line (Solid Vibrant Blue) */}
                <path
                  d="M 20 160 L 120 140 L 220 130 L 320 110 L 420 90 L 580 95"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data Point Circles on Actual Line */}
                {[
                  { x: 20, y: 160 },
                  { x: 120, y: 140 },
                  { x: 220, y: 130 },
                  { x: 320, y: 110 },
                  { x: 420, y: 90 },
                  { x: 580, y: 95 },
                ].map((pt, i) => (
                  <circle key={i} cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
                ))}

                {/* X Axis Labels */}
                {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month, i) => {
                  const xCoords = [20, 120, 220, 320, 420, 580];
                  return (
                    <text key={month} x={xCoords[i]} y="198" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8">
                      {month}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Section 3: Donut Distribution, Collection Rate & Activity Trend (Exact matching Image 2) */}
          <div className="space-y-6">
            
            {/* Payment Status Circular Gauge Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-6">
              <div className="w-full text-left">
                <h3 className="font-display font-extrabold text-xl text-slate-900">Payment Status</h3>
                <p className="text-xs text-slate-400 mt-0.5">Distribution across students.</p>
              </div>

              {/* Central Multi-segment Circular Ring matching User Image 2 */}
              <div className="relative w-56 h-56 flex items-center justify-center my-4">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {/* Outer ring path for Paid (87%) Emerald */}
                  <circle
                    cx="50" cy="50" r="38" fill="none"
                    stroke="#10b981" strokeWidth="9"
                    strokeDasharray="207.6 238.7"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Segment for Overdue & Pending dots embedded */}
                  <circle cx="50" cy="12" r="4.5" fill="#ef4444" />
                  <circle cx="88" cy="50" r="4.5" fill="#ef4444" />
                  <circle cx="50" cy="88" r="4.5" fill="#ef4444" />
                  <circle cx="12" cy="50" r="4.5" fill="#ef4444" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-black text-slate-900 block leading-none">128</span>
                  <span className="text-xs text-slate-400 font-semibold mt-1 block">Students</span>
                </div>
              </div>

              {/* Status Breakdown Legend */}
              <div className="w-full space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-600">Paid</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">87%</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-slate-600">Pending</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">9%</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-slate-600">Overdue</span>
                  </div>
                  <span className="text-slate-900 font-extrabold">4%</span>
                </div>
              </div>
            </div>

            {/* Monthly Collection Rate Breakdown */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">Monthly Collection Rate</h3>
                <p className="text-xs text-slate-400 mt-0.5">Percentage of expected payments successfully collected.</p>
              </div>

              <div className="grid grid-cols-6 gap-2 text-center pt-2">
                {[
                  { month: 'Apr', rate: '89%' },
                  { month: 'May', rate: '93%' },
                  { month: 'Jun', rate: '94%' },
                  { month: 'Jul', rate: '98%' },
                  { month: 'Aug', rate: '96%' },
                  { month: 'Sep', rate: '85%', active: true },
                ].map((item) => (
                  <div key={item.month} className="space-y-1">
                    <p className={`text-xs font-black ${item.active ? 'text-blue-600' : 'text-slate-800'}`}>{item.rate}</p>
                    <p className={`text-[11px] font-semibold ${item.active ? 'text-blue-600' : 'text-slate-400'}`}>{item.month}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Activity Trend Progress Bars */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">Payment Activity Trend</h3>
                <p className="text-xs text-slate-400 mt-0.5">When students usually pay each month.</p>
              </div>

              <div className="space-y-4 pt-2 text-xs">
                {[
                  { label: 'Week 1', count: '48 payments', pct: '85%' },
                  { label: 'Week 2', count: '35 payments', pct: '65%' },
                  { label: 'Week 3', count: '20 payments', pct: '40%' },
                  { label: 'Week 4', count: '9 payments', pct: '20%' },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="text-slate-900">{item.count}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-slate-300 h-full rounded-full" style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 4: Key Insights & Performance Cards (Exact matching Image 3) */}
          <div className="space-y-6">
            <h3 className="font-display font-extrabold text-xl text-slate-900">Key Insights</h3>

            {/* 4 Insight Pills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 font-medium">Revenue increased by 18.5% compared to last month.</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 font-medium">16 students still have pending or overdue payments.</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 font-medium">July had your highest payment collection rate at 98%.</p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-2 2h-4a2 2 0 01-2-2v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-xs text-slate-600 font-medium">Most students complete their payments during the first 10 days of the month.</p>
              </div>

            </div>

            {/* Best vs Lowest Performing Month Banner Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Best Performing Card (Green Gradient) */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-md space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-100">
                  <span>🏆 Best Performing Month</span>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-3xl">July 2026</h4>
                  <div className="flex items-center justify-between text-xs mt-3">
                    <span>Collection Rate</span>
                    <span className="font-bold text-base">98%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-1.5 overflow-hidden">
                    <div className="bg-white h-full rounded-full" style={{ width: '98%' }} />
                  </div>
                </div>
              </div>

              {/* Lowest Performing Card (White with Red Accent) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-red-500">
                  <span>⚠️ Lowest Performing Month</span>
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-3xl text-slate-900">September 2026</h4>
                  <div className="flex items-center justify-between text-xs mt-3 text-slate-500 font-medium">
                    <span>Collection Rate</span>
                    <span className="font-bold text-slate-900 text-base">85%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-1.5 overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>

            </div>

            {/* Students Requiring Attention Table Card */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-extrabold text-lg text-slate-900">Students Requiring Attention</h3>
                <button 
                  onClick={() => onNavigateToStudents && onNavigateToStudents()}
                  className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View all →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3 px-4">STUDENT</th>
                      <th className="py-3 px-4">STUDENT ID</th>
                      <th className="py-3 px-4">OUTSTANDING</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4">DAYS OVERDUE</th>
                      <th className="py-3 px-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    
                    {/* Row 1 */}
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-cyan-500 text-white font-bold text-xs flex items-center justify-center">
                            KP
                          </div>
                          <span>Kasun Perera</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">STU-024</td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">Rs. 3,000</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-red-50 text-red-600 font-extrabold px-2.5 py-0.5 rounded-full text-[10px]">
                          OVERDUE
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">5 Days</td>
                      <td className="py-3.5 px-4 text-right">
                        <button 
                          onClick={() => triggerSuccess('Reminder sent to Kasun Perera')}
                          className="bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-xl hover:bg-blue-100 cursor-pointer"
                        >
                          Send Reminder
                        </button>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-cyan-500 text-white font-bold text-xs flex items-center justify-center">
                            NS
                          </div>
                          <span>Nimal Silva</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">STU-052</td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">Rs. 6,000</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-red-50 text-red-600 font-extrabold px-2.5 py-0.5 rounded-full text-[10px]">
                          OVERDUE
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">12 Days</td>
                      <td className="py-3.5 px-4 text-right">
                        <button 
                          onClick={() => triggerSuccess('Reminder sent to Nimal Silva')}
                          className="bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-xl hover:bg-blue-100 cursor-pointer"
                        >
                          Send Reminder
                        </button>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="hover:bg-slate-50/60">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-cyan-500 text-white font-bold text-xs flex items-center justify-center">
                            AF
                          </div>
                          <span>Amal Fernando</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-400">STU-078</td>
                      <td className="py-3.5 px-4 font-extrabold text-slate-900">Rs. 3,000</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-amber-50 text-amber-700 font-extrabold px-2.5 py-0.5 rounded-full text-[10px]">
                          PENDING
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">Due in 2 Days</td>
                      <td className="py-3.5 px-4 text-right">
                        <button 
                          onClick={() => triggerSuccess('Reminder sent to Amal Fernando')}
                          className="bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-xl hover:bg-blue-100 cursor-pointer"
                        >
                          Send Reminder
                        </button>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

            {/* Generate Reports Grid (Exact matching Image 3 bottom section) */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display font-extrabold text-xl text-slate-900">Generate Reports</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Report 1 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Monthly Revenue Report</h4>
                    <p className="text-xs text-slate-400 mt-1">Complete overview of your monthly tuition income.</p>
                  </div>
                  <button
                    onClick={() => triggerSuccess('Monthly Revenue Report generated!')}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>📄</span>
                    <span>Generate Report</span>
                  </button>
                </div>

                {/* Report 2 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Payment Collection Report</h4>
                    <p className="text-xs text-slate-400 mt-1">Detailed report of all student payments.</p>
                  </div>
                  <button
                    onClick={() => triggerSuccess('Payment Collection Report generated!')}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>📄</span>
                    <span>Generate Report</span>
                  </button>
                </div>

                {/* Report 3 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Outstanding Payment Report</h4>
                    <p className="text-xs text-slate-400 mt-1">View all pending and overdue payments.</p>
                  </div>
                  <button
                    onClick={() => triggerSuccess('Outstanding Payment Report generated!')}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>📄</span>
                    <span>Generate Report</span>
                  </button>
                </div>

                {/* Report 4 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Student Payment Report</h4>
                    <p className="text-xs text-slate-400 mt-1">Individual payment performance for each student.</p>
                  </div>
                  <button
                    onClick={() => triggerSuccess('Student Payment Report generated!')}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-2xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>📄</span>
                    <span>Generate Report</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}
