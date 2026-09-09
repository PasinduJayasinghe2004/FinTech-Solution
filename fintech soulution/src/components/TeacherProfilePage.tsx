import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface TeacherProfilePageProps {
  teacherName?: string;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToStudents?: () => void;
  onNavigateToPayments?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToNotifications?: () => void;
}

export default function TeacherProfilePage({
  teacherName = "Dr. Wickramasinghe",
  onLogout,
  onNavigateToDashboard,
  onNavigateToStudents,
  onNavigateToPayments,
  onNavigateToAnalytics,
  onNavigateToNotifications,
}: TeacherProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'payments' | 'analytics' | 'notifications' | 'settings'>('settings');
  const [profileSection, setProfileSection] = useState<'personal' | 'academic' | 'bank' | 'security'>('personal');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Profile Form State
  const [profile, setProfile] = useState({
    name: 'Dr. Wickramasinghe',
    title: 'Senior Mathematics Lecturer & Tutor',
    email: 'teacher@tuitionpay.com',
    phone: '+94 77 987 6543',
    qualification: 'Ph.D. in Applied Mathematics (Univ. of Colombo), B.Sc. (Hons)',
    experienceYears: 12,
    bio: 'Dedicated tuition educator specializing in Advanced Level Combined Mathematics and Physics with over 12 years of proven success preparing students for national examinations.',
    subjects: ['Combined Mathematics', 'Higher Mathematics', 'Physics'],
    bankName: 'Commercial Bank of Ceylon',
    accountNumber: '8004591204',
    accountName: 'Dr. A. Wickramasinghe',
    branchName: 'Colombo Main Branch',
    defaultMonthlyFee: 3000,
    paymentNotes: 'Please include student ID (e.g. STU-001) as reference in bank transfer remark.',
  });

  const [newSubjectTag, setNewSubjectTag] = useState('');

  useEffect(() => {
    apiService.getTeacherProfile().then((res) => {
      if (res.success && res.profile) {
        setProfile(res.profile);
      }
      setLoading(false);
    });
  }, []);

  const triggerSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => {
      setActionSuccessMsg(null);
    }, 3000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await apiService.updateTeacherProfile(profile);
    setSaving(false);
    if (res.success) {
      triggerSuccess('Profile updated successfully!');
    } else {
      triggerSuccess('Saved changes to local profile');
    }
  };

  const handleAddSubject = () => {
    if (newSubjectTag.trim() && !profile.subjects.includes(newSubjectTag.trim())) {
      setProfile({
        ...profile,
        subjects: [...profile.subjects, newSubjectTag.trim()]
      });
      setNewSubjectTag('');
    }
  };

  const handleRemoveSubject = (subjectToRemove: string) => {
    setProfile({
      ...profile,
      subjects: profile.subjects.filter(s => s !== subjectToRemove)
    });
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
            <img src="/logo.jpg" alt="TuitionPay Logo" className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-teal-500/25" />
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
                  onClick={() => {
                    setActiveTab(item.id as any);
                    if (item.id === 'dashboard' && onNavigateToDashboard) onNavigateToDashboard();
                    if (item.id === 'students' && onNavigateToStudents) onNavigateToStudents();
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
            <span className="text-blue-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <span className="tracking-tight">Teacher Profile</span>
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
            <h1 className="font-display text-2xl font-bold text-slate-900">Teacher Profile Settings</h1>
            <p className="text-xs text-slate-500">Manage your personal profile, qualifications, and bank payout details.</p>
          </div>

          <div className="flex items-center gap-3">
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
            </div>

            {/* Profile Dropdown Badge */}
            <div className="flex items-center gap-2.5 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                AK
              </div>
              <span className="text-xs font-bold text-blue-950">{profile.name}</span>
            </div>
          </div>
        </header>

        {/* Profile Content */}
        <main className="p-6 lg:p-8 space-y-6 max-w-5xl w-full mx-auto">
          
          {/* Profile Header Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 z-10 text-center sm:text-left">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-400 to-blue-500 p-1 shadow-xl">
                  <div className="w-full h-full rounded-[22px] bg-slate-900 flex items-center justify-center text-3xl font-black text-cyan-300 border border-cyan-400/30">
                    AK
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-4 border-slate-900" title="Verified Educator" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <h2 className="text-2xl font-extrabold font-display">{profile.name}</h2>
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Verified Educator</span>
                </div>
                <p className="text-sm text-slate-300 font-medium mt-1">{profile.title}</p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-300 justify-center sm:justify-start">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {profile.email}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {profile.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 z-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
              <div className="text-center px-3">
                <span className="block text-2xl font-black text-white">{profile.experienceYears}+ Yrs</span>
                <span className="text-[10px] uppercase font-bold text-slate-300">Experience</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center px-3">
                <span className="block text-2xl font-black text-cyan-300">128</span>
                <span className="text-[10px] uppercase font-bold text-slate-300">Students</span>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center px-3">
                <span className="block text-2xl font-black text-amber-300">4.9 ★</span>
                <span className="text-[10px] uppercase font-bold text-slate-300">Rating</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 bg-slate-200/60 p-1.5 rounded-2xl text-xs font-bold w-fit">
            <button
              onClick={() => setProfileSection('personal')}
              className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                profileSection === 'personal' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Personal Details
            </button>
            <button
              onClick={() => setProfileSection('academic')}
              className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                profileSection === 'academic' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Qualifications & Subjects
            </button>
            <button
              onClick={() => setProfileSection('bank')}
              className={`px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                profileSection === 'bank' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bank & Payout Setup
            </button>
          </div>

          {/* Main Form Container */}
          <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 lg:p-8 space-y-6">
            
            {/* SECTION 1: Personal Information */}
            {profileSection === 'personal' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-display">Personal & Contact Information</h3>
                  <p className="text-xs text-slate-400">Update your teacher credentials and contact details visible to registered students.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Professional Title</label>
                    <input
                      type="text"
                      required
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 mb-1.5">Professional Bio</label>
                  <textarea
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    placeholder="Briefly describe your teaching background and expertise..."
                  />
                </div>
              </div>
            )}

            {/* SECTION 2: Qualifications & Subjects */}
            {profileSection === 'academic' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-display">Academic Qualifications & Subjects</h3>
                  <p className="text-xs text-slate-400">Specify your degrees, years of teaching, and subjects offered.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Degrees & Certifications</label>
                    <input
                      type="text"
                      value={profile.qualification}
                      onChange={(e) => setProfile({ ...profile, qualification: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Teaching Experience (Years)</label>
                    <input
                      type="number"
                      value={profile.experienceYears}
                      onChange={(e) => setProfile({ ...profile, experienceYears: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Subjects Tags */}
                <div className="text-xs space-y-3">
                  <label className="block font-bold text-slate-700">Subjects Offered</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {profile.subjects.map((sub) => (
                      <span key={sub} className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full font-bold text-xs border border-blue-200/60">
                        {sub}
                        <button
                          type="button"
                          onClick={() => handleRemoveSubject(sub)}
                          className="hover:text-red-600 font-black cursor-pointer ml-1"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 max-w-md">
                    <input
                      type="text"
                      placeholder="Add another subject..."
                      value={newSubjectTag}
                      onChange={(e) => setNewSubjectTag(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: Bank Details & Tuition Payout Setup */}
            {profileSection === 'bank' && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-display">Bank Account & Payout Information</h3>
                  <p className="text-xs text-slate-400">Configure bank transfer deposit details displayed on student invoices.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Bank Name</label>
                    <input
                      type="text"
                      value={profile.bankName}
                      onChange={(e) => setProfile({ ...profile, bankName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Account Number</label>
                    <input
                      type="text"
                      value={profile.accountNumber}
                      onChange={(e) => setProfile({ ...profile, accountNumber: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-mono outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Account Holder Name</label>
                    <input
                      type="text"
                      value={profile.accountName}
                      onChange={(e) => setProfile({ ...profile, accountName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Branch Name</label>
                    <input
                      type="text"
                      value={profile.branchName}
                      onChange={(e) => setProfile({ ...profile, branchName: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">Default Class Fee (Rs.)</label>
                    <input
                      type="number"
                      value={profile.defaultMonthlyFee}
                      onChange={(e) => setProfile({ ...profile, defaultMonthlyFee: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 mb-1.5">Payment Instructions for Students</label>
                  <textarea
                    rows={3}
                    value={profile.paymentNotes}
                    onChange={(e) => setProfile({ ...profile, paymentNotes: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl font-medium outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Form Action Controls */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-7 py-3.5 rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>

          </form>

        </main>
      </div>

    </div>
  );
}
