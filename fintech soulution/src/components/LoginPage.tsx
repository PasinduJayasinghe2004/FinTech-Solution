import React, { useState } from 'react';

interface LoginPageProps {
  onBackToHome?: () => void;
  onLoginSuccess?: (role: 'student' | 'teacher') => void;
}

export default function LoginPage({ onBackToHome, onLoginSuccess }: LoginPageProps) {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [idOrEmail, setIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess(role);
    } else {
      alert(`Logging in as ${role === 'student' ? 'Student (' + (idOrEmail || 'STU-001') + ')' : 'Teacher (' + (idOrEmail || 'teacher@tuitionpay.com') + ')'}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-0 md:p-6 lg:p-10 font-sans">
      <div className="w-full max-w-6xl bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[680px]">
        
        {/* Left Side - Blue Hero Panel */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-8 lg:p-12 text-white relative flex flex-col justify-between overflow-hidden">
          {/* Blueprint Grid Background Pattern */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />

          {/* Top Header Logo */}
          <div className="relative z-10 flex items-center justify-between">
            <button 
              onClick={onBackToHome}
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform">
                <span className="text-blue-950 font-display font-extrabold text-xl leading-none">T</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">TuitionPay</span>
            </button>

            {onBackToHome && (
              <button 
                onClick={onBackToHome}
                className="text-xs font-medium bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-full border border-white/20 transition-all flex items-center gap-1.5"
              >
                ← Back to Home
              </button>
            )}
          </div>

          {/* Center Showcase: Smartphone Card Mockup */}
          <div className="relative z-10 my-8 flex justify-center items-center">
            {/* Phone Shell Frame */}
            <div className="w-[300px] sm:w-[330px] bg-white rounded-[36px] shadow-2xl p-4 border-4 border-white/20 relative transform hover:scale-[1.02] transition-transform duration-300">
              
              {/* Speaker Notch */}
              <div className="w-24 h-4 bg-slate-100 rounded-full mx-auto mb-4" />

              {/* App Internal Header */}
              <div className="flex items-center justify-between px-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-teal-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-800 leading-tight">TuitionPay</p>
                    <p className="text-[9px] text-slate-400">Student Wallet</p>
                  </div>
                </div>
              </div>

              {/* Floating Shield Badge */}
              <div className="absolute -top-3 -left-3 bg-white border border-slate-100 rounded-xl px-2.5 py-1 shadow-lg flex items-center gap-1.5 z-20">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-800 leading-none">256-bit</p>
                  <p className="text-[8px] text-slate-400 leading-none">Secure</p>
                </div>
              </div>

              {/* Tuition Due Card */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-4 text-white shadow-md mb-3 relative overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-semibold tracking-wider text-blue-200 uppercase">TUITION DUE • SEP</span>
                </div>
                <p className="text-xl font-extrabold tracking-tight mb-2">Rs. 2,500</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-[10px] text-blue-100 font-medium">STU-001 - Mathematics</span>
                </div>
              </div>

              {/* Payment Success Pill Banner */}
              <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-2.5 flex items-center justify-between mb-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-900 leading-tight">Payment Successful</p>
                    <p className="text-[8px] text-emerald-600">Receipt #TP-8241 sent</p>
                  </div>
                </div>
              </div>

              {/* Floating Orange Alert Badge */}
              <div className="absolute top-36 -right-4 bg-amber-50 border border-amber-200 rounded-xl px-2.5 py-1.5 shadow-lg flex items-center gap-2 z-20">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-amber-900 leading-none">Due soon</p>
                  <p className="text-[8px] text-amber-600 leading-none">3 days left</p>
                </div>
              </div>

              {/* History Preview List */}
              <div className="space-y-1.5 px-1 pt-1 border-t border-slate-100">
                <div className="flex justify-between items-center text-[10px] text-slate-500 py-1">
                  <span>August fee</span>
                  <span className="font-semibold text-slate-700">Rs. 2,500</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 py-1">
                  <span>July fee</span>
                  <div className="flex items-center gap-1">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[8px] font-bold">✓</span>
                    <span className="font-semibold text-emerald-700">Confirmed • Rs. 2,500</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Callout Text */}
          <div className="relative z-10 mt-4">
            <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-white mb-2 leading-tight">
              Your Tuition Payments, <br className="hidden sm:block" />Made Simple.
            </h1>
            <p className="text-blue-100/80 text-xs lg:text-sm max-w-md leading-relaxed">
              Access your payment details, track your payment history, and manage your tuition fees securely.
            </p>
          </div>
        </div>

        {/* Right Side - Clean Form Container */}
        <div className="lg:w-1/2 bg-slate-50/70 p-8 lg:p-14 flex flex-col justify-center relative">
          
          {/* Role Toggle Pill Badge */}
          <div className="inline-flex self-start items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 mb-8 shadow-sm">
            <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">
              {role === 'student' ? '🎓' : '👨‍🏫'}
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {role === 'student' ? 'Student Login' : 'Teacher Login'}
            </span>
          </div>

          {/* Header Title */}
          <div className="mb-6">
            <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-1 flex items-center gap-2">
              Welcome Back <span className="inline-block animate-bounce">👋</span>
            </h2>
            <p className="text-slate-500 text-sm">
              {role === 'student' 
                ? 'Log in using your Student ID to access your account.' 
                : 'Log in using your registered Teacher Email to access dashboard.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Student ID / Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {role === 'student' ? 'Student ID' : 'Teacher Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  {role === 'student' ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <input
                  type={role === 'student' ? 'text' : 'email'}
                  required
                  value={idOrEmail}
                  onChange={(e) => setIdOrEmail(e.target.value)}
                  placeholder={role === 'student' ? 'Enter your Student ID' : 'Enter your email address'}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                {role === 'student' ? 'Example: STU-001' : 'Example: teacher@tuitionpay.com'}
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.04 9.04 0 013.122-.663c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-5.418-5.418a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-600">Remember me</span>
              </label>

              <a href="#" onClick={(e) => { e.preventDefault(); alert('Reset password link sent to registered phone/email.'); }} className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Login to My Account</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50/70 px-3 text-slate-400 font-semibold tracking-wider">OR</span>
            </div>
          </div>

          {/* Secondary Action: Contact Teacher */}
          <button
            type="button"
            onClick={() => alert('Please reach out to your tuition teacher or institute administrator to get your Student ID and login credentials.')}
            className="w-full bg-white hover:bg-slate-100 text-slate-700 font-bold py-3 rounded-xl border border-slate-200 transition-all shadow-sm text-sm"
          >
            Contact Your Teacher
          </button>

          {/* Role Switch Footer */}
          <div className="mt-8 text-center text-xs text-slate-500">
            {role === 'student' ? (
              <span>
                Are you a teacher?{' '}
                <button
                  type="button"
                  onClick={() => { setRole('teacher'); setIdOrEmail(''); }}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Teacher Login
                </button>
              </span>
            ) : (
              <span>
                Are you a student?{' '}
                <button
                  type="button"
                  onClick={() => { setRole('student'); setIdOrEmail(''); }}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Student Login
                </button>
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
