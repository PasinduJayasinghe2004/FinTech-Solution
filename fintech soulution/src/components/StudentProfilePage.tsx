import { logoImg } from '@/assets/logo';
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface StudentProfilePageProps {
  studentName?: string;
  onLogout?: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToPayments: () => void;
  onNavigateToHistory: () => void;
  onNavigateToNotifications: () => void;
}

// 5 Official RIA Teachers & Subjects
export const RIA_TEACHERS = [
  { id: 'usr_tch_lahiru', name: 'Lahiru Dombawalage', subject: 'Combined Mathematics & Science', fee: 3000, email: 'lahiru@ria.com', phone: '+94 77 555 6666' },
  { id: 'usr_tch_ranil', name: 'Ranil Fernando', subject: 'English & TEFL Courses', fee: 3000, email: 'ranil@ria.com', phone: '+94 77 111 2222' },
  { id: 'usr_tch_lakshan', name: 'Lakshan Fernando', subject: 'IT & Software Education', fee: 3500, email: 'lakshan@ria.com', phone: '+94 77 222 3333' },
  { id: 'usr_tch_ishan', name: 'Ishan Darshana', subject: 'Commerce & Accounting', fee: 3000, email: 'ishan@ria.com', phone: '+94 77 333 4444' },
  { id: 'usr_tch_suranga', name: 'Suranga Hettiarachchi', subject: 'Sinhala & Sri Lankan History', fee: 2500, email: 'suranga@ria.com', phone: '+94 77 444 5555' },
];

export default function StudentProfilePage({
  studentName = "Pasindu Jayasinghe",
  onLogout,
  onNavigateToDashboard,
  onNavigateToPayments,
  onNavigateToHistory,
  onNavigateToNotifications,
}: StudentProfilePageProps) {
  const [storedUser, setStoredUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('ria_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState(storedUser?.name || studentName);
  const [profileEmail, setProfileEmail] = useState(storedUser?.email || 'pasindu@example.com');
  const [profilePhone, setProfilePhone] = useState(storedUser?.phone || '+94 77 123 4567');
  const [profileStudentId, setProfileStudentId] = useState(storedUser?.studentId || 'STU-001');
  const [selectedTeacherId, setSelectedTeacherId] = useState(storedUser?.teacherId || 'usr_tch_lahiru');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    apiService.getStudentDashboard().then((res) => {
      if (res && res.success && res.data?.student) {
        const s = res.data.student;
        if (s.name) setProfileName(s.name);
        if (s.email) setProfileEmail(s.email);
        if (s.studentUniqueId) setProfileStudentId(s.studentUniqueId);
      }
    });
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      ...storedUser,
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      studentId: profileStudentId,
      teacherId: selectedTeacherId,
    };

    try {
      localStorage.setItem('ria_user', JSON.stringify(updatedUser));
      setStoredUser(updatedUser);
    } catch (e) {
      console.error(e);
    }

    setIsEditing(false);
    setToastMsg('Profile details successfully updated!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const assignedTeacher = RIA_TEACHERS.find(t => t.id === selectedTeacherId) || RIA_TEACHERS[0];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      
      {/* Toast Banner */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-medium text-sm flex items-center gap-2 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100/80 p-6 flex flex-col justify-between shrink-0 hidden md:flex min-h-screen select-none">
        <div>
          <div className="flex items-center gap-3.5 mb-9 px-1">
            <img src={logoImg} alt="RIA Logo" className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-teal-500/25" />
            <span className="font-display font-extrabold text-xl tracking-tight text-blue-950">RIA</span>
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
            <button onClick={onNavigateToNotifications} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>Notifications</span>
            </button>
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold bg-blue-50/90 text-blue-600 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
            <h1 className="font-display text-xl font-bold text-slate-900">Student Profile</h1>
            <p className="text-xs text-slate-500">Your personal details, enrolled courses & assigned teachers</p>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-100 px-3 py-1.5 rounded-full">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              {profileName.charAt(0)}
            </div>
            <span className="text-xs font-bold text-slate-800">{profileName}</span>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
          
          {/* Profile Top Header Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                {profileName.charAt(0)}
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900">{profileName}</h2>
                <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-0.5 rounded-full font-mono">
                  {profileStudentId}
                </span>
                <p className="text-xs text-slate-500">Enrolled Student • Active Portal Account</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Form / Details Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Personal & Academic Information</h3>
              {isEditing && <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">Editing Mode</span>}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Full Student Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Student Unique ID</label>
                    <input
                      type="text"
                      value={profileStudentId}
                      onChange={(e) => setProfileStudentId(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold text-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-blue-600 outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Primary Assigned Teacher & Subject</label>
                    <select
                      value={selectedTeacherId}
                      onChange={(e) => setSelectedTeacherId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:border-blue-600 outline-none"
                    >
                      {RIA_TEACHERS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} — {t.subject} (Monthly Fee: Rs. {t.fee.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">FULL NAME</label>
                  <div className="p-3 bg-slate-50 rounded-xl font-semibold text-slate-800">{profileName}</div>
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">STUDENT UNIQUE ID</label>
                  <div className="p-3 bg-slate-50 rounded-xl font-bold font-mono text-blue-600">{profileStudentId}</div>
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">EMAIL ADDRESS</label>
                  <div className="p-3 bg-slate-50 rounded-xl font-semibold text-slate-800">{profileEmail}</div>
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">PHONE NUMBER</label>
                  <div className="p-3 bg-slate-50 rounded-xl font-semibold text-slate-800">{profilePhone}</div>
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">ENROLLED SUBJECT</label>
                  <div className="p-3 bg-slate-50 rounded-xl font-semibold text-slate-800">{assignedTeacher.subject}</div>
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">ASSIGNED TEACHER</label>
                  <div className="p-3 bg-slate-50 rounded-xl font-semibold text-slate-800">{assignedTeacher.name}</div>
                </div>
              </div>
            )}
          </div>

          {/* 5 Enrolled Teachers Overview Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">RIA Academic Department Teachers</h3>
                <p className="text-xs text-slate-500">Official registered lecturers for your enrolled subjects</p>
              </div>
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                5 Active Faculty Members
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {RIA_TEACHERS.map((t) => {
                const isPrimary = t.id === selectedTeacherId;
                return (
                  <div
                    key={t.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isPrimary 
                        ? 'border-blue-500 bg-blue-50/50 shadow-2xs' 
                        : 'border-slate-100 bg-slate-50/60 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Teacher</span>
                      {isPrimary && (
                        <span className="text-[9px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                          Assigned
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-extrabold text-slate-900">{t.name}</p>
                    <p className="text-[11px] text-blue-600 font-semibold mt-0.5">{t.subject}</p>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Monthly Fee:</span>
                      <span className="font-bold text-slate-800">Rs. {t.fee.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

