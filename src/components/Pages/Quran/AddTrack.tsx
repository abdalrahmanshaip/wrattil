import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const AddTrack = () => {
  return (
    <Button
      className='text-lg text-our-white-100 bg-our-brown-200 py-8 rounded-xl'
      size={'lg'}
      variant={'noHover'}
    >
      <div className='rounded-full bg-our-white-100   text-our-black text-base'>
        <Plus
          className='[&_size]:size-2 text-our-orange'
          size={20}
        />
      </div>
      إضافة مسار جديد
    </Button>
  )
}

export default AddTrack
