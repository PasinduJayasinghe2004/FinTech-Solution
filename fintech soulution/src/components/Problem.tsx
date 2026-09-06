import { CheckIcon, XIcon } from './Icons';

const problems = [
  'Tracking payments manually in notebooks',
  'Forgetting who has paid each month',
  'Managing outstanding balances by memory',
  'Sending reminder messages one by one on WhatsApp',
  'Losing track with messy spreadsheets and notepads',
];

const solutions = [
  'Automatic payment tracking — always up to date',
  'Instant view of paid, pending, and overdue students',
  'Real-time outstanding balance dashboard',
  'Automated reminders sent to all students at once',
  'Clean digital records accessible from anywhere',
];

export default function Problem() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">The Problem</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            Managing Tuition Payments<br />
            <span className="text-blue-700">{"Shouldn't"} Be Complicated.</span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Most teachers struggle with outdated manual methods. TuitionPay was built to change that.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* Without TuitionPay */}
          <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <XIcon className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-[10px] text-red-400 font-semibold uppercase tracking-wide">Before</p>
                <h3 className="font-display font-bold text-slate-800">Without TuitionPay</h3>
              </div>
            </div>
            <div className="space-y-3.5">
              {problems.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 shrink-0">
                    <XIcon className="w-3 h-3 text-red-500" />
                  </div>
                  <p className="text-sm text-slate-600">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* With TuitionPay */}
          <div className="bg-gradient-to-br from-blue-700 to-teal-600 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <CheckIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-blue-200 font-semibold uppercase tracking-wide">After</p>
                <h3 className="font-display font-bold text-white">With TuitionPay</h3>
              </div>
            </div>
            <div className="space-y-3.5">
              {solutions.map((s) => (
                <div key={s} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5 shrink-0">
                    <CheckIcon className="w-3 h-3 text-emerald-300" />
                  </div>
                  <p className="text-sm text-blue-50">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
