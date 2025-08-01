import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2, Eye, Loader2, Pencil } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
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

const weekdays = [
  { label: 'الاثنين', value: 'MONDAY' },
  { label: 'الثلاثاء', value: 'TUESDAY' },
  { label: 'الأربعاء', value: 'WEDNESDAY' },
  { label: 'الخميس', value: 'THURSDAY' },
  { label: 'الجمعة', value: 'FRIDAY' },
  { label: 'السبت', value: 'SATURDAY' },
  { label: 'الأحد', value: 'SUNDAY' },
]

const groupSchema = z.object({
  title: z.string().min(1),
  academicYearId: z.number(),
  teacherName: z.string().min(1),
  appointment: z.object({
    dayOfWeek: z.string(),
    startTime: z.string(),
  }),
})

type GroupFormValues = z.infer<typeof groupSchema>

interface IGroup {
  id: number
  title: string
  appointment: {
    dayOfWeek: string
    startTime: string // now "HH:mm:ss"
  }
  teacherName: string
}

const Groups = () => {
  const { academicYearId } = useParams<{ academicYearId: string }>()
  const academicYearIdNum = Number(academicYearId)

  const [groups, setGroups] = useState<IGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editGroup, setEditGroup] = useState<IGroup | null>(null)
  const [addLoading, setAddLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null)

  // Convert "HH:mm" -> "HH:mm:ss"
  const toBackendTime = (time: string) => `${time}:00`

  // Convert "HH:mm:ss" -> "HH:mm"
  const fromBackendTime = (time: string) => time.slice(0, 5)


  const fetchGroups = async () => {
    setLoading(true)
    try {
      const res = await API.get<IGroup[]>('/groups', {
        params: { academicYearId: academicYearIdNum },
      })
      setGroups(res.data)
    } catch (err) {
      toast.error('فشل في تحميل المجموعات')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (academicYearIdNum) fetchGroups()
  }, [academicYearIdNum])

  const addForm = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      title: '',
      teacherName: '',
      academicYearId: academicYearIdNum,
      appointment: { dayOfWeek: 'MONDAY', startTime: '00:00' },
    },
  })

  const editForm = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      title: '',
      teacherName: '',
      academicYearId: academicYearIdNum,
      appointment: { dayOfWeek: 'MONDAY', startTime: '00:00' },
    },
  })

  const onAddSubmit: SubmitHandler<GroupFormValues> = async (data) => {
  setAddLoading(true)
  try {
    await API.post('/groups', {
      title: data.title,
      academicYearId: data.academicYearId,
      teacherName: data.teacherName,
      appointment: {
        dayOfWeek: data.appointment.dayOfWeek,
        startTime: toBackendTime(data.appointment.startTime),
      },
    })
    toast.success('تمت إضافة المجموعة')
    setAddOpen(false)
    await fetchGroups()
    addForm.reset({
      title: '',
      academicYearId: academicYearIdNum,
      appointment: { dayOfWeek: 'MONDAY', startTime: '00:00' },
    })
  } catch {
    toast.error('فشل في الإضافة')
  } finally {
    setAddLoading(false)
  }
}

const onEditSubmit: SubmitHandler<GroupFormValues> = async (data) => {
  if (!editGroup) return
  setEditLoading(true)
  try {
    await API.put('/groups', {
      groupId: editGroup.id,
      title: data.title,
      teacherName: data.teacherName,
      appointment: {
        dayOfWeek: data.appointment.dayOfWeek,
        startTime: toBackendTime(data.appointment.startTime),
      },
    })
    toast.success('تم تعديل المجموعة')
    setEditOpen(false)
    await fetchGroups()
  } catch {
    toast.error('فشل في التعديل')
  } finally {
    setEditLoading(false)
  }
}

  const openEdit = (group: IGroup) => {
    setEditGroup(group)
    editForm.reset({
      title: group.title,
      academicYearId: academicYearIdNum,
      teacherName: group.teacherName,
      appointment: {
        dayOfWeek: group.appointment.dayOfWeek,
        startTime: fromBackendTime(group.appointment.startTime),
      },
    })
    setEditOpen(true)
  }


  const handleDelete = async (id: number) => {
    setDeleteLoadingId(id)
    try {
      await API.delete(`/groups/${id}`)
      toast.success('تم الحذف')
      await fetchGroups()
    } catch {
      toast.error('فشل في الحذف')
    } finally {
      setDeleteLoadingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogTrigger asChild>
          <Button className="text-lg bg-our-orange text-white py-8 rounded-xl w-full md:w-fit">
            <Plus className="mr-2" size={20} /> إضافة مجموعة
          </Button>
        </DialogTrigger>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>إضافة مجموعة</DialogTitle>
            <DialogDescription>أدخل تفاصيل المجموعة</DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
              <FormField control={addForm.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المجموعة</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={addForm.control} name="teacherName" render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المعلم</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={addForm.control} name="appointment.dayOfWeek" render={({ field }) => (
                <FormItem>
                  <FormLabel>اليوم</FormLabel>
                  <FormControl>
                    <select {...field} className="input w-full">
                      {weekdays.map((day) => (
                        <option key={day.value} value={day.value}>{day.label}</option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={addForm.control} name="appointment.startTime" render={({ field }) => (
                <FormItem>
                  <FormLabel>الوقت</FormLabel>
                  <FormControl><Input type="time" {...field} /></FormControl>
                </FormItem>
              )} />
              <Button type="submit" className="w-full bg-our-orange text-white" disabled={addLoading}>
                {addLoading ? 'جاري الإضافة...' : 'إضافة'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>تعديل المجموعة</DialogTitle>
            <DialogDescription>قم بتحديث تفاصيل المجموعة</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField control={editForm.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المجموعة</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={editForm.control} name="teacherName" render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المعلم</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />              
              <FormField control={editForm.control} name="appointment.dayOfWeek" render={({ field }) => (
                <FormItem>
                  <FormLabel>اليوم</FormLabel>
                  <FormControl>
                    <select {...field} className="input w-full">
                      {weekdays.map((day) => (
                        <option key={day.value} value={day.value}>{day.label}</option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={editForm.control} name="appointment.startTime" render={({ field }) => (
                <FormItem>
                  <FormLabel>الوقت</FormLabel>
                  <FormControl><Input type="time" {...field} /></FormControl>
                </FormItem>
              )} />
              <Button type="submit" className="w-full bg-our-orange text-white" disabled={editLoading}>
                {editLoading ? 'جاري التعديل...' : 'تعديل'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Group List */}
      {loading ? <p>جاري التحميل...</p> : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <div key={group.id} className="bg-white p-6 rounded-xl flex items-center justify-between shadow-sm">
              <p className="font-medium text-xl text-gray-800">{group.title}</p>
              <div className="flex gap-1.5">
                <Button className="bg-our-white-200 rounded-full" size="icon" asChild>
                  <Link to={`/groups/${group.id}`}><Eye size={20} /></Link>
                </Button>
                <Button className="bg-our-white-200 rounded-full" size="icon" onClick={() => openEdit(group)}>
                  <Pencil size={20} /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-our-white-200 rounded-full" size="icon" disabled={deleteLoadingId === group.id}>
                      {deleteLoadingId === group.id ? <Loader2 className="animate-spin size-5" /> : <Trash2 size={20} />}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                      <AlertDialogDescription>هل تريد حذف هذه المجموعة؟ لا يمكن التراجع.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <Button className="bg-red-600 text-white" onClick={() => handleDelete(group.id)}>حذف</Button>
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

export default Groups
