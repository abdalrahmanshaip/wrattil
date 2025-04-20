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
import { defaultLoginValues, LoginSchema } from '@/schemas/LoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { BookOpen, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import z from 'zod'

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultLoginValues,
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
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
              اهلا بك
            </CardTitle>
            <CardDescription>أدخل بياناتك للوصول إلى حسابك</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
            >
              <CardContent className='space-y-4'>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className='flex flex-col space-y-4'>
                <Button
                  variant={'noHover'}
                  type='submit'
                  className='w-full bg-green-800 hover:bg-green-900 text-white'
                  disabled={isLoading}
                >
                  {isLoading ? 'تسجيل الدخول...' : 'تسجيل الدخول'}
                </Button>
                <div className='text-center text-sm'>
                  لا تملك حساب؟{' '}
                  <Link
                    to='/register'
                    className='text-green-700 hover:text-green-900 font-medium'
                  >
                    انشاء حساب
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

export default LoginPage