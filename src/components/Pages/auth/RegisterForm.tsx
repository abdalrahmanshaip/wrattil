'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpen, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { defaultStudentValues, StudentSchema } from '@/schemas/StudentSchema'
import { Link } from 'react-router'

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: defaultStudentValues,
  })

  const onSubmit = (data: z.infer<typeof StudentSchema>) => {
    console.log(data)
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-4'>
      <div className='w-full max-w-md'>
        <div className='flex justify-center mb-6'>
          <div className='flex items-center gap-2 text-green-800'>
            <BookOpen className='h-8 w-8' />
            <span className='font-arabic text-2xl font-semibold'>
              القرآن الكريم
            </span>
          </div>
        </div>

        <Card className='border-green-100 shadow-md'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-2xl font-bold text-green-900'>
              إنشاء حساب جديد
            </CardTitle>
            <CardDescription>أدخل بياناتك لإنشاء حساب جديد</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
            >
              <CardContent className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='محمد أحمد'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='example@domain.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف</FormLabel>
                      <FormControl>
                        <Input
                          dir='rtl'
                          type='tel'
                          placeholder='01xxxxxxxxx'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='******'
                            {...field}
                          />
                          <Button
                            type='button'
                            variant='noHover'
                            size='icon'
                            className='absolute end-2 top-1/2 transform -translate-y-1/2'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className='h-4 w-4' />
                            ) : (
                              <Eye className='h-4 w-4' />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='applicationId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كود التسجيل</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='12345'
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value
                            field.onChange(
                              value === '' ? 0 : Number.parseInt(value, 10)
                            )
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className='flex flex-col space-y-4'>
                <Button
                  type='submit'
                  className='w-full bg-green-800 hover:bg-green-900 text-white'
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري التسجيل...' : 'إنشاء حساب'}
                </Button>
                <div className='text-center text-sm'>
                  لديك حساب بالفعل؟{' '}
                  <Link
                    to='/login'
                    className='text-green-700 hover:text-green-900 font-medium'
                  >
                    تسجيل الدخول
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default RegisterForm
