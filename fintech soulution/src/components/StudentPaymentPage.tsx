import { logoImg } from '@/assets/logo';
import React, { useState } from 'react';

interface StudentPaymentPageProps {
  studentName?: string;
  onLogout?: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToHistory: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToProfile: () => void;
}

export default function StudentPaymentPage({
  studentName = "Pasindu",
  onLogout,
  onNavigateToDashboard,
  onNavigateToHistory,
  onNavigateToNotifications,
  onNavigateToProfile,
}: StudentPaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank' | 'qr'>('card');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [amount, setAmount] = useState('3000');
  const [month, setMonth] = useState('September 2026');

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      onNavigateToHistory();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
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
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold bg-blue-50/90 text-blue-600 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
            <button onClick={onNavigateToProfile} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
            <h1 className="font-display text-xl font-bold text-slate-900">Tuition Fee Payment</h1>
            <p className="text-xs text-slate-500">Pay your monthly tuition fees securely</p>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-100 px-3 py-1.5 rounded-full">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              {studentName.charAt(0)}
            </div>
            <span className="text-xs font-bold text-slate-800">{studentName}</span>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
          {paymentSuccess ? (
            <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                ✓
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">Payment Successful!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Rs. {Number(amount).toLocaleString()} for {month} has been successfully paid. Receipt #TP-{Math.floor(1000 + Math.random() * 9000)} generated.
              </p>
              <button
                onClick={onNavigateToHistory}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold text-sm rounded-2xl shadow-lg hover:bg-blue-700 transition-all cursor-pointer"
              >
                View Payment History →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fee Summary */}
              <div className="md:col-span-1 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-extrabold text-blue-300 uppercase tracking-widest bg-white/10 px-2.5 py-1 rounded-full">
                    SELECTED FEE
                  </span>
                  <h3 className="text-2xl font-extrabold mt-3">{month}</h3>
                  <p className="text-xs text-blue-200 mt-1">Combined Mathematics</p>
                </div>
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-xs text-blue-200">
                    <span>Tuition Fee</span>
                    <span className="font-bold text-white">Rs. {Number(amount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-blue-200">
                    <span>Platform Fee</span>
                    <span className="font-bold text-emerald-400">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-white border-t border-white/10 pt-2">
                    <span>Total Amount</span>
                    <span>Rs. {Number(amount).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
                <h3 className="font-display font-extrabold text-lg text-slate-900">Select Payment Method</h3>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: '💳' },
                    { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                    { id: 'qr', label: 'LankaQR Pay', icon: '📱' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMethod(m.id as any)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                        selectedMethod === m.id
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <div className="text-xl mb-1">{m.icon}</div>
                      <div className="text-xs">{m.label}</div>
                    </button>
                  ))}
                </div>

                <form onSubmit={handlePayNow} className="space-y-4">
                  {selectedMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="4242 4242 4242 4242"
                          required
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">CVC / CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'bank' && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2 text-slate-700">
                      <p className="font-bold text-slate-900 text-sm">Direct Bank Deposit Details</p>
                      <div className="flex justify-between border-b border-slate-200 pb-1"><span>Bank Name:</span><span className="font-bold">Commercial Bank</span></div>
                      <div className="flex justify-between border-b border-slate-200 pb-1"><span>Account Name:</span><span className="font-bold">RIA Private Ltd</span></div>
                      <div className="flex justify-between border-b border-slate-200 pb-1"><span>Account Number:</span><span className="font-bold font-mono">8009-1234-5678</span></div>
                      <div className="flex justify-between"><span>Reference Code:</span><span className="font-bold text-blue-600">STU-001</span></div>
                    </div>
                  )}

                  {selectedMethod === 'qr' && (
                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
                      <div className="w-36 h-36 bg-white border-2 border-slate-300 rounded-xl mx-auto flex items-center justify-center text-xs text-slate-500 font-mono shadow-inner">
                        [ LankaQR Code ]
                      </div>
                      <p className="text-xs text-slate-600 font-semibold">Scan with any Sri Lankan Banking App (SOLO, Flash, Q+)</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                  >
                    Confirm & Pay Rs. {Number(amount).toLocaleString()}
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
