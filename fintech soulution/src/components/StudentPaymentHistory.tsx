import { logoImg } from '@/assets/logo';
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface StudentPaymentHistoryProps {
  studentName?: string;
  onLogout?: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToPayments: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToProfile: () => void;
}

interface PaymentRecord {
  id: string;
  month: string;
  date: string;
  amount: string;
  method: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  receiptNo: string;
}

const mockHistory: PaymentRecord[] = [
  { id: 'pay_1', month: 'August 2026', date: 'Aug 10, 2026', amount: 'Rs. 3,000', method: 'Card', status: 'PAID', receiptNo: 'TP-8241' },
  { id: 'pay_2', month: 'July 2026', date: 'Jul 12, 2026', amount: 'Rs. 3,000', method: 'Bank Transfer', status: 'PAID', receiptNo: 'TP-7102' },
  { id: 'pay_3', month: 'June 2026', date: 'Jun 15, 2026', amount: 'Rs. 3,000', method: 'QR Payment', status: 'PAID', receiptNo: 'TP-6091' },
  { id: 'pay_4', month: 'May 2026', date: '—', amount: 'Rs. 3,000', method: '—', status: 'OVERDUE', receiptNo: '—' },
  { id: 'pay_5', month: 'April 2026', date: 'Apr 08, 2026', amount: 'Rs. 3,000', method: 'Card', status: 'PAID', receiptNo: 'TP-4019' },
  { id: 'pay_6', month: 'March 2026', date: 'Mar 10, 2026', amount: 'Rs. 3,000', method: 'Bank Transfer', status: 'PAID', receiptNo: 'TP-3108' },
];

export default function StudentPaymentHistory({
  studentName = "Pasindu",
  onLogout,
  onNavigateToDashboard,
  onNavigateToPayments,
  onNavigateToNotifications,
  onNavigateToProfile,
}: StudentPaymentHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'OVERDUE'>('ALL');
  const [historyList, setHistoryList] = useState<PaymentRecord[]>(mockHistory);

  useEffect(() => {
    const fetchHistory = async () => {
      let localRecords: PaymentRecord[] = [];
      try {
        const stored = localStorage.getItem('ria_local_payments');
        if (stored) {
          const parsed = JSON.parse(stored);
          localRecords = parsed.map((p: any) => ({
            id: p.id,
            month: p.month,
            date: p.date || 'Today',
            amount: p.amount,
            method: p.method,
            status: 'PAID',
            receiptNo: p.receiptNo || 'TP-8841',
          }));
        }
      } catch (e) {
        console.error(e);
      }

      try {
        const res = await apiService.getPaymentHistory();
        if (res && res.success && Array.isArray(res.payments) && res.payments.length > 0) {
          const mapped: PaymentRecord[] = res.payments.map((p: any) => ({
            id: p.id,
            month: p.month,
            date: p.paymentDate || '—',
            amount: `Rs. ${p.amount.toLocaleString()}`,
            method: p.method,
            status: p.status.toUpperCase() === 'PAID' ? 'PAID' : 'OVERDUE',
            receiptNo: p.transactionId || '—',
          }));

          const combined = [...localRecords];
          mapped.forEach((m) => {
            if (!combined.some((c) => c.id === m.id || (c.month === m.month && c.status === m.status))) {
              combined.push(m);
            }
          });
          setHistoryList(combined);
          return;
        }
      } catch (err) {
        console.error(err);
      }

      // Fallback
      const combinedMock = [...localRecords];
      mockHistory.forEach((m) => {
        if (!combinedMock.some((c) => c.id === m.id || (c.month === m.month && c.status === m.status))) {
          combinedMock.push(m);
        }
      });
      setHistoryList(combinedMock);
    };

    fetchHistory();
  }, []);

  const filteredHistory = historyList.filter((item) => {
    const matchesSearch = item.month.toLowerCase().includes(searchQuery.toLowerCase()) || item.receiptNo.toLowerCase().includes(searchQuery.toLowerCase());
    if (statusFilter === 'PAID') return matchesSearch && item.status === 'PAID';
    if (statusFilter === 'OVERDUE') return matchesSearch && item.status === 'OVERDUE';
    return matchesSearch;
  });

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
            <button onClick={onNavigateToPayments} className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Payments</span>
            </button>
            <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold bg-blue-50/90 text-blue-600 transition-all cursor-pointer">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
            <h1 className="font-display text-xl font-bold text-slate-900">Payment History</h1>
            <p className="text-xs text-slate-500">Track and download past payment receipts</p>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-100 px-3 py-1.5 rounded-full">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              {studentName.charAt(0)}
            </div>
            <span className="text-xs font-bold text-slate-800">{studentName}</span>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Controls: Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by month or receipt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {(['ALL', 'PAID', 'OVERDUE'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === filter
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* History Table */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="py-4 px-6">RECEIPT #</th>
                    <th className="py-4 px-6">MONTH</th>
                    <th className="py-4 px-6">DATE</th>
                    <th className="py-4 px-6">AMOUNT</th>
                    <th className="py-4 px-6">METHOD</th>
                    <th className="py-4 px-6">STATUS</th>
                    <th className="py-4 px-6 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-xs text-blue-600">{item.receiptNo}</td>
                      <td className="py-4 px-6 font-bold text-slate-900">{item.month}</td>
                      <td className="py-4 px-6 text-slate-500 text-xs">{item.date}</td>
                      <td className="py-4 px-6 font-extrabold text-slate-900">{item.amount}</td>
                      <td className="py-4 px-6 text-slate-600 text-xs">{item.method}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                          item.status === 'PAID'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                            : 'bg-red-50 text-red-700 border-red-200/60'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'PAID' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {item.status === 'PAID' ? (
                          <button
                            onClick={() => alert(`Downloading Receipt ${item.receiptNo}...`)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Receipt</span>
                            <span>↓</span>
                          </button>
                        ) : (
                          <button
                            onClick={onNavigateToPayments}
                            className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                          >
                            Pay Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
