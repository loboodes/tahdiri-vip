
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan } from "../types";

export const generateLessonContent = async (
  subject: string,
  grade: string,
  lessonTitle: string,
  unitTitle: string,
  term: string
): Promise<Partial<LessonPlan>> => {
  try {
    // إنشاء المثيل داخل الدالة لضمان استخدام أحدث API_KEY من البيئة
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const prompt = `أنت خبير تربوي ومستشار تعليمي للمناهج السعودية المطورة. 
    قم بإعداد تحضير درس نموذجي واحترافي للموضوع التالي:
    المادة: ${subject}
    الصف: ${grade}
    الفصل الدراسي: ${term}
    الوحدة: ${unitTitle}
    عنوان الدرس: ${lessonTitle}

    المطلوب هو إنشاء محتوى تربوي رصين يشمل:
    1. أهداف الدرس: 3-5 أهداف (معرفية، وجدانية، مهارية).
    2. الوسائل التعليمية: مصادر التعلم والتقنيات المستخدمة.
    3. التمهيد: مقدمة مشوقة لجذب الطلاب.
    4. إجراءات التدريس: خطوات تنفيذ الدرس بالتفصيل.
    5. أساليب التقويم: أسئلة أو أنشطة لتقييم الفهم.
    6. الواجب المنزلي: اذكر مهمة إثرائية أو تدريبية عامة متعلقة بالدرس، ولكن **لا تكتب رقم صفحة محدد**، اترك للمعلم حرية تحديد رقم الصفحة (مثال: حل الأسئلة المتعلقة بـ... في صفحة يحددها المعلم).

    يجب أن يكون الأسلوب متوافقاً مع "دليل المعلم" السعودي الحديث.
    يرجى تقديم النتيجة بتنسيق JSON فقط.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
            materials: { type: Type.ARRAY, items: { type: Type.STRING } },
            introduction: { type: Type.STRING },
            activities: { type: Type.ARRAY, items: { type: Type.STRING } },
            assessment: { type: Type.ARRAY, items: { type: Type.STRING } },
            homework: { type: Type.STRING },
          },
          required: ["objectives", "materials", "introduction", "activities", "assessment", "homework"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("entity was not found")) {
      throw new Error("مفتاح الـ API غير صالح أو لم يتم تفعيله بشكل صحيح.");
    }
    throw error;
  }
};
