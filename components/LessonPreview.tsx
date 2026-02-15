
import React from 'react';
import { LessonPlan } from '../types';

interface Props {
  data: LessonPlan;
}

const LessonPreview: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-10 border rounded-lg shadow-xl print-container min-h-[297mm] transition-all duration-300 relative">
      {/* Decorative Border for Print */}
      <div className="absolute inset-4 border border-slate-100 pointer-events-none print:hidden"></div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-emerald-700 pb-6 section-break">
        <div className="text-[11px] leading-relaxed">
          <p className="font-bold">المملكة العربية السعودية</p>
          <p>وزارة التعليم</p>
          <p>إدارة: <span className="font-bold border-b border-dotted border-slate-400 min-w-[60px] inline-block">{data.eduDepartment || '.........'}</span></p>
          <p>مدرسة: <span className="font-bold border-b border-dotted border-slate-400 min-w-[60px] inline-block">{data.schoolName || '.........'}</span></p>
        </div>

        <div className="text-center">
          <img src="https://upload.wikimedia.org/wikipedia/ar/2/22/Ministry_of_Education_%28Saudi_Arabia%29_logo.svg" alt="وزارة التعليم" className="h-20 w-auto mx-auto mb-2" />
          <h2 className="text-xl font-extrabold text-slate-800">بطاقة تحضير درس</h2>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded">نظام المسارات</span>
          </div>
        </div>

        <div className="text-[11px] text-left" dir="ltr">
          <div className="w-16 h-16 bg-slate-100 border border-slate-200 mb-2 flex items-center justify-center text-[8px] text-slate-400 font-mono">
            Digital Seal
          </div>
          <p>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <p>Date: {data.date}</p>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-4 overflow-hidden mb-8 text-[13px] section-break">
        <div className="p-3 border-l border-b border-slate-200 bg-emerald-50/50 font-bold text-emerald-900">المادة</div>
        <div className="p-3 border-l border-b border-slate-200">{data.subject}</div>
        <div className="p-3 border-l border-b border-slate-200 bg-emerald-50/50 font-bold text-emerald-900">الصف</div>
        <div className="p-3 border-b border-slate-200 font-bold">{data.grade}</div>
        
        <div className="p-3 border-l border-slate-200 bg-emerald-50/50 font-bold text-emerald-900">الفصل</div>
        <div className="p-3 border-l border-slate-200">{data.term}</div>
        <div className="p-3 border-l border-slate-200 bg-emerald-50/50 font-bold text-emerald-900">موضوع الدرس</div>
        <div className="p-3 font-extrabold text-emerald-700">{data.lessonTitle || 'حدد عنوان الدرس'}</div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8">
        <section className="section-break">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-6 bg-emerald-600 rounded-full"></div>
            <h3 className="text-base font-bold text-slate-800">الأهداف التعليمية</h3>
          </div>
          <ul className="grid grid-cols-1 gap-2 pr-6">
            {data.objectives.filter(o => o.trim()).map((obj, i) => (
              <li key={i} className="text-sm text-slate-700 list-disc leading-relaxed">{obj}</li>
            ))}
            {data.objectives.filter(o => o.trim()).length === 0 && <li className="text-slate-300 italic">بانتظار توليد الأهداف...</li>}
          </ul>
        </section>

        <section className="section-break">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-6 bg-emerald-600 rounded-full"></div>
            <h3 className="text-base font-bold text-slate-800">التمهيد والوسائل</h3>
          </div>
          <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-700 leading-loose mb-4">{data.introduction || 'أدخل مقدمة الدرس هنا...'}</p>
            <div className="flex flex-wrap gap-2">
              {data.materials.map((m, i) => (
                <span key={i} className="text-[11px] bg-white border border-emerald-100 text-emerald-700 px-3 py-1 rounded-full shadow-sm">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-break">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-6 bg-emerald-600 rounded-full"></div>
            <h3 className="text-base font-bold text-slate-800">عرض الدرس وإجراءات التدريس</h3>
          </div>
          <div className="space-y-3 pr-4">
            {data.activities.filter(a => a.trim()).map((act, i) => (
              <div key={i} className="flex gap-4">
                <span className="flex-none w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-[11px] flex items-center justify-center font-bold">{i + 1}</span>
                <p className="text-sm text-slate-700 leading-relaxed pt-0.5">{act}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8 section-break">
          <section className="bg-slate-50/30 p-4 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-2 text-sm border-b pb-1">التقويم والقياس</h4>
            <ul className="space-y-1">
              {data.assessment.map((as, i) => (
                <li key={i} className="text-xs text-slate-600">• {as}</li>
              ))}
            </ul>
          </section>
          <section className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-2 text-sm border-b border-emerald-100 pb-1">الواجب والنشاط الإثرائي</h4>
            <p className="text-xs text-emerald-800 italic leading-relaxed">{data.homework || 'توليد الواجب...'}</p>
          </section>
        </div>

        {/* Vision Footer */}
        <footer className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-end section-break">
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Saudi_Vision_2030_logo.svg" className="h-10 opacity-80" alt="رؤية 2030" />
            <div className="text-[10px] text-slate-500 max-w-xs">
              <p className="font-bold text-emerald-800 mb-1">المواءمة مع رؤية 2030:</p>
              <p>{data.visionAlignment}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[11px] font-bold text-slate-700 mb-8">يعتمد من مدير/ة المدرسة</p>
            <div className="w-32 h-0.5 bg-slate-200 mx-auto"></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LessonPreview;
