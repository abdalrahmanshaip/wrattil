import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Pencil, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Link} from 'react-router-dom'
import API from '@/api'
import { toast } from 'sonner'

const weekdays = [
  { label: 'الاثنين', value: 'MONDAY' },
  { label: 'الثلاثاء', value: 'TUESDAY' },
  { label: 'الأربعاء', value: 'WEDNESDAY' },
  { label: 'الخميس', value: 'THURSDAY' },
  { label: 'الجمعة', value: 'FRIDAY' },
  { label: 'السبت', value: 'SATURDAY' },
  { label: 'الأحد', value: 'SUNDAY' },
]

const simpleCourseSchema = z.object({
  title: z.string().min(1, 'مطلوب'),
  appointment: z.object({
    dayOfWeek: z.string().min(1, 'مطلوب'),
    startTime: z.string().min(1, 'مطلوب'),
  }),
})

type SimpleCourseForm = z.infer<typeof simpleCourseSchema>

type TajweedCourse = SimpleCourseForm & {
  id: number // from API
}

export default function Tajweed() {
  const [jazariyyah, setJazariyyah] = useState<TajweedCourse | null>(null)
  const [tuhfat, setTuhfat] = useState<TajweedCourse | null>(null)
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [editCourse, setEditCourse] = useState<'JAZARIYYAH' | 'TUHFAT' | null>(null)
  const [editLoading, setEditLoading] = useState(false)

  const editForm = useForm<SimpleCourseForm>({
    resolver: zodResolver(simpleCourseSchema),
    defaultValues: {
      title: '',
      appointment: {
        dayOfWeek: 'MONDAY',
        startTime: '',
      },
    },
  })

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const [jazRes, tuhRes] = await Promise.all([
        API.get('/al-jazariyyah-courses'),
        API.get('/tuhfat-courses'),
      ])
      setJazariyyah(jazRes.data)
      setTuhfat(tuhRes.data)
    } catch {
      toast.error('فشل تحميل الدورات')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const openEdit = (type: 'JAZARIYYAH' | 'TUHFAT') => {
    const course = type === 'JAZARIYYAH' ? jazariyyah : tuhfat
    if (!course) return
    editForm.reset({
      title: course.title,
      appointment: {
        dayOfWeek: course.appointment.dayOfWeek,
        startTime: course.appointment.startTime.slice(0, 5),
      },
    })
    setEditCourse(type)
    setEditOpen(true)
  }

  const onSubmit: SubmitHandler<SimpleCourseForm> = async (data) => {
    if (!editCourse) return
    setEditLoading(true)
    try {
      const endpoint =
        editCourse === 'JAZARIYYAH'
          ? '/al-jazariyyah-courses'
          : '/tuhfat-courses'

      const body = {
        ...data,
      [editCourse === 'JAZARIYYAH' ? 'alJazariyyahCourseId' : 'tuhfatCourseId']:
        editCourse === 'JAZARIYYAH' ? jazariyyah!.id : tuhfat!.id,
      }    
      await API.put(endpoint, body)
      toast.success('تم التعديل بنجاح')
      setEditOpen(false)
      fetchCourses()
    } catch {
      toast.error('فشل في التعديل')
    } finally {
      setEditLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>تعديل الدورة</DialogTitle>
            <DialogDescription>قم بتحديث البيانات الخاصة بالدورة</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={editForm.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={editForm.control} name="appointment.startTime" render={({ field }) => (
                <FormItem>
                  <FormLabel>الوقت</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full bg-our-orange text-white" disabled={editLoading}>
                {editLoading ? 'جاري التعديل...' : 'تعديل'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {loading ? <p>جاري التحميل...</p> : (
        <div className="grid lg:grid-cols-2 gap-4">
          {jazariyyah && (
            <div className="bg-white p-6 rounded-xl flex justify-between items-center shadow-sm">
              <div>
                <p className="font-bold text-xl text-gray-800">{jazariyyah.title}</p>
                <p className="text-sm text-gray-500">{weekdays.find(w => w.value === jazariyyah.appointment.dayOfWeek)?.label} - {jazariyyah.appointment.startTime}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/tajweed/alJazariyyah/${jazariyyah.id}`}>
                  <Button className="bg-our-white-200 rounded-full" size="icon">
                    <Eye size={20} />
                  </Button>
                </Link>
                <Button className="bg-our-white-200 rounded-full" size="icon" onClick={() => openEdit('JAZARIYYAH')}>
                  <Pencil size={20} />
                </Button>
              </div>
            </div>
          )}
          {tuhfat && (
            <div className="bg-white p-6 rounded-xl flex justify-between items-center shadow-sm">
              <div>
                <p className="font-bold text-xl text-gray-800">{tuhfat.title}</p>
                <p className="text-sm text-gray-500">{weekdays.find(w => w.value === tuhfat.appointment.dayOfWeek)?.label} - {tuhfat.appointment.startTime}</p>
              </div>
              <div className="flex gap-2">
                 <Link to={`/tajweed/tuhfat/${tuhfat.id}`}>
                  <Button className="bg-our-white-200 rounded-full" size="icon">
                    <Eye size={20} />
                  </Button>
                </Link>
                <Button className="bg-our-white-200 rounded-full" size="icon" onClick={() => openEdit('TUHFAT')}>
                  <Pencil size={20} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
