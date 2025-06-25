import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, Plus, Trash2, Loader2, Pencil } from 'lucide-react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import API from '@/api'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { AcademicYearSchema } from '@/schemas/AcademicYearSchema'
import { IAcademicYear } from '@/types'

type AcademicYearFormData = z.infer<typeof AcademicYearSchema>

const AcademicYears = () => {
  const { trackId } = useParams()
  const trackIdNum = Number(trackId)

  const [years, setYears] = useState<IAcademicYear[]>([])
  const [loading, setLoading] = useState(true)

  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const [editYear, setEditYear] = useState<{ id: number; title: string } | null>(null)
  const [addLoading, setAddLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null)

  const fetchYears = async () => {
    setLoading(true)
    try {
      const res = await API.get('/academic-years', {
        params: { quranTrackId: trackIdNum },
      })
      setYears(res.data)
    } catch (err) {
      toast.error('فشل في تحميل السنوات الدراسية')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (trackIdNum) fetchYears()
  }, [trackIdNum])

  const addForm = useForm<AcademicYearFormData>({
    resolver: zodResolver(AcademicYearSchema),
    defaultValues: {
      title: '',
      quranTrackId: trackIdNum,
    },
  })

  const onAddSubmit = async (data: AcademicYearFormData) => {
    setAddLoading(true)
    try {
      await API.post('/academic-years', data)
      toast.success('تمت إضافة السنة الدراسية')
      setAddOpen(false)
      addForm.reset({ title: '', quranTrackId: trackIdNum })
      await fetchYears()
    } catch (err) {
      toast.error('فشل في إضافة السنة الدراسية')
    } finally {
      setAddLoading(false)
    }
  }

  const editForm = useForm<AcademicYearFormData>({
    resolver: zodResolver(AcademicYearSchema),
    defaultValues: { title: '', quranTrackId: trackIdNum },
  })

  const openEdit = (year: { id: number; title: string }) => {
    setEditYear(year)
    editForm.reset({ title: year.title, quranTrackId: trackIdNum })
    setEditOpen(true)
  }

  const onEditSubmit = async (data: AcademicYearFormData) => {
    if (!editYear) return
    setEditLoading(true)
    try {
      await API.put('/academic-years', {
        academicYearId: editYear.id,
        title: data.title,
      })
      toast.success('تم تحديث السنة الدراسية')
      setEditOpen(false)
      await fetchYears()
    } catch (err) {
      toast.error('فشل في التحديث')
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setDeleteLoadingId(id)
    try {
      await API.delete(`/academic-years/${id}`)
      toast.success('تم الحذف بنجاح')
      await fetchYears()
    } catch (err) {
      toast.error('فشل في الحذف')
    } finally {
      setDeleteLoadingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* ➕ Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogTrigger asChild>
          <Button className="text-lg text-white bg-our-brown-200 py-8 rounded-xl lg:w-fit w-full">
            <div className="rounded-full bg-white text-black text-base">
              <Plus className="text-our-orange" size={20} />
            </div>
            إضافة سنة دراسية
          </Button>
        </DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إضافة سنة دراسية</DialogTitle>
            <DialogDescription>أدخل عنوان السنة الدراسية</DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
              <FormField
                control={addForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان السنة</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={addLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <input type="hidden" {...addForm.register('quranTrackId', { valueAsNumber: true })} />
              <Button type="submit" className="w-full bg-our-orange text-white" disabled={addLoading}>
                {addLoading ? 'جاري الإضافة...' : 'إضافة'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* ✏️ Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent dir="rtl" className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل السنة الدراسية</DialogTitle>
            <DialogDescription>قم بتحديث العنوان</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان السنة</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={editLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <input type="hidden" {...editForm.register('quranTrackId', { valueAsNumber: true })} />
              <Button type="submit" className="w-full bg-our-orange text-white" disabled={editLoading}>
                {editLoading ? 'جاري التحديث...' : 'تحديث'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* 📋 List */}
      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {years.map((year) => (
            <div
              key={year.id}
              className="bg-our-white-100 p-6 rounded-xl flex items-center justify-between"
            >
              <p className="font-medium text-xl text-our-black">{year.title}</p>
              <div className="flex gap-1.5">
                <Button className="bg-our-white-200 rounded-full" size="icon" asChild>
                  <Link to={`/academic-years/${year.id}`}>
                    <Eye size={20} />
                  </Link>
                </Button>
                <Button
                  className="bg-our-white-200 rounded-full"
                  size="icon"
                  onClick={() => openEdit(year)}
                >
                  <Pencil size={20} />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="bg-our-white-200 rounded-full"
                      size="icon"
                      disabled={deleteLoadingId === year.id}
                    >
                      {deleteLoadingId === year.id ? (
                        <Loader2 className="animate-spin size-5" />
                      ) : (
                        <Trash2 size={20} />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-right">تأكيد الحذف</AlertDialogTitle>
                      <AlertDialogDescription className="text-right">
                        هل أنت متأكد أنك تريد حذف هذه السنة؟
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-row-reverse gap-2">
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleDelete(year.id)}
                        disabled={deleteLoadingId === year.id}
                      >
                        {deleteLoadingId === year.id && (
                          <Loader2 className="animate-spin size-4 mr-2" />
                        )}
                        حذف
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AcademicYears
