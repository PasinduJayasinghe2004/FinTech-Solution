import { useState } from 'react';
import { logoImg } from '@/assets/logo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Problem from './components/Problem';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DashboardShowcase from './components/DashboardShowcase';
import PaymentSecurity from './components/PaymentSecurity';
import Notifications from './components/Notifications';
import CTA from './components/CTA';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';

import TeacherDashboard from './components/TeacherDashboard';

export default function App() {
  const [view, setView] = useState<'home' | 'login' | 'student_dashboard' | 'teacher_dashboard'>('home');

  if (view === 'login') {
    return (
      <LoginPage 
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

  return (
    <div className="min-h-full">
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white text-center py-2.5 px-4 flex items-center justify-center gap-3 border-b border-blue-700/50">
        <img src={logoImg} alt="RIA Logo" className="w-6 h-6 rounded-md shadow-sm object-cover" />
        <span className="text-sm font-medium tracking-wide">Welcome to RIA – Your Complete Tuition Management Solution</span>
      </div>
      <Navbar 
        onLoginClick={() => setView('login')} 
        onTeacherDashboardClick={() => setView('teacher_dashboard')}
      />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <Features />
        <HowItWorks />
        <DashboardShowcase />
        <PaymentSecurity />
        <Notifications />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}


