import { useState } from 'react';
import { logoImg } from '@/assets/logo';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';

export default function App() {
  const [view, setView] = useState<'home' | 'login' | 'student_dashboard' | 'teacher_dashboard'>('home');
  const [initialRole, setInitialRole] = useState<'student' | 'teacher'>('student');

  if (view === 'login') {
    return (
      <LoginPage
        initialRole={initialRole}
        onBackToHome={() => setView('home')}
        onLoginSuccess={(role) => {
          if (role === 'student') {
            setView('student_dashboard');
          } else {
            setView('teacher_dashboard');
          }
        }}
      />
    );
  }

  if (view === 'student_dashboard') {
    return <StudentDashboard onLogout={() => setView('home')} />;
  }

  if (view === 'teacher_dashboard') {
    return <TeacherDashboard onLogout={() => setView('home')} />;
  }

  const handleOpenLogin = (role: 'student' | 'teacher') => {
    setInitialRole(role);
    setView('login');
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 flex flex-col justify-between font-sans">
      {/* Background Fullscreen Video */}
      <video
        key="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-85 pointer-events-none"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Gradient Overlay for optimal readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-slate-950/90 z-0 pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 shadow-xl">
          <img src={logoImg} alt="RIA Logo" className="w-9 h-9 rounded-xl object-cover" />
          <span className="font-display font-bold text-white text-xl tracking-wide">RIA</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleOpenLogin('student')}
            className="px-5 py-2.5 rounded-xl font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all backdrop-blur-md shadow-lg hover:scale-105 active:scale-95"
          >
            Student Login
          </button>
          <button
            onClick={() => handleOpenLogin('teacher')}
            className="px-6 py-2.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 transition-all shadow-lg shadow-teal-500/20 hover:scale-105 active:scale-95"
          >
            Teacher Login
          </button>
        </div>
      </header>

      {/* Hero Content Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2.5 bg-blue-500/20 border border-blue-400/30 backdrop-blur-md rounded-full px-5 py-2 mb-8 shadow-inner">
          <span className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-ping" />
          <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">Next-Gen Tuition Fintech</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none mb-6 drop-shadow-md">
          Welcome to <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">RIA</span>
        </h1>

        <p className="text-lg md:text-2xl text-slate-200 max-w-2xl font-normal leading-relaxed mb-10 text-shadow drop-shadow-sm">
          Streamlining private tuition management & fee payments with modern automated clarity.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center max-w-md">
          <button
            onClick={() => handleOpenLogin('student')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
          >
            <span>Student Portal</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={() => handleOpenLogin('teacher')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-400/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3"
          >
            <span>Teacher Portal</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="relative z-10 py-6 px-8 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} RIA Tuition Management. All rights reserved.
      </footer>
    </div>
  );
}
