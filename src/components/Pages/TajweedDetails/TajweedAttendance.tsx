import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
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
  attendanceDate: string
  attended: boolean
  student: {
    id: number
    name: string
    email: string
  }
}

const AttendanceFilterSchema = z.object({
  attendanceDateTime: z.string().nonempty('يرجى اختيار التاريخ')
})

const AttendanceUploadSchema = z.object({
  attendanceDateTime: z.string().nonempty('يرجى اختيار التاريخ'),
  file: z.any()
})

const TajweedAttendance = () => {
  const { tajweedId } = useParams<{ tajweedId: string }>()
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const filterForm = useForm<z.infer<typeof AttendanceFilterSchema>>({
    resolver: zodResolver(AttendanceFilterSchema),
    defaultValues: {
      attendanceDateTime: ''
    }
  })

  const uploadForm = useForm<z.infer<typeof AttendanceUploadSchema>>({
    resolver: zodResolver(AttendanceUploadSchema),
    defaultValues: {
      attendanceDateTime: '',
      file: null
    }
  })

  const fetchAttendance = async (attendanceDateTime: string) => {
    setLoading(true)
    try {
      const res = await API.get(`/attendance/tajweed-attendance`, {
        params: {
          tajweedTrainingId: tajweedId,
          attendanceDateTime,
        },
      })
      setAttendances(res.data)
    } catch (error) {
      toast.error('فشل في جلب الحضور')
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (data: z.infer<typeof AttendanceFilterSchema>) => {
    fetchAttendance(data.attendanceDateTime)
  }

  const handleUpload = async (data: z.infer<typeof AttendanceUploadSchema>) => {
    if (!data.file) return toast.error('يرجى رفع ملف الحضور')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('tajweedTrainingId', tajweedId || '')
      formData.append('attendanceDateTime', data.attendanceDateTime)
      formData.append('attendanceFile', data.file)

      await API.post(`/attendance/tajweed-attendance`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      toast.success('تم رفع ملف الحضور بنجاح')
      fetchAttendance(data.attendanceDateTime)
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
          <Form {...filterForm}>
            <form onSubmit={filterForm.handleSubmit(handleFilter)} className="flex flex-col md:flex-row gap-4 items-end">
              <FormField
                control={filterForm.control}
                name="attendanceDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ الحضور</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-our-orange text-white">عرض الحضور</Button>
            </form>
          </Form>

          <Form {...uploadForm}>
            <form onSubmit={uploadForm.handleSubmit(handleUpload)} className="flex flex-col md:flex-row gap-4 items-end">
              <FormField
                control={uploadForm.control}
                name="attendanceDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاريخ الحضور</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  <TableHead className="text-right">تاريخ الحضور</TableHead>
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
                      <TableCell>{new Date(attendance.attendanceDate).toLocaleString()}</TableCell>
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

export default TajweedAttendance
