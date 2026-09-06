import { ShieldCheckIcon, LockIcon, CreditCardIcon, CheckCircleIcon } from './Icons';

const features = [
  {
    icon: <ShieldCheckIcon className="w-6 h-6 text-teal-400" />,
    title: 'Secure Payment Processing',
    description: 'Every transaction is encrypted end-to-end. Your financial data is protected at all times.',
  },
  {
    icon: <CheckCircleIcon className="w-6 h-6 text-emerald-400" />,
    title: 'Instant Confirmation',
    description: 'Students and teachers both receive instant confirmation for every successful payment.',
  },
  {
    icon: <CreditCardIcon className="w-6 h-6 text-blue-300" />,
    title: 'Full Transaction History',
    description: 'Access a complete, searchable log of every payment — month by month, student by student.',
  },
  {
    icon: <LockIcon className="w-6 h-6 text-amber-400" />,
    title: 'Auto Payment Tracking',
    description: 'Payments are automatically logged the moment they clear — zero manual entry needed.',
  },
];

export default function PaymentSecurity() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-teal-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-teal-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <p className="text-sm font-semibold text-teal-400 uppercase tracking-widest mb-3">Security</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
              Simple Payments.<br />Secure Transactions.
            </h2>
            <p className="text-blue-200 mb-10 leading-relaxed">
              TuitionPay is built with the same security standards as modern banking apps. Teachers and students can transact with complete confidence.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col gap-3 p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <h3 className="font-display font-semibold text-white text-sm">{f.title}</h3>
                  <p className="text-xs text-blue-200 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="flex flex-col gap-4">
            {/* Transaction confirmed card */}
            <div className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-white/50 font-medium">Payment Confirmation</p>
                  <p className="text-sm font-display font-bold text-white">Transaction Successful</p>
                </div>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Student', value: 'Ahmad Raza (STU-012)' },
                  { label: 'Amount', value: 'Rs. 2,500.00' },
                  { label: 'Method', value: 'Online Transfer' },
                  { label: 'Ref', value: 'TXN-2026-09-0041' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-xs text-white/40">{row.label}</span>
                    <span className="text-xs font-medium text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <ShieldCheckIcon className="w-5 h-5 text-teal-400" />, label: 'SSL Encrypted' },
                { icon: <LockIcon className="w-5 h-5 text-blue-300" />, label: 'Data Protected' },
                { icon: <CheckCircleIcon className="w-5 h-5 text-emerald-400" />, label: 'Verified Secure' },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl text-center"
                >
                  {b.icon}
                  <p className="text-xs text-white/60 leading-tight">{b.label}</p>
                </div>
              ))}
            </div>

            {/* Recent transactions */}
            <div className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-5">
              <p className="text-xs text-white/40 font-semibold uppercase tracking-wide mb-3">Recent Transactions</p>
              <div className="space-y-3">
                {[
                  { name: 'Sara Khan', amount: 'Rs. 3,000', time: 'Today, 10:24 AM', ok: true },
                  { name: 'Bilal Ahmed', amount: 'Rs. 2,000', time: 'Today, 9:15 AM', ok: true },
                  { name: 'Zara Ali', amount: 'Rs. 2,500', time: 'Yesterday, 4:00 PM', ok: true },
                ].map((tx) => (
                  <div key={tx.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">{tx.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{tx.name}</p>
                        <p className="text-[10px] text-white/40">{tx.time}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">{tx.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
