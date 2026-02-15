
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import LessonPreview from './components/LessonPreview';
import { LessonPlan } from './types';
import { GRADES, SUBJECTS, TERMS, INITIAL_LESSON } from './constants';
import { generateLessonContent } from './services/geminiService';

const App: React.FC = () => {
  const [lesson, setLesson] = useState<LessonPlan>(INITIAL_LESSON);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('last_lesson');
    if (saved) {
      try {
        setLesson(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved lesson");
      }
    }
  }, []);

  const saveToLocalStorage = useCallback((data: LessonPlan) => {
    localStorage.setItem('last_lesson', JSON.stringify(data));
  }, []);

  const handleChange = (field: keyof LessonPlan, value: any) => {
    const updated = { ...lesson, [field]: value };
    setLesson(updated);
    saveToLocalStorage(updated);
  };

  const handleAISuggest = async () => {
    if (!lesson.lessonTitle || !lesson.subject) {
      setError("يرجى إدخال عنوان الدرس واختيار المادة أولاً");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const suggestion = await generateLessonContent(
        lesson.subject,
        lesson.grade,
        lesson.lessonTitle,
        '', // unitTitle is optional here
        lesson.term
      );
      
      const updated = { ...lesson, ...suggestion };
      setLesson(updated);
      saveToLocalStorage(updated);
    } catch (err: any) {
      setError(err.message || "فشل الاتصال بالذكاء الاصطناعي. تأكد من ضبط API_KEY.");
    } finally {
      setLoading(false);
    }
  };

  const copyAsText = () => {
    const text = `
تحضير درس: ${lesson.lessonTitle}
المادة: ${lesson.subject} | الصف: ${lesson.grade} | ${lesson.term}

الأهداف:
${lesson.objectives.join('\n')}

التمهيد:
${lesson.introduction}

الإجراءات:
${lesson.activities.join('\n')}

الواجب:
${lesson.homework}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe]">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Controls */}
        <div className="no-print space-y-6 lg:col-span-5 sidebar">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                لوحة التحضير
              </h2>
              <button 
                onClick={() => confirm('سيتم مسح البيانات المسودة حالياً، هل أنت متأكد؟') && setLesson(INITIAL_LESSON)}
                className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
              >
                تصفير النموذج
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <div className="col-span-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 pr-1">إدارة التعليم</label>
                <input 
                  type="text" 
                  value={lesson.eduDepartment} 
                  onChange={e => handleChange('eduDepartment', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 pr-1">اسم المدرسة</label>
                <input 
                  type="text" 
                  value={lesson.schoolName} 
                  onChange={e => handleChange('schoolName', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 pr-1">المادة</label>
                <select 
                  value={lesson.subject} 
                  onChange={e => handleChange('subject', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none cursor-pointer"
                >
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 pr-1">الصف</label>
                <select 
                  value={lesson.grade} 
                  onChange={e => handleChange('grade', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none cursor-pointer"
                >
                  {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 pr-1">الفصل الدراسي</label>
                <select 
                  value={lesson.term} 
                  onChange={e => handleChange('term', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm appearance-none cursor-pointer"
                >
                  {TERMS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 pr-1">عنوان الدرس</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={lesson.lessonTitle} 
                    onChange={e => handleChange('lessonTitle', e.target.value)}
                    placeholder="مثال: خصائص الجمع"
                    className="flex-grow px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                  />
                  <button 
                    onClick={handleAISuggest}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5"
                  >
                    {loading ? 'جاري التوليد...' : 'توليد ذكي'}
                  </button>
                </div>
                {error && <p className="text-red-500 text-[11px] mt-2 font-bold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                  {error}
                </p>}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-slate-50">
               <button 
                 onClick={handlePrint}
                 className="w-full bg-slate-800 hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                 طباعة وحفظ كـ PDF
               </button>
               <button 
                 onClick={copyAsText}
                 className="w-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border border-emerald-100"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                 {copied ? 'تم النسخ بنجاح!' : 'نسخ النص لمنصة مدرستي'}
               </button>
            </div>
            
            <p className="text-[10px] text-slate-400 text-center font-medium">
              يتم حفظ مسودة التحضير تلقائياً في متصفحك الحالي
            </p>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-7 w-full overflow-hidden print:overflow-visible print:block">
          <div className="no-print mb-4 flex justify-between items-center px-2 preview-label">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">معاينة الطباعة الفورية</span>
             <span className="text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded-full font-bold">PDF A4</span>
          </div>
          <div className="origin-top transform scale-100 lg:scale-[0.95] xl:scale-100 transition-transform print:transform-none print:scale-100">
            <LessonPreview data={lesson} />
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
