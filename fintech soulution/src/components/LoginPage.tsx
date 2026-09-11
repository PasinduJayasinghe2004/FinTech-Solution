import { logoImg } from '@/assets/logo';
import React, { useState } from 'react';
import { apiService } from '../services/api';

interface LoginPageProps {
  onBackToHome?: () => void;
  onLoginSuccess?: (role: 'student' | 'teacher') => void;
  initialRole?: 'student' | 'teacher';
}

export default function LoginPage({ onBackToHome, onLoginSuccess, initialRole = 'student' }: LoginPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'student' | 'teacher'>(initialRole);

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
    let result: any;
    
    if (role === 'teacher') {
      result = await apiService.registerTeacher({
        name: fullName,
        email: regEmail,
        subject,
        phone,
      });
    } else {
      result = await apiService.registerStudent({
        name: fullName,
        email: regEmail,
        subject,
        phone,
      });
    }
    setIsSubmitting(false);

    if (role === 'teacher') {
      const teacherEmail = result.teacher?.email || regEmail;
      setRegisterSuccessMsg(`Teacher account created in database for ${fullName}! You can now log in using email: ${teacherEmail}`);
      setTimeout(() => {
        setMode('login');
        setIdOrEmail(teacherEmail);
        setPassword(regPassword);
        setRegisterSuccessMsg(null);
      }, 2500);
    } else {
      const assignedId = result.student?.studentUniqueId || `STU-${Math.floor(100 + Math.random() * 900)}`;
      setRegisterSuccessMsg(`Student account created in database! Assigned Student ID: ${assignedId}. You can now log in.`);
      setTimeout(() => {
        setMode('login');
        setIdOrEmail(assignedId);
        setPassword(regPassword);
        setRegisterSuccessMsg(null);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-0 md:p-6 lg:p-10 font-sans">
      <div className="w-full max-w-6xl bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[680px]">
        
        {/* Left Side - Blue Hero Panel with Full Background Image */}
        <div className="lg:w-1/2 relative p-8 lg:p-12 text-white flex flex-col justify-between overflow-hidden min-h-[400px] lg:min-h-full">
          {/* Full Cover Background Image */}
          <img 
            src={logoImg} 
            alt="RIA Background" 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />

          {/* Glassmorphism & Gradient Overlay for Contrast & Aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-indigo-950/85 backdrop-blur-[3px] z-0" />

          {/* Blueprint Grid Background Pattern */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none z-0"
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
              <span className="font-display font-bold text-2xl tracking-tight text-white drop-shadow-md">RIA</span>
            </button>

            {onBackToHome && (
              <button 
                onClick={onBackToHome}
                className="text-xs font-medium bg-white/15 hover:bg-white/25 text-white px-3.5 py-1.5 rounded-full border border-white/30 backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                ← Back to Home
              </button>
            )}
          </div>

          {/* Center Showcase: Glassmorphism Card */}
          <div className="relative z-10 my-auto py-8 flex justify-center items-center">
            <div className="w-full max-w-sm bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/25 shadow-2xl relative text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <img src={logoImg} alt="RIA Logo" className="w-12 h-12 rounded-xl object-cover" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-wide mb-1 drop-shadow-sm">
                RIA Educational Institute
              </h2>
              <p className="text-xs text-blue-100 font-medium drop-shadow-sm">
                Premier Higher Tuition & Educational Management Platform
              </p>
            </div>
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
              {role === 'student' && (
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                    mode === 'register' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              )}
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
              onClick={() => {
                setRole('teacher');
                setMode('login');
              }}
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
            {role === 'teacher' ? (
              <span className="text-slate-400 font-medium">
                🔒 Teacher accounts are pre-configured by Institute Admin. Contact administration if you need access.
              </span>
            ) : mode === 'login' ? (
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
