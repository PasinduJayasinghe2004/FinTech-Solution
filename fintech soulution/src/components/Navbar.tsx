import { useState, useEffect } from 'react';
import { MenuIcon, CloseIcon } from './Icons';

const navLinks = ['Home', 'Features', 'How It Works', 'Pricing', 'About Us'];

interface NavbarProps {
  onLoginClick?: () => void;
  onTeacherDashboardClick?: () => void;
}

export default function Navbar({ onLoginClick, onTeacherDashboardClick }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white shadow-sm border-b border-slate-100' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <img src="/logo.jpg" alt="TuitionPay Logo" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
            <span className="font-display font-semibold text-blue-900 text-lg tracking-tight">TuitionPay</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={onLoginClick}
              className="text-slate-700 hover:text-blue-700 text-sm font-medium transition-colors px-3 py-1.5 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={onTeacherDashboardClick}
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Teacher Portal
            </button>
            <button
              onClick={onLoginClick}
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-5">
          <div className="flex flex-col gap-4 mb-5">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-slate-600 text-sm font-medium hover:text-blue-700">
                {link}
              </a>
            ))}
          </div>
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => { setOpen(false); onLoginClick?.(); }}
              className="flex-1 text-center border border-blue-200 text-blue-700 text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => { setOpen(false); onLoginClick?.(); }}
              className="flex-1 text-center bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
