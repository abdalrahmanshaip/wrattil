import { z } from 'zod'

export const StudentSchema = z.object({
  name: z.string().min(1, { message: 'الاسم يجب أن يكون أكثر من حرفين' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  phoneNumber: z
    .string()
    .min(11, { message: 'رقم الهاتف يجب أن يكون على الأقل 11 أرقام' }),
    password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل، وحرف كبير واحد، ورقم رقمي واحد، وحرف خاص واحد، ويجب أن يكون اكثر من 8 أحرف على الأقل',
      }
    ),
    applicationId: z.number().min(1, { message: 'يرجى إدخال كود التسجيل' }),
})

export const defaultStudentValues = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  applicationId: 0,
}
