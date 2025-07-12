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
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import API from '@/api'

type FormData = z.infer<typeof ExamSchema>

interface ExamFormProps {
  initialData?: FormData
  onSuccess: () => void
  onCancel: () => void
}

interface Track {
  id: number
  title: string
}

interface AcademicYear {
  id: number
  title: string
}

const ExamForm = ({ initialData, onSuccess, onCancel }: ExamFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [tracks, setTracks] = useState<Track[]>([])
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([])

  const form = useForm<FormData>({
    resolver: zodResolver(ExamSchema),
    defaultValues: initialData || {
      ...defaultExamValues,
      academicYearId: 0,
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    } else {
      fetchTracks()
    }
  }, [initialData, form])

  const fetchTracks = async () => {
    try {
      const response = await API.get('/quran-tracks')
      setTracks(response.data)
    } catch (error) {
      console.error('Error fetching tracks:', error)
    }
  }

  const fetchAcademicYears = async (trackId: number) => {
    try {
      const response = await await API.get('/academic-years', {
        params: { quranTrackId: trackId },
      })
      setAcademicYears(response.data)
    } catch (error) {
      console.error('Error fetching academic years:', error)
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      if (initialData) {
        await API.put(`/exams`, {
          ...data,
          id: initialData.id,
        })
      } else {
        await API.post('/exams', {
          ...data,
        })
      }
      onSuccess()
    } catch (error: any) {
      console.error('Error saving exam:', error.response?.data || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full mx-auto mt-6" dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl">
          {initialData ? 'تعديل الامتحان' : 'إضافة امتحان جديد'}
        </CardTitle>
        <CardDescription>
          {initialData ? 'قم بتعديل بيانات الامتحان' : 'أدخل بيانات الامتحان الجديد'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {!initialData && (
              <>
                {/* Track Dropdown */}
                <FormItem>
                  <FormLabel>المسار</FormLabel>
                  <FormControl>
                    <select
                      onChange={(e) => {
                        const value = parseInt(e.target.value)
                        if (!isNaN(value)) {
                          fetchAcademicYears(value)
                          form.setValue('academicYearId', 0)
                        }
                      }}
                      className="w-full border border-gray-300 rounded-md p-2"
                    >
                      <option value="">اختر المسار</option>
                      {tracks.map((track) => (
                        <option key={track.id} value={track.id}>
                          {track.title}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>

                {/* Academic Year Dropdown */}
                <FormField
                  control={form.control}
                  name="academicYearId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العام الدراسي</FormLabel>
                      <FormControl>
                        <select
                          value={field.value || ''}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          disabled={academicYears.length === 0}
                          className="w-full border border-gray-300 rounded-md p-2"
                        >
                          <option value="">اختر العام الدراسي</option>
                          {academicYears.map((year) => (
                            <option key={year.id} value={year.id}>
                              {year.title}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

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
                    <Input type="number" placeholder="10" {...field} />
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
                  <FormLabel>تاريخ الامتحان</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 w-full">
              <Button
                type="submit"
                className="w-1/2 h-10 bg-our-orange text-white"
                disabled={isLoading}
              >
                {isLoading
                  ? 'جاري الحفظ...'
                  : initialData
                  ? 'تعديل الامتحان'
                  : 'إنشاء امتحان جديد'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-1/2 h-10"
                onClick={onCancel}
                disabled={isLoading}
              >
                إلغاء
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ExamForm
