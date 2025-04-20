import { z } from 'zod'

export const AdminSchema = z.object({
  name: z.string().min(1, { message: 'الاسم يجب أن يكون أكثر من حرفين' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  phoneNumber: z
    .string()
    .min(11, { message: 'رقم الهاتف يجب أن يكون على الأقل 11 أرقام' }),
  password: z
    .string()
    .min(6, { message: 'كلمة المرور يجب أن تكون على الأقل 6 أحرف' }),
})

export const defaultAdminValues = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
}
