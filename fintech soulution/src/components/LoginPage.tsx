import { logoImg } from '@/assets/logo';
import React, { useState } from 'react';
import { apiService } from '../services/api';

interface LoginPageProps {
  onBackToHome?: () => void;
  onLoginSuccess?: (role: 'student' | 'teacher') => void;
}

export default function LoginPage({ onBackToHome, onLoginSuccess }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  // Login form states
  const [idOrEmail, setIdOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Register form states
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState<string | null>(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMsg(null);
    setIsSubmitting(true);

    try {
      const response = await apiService.login(role, idOrEmail.trim(), password);
      setIsSubmitting(false);

      if (!response.success) {
        setLoginErrorMsg(response.message || 'Database login failed. Credentials do not match database.');
        return;
      }

      if (onLoginSuccess) {
        onLoginSuccess(role);
      }
    } catch (err) {
      setIsSubmitting(false);
      setLoginErrorMsg('Database connection error. Please ensure backend server is running.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== confirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    const result = await apiService.registerStudent({
      name: fullName,
      email: regEmail,
      subject,
      phone,
    });
    setIsSubmitting(false);

    const assignedId = result.student?.studentUniqueId || (role === 'student' ? `STU-${Math.floor(100 + Math.random() * 900)}` : `TCH-${Math.floor(100 + Math.random() * 900)}`);

    setRegisterSuccessMsg(`Account created in database! Assigned Unique ID: ${assignedId}. You can now log in.`);
    setTimeout(() => {
      setMode('login');
      setIdOrEmail(assignedId);
      setPassword(regPassword);
      setRegisterSuccessMsg(null);
    }, 2500);
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
              <img src={logoImg} alt="RIA Logo" className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform" />
              <span className="font-display font-bold text-2xl tracking-tight text-white">RIA</span>
            </button>

            {onBackToHome && (
              <button 
                onClick={onBackToHome}
                className="text-xs font-medium bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-full border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
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
                  <img src={logoImg} alt="RIA Logo" className="w-6 h-6 rounded-lg object-cover" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-800 leading-tight">RIA</p>
                    <p className="text-[9px] text-slate-400">Student & Teacher Portal</p>
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
                  <p className="text-[8px] text-slate-400 leading-none">Encrypted</p>
                </div>
              </div>

              {/* Tuition Card */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-4 text-white shadow-md mb-3 relative overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-semibold tracking-wider text-blue-200 uppercase">TUITION FEE SUMMARY</span>
                </div>
                <p className="text-xl font-extrabold tracking-tight mb-2">Rs. 3,000</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-[10px] text-blue-100 font-medium">STU-001 • Mathematics</span>
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
                    <p className="text-[10px] font-bold text-emerald-900 leading-tight">Instant Verification</p>
                    <p className="text-[8px] text-emerald-600">Automated digital receipts</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Callout Text */}
          <div className="relative z-10 mt-4">
            <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-white mb-2 leading-tight">
              {mode === 'login' ? 'Your Tuition Payments, Simple.' : 'Join RIA Today.'}
            </h1>
            <p className="text-blue-100/80 text-xs lg:text-sm max-w-md leading-relaxed">
              {mode === 'login'
                ? 'Access your payment details, track your payment history, and manage your tuition fees securely.'
                : 'Create your account to manage tuition fees, generate digital receipts, and track payments easily.'}
            </p>
          </div>
        </div>

        {/* Right Side - Form Container */}
        <div className="lg:w-1/2 bg-slate-50/70 p-8 lg:p-12 flex flex-col justify-center relative overflow-y-auto max-h-[750px]">
          
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-between mb-6">
            <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 w-full max-w-xs">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  mode === 'login' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                  mode === 'register' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Role Switcher Pill */}
            <div className="hidden sm:flex items-center gap-1 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
              <span>{role === 'student' ? '🎓 Student' : '👨‍🏫 Teacher'}</span>
            </div>
          </div>

          {/* Success Banner */}
          {registerSuccessMsg && (
            <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 animate-fadeIn flex items-center gap-2">
              <span className="text-emerald-600 text-lg">✓</span>
              <span>{registerSuccessMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {loginErrorMsg && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-bold text-red-800 animate-fadeIn flex items-start gap-2">
              <span className="text-red-500 text-base shrink-0">⚠️</span>
              <span>{loginErrorMsg}</span>
            </div>
          )}

          {/* Form Header */}
          <div className="mb-5">
            <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-1 flex items-center gap-2">
              {mode === 'login' ? (
                <>Welcome Back <span className="inline-block animate-bounce">👋</span></>
              ) : (
                <>Create New Account <span className="inline-block">✨</span></>
              )}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              {mode === 'login' 
                ? (role === 'student' ? 'Log in using your Student ID to access your account.' : 'Log in using your Teacher Email.')
                : 'Register a new account to get started with RIA.'}
            </p>
          </div>

          {/* Role selector buttons */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                role === 'student' 
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              🎓 I am a Student
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                role === 'teacher' 
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              👨‍🏫 I am a Teacher
            </button>
          </div>

          {/* MODE 1: LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
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
                    placeholder={role === 'student' ? 'Enter your Student ID (e.g. STU-001)' : 'Enter your teacher email'}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
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
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-600">Remember me</span>
                </label>

                <a href="#" onClick={(e) => { e.preventDefault(); alert('Reset link sent to registered email.'); }} className="text-xs font-bold text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Login to My Account</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>
          )}

          {/* MODE 2: CREATE ACCOUNT FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Pasindu Jayasinghe"
                  className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject / Class</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="" disabled>Select your subject</option>
                  <option value="Accounting">Accounting</option>
                  <option value="Econ">Econ</option>
                  <option value="English">English</option>
                  <option value="IT">IT</option>
                  <option value="Sinhala">Sinhala</option>
                  <option value="History">History</option>
                  <option value="Maths">Maths</option>
                  <option value="Science">Science</option>
                  <option value="IT course">IT course</option>
                  <option value="English course">English course</option>
                  <option value="AAT">AAT</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Create {role === 'student' ? 'Student' : 'Teacher'} Account</span>
                <span>→</span>
              </button>
            </form>
          )}

          {/* Footer toggle */}
          <div className="mt-6 text-center text-xs text-slate-500">
            {mode === 'login' ? (
              <span>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Create New Account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Log In Here
                </button>
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
