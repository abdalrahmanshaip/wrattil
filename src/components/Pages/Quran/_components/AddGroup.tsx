import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import API from '@/api'

interface AddGroupProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  academicYearId: number
  onSuccess?: () => void
}

const daysOfWeek = [
  'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
]

interface Appointment {
  dayOfWeek: string
  startTime: string // format "HH:mm"
}

const AddGroup = ({ isOpen, setIsOpen, academicYearId, onSuccess }: AddGroupProps) => {
  const [title, setTitle] = useState('')
  const [dayOfWeek, setDayOfWeek] = useState('MONDAY')
  const [time, setTime] = useState('') // HH:mm
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Add appointment to list
  const addAppointment = () => {
    if (!time) return
    setAppointments((prev) => [...prev, { dayOfWeek, startTime: time }])
    setTime('') // reset time after adding
  }

  // Remove appointment by index
  const removeAppointment = (index: number) => {
    setAppointments((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || appointments.length === 0) return

    setIsLoading(true)
    try {
      // Prepare appointments with seconds '00'
      const formattedAppointments = appointments.map((a) => ({
        dayOfWeek: a.dayOfWeek,
        startTime: `${a.startTime}:00`,
      }))

      await API.post('/groups', {
        title,
        academicYearId,
        appointments: formattedAppointments,
      })

      // Reset form
      setTitle('')
      setAppointments([])
      setDayOfWeek('MONDAY')
      setTime('')
      setIsOpen(false)
      onSuccess && onSuccess()
    } catch (error) {
      console.error('Failed to add group:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right mt-4">إضافة مجموعة جديدة</DialogTitle>
          <DialogDescription className="text-right">
            أدخل اسم المجموعة الجديدة وأضف مواعيدها (يوم ووقت البداية)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input
            id="group-name"
            placeholder="اسم المجموعة"
            className="text-right"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="grid grid-cols-[2fr_3fr_1fr] items-center gap-2">
            <label className="text-right">يوم الموعد</label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="text-right p-2 rounded border border-gray-300"
              disabled={isLoading}
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            <Input
              type="time"
              className="text-right"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={isLoading}
            />
            <Button
              type="button"
              disabled={isLoading || !time}
              onClick={addAppointment}
              className="w-full col-span-3 bg-our-orange text-white"
            >
              إضافة موعد
            </Button>
          </div>

          {appointments.length > 0 && (
            <div className="space-y-2 mt-2">
              <p className="text-right font-semibold">المواعيد المضافة:</p>
              <ul className="text-right">
                {appointments.map((appt, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded"
                  >
                    <span>{`${appt.dayOfWeek} - ${appt.startTime}`}</span>
                    <button
                      type="button"
                      onClick={() => removeAppointment(index)}
                      className="text-red-600"
                      aria-label="حذف موعد"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                إلغاء
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isLoading || !title.trim() || appointments.length === 0}
              className="bg-our-orange text-white"
            >
              {isLoading ? 'جاري الإضافة...' : 'إضافة'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddGroup
