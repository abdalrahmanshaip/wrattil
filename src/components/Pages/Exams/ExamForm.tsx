import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
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
import { ExamSchema, defaultExamValues } from '@/schemas/ExamSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import API from '@/api' // ✅ Make sure this file sets up your axios instance

const ExamForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof ExamSchema>>({
    resolver: zodResolver(ExamSchema),
    defaultValues: defaultExamValues,
  })

  const onSubmit = async (data: z.infer<typeof ExamSchema>) => {
    setIsLoading(true)
    try {
      const response = await API.post('/admins', data)
      console.log('Admin created:', response.data)

      form.reset() // ✅ Clear the form after successful creation
    } catch (error: any) {
      console.error('Failed to create admin:', error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full mx-auto" dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl">إضافة امتحان جديد</CardTitle>
        <CardDescription>أدخل بيانات الامتحان الجديد</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل اسم الامتحان" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوصف</FormLabel>
                  <FormControl>
                    <Input placeholder="ادخل وصف الامتحان" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الدرجة</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="examDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ ووقت الامتحان</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="noHover"
              type="submit"
              className="w-full bg-our-orange text-white h-10"
              disabled={isLoading}
            >
              {isLoading ? 'جاري الإنشاء...' : 'إنشاء امتحان جديد'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ExamForm
