import { useEffect, useState } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import API from '@/api'
import { toast } from 'sonner'
import { tajweedSchema } from '@/schemas/TajweedSchema'
import { ITajweed } from '@/types'

const weekdays = [
  { label: 'الاثنين', value: 'MONDAY' },
  { label: 'الثلاثاء', value: 'TUESDAY' },
  { label: 'الأربعاء', value: 'WEDNESDAY' },
  { label: 'الخميس', value: 'THURSDAY' },
  { label: 'الجمعة', value: 'FRIDAY' },
  { label: 'السبت', value: 'SATURDAY' },
  { label: 'الأحد', value: 'SUNDAY' },
]

type TajweedFormValues = z.infer<typeof tajweedSchema>

const Tajweed = () => {
  const [tajweeds, setTajweeds] = useState<ITajweed[]>([])
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [editTajweed, setEditTajweed] = useState<ITajweed | null>(null)
  const [editLoading, setEditLoading] = useState(false)

  const fetchTajweeds = async () => {
    setLoading(true)
    try {
      const res = await API.get('/tajweed-training')
      setTajweeds(res.data)
    } catch {
      toast.error('فشل في تحميل البيانات')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTajweeds()
  }, [])

  const editForm = useForm<TajweedFormValues>({
    resolver: zodResolver(tajweedSchema),
    defaultValues: {
      title: '',
      appointments: [],
    },
  })

  const editAppointments = useFieldArray({
    control: editForm.control,
    name: 'appointments',
  })

  const openEdit = (tajweed: ITajweed) => {
    const formattedAppointments = tajweed.appointments.map((a) => ({
      dayOfWeek: a.dayOfWeek,
      startTime: a.startTime.slice(0, 5) // Ensures it's in HH:mm
    }))

    setEditTajweed(tajweed)
    editForm.reset({
      title: tajweed.title,
      appointments: formattedAppointments
    })
    setEditOpen(true)
  }


  const onEditSubmit: SubmitHandler<TajweedFormValues> = async (data) => {
    if (!editTajweed) return
    setEditLoading(true)
    try {
      await API.put('/tajweed-training', {
        tajweedTrainingId: editTajweed.tajweedTrainingId,
        title: data.title,
        appointments: data.appointments,
      })
      toast.success('تم التعديل بنجاح')
      setEditOpen(false)
      fetchTajweeds()
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
            <DialogTitle>تعديل تدريب التجويد</DialogTitle>
            <DialogDescription>قم بتحديث التفاصيل</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField control={editForm.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {editAppointments.fields.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-end">
                  <FormField control={editForm.control} name={`appointments.${index}.dayOfWeek`} render={({ field }) => (
                    <FormItem className="flex-1">
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
                  <FormField control={editForm.control} name={`appointments.${index}.startTime`} render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>الوقت</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )} />
                  <Button type="button" variant="ghost" onClick={() => editAppointments.remove(index)}>
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => editAppointments.append({ dayOfWeek: 'MONDAY', startTime: '' })}>+ موعد</Button>
              <Button type="submit" className="w-full bg-our-orange text-white" disabled={editLoading}>
                {editLoading ? 'جاري التعديل...' : 'تعديل'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {loading ? <p>جاري التحميل...</p> : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {tajweeds.map((tajweed) => (
            <div key={tajweed.tajweedTrainingId} className="bg-white p-6 rounded-xl flex items-center justify-between shadow-sm">
              <p className="font-medium text-xl text-gray-800">{tajweed.title}</p>
              <div className="flex gap-1.5">
                <Button className="bg-our-white-200 rounded-full" size="icon" asChild>
                  <Link to={`/tajweed/${tajweed.tajweedTrainingId}`}><Eye size={20} /></Link>
                </Button>
                <Button className="bg-our-white-200 rounded-full" size="icon" onClick={() => openEdit(tajweed)}>
                  <Pencil size={20} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Tajweed
