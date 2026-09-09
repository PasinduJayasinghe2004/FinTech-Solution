import logoImg from '@/assets/logo.jpg';
import { BellIcon, MailIcon, CheckIcon } from './Icons';

const pushNotifications = [
  {
    icon: <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />,
    iconBg: 'bg-emerald-100',
    title: 'Payment Successful',
    body: 'STU-012 Ahmad Raza completed payment of Rs. 2,500',
    time: 'just now',
  },
  {
    icon: <BellIcon className="w-3.5 h-3.5 text-amber-600" />,
    iconBg: 'bg-amber-100',
    title: 'Payment Due Soon',
    body: 'Your tuition fee is due in 3 days. Pay now to avoid late fees.',
    time: '2 hours ago',
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    iconBg: 'bg-blue-100',
    title: 'Student STU-031 Paid',
    body: 'Zara Ali completed their September tuition payment.',
    time: 'Yesterday',
  },
];

const emailNotifications = [
  {
    subject: 'Monthly Payment Summary — September 2026',
    preview: '36 of 48 students have paid this month. Outstanding: Rs. 8,200',
    date: 'Sep 6, 2026',
    tag: 'Summary',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    subject: 'Overdue Payment Alert',
    preview: '5 students have overdue payments. Send reminders now.',
    date: 'Sep 5, 2026',
    tag: 'Alert',
    tagColor: 'bg-red-100 text-red-600',
  },
  {
    subject: 'Payment Received — Ahmad Raza',
    preview: 'Rs. 2,500 received. Transaction ID: TXN-2026-09-0041',
    date: 'Sep 4, 2026',
    tag: 'Receipt',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
];

export default function Notifications() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Notifications</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Never Miss a Payment Update.
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Stay informed with real-time push notifications and email alerts for every payment event.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Mobile push notifications */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                <BellIcon className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900">In-App Notifications</h3>
                <p className="text-xs text-slate-400">Real-time push alerts on your device</p>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="bg-slate-900 rounded-[32px] p-3 shadow-2xl max-w-xs mx-auto">
              <div className="bg-slate-800 rounded-[24px] overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pt-3 pb-1">
                  <span className="text-white text-[10px] font-semibold">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-2 bg-white/60 rounded-sm" />
                    <div className="w-2 h-2 bg-white/60 rounded-full" />
                  </div>
                </div>

                {/* Lock screen / notification area */}
                <div className="px-3 py-2 space-y-2">
                  <div className="flex items-center justify-center mb-3">
                    <img src={logoImg} alt="TuitionPay Logo" className="w-10 h-10 rounded-xl object-cover" />
                  </div>

                  {pushNotifications.map((n, i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-7 h-7 rounded-full ${n.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                          {n.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-xs font-semibold text-white">{n.title}</p>
                            <p className="text-[9px] text-white/40 shrink-0">{n.time}</p>
                          </div>
                          <p className="text-[10px] text-white/60 leading-relaxed">{n.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom indicator */}
                <div className="flex justify-center pb-3 pt-2">
                  <div className="w-24 h-1 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Email notifications */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center">
                <MailIcon className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900">Email Notifications</h3>
                <p className="text-xs text-slate-400">Detailed summaries and receipts in your inbox</p>
              </div>
            </div>

            {/* Email inbox mockup */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              {/* Email header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <span className="font-display font-semibold text-slate-800 text-sm">Inbox</span>
                <span className="text-xs bg-blue-600 text-white rounded-full px-2 py-0.5 font-semibold">3 new</span>
              </div>

              <div className="divide-y divide-slate-100">
                {emailNotifications.map((e, i) => (
                  <div key={i} className={`px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer ${i === 0 ? 'bg-blue-50/30' : ''}`}>
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={logoImg} alt="TuitionPay Logo" className="w-7 h-7 rounded-full object-cover shrink-0" />
                        <span className="text-xs font-semibold text-slate-800 truncate">TuitionPay</span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{e.date}</span>
                    </div>
                    <p className={`text-sm font-medium mb-1 ${i === 0 ? 'text-slate-900' : 'text-slate-700'}`}>{e.subject}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-slate-400 truncate">{e.preview}</p>
                      <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${e.tagColor}`}>{e.tag}</span>
                    </div>
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
