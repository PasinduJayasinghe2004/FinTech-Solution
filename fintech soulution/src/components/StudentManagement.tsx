import { logoImg } from '@/assets/logo';
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { mockStudents170, StudentItem } from '../data/studentsData';

interface StudentManagementProps {
  teacherName?: string;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToPayments?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToNotifications?: () => void;
}

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
  const [studentsList, setStudentsList] = useState<StudentItem[]>(mockStudents170);

  // Modals
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedStudentForMsg, setSelectedStudentForMsg] = useState<StudentItem | null>(null);
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [messageChannel, setMessageChannel] = useState('In-App & Email & SMS');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [newStudent, setNewStudent] = useState({ name: '', id: '', email: '', fee: '3000' });

  const loadBackendStudents = async () => {
    try {
      const [backendStudents, allPayments] = await Promise.all([
        apiService.fetchStudents(),
        apiService.fetchPayments()
      ]);

      if (backendStudents && backendStudents.length > 0) {
        const bgColors = ['bg-blue-600', 'bg-emerald-600', 'bg-purple-600', 'bg-indigo-600', 'bg-pink-600', 'bg-orange-500'];

        const mapped: StudentItem[] = backendStudents.map((s: any, idx: number) => {
          const studentId = s.studentUniqueId || s.id || `STU-${idx + 100}`;
          
          // Find student payments from backend
          const studentPayments = (allPayments || []).filter(
            (p: any) => p.studentId?.toUpperCase() === studentId.toUpperCase()
          );

          // Latest payment date or registration date
          const latestPaymentObj = studentPayments.length > 0 ? studentPayments[0] : null;
          const lastPayment = latestPaymentObj
            ? (latestPaymentObj.paymentDate !== '—' ? `${latestPaymentObj.month} (${latestPaymentObj.paymentDate})` : latestPaymentObj.month)
            : (s.registeredDate || 'Recently Registered');

          // Compute live payment status based on latest payment record
          let status: 'PAID' | 'PENDING' | 'OVERDUE' = 'PENDING';
          if (latestPaymentObj) {
            if (latestPaymentObj.status === 'Paid') status = 'PAID';
            else if (latestPaymentObj.status === 'Pending') status = 'PENDING';
            else if (latestPaymentObj.status === 'Overdue') status = 'OVERDUE';
          } else {
            status = 'PENDING';
          }

          return {
            id: studentId,
            name: s.name || 'New Student',
            initials: (s.name || 'S').charAt(0).toUpperCase(),
            avatarBg: bgColors[idx % bgColors.length],
            contact: s.email || s.phone || 'student@email.com',
            fee: `Rs. ${s.fee || 3000}`,
            status,
            lastPayment,
            activeStatus: s.status === 'ACTIVE' || true,
          };
        });

        // Merge with mockStudents170 ensuring no duplicate IDs
        const combined = [...mapped];
        mockStudents170.forEach(m => {
          if (!combined.some(c => c.id.toUpperCase() === m.id.toUpperCase())) {
            combined.push(m);
          }
        });

        setStudentsList(combined);
      }
    } catch (err) {
      console.error('Failed to load backend students:', err);
    }
  };

  useEffect(() => {
    loadBackendStudents();
  }, []);

  const triggerSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 2500);
  };

  const handleAddStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddStudentModal(false);
    
    // Register student to backend database
    await apiService.registerStudent({
      name: newStudent.name || 'New Student',
      email: newStudent.email || `${(newStudent.name || 'student').toLowerCase().replace(/\s+/g, '')}@ria.com`,
      subject: 'Combined Mathematics',
      phone: '+94 77 000 0000',
    });

    await loadBackendStudents();
    triggerSuccess(`Student ${newStudent.name || 'New Student'} added successfully!`);
    setNewStudent({ name: '', id: '', email: '', fee: '3000' });
  };

  const handleOpenMessageModal = (student: StudentItem, defaultTitle: string = '', defaultMsg: string = '') => {
    setSelectedStudentForMsg(student);
    setMessageTitle(defaultTitle || `Notice regarding tuition payment`);
    setMessageContent(defaultMsg || `Dear ${student.name},\n\nThis is a notification regarding your tuition classes and payment status (${student.fee}). Please contact us if you have any questions.`);
    setShowMessageModal(true);
  };

  const handleSendMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForMsg) return;
    setSendingMsg(true);

    try {
      const res = await apiService.sendMessage(
        selectedStudentForMsg.id,
        messageTitle,
        messageContent,
        messageChannel
      );

      if (res.success) {
        triggerSuccess(`Message sent to ${selectedStudentForMsg.name} (${messageChannel})!`);
        setShowMessageModal(false);
        setMessageTitle('');
        setMessageContent('');
      } else {
        triggerSuccess(res.message || 'Failed to dispatch message');
      }
    } catch (err) {
      triggerSuccess('Failed to send message');
    } finally {
      setSendingMsg(false);
    }
  };

  // Filter students based on category and search
  const filteredStudents = studentsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.contact.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterCategory === 'active') return matchesSearch && s.activeStatus;
    if (filterCategory === 'pending') return matchesSearch && s.status === 'PENDING';
    if (filterCategory === 'overdue') return matchesSearch && s.status === 'OVERDUE';
    return matchesSearch;
  });

  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOption === 'name_asc') return a.name.localeCompare(b.name);
    if (sortOption === 'fee_high') {
      const feeA = parseInt(a.fee.replace(/[^0-9]/g, '')) || 0;
      const feeB = parseInt(b.fee.replace(/[^0-9]/g, '')) || 0;
      return feeB - feeA;
    }
    return a.id.localeCompare(b.id);
  });

  // Pagination calculations
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(sortedStudents.length / ITEMS_PER_PAGE));
  const validPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, sortedStudents.length);
  const paginatedStudents = sortedStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (validPage > 3) pages.push('...');
      const start = Math.max(2, validPage - 1);
      const end = Math.min(totalPages - 1, validPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (validPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  // Reset pagination when category or search changes
  const handleFilterChange = (cat: 'all' | 'active' | 'pending' | 'overdue') => {
    setFilterCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Summary card dynamic calculations
  const totalStudentsCount = studentsList.length;
  const activeStudentsCount = studentsList.filter(s => s.activeStatus).length;
  const pendingPaymentsCount = studentsList.filter(s => s.status === 'PENDING').length;
  const overduePaymentsCount = studentsList.filter(s => s.status === 'OVERDUE').length;

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
          <h1 className="font-display text-2xl font-bold text-slate-900">Student Management</h1>
          <p className="text-xs text-slate-500">Manage and monitor all your students from one place.</p>
        </div>

        <button 
          onClick={() => setShowAddStudentModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <span>+ Add New Student</span>
        </button>
      </div>

      {/* Top 4 Summary Cards (Exact matching user design) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Total Students */}
            <div 
              onClick={() => setFilterCategory('all')}
              className={`bg-white p-5 rounded-3xl border ${filterCategory === 'all' ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-100'} shadow-sm relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-blue-300 transition-all`}
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Total Students</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{totalStudentsCount}</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                {totalStudentsCount} total registered
              </p>
            </div>

            {/* Card 2: Active Students */}
            <div 
              onClick={() => setFilterCategory('active')}
              className={`bg-white p-5 rounded-3xl border ${filterCategory === 'active' ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-100'} shadow-sm relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-emerald-300 transition-all`}
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Active Students</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{activeStudentsCount}</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                Currently enrolled
              </p>
            </div>

            {/* Card 3: Pending Payments */}
            <div 
              onClick={() => setFilterCategory('pending')}
              className={`bg-white p-5 rounded-3xl border ${filterCategory === 'pending' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-100'} shadow-sm relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-amber-300 transition-all`}
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Pending Payments</p>
                <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{pendingPaymentsCount}</h3>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-3">
                Students haven't paid yet
              </p>
            </div>

            {/* Card 4: Overdue Payments */}
            <div 
              onClick={() => setFilterCategory('overdue')}
              className={`bg-white p-5 rounded-3xl border ${filterCategory === 'overdue' ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-100'} shadow-sm relative overflow-hidden flex flex-col justify-between cursor-pointer hover:border-red-300 transition-all`}
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-400">Overdue Payments</p>
                <h3 className="text-3xl font-extrabold text-red-600 mt-1">{overduePaymentsCount}</h3>
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
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/80 rounded-2xl text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 shadow-sm transition-all"
              />
            </div>

            {/* Filter Tabs + Sort Dropdown + Blue CTA Button Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              {/* Category Pills Filter */}
              <div className="flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-2xl text-xs font-bold">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    filterCategory === 'all' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  All Students
                </button>
                <button
                  onClick={() => handleFilterChange('active')}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    filterCategory === 'active' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => handleFilterChange('pending')}
                  className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    filterCategory === 'pending' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Pending Payment
                </button>
                <button
                  onClick={() => handleFilterChange('overdue')}
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
                  {paginatedStudents.map((s) => (
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
                            onClick={() => handleOpenMessageModal(s, 'Tuition Fee Payment Reminder', `Dear ${s.name},\n\nThis is a friendly reminder that your monthly tuition fee (${s.fee}) for the current session is ${s.status === 'OVERDUE' ? 'overdue' : 'due'}. Kindly settle your payment to continue seamless access to classes.\n\nThank you!`)}
                            className="p-2 text-slate-500 hover:text-blue-600 rounded-xl hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all flex items-center gap-1.5 cursor-pointer text-xs font-semibold"
                            title="Send Message / Reminder"
                          >
                            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>Message</span>
                          </button>
                          <button 
                            onClick={() => handleOpenMessageModal(s)}
                            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                            title="Options"
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
              <span>
                Showing {sortedStudents.length === 0 ? 0 : startIndex + 1}–{endIndex} of {sortedStudents.length} students
              </span>
              
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  disabled={validPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>

                {getPageNumbers().map((p, idx) => (
                  typeof p === 'number' ? (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(p)}
                      className={`min-w-8 h-8 px-2 rounded-xl font-bold transition-all cursor-pointer ${
                        validPage === p
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {p}
                    </button>
                  ) : (
                    <span key={idx} className="px-1 text-slate-400">...</span>
                  )
                ))}

                <button
                  disabled={validPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-blue-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>

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

      {/* Send Message / Reminder Modal */}
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
                <h3 className="font-display font-extrabold text-xl text-slate-900">Send Message to Student</h3>
                <p className="text-xs text-slate-500">Recipient: <strong className="text-slate-800">{selectedStudentForMsg.name} ({selectedStudentForMsg.id})</strong></p>
              </div>
            </div>

            <form onSubmit={handleSendMessageSubmit} className="space-y-4 text-xs mt-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Send Via Channel</label>
                <select
                  value={messageChannel}
                  onChange={(e) => setMessageChannel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold outline-none"
                >
                  <option value="In-App & Email & SMS">⚡ In-App Notification + Simulated Email & SMS</option>
                  <option value="Email Only">📧 Email Only ({selectedStudentForMsg.contact})</option>
                  <option value="SMS Only">📱 SMS Only</option>
                  <option value="In-App Only">🔔 In-App Notification Only</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject / Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Tuition Fee Reminder for September" 
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Message Content</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Type your message to the student here..." 
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {/* Quick Template Buttons */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 mb-1.5">Quick Templates:</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMessageTitle('Payment Reminder');
                      setMessageContent(`Dear ${selectedStudentForMsg.name}, this is a friendly reminder regarding your pending tuition fee for the current month (${selectedStudentForMsg.fee}). Please settle it at your earliest convenience. Thank you!`);
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-lg text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    💳 Fee Reminder
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMessageTitle('Upcoming Class Notice');
                      setMessageContent(`Dear ${selectedStudentForMsg.name}, please be informed that our next lecture is scheduled as usual. Ensure your homework is completed beforehand.`);
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-lg text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    📚 Class Notice
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMessageTitle('Payment Received Thank You');
                      setMessageContent(`Dear ${selectedStudentForMsg.name}, thank you for your payment! Your tuition status has been updated to PAID.`);
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-lg text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    ✅ Receipt Confirmation
                  </button>
                </div>
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
                  {sendingMsg ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
