import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

const QuranHeader = () => {
  return (
    <div className='flex justify-between items-center'>
      <p className='text-4xl text-our-black'>المجموعة الأولى</p>
      <Button
        variant={'noHover'}
        className='rounded-full bg-our-white-100 w-12 h-12 text-our-black text-base'
      >
        <Trash2 className='text-our-black [&_size]:size-5 ' />
      </Button>
    </div>
  )
}

export default QuranHeader
