import { z } from "zod"

export const appointmentSchema = z.object({
  dayOfWeek: z.enum([
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ]),
  startTime: z.string(),
})

export const groupSchema = z.object({
  title: z.string().min(1, 'اسم المجموعة مطلوب'),
  academicYearId: z.number(),
  appointments: z.array(appointmentSchema),
})