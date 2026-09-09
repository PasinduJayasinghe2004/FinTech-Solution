function DonutChart() {
  // Paid 65%, Pending 22%, Overdue 13%
  // r=38, cx=45, cy=45, C = 2π*38 ≈ 238.76
  const r = 38;
  const cx = 45;
  const cy = 45;
  const C = 2 * Math.PI * r;
  const paid = 0.65;
  const pending = 0.22;
  // overdue = 0.13

  const paidLen = paid * C;
  const pendingLen = pending * C;
  const overdueLen = (1 - paid - pending) * C;

  const pendingOffset = C - paidLen;
  const overdueOffset = C - (paid + pending) * C;

  return (
    <svg viewBox="0 0 90 90" className="w-40 h-40">
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth="10" />
      {/* Paid (65%) */}
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#10b981" strokeWidth="10"
        strokeDasharray={`${paidLen} ${C - paidLen}`}
        strokeDashoffset={0}
        transform={`rotate(-90, ${cx}, ${cy})`}
      />
      {/* Pending (22%) */}
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#f59e0b" strokeWidth="10"
        strokeDasharray={`${pendingLen} ${C - pendingLen}`}
        strokeDashoffset={pendingOffset}
        transform={`rotate(-90, ${cx}, ${cy})`}
      />
      {/* Overdue (13%) */}
      <circle
        cx={cx} cy={cy} r={r} fill="none"
        stroke="#ef4444" strokeWidth="10"
        strokeDasharray={`${overdueLen} ${C - overdueLen}`}
        strokeDashoffset={overdueOffset}
        transform={`rotate(-90, ${cx}, ${cy})`}
      />
      {/* Center label */}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e293b">65%</text>
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize="7" fill="#94a3b8">Paid</text>
    </svg>
  );
}

const students = [
  { name: 'Ahmad Raza', id: 'STU-012', subject: 'Mathematics', amount: 'Rs. 2,500', status: 'paid', date: 'Sep 1, 2026' },
  { name: 'Sara Khan', id: 'STU-007', subject: 'Physics', amount: 'Rs. 3,000', status: 'paid', date: 'Sep 2, 2026' },
  { name: 'Bilal Ahmed', id: 'STU-023', subject: 'Chemistry', amount: 'Rs. 2,000', status: 'pending', date: '—' },
  { name: 'Zara Ali', id: 'STU-031', subject: 'Mathematics', amount: 'Rs. 2,500', status: 'paid', date: 'Sep 3, 2026' },
  { name: 'Hamza Sheikh', id: 'STU-019', subject: 'Biology', amount: 'Rs. 2,800', status: 'overdue', date: 'Aug 15, 2026' },
  { name: 'Fatima Malik', id: 'STU-004', subject: 'English', amount: 'Rs. 1,800', status: 'pending', date: '—' },
];

const statusStyle: Record<string, string> = {
  paid: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  overdue: 'bg-red-50 text-red-600',
};

export default function DashboardShowcase() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Dashboard</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Your Tuition Business.<br />All in One Dashboard.
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            A clear, powerful view of every student, every payment, and every rupee — always within reach.
          </p>
        </div>

        {/* Dashboard card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <img src="/logo.jpg" alt="TuitionPay Logo" className="w-7 h-7 rounded-lg object-cover" />
              <span className="font-display font-semibold text-blue-900 text-sm">TuitionPay</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">September 2026</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">AK</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y lg:divide-y-0 divide-slate-100 border-b border-slate-100">
            {[
              { label: 'Total Students', value: '48', sub: '+3 this month', color: 'text-blue-700' },
              { label: 'Monthly Revenue', value: 'Rs. 52,400', sub: '+8% vs Aug', color: 'text-teal-700' },
              { label: 'Outstanding Balance', value: 'Rs. 8,200', sub: '5 overdue students', color: 'text-red-600' },
              { label: 'Payments This Month', value: '36 / 48', sub: '75% collection rate', color: 'text-emerald-700' },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-5">
                <p className="text-xs text-slate-400 font-medium mb-1">{stat.label}</p>
                <p className={`font-display text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Chart + legend */}
          <div className="grid lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 border-b border-slate-100">
            {/* Donut chart */}
            <div className="p-6 flex flex-col items-center justify-center">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-5">Payment Status</p>
              <DonutChart />
              <div className="flex flex-col gap-2 mt-5 w-full max-w-[160px]">
                {[
                  { label: 'Paid', count: '31 students', color: 'bg-emerald-500' },
                  { label: 'Pending', count: '11 students', color: 'bg-amber-400' },
                  { label: 'Overdue', count: '6 students', color: 'bg-red-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                      <span className="text-xs text-slate-600">{item.label}</span>
                    </div>
                    <span className="text-xs text-slate-400">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar chart */}
            <div className="p-6 lg:col-span-2">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-5">Monthly Revenue — 2026</p>
              <svg viewBox="0 0 440 130" className="w-full h-32">
                {/* Grid lines */}
                {[0, 40, 80, 120].map((y) => (
                  <line key={y} x1="0" y1={y} x2="440" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                ))}
                {/* Bars */}
                {[
                  { label: 'Jan', v: 32 },
                  { label: 'Feb', v: 28 },
                  { label: 'Mar', v: 38 },
                  { label: 'Apr', v: 42 },
                  { label: 'May', v: 48 },
                  { label: 'Jun', v: 39 },
                  { label: 'Jul', v: 55 },
                  { label: 'Aug', v: 51 },
                  { label: 'Sep', v: 52, highlight: true },
                ].map((d, i) => {
                  const barH = (d.v / 60) * 108;
                  const x = i * 50 + 5;
                  return (
                    <g key={d.label}>
                      <rect
                        x={x} y={120 - barH} width={36} height={barH} rx={5}
                        fill={d.highlight ? '#2563eb' : '#bfdbfe'}
                      />
                      <text x={x + 18} y={128} textAnchor="middle" fontSize="8" fill="#94a3b8">{d.label}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Student table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-3">Student</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3">ID</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Subject</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 hidden lg:table-cell">Paid On</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === students.length - 1 ? 'border-0' : ''}`}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <span className="text-blue-700 text-xs font-bold">{s.name[0]}</span>
                        </div>
                        <span className="font-medium text-slate-800 text-sm">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-400 font-mono">{s.id}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 hidden md:table-cell">{s.subject}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-slate-700">{s.amount}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusStyle[s.status]}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-400 hidden lg:table-cell">{s.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
