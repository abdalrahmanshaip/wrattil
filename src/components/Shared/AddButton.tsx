import { PlusCircle } from 'lucide-react'
import { Button } from '../ui/button'

const AddButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <Button
      className='text-lg text-our-white-100 bg-our-brown-200 py-6 w-44 rounded-xl'
      variant={'noHover'}
      {...props}
    >
      <PlusCircle
        color='white'
        className='[&_svg]:size-6 me-2'
      />
      إضافة طالب
    </Button>
  )
}

export default AddButton
