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

interface Admin {
  id: number
  name: string
  phoneNumber: string
  email: string
}

const AddAdminSchema = z.object({
  adminEmail: z.string().email('يرجى إدخال بريد إلكتروني صحيح'),
})

const TajweedAdmins = () => {
  const { tajweedId } = useParams<{ tajweedId: string }>()
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<z.infer<typeof AddAdminSchema>>({
    resolver: zodResolver(AddAdminSchema),
    defaultValues: { adminEmail: '' },
  })

  const fetchAdmins = async () => {
    setLoading(true)
    try {
      const res = await API.get(`/tajweed-training/${tajweedId}/admins`)
      setAdmins(res.data)
    } catch (error) {
      console.error('Error fetching admins:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (tajweedId) fetchAdmins()
  }, [tajweedId])

  const handleDelete = async (adminId: number) => {
    setDeleteLoadingId(adminId)
    setIsDeleting(true)
    try {
      await API.delete(`/tajweed-training/${tajweedId}/admins/${adminId}`)
      setAdmins((prev) => prev.filter((a) => a.id !== adminId))
      toast.success('تم حذف المشرف بنجاح')
    } catch (error) {
      toast.error('فشل في حذف المشرف')
    } finally {
      setDeleteLoadingId(null)
      setIsDeleting(false)
    }
  }

  const onSubmit = async (data: z.infer<typeof AddAdminSchema>) => {
    setIsAdding(true)
    try {
      await API.post(`/tajweed-training/${tajweedId}/admins`, data)
      form.reset()
      toast.success('تمت إضافة المشرف بنجاح')
      fetchAdmins()
    } catch (error) {
      toast.error('فشل في إضافة المشرف')
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Card dir="rtl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">مشرفو تدريب التجويد</CardTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-2 items-end"
            >
              <FormField
                control={form.control}
                name="adminEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>إضافة مشرف</FormLabel>
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
                  <TableHead className="text-right">اسم المشرف</TableHead>
                  <TableHead className="text-right">رقم الهاتف</TableHead>
                  <TableHead className="text-right">الإيميل</TableHead>
                  <TableHead className="text-center">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.length > 0 ? (
                  admins.map((admin, index) => (
                    <TableRow key={admin.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{admin.name}</TableCell>
                      <TableCell>{admin.phoneNumber}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell className="text-center">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-500"
                              disabled={deleteLoadingId === admin.id || isDeleting}
                            >
                              {deleteLoadingId === admin.id ? (
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
                                هل تريد حذف هذا المشرف؟ لا يمكن التراجع.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>إلغاء</AlertDialogCancel>
                              <Button
                                className="bg-red-600 text-white"
                                onClick={() => handleDelete(admin.id)}
                                disabled={deleteLoadingId === admin.id || isDeleting}
                              >
                                {deleteLoadingId === admin.id ? (
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

export default TajweedAdmins
