import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const AddModerators = () => {
  return (
    <div>
      <Button
        variant={'noHover'}
        className='rounded-full bg-our-white-100 w-12 h-12 text-our-black text-base'
      >
        <Plus className='text-our-black [&_size]:size-5 ' />
      </Button>
    </div>
  )
}

export default AddModerators
