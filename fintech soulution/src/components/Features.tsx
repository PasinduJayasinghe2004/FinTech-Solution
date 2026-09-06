import { UsersIcon, CreditCardIcon, ViewGridIcon, ShieldCheckIcon, BellIcon, ChartBarIcon } from './Icons';

const features = [
  {
    icon: <UsersIcon className="w-6 h-6" />,
    title: 'Student Management',
    description: 'Manage all your students from one place with unique student IDs, profiles, and contact details.',
    color: 'blue',
  },
  {
    icon: <CreditCardIcon className="w-6 h-6" />,
    title: 'Smart Payment Tracking',
    description: 'Track paid, pending, and overdue payments in real time — no spreadsheet required.',
    color: 'teal',
  },
  {
    icon: <ViewGridIcon className="w-6 h-6" />,
    title: 'Real-Time Dashboard',
    description: 'Get a complete overview of your students and finances at a glance, updated live.',
    color: 'blue',
  },
  {
    icon: <ShieldCheckIcon className="w-6 h-6" />,
    title: 'Secure Payments',
    description: 'Provide secure and reliable digital payment options with end-to-end encryption.',
    color: 'emerald',
  },
  {
    icon: <BellIcon className="w-6 h-6" />,
    title: 'Automatic Notifications',
    description: 'Automatically notify students about upcoming payments, due dates, and reminders.',
    color: 'amber',
  },
  {
    icon: <ChartBarIcon className="w-6 h-6" />,
    title: 'Analytics & Reports',
    description: 'Understand your tuition business with powerful financial insights and monthly reports.',
    color: 'teal',
  },
];

const colorMap: Record<string, { icon: string; bg: string; ring: string }> = {
  blue: { icon: 'text-blue-600', bg: 'bg-blue-50', ring: 'group-hover:ring-blue-200' },
  teal: { icon: 'text-teal-600', bg: 'bg-teal-50', ring: 'group-hover:ring-teal-200' },
  emerald: { icon: 'text-emerald-600', bg: 'bg-emerald-50', ring: 'group-hover:ring-emerald-200' },
  amber: { icon: 'text-amber-500', bg: 'bg-amber-50', ring: 'group-hover:ring-amber-200' },
};

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Features</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Everything You Need to Manage<br />Your Tuition Business
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            One platform that handles students, payments, notifications, and analytics — built exclusively for teachers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const c = colorMap[f.color];
            return (
              <div
                key={f.title}
                className="group p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg ring-1 ring-transparent transition-all duration-200 bg-white"
              >
                <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center mb-5 transition-colors`}>
                  <span className={c.icon}>{f.icon}</span>
                </div>
                <h3 className="font-display font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
