
import React from 'react';
import { LessonPlan } from '../types';
import { ACADEMIC_YEAR } from '../constants';

interface Props {
  data: LessonPlan;
}

const LessonPreview: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-8 border rounded-lg shadow-sm print-container min-h-screen transition-all duration-300">
      {/* Saudi Seal Placeholder / Header */}
      <div className="flex justify-between items-start mb-8 border-b-2 border-emerald-600 pb-4 section-break">
        <div className="text-[11px] leading-tight space-y-1">
          <p>المملكة العربية السعودية</p>
          <p>وزارة التعليم</p>
          <p>إدارة التعليم بـ: <span className="font-bold">{data.eduDepartment || '....................'}</span></p>
          <p>مكتب التعليم بـ: <span className="font-bold">{data.eduOffice || '....................'}</span></p>
          <p>مدرسة: <span className="font-bold">{data.schoolName || '....................'}</span></p>
        </div>
        <div className="text-center">
            <div className="h-16 w-16 bg-slate-50 flex items-center justify-center mx-auto mb-2 rounded-full border border-slate-200">
                <img src="https://upload.wikimedia.org/wikipedia/ar/2/22/Ministry_of_Education_%28Saudi_Arabia%29_logo.svg" alt="وزارة التعليم" className="h-12 w-12" />
            </div>
            <h2 className="text-lg font-bold">نموذج تحضير الدروس</h2>
            <p className="text-xs font-bold text-emerald-700">العام الدراسي: {ACADEMIC_YEAR}</p>
        </div>
        <div className="text-[11px] text-left space-y-1" dir="ltr">
          <p>Teacher: <span className="font-bold">{data.teacherName || '....................'}</span></p>
          <p>Subject: <span className="font-bold">{data.subject}</span></p>
          <p>Date: <span className="font-bold">{data.date}</span></p>
        </div>
      </div>

      {/* Grid Header Info */}
      <div className="grid grid-cols-4 gap-0 border border-slate-300 mb-6 text-[13px] section-break">
        <div className="border-l border-b p-2 bg-slate-50 font-bold">المادة</div>
        <div className="border-l border-b p-2">{data.subject}</div>
        <div className="border-l border-b p-2 bg-slate-50 font-bold">الصف</div>
        <div className="border-b p-2">{data.grade}</div>
        
        <div className="border-l border-b p-2 bg-slate-50 font-bold">الفصل الدراسي</div>
        <div className="border-l border-b p-2">{data.term}</div>
        <div className="border-l border-b p-2 bg-slate-50 font-bold">الأسبوع</div>
        <div className="border-b p-2">{data.week}</div>

        <div className="border-l p-2 bg-slate-50 font-bold">الوحدة</div>
        <div className="border-l p-2">{data.unitTitle || '....................'}</div>
        <div className="border-l p-2 bg-slate-50 font-bold">موضوع الدرس</div>
        <div className="p-2 font-bold text-emerald-700">{data.lessonTitle || '....................'}</div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-6">
        <section className="section-break">
          <h3 className="bg-emerald-50 text-emerald-800 font-bold p-1 border-r-4 border-emerald-600 mb-2 text-sm">الأهداف التعليمية</h3>
          <ul className="list-disc list-inside space-y-1 text-[13px] pr-4">
            {data.objectives.filter(o => o.trim()).map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
            {data.objectives.filter(o => o.trim()).length === 0 && <li>..................................................................</li>}
          </ul>
        </section>

        <section className="section-break">
          <h3 className="bg-emerald-50 text-emerald-800 font-bold p-1 border-r-4 border-emerald-600 mb-2 text-sm">الوسائل والمصادر</h3>
          <div className="flex flex-wrap gap-2 pr-4 text-[12px]">
            {data.materials.map((m, i) => (
              <span key={i} className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200">{m}</span>
            ))}
          </div>
        </section>

        <section className="section-break">
          <h3 className="bg-emerald-50 text-emerald-800 font-bold p-1 border-r-4 border-emerald-600 mb-2 text-sm">تمهيد الدرس</h3>
          <p className="text-[13px] pr-4 leading-relaxed whitespace-pre-wrap">{data.introduction || '............................................................................................................................................................................................................'}</p>
        </section>

        <section className="section-break">
          <h3 className="bg-emerald-50 text-emerald-800 font-bold p-1 border-r-4 border-emerald-600 mb-2 text-sm">إجراءات التدريس وعرض الدرس</h3>
          <div className="space-y-2 pr-4 text-[13px]">
            {data.activities.filter(a => a.trim()).map((act, i) => (
              <div key={i} className="flex gap-2">
                <span className="font-bold text-emerald-600 min-w-[20px]">{i + 1}.</span>
                <p className="whitespace-pre-wrap">{act}</p>
              </div>
            ))}
            {data.activities.filter(a => a.trim()).length === 0 && <p>..................................................................................................................................</p>}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4 section-break">
          <section>
            <h3 className="bg-emerald-50 text-emerald-800 font-bold p-1 border-r-4 border-emerald-600 mb-2 text-sm">التقويم والختام</h3>
            <ul className="list-disc list-inside space-y-1 text-[12px] pr-4">
              {data.assessment.filter(as => as.trim()).map((as, i) => (
                <li key={i}>{as}</li>
              ))}
              {data.assessment.filter(as => as.trim()).length === 0 && <li>......................................................</li>}
            </ul>
          </section>
          <section>
            <h3 className="bg-emerald-50 text-emerald-800 font-bold p-1 border-r-4 border-emerald-600 mb-2 text-sm">الواجب المنزلي</h3>
            <p className="text-[13px] pr-4 italic">{data.homework || '..................................................................'}</p>
          </section>
        </div>

        <section className="mt-8 pt-4 border-t border-slate-100 section-break">
           <div className="flex justify-between items-end text-[10px] text-slate-500 italic">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Saudi_Vision_2030_logo.svg" className="h-5" alt="v2030" />
                        <span className="font-bold text-slate-700 not-italic">تحقيقاً لمستهدفات الرؤية الوطنية</span>
                    </div>
                    <span className="max-w-[400px] leading-snug">{data.visionAlignment}</span>
                </div>
                <div className="text-center space-y-4">
                    <p className="not-italic font-bold border-b border-slate-200 pb-1">اعتماد قائد/ة المدرسة</p>
                    <p className="text-slate-300">التوقيع والختم الرسمي</p>
                </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default LessonPreview;
