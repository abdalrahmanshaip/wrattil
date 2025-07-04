import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

interface LessonReciting {
  id: number
  recitingDate: string
  notes: string
  student: {
    id: number
    name: string
    email: string
  }
}

const UploadSchema = z.object({
  file: z.any()
})

const LessonReciting = () => {
  const { lessonId } = useParams<{ lessonId: string }>()
  const [recitings, setRecitings] = useState<LessonReciting[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const form = useForm<z.infer<typeof UploadSchema>>({
    resolver: zodResolver(UploadSchema),
    defaultValues: {
      file: null
    }
  })

  const fetchRecitings = async () => {
    setLoading(true)
    try {
      const res = await API.get('/reciting', {
        params: {
          lessonId
        },
      })
      setRecitings(res.data)
    } catch (error) {
      toast.error('فشل في جلب التسميعات')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (data: z.infer<typeof UploadSchema>) => {
    if (!data.file) return toast.error('يرجى رفع ملف التسميع')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('lessonId', lessonId || '')
      formData.append('recitingFile', data.file)

      await API.post('/reciting', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      toast.success('تم رفع ملف التسميع بنجاح')
      fetchRecitings()
    } catch (error) {
      toast.error(error.message)
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    if (lessonId) fetchRecitings()
  }, [lessonId])

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl mb-4">سجل التسميع</CardTitle>
        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpload)} className="flex flex-col md:flex-row gap-4 items-end">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ملف التسميع (Excel)</FormLabel>
                    <FormControl>
                      <Input type="file" accept=".xlsx,.xls" onChange={(e) => field.onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-blue-600 text-white" disabled={uploading}>
                {uploading ? 'جاري الرفع...' : 'رفع التسميع'}
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
                  <TableHead className="text-right">البريد الإلكتروني</TableHead>
                  <TableHead className="text-right">تاريخ التسميع</TableHead>
                  <TableHead className="text-right">ملاحظات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recitings.length > 0 ? (
                  recitings.map((reciting, index) => (
                    <TableRow key={reciting.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{reciting.student.name}</TableCell>
                      <TableCell>{reciting.student.email}</TableCell>
                      <TableCell>{reciting.recitingDate}</TableCell>
                      <TableCell>{reciting.notes}</TableCell>
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

export default LessonReciting
