import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import API from '@/api'

interface AddBatchProps {
  onAddBatch: (batch: { id: number; name: string }) => void
  quranTrackId: number | null
}

const AddBatch = ({ onAddBatch, quranTrackId }: AddBatchProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    if (!quranTrackId) {
      alert('يرجى اختيار المسار أولاً')
      return
    }

    setIsLoading(true)
    try {
      const response = await API.post('/academic-years', {
        title,
        quranTrackId,
      })
      const newBatch = { id: response.data.id, name: title }
      onAddBatch(newBatch)
      setTitle('')
      setIsOpen(false)
    } catch (error) {
      console.error('فشل في إضافة السنة الأكاديمية:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-lg text-our-white-100 bg-our-brown-200 py-8 rounded-xl lg:w-fit w-full"
          size="lg"
          variant="noHover"
        >
          <div className="rounded-full bg-our-white-100 text-our-black text-base">
            <Plus className="[&_size]:size-2 text-our-orange" size={20} />
          </div>
          إضافة الفرقة
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right mt-4">إضافة فرقة جديدة</DialogTitle>
          <DialogDescription className="text-right">
            قم بإدخال اسم الفرقة الجديدة التي تريد إضافتها
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Input
              id="batch-name"
              placeholder="اسم الفرقة"
              className="text-right"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="w-full bg-our-orange text-white"
          >
            {isLoading ? 'جاري الإضافة...' : 'إضافة'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddBatch
