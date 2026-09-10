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
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'qr'>('card');
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
    <div className="min-h-screen bg-slate-100/80 flex items-center justify-center p-4 font-sans antialiased text-slate-900">
      
      {/* PayHere Inspired Checkout Modal Dialog Shell */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200/80 relative">
        
        {/* Top Header Panel - PayHere Vibrant Blue */}
        <div className="bg-[#1b5bf7] p-6 text-white relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* PayHere / Merchant Logo Badge Box */}
            <div className="w-16 h-16 bg-white rounded-2xl p-2.5 shadow-md flex items-center justify-center shrink-0">
              <img src={logoImg} alt="RIA Logo" className="w-full h-full object-contain" />
            </div>
            
            {/* Merchant & Order Details */}
            <div>
              <h2 className="font-bold text-lg leading-tight tracking-tight">RIA Tuition Portal</h2>
              <p className="text-xs text-blue-100 font-medium mt-0.5">Combined Mathematics - {month}</p>
              <div className="mt-2 text-2xl font-black tracking-tight text-white">
                Rs. {Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Close/Back Button */}
          <button 
            onClick={onNavigateToDashboard}
            className="absolute top-4 right-4 text-blue-200 hover:text-white font-bold text-lg w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            title="Cancel payment"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {paymentSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-extrabold shadow-inner">
                ✓
              </div>
              <h3 className="text-xl font-black text-slate-900">Payment Successful!</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Your payment of Rs. {Number(amount).toLocaleString()} has been processed via PayHere.
              </p>
              <button
                onClick={onNavigateToHistory}
                className="w-full py-3 bg-[#1b5bf7] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all cursor-pointer"
              >
                View Payment Receipt →
              </button>
            </div>
          ) : (
            <>
              {/* Section Subtitle */}
              <div>
                <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">SELECT A PAYMENT METHOD</p>
                
                {/* Credit / Debit Card Group Label & Badges */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-700">Credit / Debit Card</span>
                  </div>

                  {/* Card Provider Logos (VISA, Mastercard, AMEX, Discover, Diners Club) */}
                  <div className="flex items-center gap-2">
                    {/* VISA */}
                    <div className="h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center font-black italic text-blue-800 text-sm tracking-tighter shadow-2xs">
                      VISA
                    </div>
                    {/* Mastercard */}
                    <div className="h-10 px-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center gap-0.5 shadow-2xs">
                      <span className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-90" />
                      <span className="w-3.5 h-3.5 rounded-full bg-amber-500 -ml-2 opacity-90" />
                    </div>
                    {/* AMEX */}
                    <div className="h-10 px-2.5 bg-[#006fcf] text-white rounded-xl flex items-center justify-center font-black text-[9px] tracking-tighter shadow-2xs">
                      AMEX
                    </div>
                    {/* Discover */}
                    <div className="h-10 px-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center font-extrabold text-[10px] text-slate-700 shadow-2xs">
                      DISCOVER
                    </div>
                    {/* Diners Club */}
                    <div className="h-10 px-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-blue-700 text-xs font-serif font-black shadow-2xs">
                      (D)
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods Tabs */}
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

              {/* Payment Form Fields */}
              <form onSubmit={handlePayNow} className="space-y-4">
                {selectedMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 •••• •••• 4242"
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
                          required
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:border-[#1b5bf7] focus:bg-white outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          placeholder="123"
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

                {/* Submit Pay Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1b5bf7] hover:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer mt-2"
                >
                  Pay Rs. {Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </button>
              </form>

              {/* Secure Checkout Footer Badge */}
              <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>256-bit Encrypted Secure PayHere Checkout</span>
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  );
}
