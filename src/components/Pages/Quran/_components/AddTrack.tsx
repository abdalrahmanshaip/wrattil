import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const AddTrack = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className='text-lg text-our-white-100 bg-our-brown-200 py-8 rounded-xl lg:w-fit w-full'
          size={'lg'}
          variant={'noHover'}
        >
          <div className='rounded-full bg-our-white-100 text-our-black text-base'>
            <Plus
              className='[&_size]:size-2 text-our-orange'
              size={20}
            />
          </div>
          إضافة مسار جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" dir='rtl'>
        <DialogHeader>
          <DialogTitle className="text-right mt-4">إضافة مسار جديد</DialogTitle>
          <DialogDescription className="text-right">
            قم بإدخال اسم المسار الجديد الذي تريد إضافته
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Input
              id="track-name"
              placeholder="اسم المسار"
              className="text-right"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddTrack
