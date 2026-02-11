
import React from 'react';
import { ACADEMIC_YEAR } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b no-print">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-reverse space-x-3">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-800">تحضيري الذكي</h1>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{ACADEMIC_YEAR}</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">بوابة المعلم للمناهج السعودية المطورة</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-emerald-700">
          <span className="hidden sm:inline">الرؤية 2030</span>
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Saudi_Vision_2030_logo.svg" alt="Vision 2030" className="h-8" />
        </div>
      </div>
    </header>
  );
};

export default Header;
