import { z } from 'zod'

export const ExamSchema = z.object({
  id: z.number().optional(), // ✅ Add this
  title: z.string().min(1, 'الاسم مطلوب'),
  description: z.string().min(1, 'الوصف مطلوب'),
  grade: z.coerce.number().min(0.1, 'يجب أن تكون الدرجة أكبر من 0'),
  examDate: z.string().min(1, 'تاريخ الامتحان مطلوب'),
})

export const defaultExamValues = {
  title: '',
  description: '',
  grade: 0,
  examDate: '',
}