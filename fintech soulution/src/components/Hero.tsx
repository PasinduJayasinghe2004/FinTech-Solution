import { ArrowRightIcon, CheckIcon, UserPlusIcon, WarningIcon } from './Icons';

function MiniBarChart() {
  // Monthly payment data Apr–Sep (in thousands): 42, 48, 39, 55, 51, 52
  const data = [
    { label: 'Apr', value: 42, active: false },
    { label: 'May', value: 48, active: false },
    { label: 'Jun', value: 39, active: false },
    { label: 'Jul', value: 55, active: true },
    { label: 'Aug', value: 51, active: false },
    { label: 'Sep', value: 52, active: false },
  ];
  const max = 55;
  const chartH = 60;
  const barW = 28;
  const gap = 11;
  const totalW = data.length * (barW + gap) - gap;

  return (
    <svg viewBox={`0 0 ${totalW} ${chartH + 14}`} className="w-full">
      {data.map((d, i) => {
        const barH = Math.round((d.value / max) * chartH);
        const x = i * (barW + gap);
        const y = chartH - barH;
        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={5}
              fill={d.active ? '#2563eb' : '#bfdbfe'}
            />
            <text
              x={x + barW / 2}
              y={chartH + 12}
              textAnchor="middle"
              fontSize="7"
              fill="#94a3b8"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DashboardMockup() {
  const transactions = [
    { name: 'Ahmad Raza', id: 'STU-012', amount: '2,500', paid: true, initial: 'A' },
    { name: 'Sara Khan', id: 'STU-007', amount: '3,000', paid: true, initial: 'S' },
    { name: 'Bilal Ahmed', id: 'STU-023', amount: '2,000', paid: false, initial: 'B' },
  ];

  return (
    <div className="relative pt-6 pb-8 pl-4 pr-4 lg:pl-0">
      {/* Floating: Payment Received */}
      <div className="absolute -top-2 left-0 lg:-left-8 z-10 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2.5 border border-emerald-100 min-w-[172px]">
        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
          <CheckIcon className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">Payment Received</p>
          <p className="text-xs text-slate-400">Rs. 2,500 · just now</p>
        </div>
      </div>

      {/* Floating: New Student */}
      <div className="absolute top-1/3 -right-2 lg:-right-10 z-10 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2.5 border border-blue-100 min-w-[155px]">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
          <UserPlusIcon className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">New Student</p>
          <p className="text-xs text-slate-400">Zara Ali joined</p>
        </div>
      </div>

      {/* Floating: Reminder */}
      <div className="absolute -bottom-2 right-6 lg:right-0 z-10 bg-white rounded-xl shadow-xl p-3 flex items-center gap-2.5 border border-amber-100 min-w-[178px]">
        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
          <WarningIcon className="w-4 h-4 text-amber-500" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">Reminder Sent</p>
          <p className="text-xs text-slate-400">8 students notified</p>
        </div>
      </div>

      {/* Main dashboard card */}
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 relative z-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Sep 2026</p>
            <h3 className="text-sm font-display font-bold text-slate-800">Dashboard Overview</h3>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-bold">AK</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <div className="bg-blue-50 rounded-xl p-3">
            <p className="text-[10px] text-blue-500 font-semibold uppercase tracking-wide mb-1">Total Students</p>
            <p className="text-2xl font-display font-bold text-blue-900">48</p>
            <p className="text-[10px] text-emerald-500 font-semibold mt-1">↑ +3 this month</p>
          </div>
          <div className="bg-teal-50 rounded-xl p-3">
            <p className="text-[10px] text-teal-600 font-semibold uppercase tracking-wide mb-1">Monthly Revenue</p>
            <p className="text-2xl font-display font-bold text-slate-900">Rs. 52.4k</p>
            <p className="text-[10px] text-emerald-500 font-semibold mt-1">↑ +8% vs last</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-3">
            <p className="text-[10px] text-amber-600 font-semibold uppercase tracking-wide mb-1">Pending</p>
            <p className="text-2xl font-display font-bold text-slate-900">12</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">students</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3">
            <p className="text-[10px] text-red-500 font-semibold uppercase tracking-wide mb-1">Outstanding</p>
            <p className="text-2xl font-display font-bold text-slate-900">Rs. 8.2k</p>
            <p className="text-[10px] text-slate-400 font-medium mt-1">overdue balance</p>
          </div>
        </div>

        {/* Bar chart */}
        <div className="mb-4">
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-2">Payment Trend (Apr–Sep)</p>
          <MiniBarChart />
        </div>

        {/* Recent transactions */}
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mb-2">Recent Transactions</p>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-blue-700 text-[9px] font-bold">{tx.initial}</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-700 leading-tight">{tx.name}</p>
                    <p className="text-[10px] text-slate-400">{tx.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-700">Rs. {tx.amount}</p>
                  <span className={`text-[10px] font-semibold ${tx.paid ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {tx.paid ? '● Paid' : '● Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="pt-24 pb-16 lg:pb-20 bg-gradient-to-br from-white via-blue-50/40 to-teal-50/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy */}
          <div className="lg:py-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-blue-700">Built for Private Tuition Teachers</span>
            </div>

            <h1 className="font-display text-4xl lg:text-[52px] font-bold text-slate-900 leading-tight mb-6">
              Manage Your Tuition Payments.{' '}
              <span className="text-blue-700">Without the Stress.</span>
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-lg">
              RIA helps teachers manage students, track payments, monitor outstanding balances, and receive real-time updates — all in one platform.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm shadow-blue-200"
              >
                Get Started Free
                <ArrowRightIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-slate-200 hover:border-blue-200 bg-white hover:bg-blue-50 text-slate-700 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
              <div className="flex -space-x-2.5">
                {[
                  { bg: 'bg-blue-500', label: 'A' },
                  { bg: 'bg-teal-500', label: 'S' },
                  { bg: 'bg-emerald-500', label: 'F' },
                  { bg: 'bg-violet-500', label: 'R' },
                ].map((a, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${a.bg} border-2 border-white flex items-center justify-center`}
                  >
                    <span className="text-white text-xs font-bold">{a.label}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">500+ teachers trust RIA</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-slate-500 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dashboard mockup */}
          <div>
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
