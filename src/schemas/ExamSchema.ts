import { z } from 'zod'

export const ExamSchema = z.object({
  title: z.string().min(2, { message: 'الاسم يجب أن يكون أكثر من حرفين' }),
  description: z.string().min(5, { message: 'الوصف يجب ألا يكون فارغًا' }),
  grade: z.number().min(0, { message: 'الدرجة يجب أن تكون رقمًا غير سالب' }),
  examDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'يرجى إدخال تاريخ ووقت صالحين بصيغة YYYY-MM-DDTHH:mm',
    }),
})

export const defaultExamValues = {
  title: '',
  description: '',
  grade: 0,
  examDate: '',
}