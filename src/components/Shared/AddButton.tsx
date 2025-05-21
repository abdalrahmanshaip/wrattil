import { PlusCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const AddButton: React.FC<AddButtonProps> = ({ className, ...props }) => {
  return (
    <Button
      className={cn(
        'text-lg text-our-white-100 bg-our-brown-200 py-6 w-44 rounded-xl',
        className
      )}
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
