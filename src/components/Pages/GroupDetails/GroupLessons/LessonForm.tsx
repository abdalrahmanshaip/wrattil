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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import API from '@/api'
import { useParams } from 'react-router-dom'

const LessonSchema = z.object({
  teacherName: z.string().nonempty('اسم المعلم مطلوب'),
  lessonDateTime: z.string().nonempty('تاريخ ووقت الدرس مطلوب'),
})

type FormData = z.infer<typeof LessonSchema>

interface LessonFormProps {
  initialData?: FormData & { id?: number }
  onSuccess: () => void
  onCancel: () => void
}

const LessonForm = ({ initialData, onSuccess, onCancel }: LessonFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { groupId } = useParams<{ groupId: string }>()

  const form = useForm<FormData>({
    resolver: zodResolver(LessonSchema),
    defaultValues: initialData || {
      teacherName: '',
      lessonDateTime: '',
    },
  })

  useEffect(() => {
    if (initialData) form.reset(initialData)
  }, [initialData, form])

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      if (initialData && initialData.id) {
        await API.put(`/lessons`, {...data, lessonId: initialData.id})
      } else {
        await API.post('/lessons', {
          ...data,
          groupId,
        })
      }
      onSuccess()
    } catch (error: any) {
      console.error('Error saving lesson:', error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full mx-auto mt-6" dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl">
          {initialData ? 'تعديل الدرس' : 'إضافة درس جديد'}
        </CardTitle>
        <CardDescription>
          {initialData ? 'قم بتعديل بيانات الدرس' : 'أدخل بيانات الدرس الجديد'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="teacherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المعلم</FormLabel>
                  <FormControl>
                    <Input placeholder="اسم المعلم" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lessonDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ ووقت الدرس</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4 w-full">
              <Button type="submit" className="w-1/2 h-10 bg-our-orange text-white" disabled={isLoading}>
                {isLoading ? 'جاري الحفظ...' : initialData ? 'تعديل الدرس' : 'إنشاء درس جديد'}
              </Button>
              <Button type="button" variant="outline" className="w-1/2 h-10" onClick={onCancel} disabled={isLoading}>
                إلغاء
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LessonForm
