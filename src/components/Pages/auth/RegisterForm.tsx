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
import { Link } from 'react-router-dom'
import API from '@/api' // ✅ Axios instance

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof StudentSchema>>({
    resolver: zodResolver(StudentSchema),
    defaultValues: defaultStudentValues,
  })

  const onSubmit = async (data: z.infer<typeof StudentSchema>) => {
    setIsLoading(true)
    try {
      const response = await API.post('/students', data)
      console.log('Registration successful:', response.data)

      // Optional: Redirect or reset form
      form.reset()
    } catch (error: any) {
      console.error('Registration failed:', error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white p-4'>
      <div className='w-full max-w-md'>
        <div className='flex justify-center mb-6'>
          <div className='flex items-center gap-2 text-green-800'>
            <BookOpen className='h-8 w-8' />
            <span className='font-arabic text-2xl font-semibold'>القرآن الكريم</span>
          </div>
        </div>

        <Card className='border-green-100 shadow-md'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-2xl font-bold text-green-900'>إنشاء حساب جديد</CardTitle>
            <CardDescription>أدخل بياناتك لإنشاء حساب جديد</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <CardContent className='space-y-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input placeholder='محمد أحمد' {...field} />
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
                        <Input type='email' placeholder='example@domain.com' {...field} />
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

              </CardContent>
              <CardFooter className='flex flex-col space-y-4'>
                <Button
                  type='submit'
                  className='w-full bg-green-800 hover:bg-green-900 text-white'
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري التسجيل...' : 'إنشاء حساب'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default RegisterForm
