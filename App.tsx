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
      setError("يرجى إدخال عنوان الدرس والمادة أولاً");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const suggestion = await generateLessonContent(
        lesson.subject,
        lesson.grade,
        lesson.lessonTitle,
        lesson.unitTitle,
        lesson.term
      );
      
      const updated = { ...lesson, ...suggestion };
      setLesson(updated);
      saveToLocalStorage(updated);
    } catch (err) {
      setError("حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Input Sidebar / Form Section */}
        <div className="no-print space-y-6 order-2 lg:order-1 sidebar">
          <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                بيانات التحضير لعام 1447 هـ
              </h2>
              <button 
                onClick={() => {
                   if(confirm('هل أنت متأكد من مسح جميع البيانات؟')) {
                     setLesson(INITIAL_LESSON);
                     localStorage.removeItem('last_lesson');
                   }
                }}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                مسح الكل
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-500 mb-1">إدارة التعليم</label>
                  <input 
                    type="text" 
                    value={lesson.eduDepartment} 
                    onChange={e => handleChange('eduDepartment', e.target.value)}
                    placeholder="إدارة التعليم بـ"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-slate-500 mb-1">مكتب التعليم</label>
                  <input 
                    type="text" 
                    value={lesson.eduOffice} 
                    onChange={e => handleChange('eduOffice', e.target.value)}
                    placeholder="مكتب التعليم بـ"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">اسم المعلم</label>
                <input 
                  type="text" 
                  value={lesson.teacherName} 
                  onChange={e => handleChange('teacherName', e.target.value)}
                  placeholder="أدخل اسمك"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">المدرسة</label>
                <input 
                  type="text" 
                  value={lesson.schoolName} 
                  onChange={e => handleChange('schoolName', e.target.value)}
                  placeholder="اسم المدرسة"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">المادة</label>
                <select 
                  value={lesson.subject} 
                  onChange={e => handleChange('subject', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">الصف</label>
                <select 
                  value={lesson.grade} 
                  onChange={e => handleChange('grade', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">الفصل الدراسي</label>
                <select 
                  value={lesson.term} 
                  onChange={e => handleChange('term', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  {TERMS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold text-slate-500 mb-1">التاريخ</label>
                <input 
                  type="text" 
                  value={lesson.date} 
                  onChange={e => handleChange('date', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">عنوان الوحدة</label>
                <input 
                  type="text" 
                  value={lesson.unitTitle} 
                  onChange={e => handleChange('unitTitle', e.target.value)}
                  placeholder="اسم الوحدة الدراسية"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">عنوان الدرس</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={lesson.lessonTitle} 
                    onChange={e => handleChange('lessonTitle', e.target.value)}
                    placeholder="مثال: الجملة الاسمية"
                    className="flex-grow px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <button 
                    onClick={handleAISuggest}
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                  >
                    {loading ? (
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    تحضير ذكي
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
            </div>

            <div className="sticky bottom-4 bg-white p-4 border-t space-y-3 shadow-lg rounded-xl z-10">
               <button 
                 onClick={handlePrint}
                 className="w-full bg-slate-800 hover:bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                 </svg>
                 طباعة / حفظ PDF
               </button>
            </div>

          </div>
        </div>

        {/* Lesson Preview Section */}
        <div className="order-1 lg:order-2 w-full">
          <div className="sticky top-8 no-print mb-4 flex justify-between items-center">
             <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">معاينة التحضير</h3>
             <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold">نموذج 1447 هـ</span>
          </div>
          <LessonPreview data={lesson} />
        </div>

      </main>
    </div>
  );
};

export default App;