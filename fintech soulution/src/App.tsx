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

export default function App() {
  return (
    <div className="min-h-full">
      <Navbar />
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
