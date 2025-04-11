import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const CreateQuestion = () => {
  return (
    <Button
      className='text-lg text-our-white-100 bg-our-brown-200 py-8 w-full rounded-xl mt-6'
      size={'lg'}
      variant={'noHover'}
    >
      <div className='rounded-full bg-our-white-100   text-our-black text-base'>
        <Plus
          className='[&_size]:size-2 text-our-orange'
          size={20}
        />
      </div>
      أضف سؤال
    </Button>
  )
}

export default CreateQuestion
