import { UserPlusIcon, IdentificationIcon, CreditCardIcon, BellIcon } from './Icons';

const steps = [
  {
    step: 1,
    title: 'Create Your Profile',
    description: 'Teacher signs up and creates their tuition profile in minutes. No setup fees.',
    icon: <UserPlusIcon className="w-6 h-6" />,
  },
  {
    step: 2,
    title: 'Add Your Students',
    description: 'Add students and each receives a unique Student ID for secure login and tracking.',
    icon: <IdentificationIcon className="w-6 h-6" />,
  },
  {
    step: 3,
    title: 'Students Pay Online',
    description: 'Students log in with their ID and complete monthly tuition payment securely.',
    icon: <CreditCardIcon className="w-6 h-6" />,
  },
  {
    step: 4,
    title: 'Get Real-Time Updates',
    description: 'Teacher receives instant payment notifications and dashboard updates automatically.',
    icon: <BellIcon className="w-6 h-6" />,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-blue-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-teal-400 uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Up and Running in Minutes
          </h2>
          <p className="text-blue-200 max-w-md mx-auto">
            TuitionPay is designed to be simple. Four steps and your tuition management is fully digital.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-12 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-blue-800 z-0" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((s, i) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-800/60 border border-blue-700 flex items-center justify-center text-teal-400 backdrop-blur-sm shadow-lg">
                    {s.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center shadow">
                    <span className="text-white text-[10px] font-bold">{s.step}</span>
                  </div>
                </div>
                <h3 className="font-display font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-blue-300 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA inside section */}
        <div className="text-center mt-14">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-teal-900/30"
          >
            Start for Free — No Credit Card Needed
          </a>
        </div>
      </div>
    </section>
  );
}
