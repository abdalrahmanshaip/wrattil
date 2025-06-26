import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import API from '@/api'

interface ExamGrade {
  id: number
  studentGrade: number
  student: {
    id: number
    name: string
    email: string
  }
  exam: {
    id: number
    name: string
    description: string
    grade: number
    examDate: string
  }
}

const UploadGradesSchema = z.object({
  file: z.any()
})

const ExamGrades = () => {
  const { examId } = useParams<{ examId: string }>()
  const [grades, setGrades] = useState<ExamGrade[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const form = useForm<z.infer<typeof UploadGradesSchema>>({
    resolver: zodResolver(UploadGradesSchema),
    defaultValues: {
      file: null
    }
  })

  const fetchGrades = async () => {
    setLoading(true)
    try {
      const res = await API.get('/exam-grades', {
        params: { examId }
      })
      setGrades(res.data)
    } catch (err) {
      toast.error('فشل في جلب الدرجات')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (data: z.infer<typeof UploadGradesSchema>) => {
    if (!data.file) return toast.error('يرجى رفع ملف الدرجات')

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('examId', examId || '')
      formData.append('gradesFile', data.file)

      await API.post('/exam-grades', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      toast.success('تم رفع ملف الدرجات بنجاح')
      fetchGrades()
    } catch (err) {
      toast.error('فشل في رفع الملف')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl mb-4">درجات الامتحان</CardTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpload)} className="flex flex-col md:flex-row gap-4 items-end">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملف الدرجات (Excel)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-600 text-white" disabled={uploading}>
              {uploading ? 'جاري الرفع...' : 'رفع الدرجات'}
            </Button>
          </form>
        </Form>

        <Button onClick={fetchGrades} className="mt-4 bg-our-orange text-white">
          عرض الدرجات
        </Button>
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
                  <TableHead className="text-right">درجة الطالب</TableHead>
                  <TableHead className="text-right">درجة الامتحان</TableHead>
                  <TableHead className="text-right">تاريخ الامتحان</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.length > 0 ? (
                  grades.map((grade, index) => (
                    <TableRow key={grade.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{grade.student.name}</TableCell>
                      <TableCell>{grade.student.email}</TableCell>
                      <TableCell>{grade.studentGrade}</TableCell>
                      <TableCell>{grade.exam.grade}</TableCell>
                      <TableCell>{new Date(grade.exam.examDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
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

export default ExamGrades
