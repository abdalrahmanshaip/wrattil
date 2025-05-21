import { z } from 'zod'

export const AdminSchema = z.object({
  name: z.string().min(1, { message: 'الاسم يجب أن يكون أكثر من حرفين' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  phoneNumber: z
    .string()
    .min(11, { message: 'رقم الهاتف يجب أن يكون على الأقل 11 رقمًا' }),
  password: z
    .string()
    .min(6, { message: 'كلمة المرور يجب ألا تقل عن 6 أحرف' }),
})

export const defaultAdminValues = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
}
