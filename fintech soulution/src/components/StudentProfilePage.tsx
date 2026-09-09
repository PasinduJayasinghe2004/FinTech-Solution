import React from 'react';

interface StudentProfilePageProps {
  studentName?: string;
  onLogout?: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToPayments: () => void;
  onNavigateToHistory: () => void;
  onNavigateToNotifications: () => void;
}

export default function StudentProfilePage({
  studentName = "Pasindu Jayasinghe",
  onLogout,
  onNavigateToDashboard,
  onNavigateToPayments,
  onNavigateToHistory,
  onNavigateToNotifications,
}: StudentProfilePageProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100/80 p-6 flex flex-col justify-between shrink-0 hidden md:flex min-h-screen select-none">
        <div>
          <div className="flex items-center gap-3.5 mb-9 px-1">
            <img src="/logo.jpg" alt="TuitionPay Logo" className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-teal-500/25" />
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
            <p className="text-xs text-slate-500">Your personal details and enrollment info</p>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-100 px-3 py-1.5 rounded-full">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              {studentName.charAt(0)}
            </div>
            <span className="text-xs font-bold text-slate-800">{studentName}</span>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              {studentName.charAt(0)}
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900">{studentName}</h2>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-0.5 rounded-full font-mono">
                STU-001
              </span>
              <p className="text-xs text-slate-500">Enrolled Student • Active Account</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">Personal & Academic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">FULL NAME</label>
                <div className="p-3 bg-slate-50 rounded-xl font-semibold text-slate-800">{studentName}</div>
              </div>
              <div>
                <label className="text-slate-400 font-bold block mb-1">STUDENT UNIQUE ID</label>
                <div className="p-3 bg-slate-50 rounded-xl font-bold font-mono text-blue-600">STU-001</div>
              </div>
              <div>
                <label className="text-slate-400 font-bold block mb-1">EMAIL ADDRESS</label>
                <div className="p-3 bg-slate-50 rounded-xl font-semibold text-slate-800">pasindu@example.com</div>
              </div>
              <div>
                <label className="text-slate-400 font-bold block mb-1">PHONE NUMBER</label>
                <div className="p-3 bg-slate-50 rounded-xl font-semibold text-slate-800">+94 77 123 4567</div>
              </div>
              <div>
                <label className="text-slate-400 font-bold block mb-1">ENROLLED SUBJECT</label>
                <div className="p-3 bg-slate-50 rounded-xl font-semibold text-slate-800">Combined Mathematics</div>
              </div>
              <div>
                <label className="text-slate-400 font-bold block mb-1">ASSIGNED TEACHER</label>
                <div className="p-3 bg-slate-50 rounded-xl font-semibold text-slate-800">Dr. Wickramasinghe</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
