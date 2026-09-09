import { ArrowRightIcon } from './Icons';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-teal-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-teal-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-white/90">Join 20+ teachers already using RIA</span>
        </div>

        <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight">
          Start Managing Your Tuition<br />Business Smarter.
        </h2>

        <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Join modern teachers who are simplifying student payments and tuition management — all from one powerful dashboard.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-white text-blue-800 hover:bg-blue-50 font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-900/20"
          >
            Get Started Free
            <ArrowRightIcon className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
          >
            Book a Demo
          </a>
        </div>

        {/* Feature bullets */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/20">
          {['Free to start', 'No credit card needed', 'Setup in minutes', 'Cancel anytime'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-400/30 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-blue-100">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
