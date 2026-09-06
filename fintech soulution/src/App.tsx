import { useState } from 'react';
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

export default function App() {
  const [view, setView] = useState<'home' | 'login'>('home');

  if (view === 'login') {
    return <LoginPage onBackToHome={() => setView('home')} />;
  }

  return (
    <div className="min-h-full">
      <Navbar onLoginClick={() => setView('login')} />
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

