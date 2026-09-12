import React, { useState, useEffect } from 'react';
import { MOCK_FEEDBACKS, FeedbackItem } from './TeacherFeedbackPage';

export default function StudentFeedbackBanner() {
  const [items, setItems] = useState<FeedbackItem[]>(MOCK_FEEDBACKS);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ria_student_feedbacks');
      if (stored) {
        const parsed: FeedbackItem[] = JSON.parse(stored);
        if (parsed.length > 0) {
          const combined = [...parsed];
          MOCK_FEEDBACKS.forEach(m => {
            if (!combined.some(c => c.id === m.id)) combined.push(m);
          });
          setItems(combined);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Auto rotate banner cards every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const current = items[activeIdx] || MOCK_FEEDBACKS[0];

  return (
    <div className="w-full max-w-4xl mx-auto my-6 px-4">
      {/* Glassmorphic Banner Container */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl text-left relative overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-extrabold tracking-wider text-emerald-300 uppercase">
              Verified Student Feedback
            </span>
          </div>

          <div className="flex items-center gap-1">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeIdx === idx ? 'w-6 bg-teal-400' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`View testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-1 text-amber-400 text-sm">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < current.rating ? '★' : '☆'}</span>
              ))}
              <span className="text-xs font-bold text-white ml-2">{current.rating}.0 Rating</span>
            </div>

            <p className="text-sm md:text-base text-slate-100 font-medium italic leading-relaxed">
              "{current.comment}"
            </p>

            <div className="pt-1 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 text-white font-extrabold text-xs flex items-center justify-center shadow-md">
                {current.studentName.charAt(0)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{current.studentName}</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full font-mono">
                    {current.studentId}
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  Course: <span className="text-teal-300 font-semibold">{current.subject}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Highlight Badge */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs space-y-2 hidden md:block text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Assigned Faculty</p>
            <p className="text-xs font-extrabold text-white">{current.teacherName}</p>
            <div className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
              <span>✓ Verified Enrolled Student</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
