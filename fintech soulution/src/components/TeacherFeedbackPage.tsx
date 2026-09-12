import { logoImg } from '@/assets/logo';
import React, { useState, useEffect } from 'react';

export interface FeedbackItem {
  id: string;
  studentName: string;
  studentId: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  reply?: string;
}

export const MOCK_FEEDBACKS: FeedbackItem[] = [
  {
    id: 'fb_1',
    studentName: 'Pasindu Jayasinghe',
    studentId: 'STU-001',
    teacherId: 'usr_tch_lahiru',
    teacherName: 'Lahiru Dombawalage',
    subject: 'Combined Mathematics & Physics',
    rating: 5,
    comment: 'ලහිරු සර්ගේ Combined Maths සහ Physics පන්තිය ඉතා පැහැදිලියි. Online ගෙවීම් පද්ධතිය මගින් තත්පර කිහිපයකින් LMS Video Access සක්‍රිය වීම ඉතා පහසුයි!',
    date: 'Sep 12, 2026',
    reply: 'බොහොම ස්තූතියි පසිඳු! Revision පන්ති වල වැඩත් හොඳින් කරගෙන යමු.'
  },
  {
    id: 'fb_2',
    studentName: 'Kavindu Perera',
    studentId: 'STU-012',
    teacherId: 'usr_tch_ranil',
    teacherName: 'Ranil Fernando',
    subject: 'Combined Mathematics',
    rating: 5,
    comment: 'රනිල් සර්ගේ Combined Maths පාඩම් සහ Past Papers විසඳන ආකාරය ගොඩක් හොදට තේරෙනවා. Online Card Payment එකත් ඉතාම ආරක්ෂිතයි.',
    date: 'Sep 10, 2026',
    reply: 'ස්තූතියි කවිඳු! Paper class එකටත් දිගටම සම්බන්ධ වෙන්න.'
  },
  {
    id: 'fb_3',
    studentName: 'Amaya Silva',
    studentId: 'STU-024',
    teacherId: 'usr_tch_lakshan',
    teacherName: 'Lakshan Fernando',
    subject: 'ICT & Software Technology',
    rating: 5,
    comment: 'ලක්ෂාන් සර්ගේ ICT පන්තිය සිරාමයි! Practical කොටස් සහ Coding පැහැදිලිව කියලා දෙනවා. Fintech portal එක නිසා Class Fee ගෙවන එක හරිම ලේසියි.',
    date: 'Sep 08, 2026',
    reply: 'Great work Amaya! Keep coding!'
  },
  {
    id: 'fb_4',
    studentName: 'Kasun Rathnayake',
    studentId: 'STU-038',
    teacherId: 'usr_tch_ishan',
    teacherName: 'Ishan Darshana',
    subject: 'Chemistry & Science',
    rating: 4,
    comment: 'ඉෂාන් සර්ගේ Chemistry Class එක නියමයි. Physical Chemistry Equation පාඩම් සරලව තේරුම් ගන්න පුළුවන්. Past Paper explanations top notch!',
    date: 'Sep 05, 2026',
    reply: 'Thanks Kasun! Keep practicing the past papers.'
  },
  {
    id: 'fb_5',
    studentName: 'Dilani Gunawardena',
    studentId: 'STU-051',
    teacherId: 'usr_tch_suranga',
    teacherName: 'Suranga Hettiarachchi',
    subject: 'Commerce & Finance',
    rating: 5,
    comment: 'සුරංග සර්ගේ Business & Finance පන්තිය ඉතාමත් විශිෂ්ටයි. Accounting & Finance පාඩම් සරලව සහ පැහැදිලිව කියලා දෙනවා. ස්තූතියි සර්!',
    date: 'Sep 02, 2026',
    reply: 'ස්තූතියි දිලානි! විභාගයට හොඳින් සූදානම් වෙන්න.'
  },
  {
    id: 'fb_6',
    studentName: 'Pasindu Jayasinghe',
    studentId: 'STU-001',
    teacherId: 'usr_tch_lakshan',
    teacherName: 'Lakshan Fernando',
    subject: 'ICT & Web Development',
    rating: 5,
    comment: 'Web Development & Fintech portal features are amazing. instant payment verification and OTP security features work flawlessly!',
    date: 'Aug 28, 2026'
  }
];

interface TeacherFeedbackPageProps {
  teacherName?: string;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToStudents?: () => void;
  onNavigateToPayments?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToNotifications?: () => void;
}

export default function TeacherFeedbackPage({
  teacherName = "Lahiru Dombawalage",
  onLogout,
  onNavigateToDashboard,
  onNavigateToStudents,
  onNavigateToPayments,
  onNavigateToAnalytics,
  onNavigateToNotifications
}: TeacherFeedbackPageProps) {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [selectedTeacherFilter, setSelectedTeacherFilter] = useState<string>('all');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const loadFeedbacks = () => {
    try {
      const stored = localStorage.getItem('ria_student_feedbacks');
      const localList: FeedbackItem[] = stored ? JSON.parse(stored) : [];
      const combined = [...localList];
      MOCK_FEEDBACKS.forEach(m => {
        if (!combined.some(c => c.id === m.id || (c.studentName === m.studentName && c.comment === m.comment))) {
          combined.push(m);
        }
      });
      setFeedbacks(combined);
    } catch (e) {
      setFeedbacks(MOCK_FEEDBACKS);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleSendReply = (id: string) => {
    if (!replyText.trim()) return;
    const updated = feedbacks.map(f => {
      if (f.id === id) {
        return { ...f, reply: replyText.trim() };
      }
      return f;
    });

    setFeedbacks(updated);
    try {
      localStorage.setItem('ria_student_feedbacks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setReplyingId(null);
    setReplyText('');
    setToastMsg('Official teacher reply sent to student portal!');
    setTimeout(() => setToastMsg(null), 2500);
  };

  const filteredFeedbacks = feedbacks.filter(f => {
    if (selectedTeacherFilter !== 'all' && f.teacherId !== selectedTeacherFilter && f.teacherName !== selectedTeacherFilter) {
      return false;
    }
    if (selectedRatingFilter !== 'all' && f.rating !== selectedRatingFilter) {
      return false;
    }
    return true;
  });

  const avgRating = (feedbacks.reduce((acc, f) => acc + f.rating, 0) / (feedbacks.length || 1)).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
      
      {/* Toast Banner */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl font-medium text-sm flex items-center gap-2 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="font-display text-xl font-bold text-slate-900">Student Feedback & Reviews</h1>
            <p className="text-xs text-slate-500">View ratings, course reviews, and respond to enrolled students</p>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-100 px-3 py-1.5 rounded-full">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              {teacherName.charAt(0)}
            </div>
            <span className="text-xs font-bold text-slate-800">{teacherName}</span>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          
          {/* Metrics Header Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-2xl font-black shadow-inner">
                ★
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Rating</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">{avgRating}</span>
                  <span className="text-xs font-bold text-amber-500">out of 5.0</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-extrabold shadow-inner">
                💬
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Feedback Received</p>
                <p className="text-2xl font-black text-slate-900">{feedbacks.length} Reviews</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-extrabold shadow-inner">
                ✓
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Student Satisfaction</p>
                <p className="text-2xl font-black text-emerald-600">98.4% Positive</p>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter Teacher:</span>
              <select
                value={selectedTeacherFilter}
                onChange={(e) => setSelectedTeacherFilter(e.target.value)}
                className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none"
              >
                <option value="all">All 5 RIA Faculty Members</option>
                <option value="usr_tch_lahiru">Lahiru Dombawalage (Combined Maths)</option>
                <option value="usr_tch_ranil">Ranil Fernando (English)</option>
                <option value="usr_tch_lakshan">Lakshan Fernando (IT & Software)</option>
                <option value="usr_tch_ishan">Ishan Darshana (Accounting)</option>
                <option value="usr_tch_suranga">Suranga Hettiarachchi (Sinhala)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rating:</span>
              {[
                { label: 'All', value: 'all' },
                { label: '5 ★', value: 5 },
                { label: '4 ★', value: 4 },
              ].map(r => (
                <button
                  key={r.label}
                  onClick={() => setSelectedRatingFilter(r.value as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedRatingFilter === r.value
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Cards List */}
          <div className="space-y-4">
            {filteredFeedbacks.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
                      {item.studentName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900">{item.studentName}</h4>
                        <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          {item.studentId}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Subject: <strong className="text-slate-700">{item.subject}</strong> • Teacher: <span className="text-blue-600 font-semibold">{item.teacherName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < item.rating ? '★' : '☆'}</span>
                      ))}
                      <span className="text-xs font-black text-slate-800 ml-1">{item.rating}.0</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{item.date}</p>
                  </div>
                </div>

                {/* Comment Text */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-700 font-medium leading-relaxed">
                  "{item.comment}"
                </div>

                {/* Teacher Official Reply View */}
                {item.reply ? (
                  <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-950 text-[11px] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        Official Teacher Reply by {item.teacherName}:
                      </span>
                      <span className="text-[10px] text-blue-600 font-bold">VERIFIED</span>
                    </div>
                    <p className="text-blue-900 font-medium italic">"{item.reply}"</p>
                  </div>
                ) : replyingId === item.id ? (
                  <div className="space-y-2 pt-1">
                    <textarea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Write official reply to ${item.studentName}...`}
                      className="w-full p-3 bg-slate-50 border border-blue-300 rounded-2xl text-xs outline-none focus:bg-white transition-all font-medium"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setReplyingId(null)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSendReply(item.id)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold rounded-xl shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                      >
                        Post Official Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setReplyingId(item.id);
                        setReplyText('');
                      }}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>💬 Reply to Student</span>
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
