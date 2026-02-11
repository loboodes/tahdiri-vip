
import { GoogleGenAI, Type } from "@google/genai";
import { LessonPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLessonContent = async (
  subject: string,
  grade: string,
  lessonTitle: string,
  unitTitle: string,
  term: string
): Promise<Partial<LessonPlan>> => {
  try {
    const prompt = `أنت خبير تربوي في المناهج السعودية لعام 1447 هـ. قم بإعداد تحضير درس احترافي ومفصل للموضوع التالي:
    المادة: ${subject}
    الصف: ${grade}
    الفصل الدراسي: ${term}
    الوحدة: ${unitTitle}
    عنوان الدرس: ${lessonTitle}

    يجب أن يتضمن التحضير:
    1. أهداف الدرس (قائمة من 3-5 أهداف سلوكية تراعي مهارات التفكير).
    2. الوسائل التعليمية المقترحة.
    3. تمهيد مشوق للدرس.
    4. إجراءات التدريس (خطوات عملية للمعلم).
    5. أساليب التقويم.
    6. الواجب المنزلي.

    يرجى تقديم النتيجة بتنسيق JSON حصراً.`;

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

    const result = JSON.parse(response.text || '{}');
    return result;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
