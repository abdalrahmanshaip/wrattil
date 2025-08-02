import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { number, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import API from '@/api'

interface Attendance {
  id: number
  recitingStatus: string
  quizGrade: number
  attended: boolean,
  student: {
    id: number
    name: string
    email: string
  }
}

const AttendanceUploadSchema = z.object({
  file: z.any()
})

const LessonAttendance = () => {
  const { lessonId } = useParams<{ lessonId: string }>()
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const uploadForm = useForm<z.infer<typeof AttendanceUploadSchema>>({
    resolver: zodResolver(AttendanceUploadSchema),
    defaultValues: {
      file: null
    }
  })

  const fetchAttendance = async () => {
    setLoading(true)
    try {
      const res = await API.get(`/attendance`, {
        params: {
          lessonId        
        },
      })
      setAttendances(res.data)
    } catch (error) {
      toast.error('فشل في جلب الحضور')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (lessonId) fetchAttendance()
  }, [lessonId])

  const handleUpload = async (data: z.infer<typeof AttendanceUploadSchema>) => {
    if (!data.file) return toast.error('يرجى رفع ملف الحضور')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('lessonId', lessonId || '')
      formData.append('attendanceFile', data.file)

      await API.post(`/attendance`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      toast.success('تم رفع ملف الحضور بنجاح')
      fetchAttendance()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl mb-4">سجل الحضور</CardTitle>

        <div className="flex flex-col gap-6">

          <Form {...uploadForm}>
            <form onSubmit={uploadForm.handleSubmit(handleUpload)} className="flex flex-col md:flex-row gap-4 items-end">
              <FormField
                control={uploadForm.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملف الحضور (Excel)</FormLabel>
                    <FormControl>
                      <Input type="file" accept=".xlsx,.xls" onChange={(e) => field.onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-blue-600 text-white" disabled={uploading}>
                {uploading ? 'جاري الرفع...' : 'رفع الحضور'}
              </Button>
            </form>
          </Form>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
          </div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">م</TableHead>
                  <TableHead className="text-right">اسم الطالب</TableHead>
                  <TableHead className="text-right">الإيميل</TableHead>
                  <TableHead className="text-right">الحضور</TableHead>
                  <TableHead className="text-right">تسميع الحلقة</TableHead>       
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendances.length > 0 ? (
                  attendances.map((attendance, index) => (
                    <TableRow key={attendance.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{attendance.student.name}</TableCell>
                      <TableCell>{attendance.student.email}</TableCell>
                      <TableCell>{attendance.attended ? '✔️' : '❌'}</TableCell>
                      <TableCell>{attendance.recitingStatus}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      لا توجد نتائج
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default LessonAttendance
