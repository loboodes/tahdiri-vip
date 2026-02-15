
import { Grade, Subject, LessonPlan } from './types';

export const GRADES: Grade[] = [
  'الأول الابتدائي', 'الثاني الابتدائي', 'الثالث الابتدائي',
  'الرابع الابتدائي', 'الخامس الابتدائي', 'السادس الابتدائي',
  'الأول متوسط', 'الثاني متوسط', 'الثالث متوسط',
  'الأول ثانوي', 'الثاني ثانوي', 'الثالث ثانوي'
];

export const SUBJECTS: Subject[] = [
  'القرآن الكريم', 'الدراسات الإسلامية', 'اللغة العربية',
  'الرياضيات', 'العلوم', 'اللغة الإنجليزية',
  'الدراسات الاجتماعية', 'المهارات الرقمية', 'التربية الفنية',
  'التربية البدنية'
];

export const TERMS = [
  'الفصل الدراسي الأول',
  'الفصل الدراسي الثاني'
];

export const INITIAL_LESSON: LessonPlan = {
  id: '',
  teacherName: '',
  schoolName: '',
  eduDepartment: '',
  subject: 'اللغة العربية',
  grade: 'الأول الابتدائي',
  term: 'الفصل الدراسي الأول',
  week: 'الأول',
  date: new Date().toLocaleDateString('ar-SA'),
  unitTitle: '',
  lessonTitle: '',
  objectives: [''],
  materials: ['الكتاب المدرسي', 'السبورة الذكية'],
  introduction: '',
  activities: [''],
  assessment: [''],
  homework: '',
  visionAlignment: 'تطوير المهارات الحياتية وتعزيز القيم الإسلامية والهوية الوطنية وفق رؤية المملكة 2030.'
};
