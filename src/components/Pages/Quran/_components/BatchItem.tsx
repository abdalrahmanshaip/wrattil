import { Button } from '@/components/ui/button'
import { BatchesProps } from '@/types'
import { Edit2, Eye, Trash2 } from 'lucide-react'

const BatchItem = ({ group }: { group: BatchesProps }) => {
  return (
    <div className='bg-our-white-100 p-6 rounded-xl flex items-center justify-between'>
      <p className='font-medium text-xl text-our-black'>{group.name}</p>
      <div className='flex gap-1.5'>
        <Button
          className='bg-our-white-200 rounded-full flex items-center justify-center'
          size={'icon'}
        >
          <Eye
            size={20}
            className='[&_size]:size-5'
          />
        </Button>
        <Button
          className='bg-our-white-200 rounded-full   flex items-center justify-center'
          size={'icon'}
        >
          <Edit2
            size={20}
            className='[&_size]:size-5'
          />
        </Button>
        <Button
          className='bg-our-white-200 rounded-full   flex items-center justify-center'
          size={'icon'}
        >
          <Trash2
            size={20}
            className='[&_size]:size-5'
          />
        </Button>
      </div>
    </div>
  )
}

export default BatchItem
