import { logoImg } from '@/assets/logo';
import React, { useState } from 'react';
import { apiService } from '../services/api';

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
  const [step, setStep] = useState<'summary' | 'gateway' | 'otp' | 'success'>('summary');
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'qr'>('card');
  const [amount, setAmount] = useState('3000');
  const [month, setMonth] = useState('September 2026');
  
  // Card details state for 3DS summary
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  // OTP state
  const [otpCode, setOtpCode] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(45);

  const handleGatewaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    setOtpCode('');
    setStep('otp');
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otpCode.replace(/\D/g, '');
    if (cleanOtp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP code.');
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError('');

    try {
      // Process payment on backend API
      await apiService.processPayment(Number(amount), selectedMethod === 'card' ? 'Card' : 'LankaQR');
    } catch (err) {
      console.error('Backend payment error:', err);
    }

    // Persist completed payment into localStorage for client sync across Student & Teacher pages
    try {
      const newPayRecord = {
        id: `pay_${Date.now()}`,
        studentName: studentName || 'Pasindu',
        studentId: 'STU-001',
        month: month || 'September 2026',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        amount: `Rs. ${Number(amount).toLocaleString()}`,
        numAmount: Number(amount),
        method: selectedMethod === 'card' ? 'Card' : 'LankaQR',
        status: 'PAID',
        receiptNo: `TP-${Math.floor(1000 + Math.random() * 9000)}`
      };

      const stored = localStorage.getItem('ria_local_payments');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(newPayRecord);
      localStorage.setItem('ria_local_payments', JSON.stringify(list));
    } catch (err) {
      console.error('Local storage error:', err);
    }

    // Simulate 3D Secure Bank Verification delay
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setStep('success');
    }, 1200);
  };

  const handleResendOtp = () => {
    setResendCountdown(45);
    setOtpError('');
    alert('A new 6-digit OTP code has been dispatched to your mobile device (+94 77 *** *892).');
  };

  const maskedCardLast4 = cardNumber ? cardNumber.replace(/\s/g, '').slice(-4) || '4242' : '4242';

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 pb-12">
      {/* Navigation Top Header */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="RIA Logo" className="w-9 h-9 rounded-xl object-cover shadow-sm" />
            <div>
              <h1 className="font-extrabold text-base text-slate-900 tracking-tight leading-none">RIA Tuition Portal</h1>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Student Payment Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigateToDashboard}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Breadcrumb & Step Indicator */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
              <span className="hover:text-slate-800 cursor-pointer" onClick={onNavigateToDashboard}>Dashboard</span>
              <span>/</span>
              <span className="text-blue-600 font-bold">Class Fee Payment</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {step === 'summary' 
                ? 'Payment Summary & Details' 
                : step === 'gateway' 
                ? 'Payment Gateway' 
                : step === 'otp'
                ? '3D Secure OTP Verification'
                : 'Payment Receipt'}
            </h2>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-2xs">
            <div className={`flex items-center gap-1.5 text-xs font-bold ${step === 'summary' ? 'text-blue-600' : 'text-emerald-600'}`}>
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${step === 'summary' ? 'bg-blue-600 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                {step === 'summary' ? '1' : '✓'}
              </span>
              <span>Summary</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center gap-1.5 text-xs font-bold ${step === 'gateway' ? 'text-blue-600' : step === 'otp' || step === 'success' ? 'text-emerald-600' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${step === 'gateway' ? 'bg-blue-600 text-white' : step === 'otp' || step === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                {step === 'otp' || step === 'success' ? '✓' : '2'}
              </span>
              <span>Gateway</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center gap-1.5 text-xs font-bold ${step === 'otp' ? 'text-blue-600' : step === 'success' ? 'text-emerald-600' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-black ${step === 'otp' ? 'bg-blue-600 text-white' : step === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                {step === 'success' ? '✓' : '3'}
              </span>
              <span>OTP Auth</span>
            </div>
          </div>
        </div>

        {/* STEP 1: DETAILED PAYMENT SUMMARY */}
        {step === 'summary' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2-Column: Detailed Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Detailed Invoice Header Banner Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-start justify-between flex-wrap gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
                      Pending Payment
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Combined Mathematics 2026</h3>
                    <p className="text-xs text-slate-500 mt-1">Invoice Ref: <span className="font-mono font-bold text-slate-700">#INV-2026-0982</span></p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Billing Period</p>
                    <p className="text-sm font-extrabold text-slate-800 mt-0.5">{month}</p>
                    <p className="text-[11px] text-red-500 font-semibold mt-1">Due Date: Sept 15, 2026</p>
                  </div>
                </div>

                {/* Student & Class Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Student Name</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{studentName}</p>
                    <p className="text-[10px] text-slate-400">ID: STU-2026-8841</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Instructor</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">Prof. Aruna Silva</p>
                    <p className="text-[10px] text-slate-400">Department of Mathematics</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Schedule</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">Saturdays</p>
                    <p className="text-[10px] text-slate-400">8:00 AM - 12:30 PM</p>
                  </div>
                </div>
              </div>

              {/* Detailed Fee Itemization Table */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Payment Breakdown
                </h4>

                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">Monthly Tuition Fee - September 2026</p>
                      <p className="text-[11px] text-slate-500">Advanced Level Theory & Revision Sessions</p>
                    </div>
                    <span className="font-bold text-slate-900">Rs. 3,000.00</span>
                  </div>

                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">Digital LMS & Recorded Lecture Access</p>
                      <p className="text-[11px] text-emerald-600 font-semibold">Included in Monthly Fee</p>
                    </div>
                    <span className="font-bold text-slate-400 line-through">Rs. 500.00</span>
                  </div>

                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">Printed Material & Revision Tutes</p>
                      <p className="text-[11px] text-emerald-600 font-semibold">Included</p>
                    </div>
                    <span className="font-bold text-slate-400">Rs. 0.00</span>
                  </div>

                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">Online Processing & Gateway Fee</p>
                      <p className="text-[11px] text-slate-500">Waived by Institute</p>
                    </div>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                </div>

                {/* Total Summary Row */}
                <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between bg-blue-50/60 p-4 rounded-2xl">
                  <div>
                    <p className="text-xs font-extrabold text-blue-950">Total Payable Amount</p>
                    <p className="text-[10px] text-slate-500">All applicable taxes & portal charges included</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-blue-600">
                      Rs. {Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Access Rights & Key Info Box */}
              <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-3xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-emerald-950">Instant Access & Automatic Verification</h5>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Upon proceeding and completing your payment via PayHere, your monthly class admission QR card and LMS video portal access will be unblocked instantly. An automated SMS receipt will be sent to your registered phone number.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Checkout Action Card */}
            <div className="space-y-6">
              
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-lg sticky top-24 space-y-6">
                
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Payment Overview</p>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-slate-600">Total Amount:</span>
                    <span className="text-2xl font-black text-slate-900">Rs. 3,000.00</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Currency: LKR (Sri Lankan Rupee)</p>
                </div>

                <hr className="border-slate-100" />

                {/* Acceptable Payment Methods Icons Preview */}
                <div>
                  <p className="text-[11px] font-bold text-slate-600 mb-3">Accepted Payment Gateways:</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
                      <p className="text-xs font-bold text-slate-800">Card Payment</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">VISA / Mastercard / AMEX</p>
                    </div>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
                      <p className="text-xs font-bold text-slate-800">LankaQR</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Sri Lanka Mobile Banking</p>
                    </div>
                  </div>
                </div>

                {/* Primary Proceed CTA Button */}
                <button
                  onClick={() => setStep('gateway')}
                  className="w-full py-4 bg-[#1b5bf7] hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Payment Gateway</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                <button
                  onClick={onNavigateToDashboard}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cancel & Return to Dashboard
                </button>

                {/* PayHere Trust & Security Badge */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-semibold">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>256-bit Encrypted Secure PayHere Gateway</span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* STEP 2: PAYHERE PAYMENT GATEWAY MODAL */}
        {step === 'gateway' && (
          <div className="max-w-md mx-auto py-4">
            <div className="bg-white w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 relative">
              
              {/* PayHere Vibrant Header */}
              <div className="bg-[#1b5bf7] p-6 text-white relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-md flex items-center justify-center shrink-0">
                    <img src={logoImg} alt="RIA Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base leading-tight tracking-tight">RIA Tuition Portal</h2>
                    <p className="text-xs text-blue-100 font-medium mt-0.5">Combined Mathematics - {month}</p>
                    <div className="mt-1 text-xl font-black tracking-tight text-white">
                      Rs. {Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* Back to Summary Button */}
                <button 
                  onClick={() => setStep('summary')}
                  className="absolute top-4 right-4 text-blue-100 hover:text-white font-bold text-xs px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Back to payment summary"
                >
                  ← Back
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">SELECT A PAYMENT METHOD</p>
                  
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">Credit / Debit Card</span>
                    </div>

                    {/* Card Badges */}
                    <div className="flex items-center gap-2">
                      <div className="h-9 px-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center font-black italic text-blue-800 text-xs tracking-tighter shadow-2xs">
                        VISA
                      </div>
                      <div className="h-9 px-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-0.5 shadow-2xs">
                        <span className="w-3 h-3 rounded-full bg-red-500 opacity-90" />
                        <span className="w-3 h-3 rounded-full bg-amber-500 -ml-1.5 opacity-90" />
                      </div>
                      <div className="h-9 px-2 bg-[#006fcf] text-white rounded-xl flex items-center justify-center font-black text-[9px] tracking-tighter shadow-2xs">
                        AMEX
                      </div>
                      <div className="h-9 px-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center font-extrabold text-[9px] text-slate-700 shadow-2xs">
                        DISCOVER
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {[
                    { id: 'card', label: 'Card Payment' },
                    { id: 'qr', label: 'LankaQR' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMethod(m.id as any)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        selectedMethod === m.id
                          ? 'border-[#1b5bf7] bg-blue-50 text-[#1b5bf7] shadow-2xs'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                {/* Payment Form */}
                <form onSubmit={handleGatewaySubmit} className="space-y-4">
                  {selectedMethod === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="4242 •••• •••• 4242"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:border-[#1b5bf7] focus:bg-white outline-none transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:border-[#1b5bf7] focus:bg-white outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">CVC / CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            required
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:border-[#1b5bf7] focus:bg-white outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'qr' && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-2">
                      <div className="w-28 h-28 bg-white border border-slate-300 rounded-xl mx-auto flex items-center justify-center text-[10px] text-slate-400 font-mono shadow-2xs">
                        [ Scan LankaQR ]
                      </div>
                      <p className="text-[10px] text-slate-500 font-semibold">Scan with any Sri Lankan Banking App</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#1b5bf7] hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer mt-2 flex items-center justify-center gap-2"
                  >
                    <span>Proceed to 3DS Verification</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </button>
                </form>

                <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>256-bit Encrypted Secure PayHere Checkout</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: REALISTIC 3D SECURE OTP VERIFICATION MODAL */}
        {step === 'otp' && (
          <div className="max-w-md mx-auto py-4">
            <div className="bg-white w-full rounded-3xl shadow-2xl overflow-hidden border border-slate-200/90 relative">
              
              {/* Bank 3DS Header */}
              <div className="bg-slate-900 text-white p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xs text-white">
                    3DS
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm tracking-tight">3D Secure Authentication</h3>
                    <p className="text-[10px] text-slate-400">Bank Identity Verification</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified by VISA
                </div>
              </div>

              {/* OTP Form Content */}
              <div className="p-6 space-y-6">
                
                {/* Transaction details card */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Merchant:</span>
                    <span className="font-bold text-slate-800">RIA Tuition Portal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount:</span>
                    <span className="font-bold text-blue-600 text-sm">Rs. {Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Card Number:</span>
                    <span className="font-mono font-bold text-slate-700">•••• •••• •••• {maskedCardLast4}</span>
                  </div>
                </div>

                {/* SMS Prompt Instructions */}
                <div className="text-center space-y-1.5">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">Enter Security OTP Code</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    A 6-digit One-Time Password (OTP) has been sent to your registered mobile number <strong className="text-slate-700">+94 77 *** *892</strong>.
                  </p>
                </div>

                {/* OTP Input Form */}
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1.5 text-center uppercase tracking-wider">
                      6-Digit Security OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setOtpCode(val);
                        if (otpError) setOtpError('');
                      }}
                      placeholder="e.g. 1 2 3 4 5 6"
                      autoFocus
                      required
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 focus:border-[#1b5bf7] focus:bg-white rounded-2xl text-center text-xl font-mono tracking-[0.35em] font-extrabold outline-none transition-all shadow-inner"
                    />
                    <p className="text-[10px] text-slate-400 text-center mt-1.5 font-medium">
                      💡 Quick Test Hint: Enter <strong className="text-slate-600">ANY 6-digit number</strong> to authorize successfully!
                    </p>
                  </div>

                  {otpError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center text-xs font-bold text-red-600">
                      {otpError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifyingOtp}
                    className="w-full py-3.5 bg-[#1b5bf7] hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {isVerifyingOtp ? (
                      <>
                        <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Verifying OTP with Bank...</span>
                      </>
                    ) : (
                      <span>Submit & Complete Payment</span>
                    )}
                  </button>
                </form>

                {/* Resend & Cancel Controls */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <button
                    onClick={handleResendOtp}
                    className="hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Resend OTP Code
                  </button>
                  <button
                    onClick={() => setStep('gateway')}
                    className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    ← Back to Gateway
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESSFUL PAYMENT CONFIRMATION */}
        {step === 'success' && (
          <div className="max-w-md mx-auto py-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold shadow-inner">
                ✓
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Payment Successful!</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Your payment of <strong className="text-slate-800">Rs. {Number(amount).toLocaleString()}</strong> for Combined Mathematics ({month}) has been processed successfully via 3DS OTP verification.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-bold text-slate-800">TXN-94820195</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment Method:</span>
                  <span className="font-bold text-slate-800">{selectedMethod === 'card' ? 'Card Payment (3DS Verified)' : 'LankaQR'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="font-bold text-emerald-600">COMPLETED</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={onNavigateToHistory}
                  className="w-full py-3.5 bg-[#1b5bf7] text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all cursor-pointer"
                >
                  View Digital Payment Receipt →
                </button>
                <button
                  onClick={onNavigateToDashboard}
                  className="w-full py-2.5 text-slate-500 hover:text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Return to Student Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}


