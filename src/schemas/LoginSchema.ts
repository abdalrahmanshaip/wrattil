import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
  password: z.string().min(1, { message: 'يرجى إدخال كلمة المرور' }),
})

export const defaultLoginValues = {
  email: '',
  password: '',
}
