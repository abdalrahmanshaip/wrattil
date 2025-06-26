import { Button } from '@/components/ui/button'
import { Edit2, Trash2 } from 'lucide-react'

const Questions = () => {
  return (
    <div className='mt-10 space-y-10'>
      <div className='flex justify-between items-center'>
      </div>
      <div className='bg-our-brown-100 flex items-center justify-between space-x-4 px-2 py-3 rounded-xl'>
        <div className=' flex items-center space-x-4'>
          <span className='bg-our-white-100 rounded-sm px-3.5 py-1 text-xl'>
            1
          </span>
          <p>كم رسول أرسل لأصحاب القرية؟</p>
        </div>
        <div className='space-x-2'>
          <Button
            variant={'noHover'}
            className='rounded-full bg-our-white-100 w-8 h-8 text-our-black text-base'
          >
            <Edit2
              className='text-our-black [&_size]:size-5 '
              size={20}
            />
          </Button>
          <Button
            variant={'noHover'}
            className='rounded-full bg-our-white-100 w-8 h-8 text-our-black text-base'
          >
            <Trash2
              className='text-our-black [&_size]:size-5 '
              size={20}
            />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Questions
