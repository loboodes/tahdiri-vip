
export interface LessonPlan {
  id: string;
  teacherName: string;
  schoolName: string;
  eduDepartment: string;
  subject: string;
  grade: string;
  term: string;
  week: string;
  date: string;
  unitTitle: string;
  lessonTitle: string;
  objectives: string[];
  materials: string[];
  introduction: string;
  activities: string[];
  assessment: string[];
  homework: string;
  visionAlignment: string;
}

export type Grade = 'الأول الابتدائي' | 'الثاني الابتدائي' | 'الثالث الابتدائي' | 'الرابع الابتدائي' | 'الخامس الابتدائي' | 'السادس الابتدائي' | 'الأول متوسط' | 'الثاني متوسط' | 'الثالث متوسط' | 'الأول ثانوي' | 'الثاني ثانوي' | 'الثالث ثانوي';

export type Subject = 'القرآن الكريم' | 'الدراسات الإسلامية' | 'اللغة العربية' | 'الرياضيات' | 'العلوم' | 'اللغة الإنجليزية' | 'الدراسات الاجتماعية' | 'المهارات الرقمية' | 'التربية الفنية' | 'التربية البدنية';
