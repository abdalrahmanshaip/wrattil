import { Button } from '@/components/ui/button'
import { Edit2 } from 'lucide-react'

const EditModerators = () => {
  return (
    <div>
      <Button
        variant={'noHover'}
        className='rounded-full bg-our-white-100 w-12 h-12 text-our-black text-base'
      >
        <Edit2 className='text-our-black [&_size]:size-5 ' />
      </Button>
    </div>
  )
}

export default EditModerators
