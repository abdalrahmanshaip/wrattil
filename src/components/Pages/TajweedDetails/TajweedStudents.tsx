import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Trash2, Loader2 } from 'lucide-react'
import API from '@/api'

interface Student {
  id: number
  name: string
  phoneNumber: string
  email: string
  warningCount: number
}

const AddStudentSchema = z.object({
  studentEmail: z.string().email('يرجى إدخال بريد إلكتروني صحيح'),
})

const TajweedStudents = () => {
  const { tajweedId } = useParams<{ tajweedId: string }>()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<z.infer<typeof AddStudentSchema>>({
    resolver: zodResolver(AddStudentSchema),
    defaultValues: { studentEmail: '' },
  })

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await API.get(`/tajweed-training/${tajweedId}/students`)
      setStudents(res.data)
    } catch (error) {
      toast.error('فشل في تحميل الطلاب')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (tajweedId) fetchStudents()
  }, [tajweedId])

  const handleDelete = async (studentId: number) => {
    setDeleteLoadingId(studentId)
    setIsDeleting(true)
    try {
      await API.delete(`/tajweed-training/${tajweedId}/students/${studentId}`)
      setStudents((prev) => prev.filter((s) => s.id !== studentId))
      toast.success('تم حذف الطالب بنجاح')
    } catch (error) {
      toast.error('فشل في حذف الطالب')
    } finally {
      setDeleteLoadingId(null)
      setIsDeleting(false)
    }
  }

  const onSubmit = async (data: z.infer<typeof AddStudentSchema>) => {
    setIsAdding(true)
    try {
      await API.post(`/tajweed-training/${tajweedId}/students`, data)
      form.reset()
      toast.success('تمت إضافة الطالب بنجاح')
      fetchStudents()
    } catch (error) {
      toast.error('فشل في إضافة الطالب')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Card dir="rtl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">طلبة تدريب التجويد</CardTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-2 items-end"
            >
              <FormField
                control={form.control}
                name="studentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>إضافة طالب</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-our-orange text-white" disabled={isAdding}>
                {isAdding ? 'جارٍ الإضافة...' : 'إضافة'}
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">م</TableHead>
                  <TableHead className="text-right">اسم الطالب</TableHead>
                  <TableHead className="text-right">رقم الهاتف</TableHead>
                  <TableHead className="text-right">الإيميل</TableHead>
                  <TableHead className="text-right">الإنذارات</TableHead>
                  <TableHead className="text-center">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length > 0 ? (
                  students.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.phoneNumber}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.warningCount}</TableCell>
                      <TableCell className="text-center">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-500"
                              disabled={deleteLoadingId === student.id || isDeleting}
                            >
                              {deleteLoadingId === student.id ? (
                                <Loader2 className="animate-spin h-4 w-4" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                              <AlertDialogDescription>
                                هل تريد حذف هذا الطالب؟ لا يمكن التراجع.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <Button
                                className="bg-red-600 text-white"
                                onClick={() => handleDelete(student.id)}
                                disabled={deleteLoadingId === student.id || isDeleting}
                              >
                                {deleteLoadingId === student.id ? (
                                  <Loader2 className="animate-spin h-4 w-4" />
                                ) : (
                                  'حذف'
                                )}
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
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

export default TajweedStudents
