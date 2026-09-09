import { logoImg } from '@/assets/logo';
import React, { useState } from 'react';

interface StudentManagementProps {
  teacherName?: string;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToPayments?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToNotifications?: () => void;
}

interface StudentItem {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  contact: string;
  fee: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  lastPayment: string;
  activeStatus: boolean;
}

const mockStudents: StudentItem[] = [
  { id: 'STU-001', name: 'Kasun Perera', initials: 'K', avatarBg: 'bg-blue-600', contact: 'kasun@email.com', fee: 'Rs. 3,000', status: 'PAID', lastPayment: 'Sep 04, 2026', activeStatus: true },
  { id: 'STU-002', name: 'Nimal Silva', initials: 'N', avatarBg: 'bg-emerald-600', contact: 'nimal@email.com', fee: 'Rs. 3,000', status: 'PENDING', lastPayment: 'Aug 10, 2026', activeStatus: true },
  { id: 'STU-003', name: 'Amal Fernando', initials: 'A', avatarBg: 'bg-purple-600', contact: 'amal@email.com', fee: 'Rs. 3,000', status: 'OVERDUE', lastPayment: 'Jul 15, 2026', activeStatus: true },
  { id: 'STU-018', name: 'Dilani Jayasuriya', initials: 'D', avatarBg: 'bg-pink-600', contact: 'dilani@email.com', fee: 'Rs. 3,500', status: 'PAID', lastPayment: 'Sep 01, 2026', activeStatus: true },
  { id: 'STU-024', name: 'Sanduni Rathnayake', initials: 'S', avatarBg: 'bg-orange-500', contact: 'sanduni@email.com', fee: 'Rs. 3,000', status: 'PENDING', lastPayment: 'Aug 12, 2026', activeStatus: true },
  { id: 'STU-037', name: 'Tharindu Bandara', initials: 'T', avatarBg: 'bg-cyan-600', contact: 'tharindu@email.com', fee: 'Rs. 2,500', status: 'OVERDUE', lastPayment: 'Jul 02, 2026', activeStatus: true },
  { id: 'STU-041', name: 'Ishara Gunawardena', initials: 'I', avatarBg: 'bg-indigo-600', contact: 'ishara@email.com', fee: 'Rs. 3,000', status: 'PAID', lastPayment: 'Sep 03, 2026', activeStatus: true },
  { id: 'STU-052', name: 'Hiruni Wickramasinghe', initials: 'H', avatarBg: 'bg-teal-600', contact: 'hiruni@email.com', fee: 'Rs. 3,500', status: 'PAID', lastPayment: 'Sep 02, 2026', activeStatus: true },
];

export default function StudentManagement({
  teacherName = "Mr. Anil",
  onLogout,
  onNavigateToDashboard,
  onNavigateToPayments,
  onNavigateToAnalytics,
  onNavigateToNotifications
}: StudentManagementProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'payments' | 'analytics' | 'notifications' | 'settings'>('students');
  const [filterCategory, setFilterCategory] = useState<'all' | 'active' | 'pending' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('recently_added');
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Modals
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState({ name: '', id: '', email: '', fee: '3000' });

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
    setNewStudent({ name: '', id: '', email: '', fee: '3000' });
  };

  // Filter students based on category and search
  const filteredStudents = mockStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.contact.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterCategory === 'active') return matchesSearch && s.activeStatus;
    if (filterCategory === 'pending') return matchesSearch && s.status === 'PENDING';
    if (filterCategory === 'overdue') return matchesSearch && s.status === 'OVERDUE';
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
                  onClick={() => {
                    setActiveTab(item.id as any);
                    if (item.id === 'dashboard' && onNavigateToDashboard) onNavigateToDashboard();
                    if (item.id === 'payments' && onNavigateToPayments) onNavigateToPayments();
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
            <h1 className="font-display text-2xl font-bold text-slate-900">Student Management</h1>
            <p className="text-xs text-slate-400 mt-0.5">Manage and monitor all your students from one place.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Button */}
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
                  </div>
                </div>
              )}
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
          
          {/* Top 4 Summary Cards (Exact matching user design) */}
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
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">12</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                12 new this month
              </p>
            </div>

            {/* Card 2: Active Students */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Active Students</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">10</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                Currently enrolled
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
                <h3 className="text-3xl font-extrabold text-amber-600 mt-1">2</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                Students haven't paid yet
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
                <h3 className="text-3xl font-extrabold text-red-600 mt-1">5</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                Require immediate attention
              </p>
            </div>

          </div>

          {/* Search, Filter Pills, Sort & Add Button Controls */}
          <div className="space-y-4">
            {/* Search Input Bar */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by student name or Student ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 shadow-sm transition-all"
              />
            </div>

            {/* Filter Tabs + Sort Dropdown + Blue CTA Button Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Category Pills Filter */}
              <div className="flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-2xl text-xs font-bold">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    filterCategory === 'all' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  All Students
                </button>
                <button
                  onClick={() => setFilterCategory('active')}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    filterCategory === 'active' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilterCategory('pending')}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    filterCategory === 'pending' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Pending Payment
                </button>
                <button
                  onClick={() => setFilterCategory('overdue')}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    filterCategory === 'overdue' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Overdue
                </button>
              </div>

              {/* Right Side: Sort dropdown & Add New Student Button */}
              <div className="flex items-center gap-3">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-2xl px-3.5 py-2.5 outline-none cursor-pointer shadow-sm"
                >
                  <option value="recently_added">Sort by: Recently Added</option>
                  <option value="name_asc">Sort by: Name (A-Z)</option>
                  <option value="fee_high">Sort by: Fee (High to Low)</option>
                </select>

                <button
                  onClick={() => setShowAddStudentModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-2xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>+</span>
                  <span>Add New Student</span>
                </button>
              </div>

            </div>
          </div>

          {/* Student Table Container */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="py-4 px-6">STUDENT</th>
                    <th className="py-4 px-4">ID</th>
                    <th className="py-4 px-6">CONTACT</th>
                    <th className="py-4 px-6">MONTHLY FEE</th>
                    <th className="py-4 px-6">PAYMENT STATUS</th>
                    <th className="py-4 px-6">LAST PAYMENT</th>
                    <th className="py-4 px-6 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Student Name & Avatar */}
                      <td className="py-4 px-6 font-bold text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${s.avatarBg} text-white font-extrabold text-xs flex items-center justify-center shrink-0`}>
                            {s.initials}
                          </div>
                          <span className="text-slate-800 font-bold">{s.name}</span>
                        </div>
                      </td>

                      {/* ID */}
                      <td className="py-4 px-4 text-xs text-slate-400 font-mono">{s.id}</td>

                      {/* Contact */}
                      <td className="py-4 px-6 text-xs text-slate-500 font-medium">{s.contact}</td>

                      {/* Monthly Fee */}
                      <td className="py-4 px-6 font-extrabold text-slate-900">{s.fee}</td>

                      {/* Payment Status Pill */}
                      <td className="py-4 px-6">
                        {s.status === 'PAID' && (
                          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-200/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> PAID
                          </span>
                        )}
                        {s.status === 'PENDING' && (
                          <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-black px-3 py-1 rounded-full border border-amber-200/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> PENDING
                          </span>
                        )}
                        {s.status === 'OVERDUE' && (
                          <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-[10px] font-black px-3 py-1 rounded-full border border-red-200/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> OVERDUE
                          </span>
                        )}
                      </td>

                      {/* Last Payment */}
                      <td className="py-4 px-6 text-xs text-slate-500">{s.lastPayment}</td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => triggerSuccess(`Sent reminder to ${s.name}`)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors"
                            title="Send Reminder"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => triggerSuccess(`Viewing details for ${s.name}`)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                            title="More Options"
                          >
                            •••
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
              <span>Showing 1-8 of 128 students</span>
              
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

      {/* Add New Student Modal */}
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
            <p className="text-xs text-slate-500 mb-4">Enroll a student into your tuition management system</p>

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
                  <label className="block font-bold text-slate-700 mb-1">Email / Contact</label>
                  <input 
                    type="email" 
                    placeholder="student@email.com" 
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
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

    </div>
  );
}
