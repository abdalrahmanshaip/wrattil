import { z } from 'zod'

export const tajweedSchema = z.object({
  title: z.string().min(1, 'العنوان مطلوب'),
  appointments: z.array(
    z.object({
      dayOfWeek: z.enum([
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
      ]),
      startTime: z.string().regex(/^\d{2}:\d{2}$/, 'الوقت غير صالح'),
    })
  ).min(1, 'يجب إضافة موعد واحد على الأقل')
})
