import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Upload } from 'lucide-react'

interface UploadFileButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const UploadFileButton: React.FC<UploadFileButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <Button
      className={cn(
        'text-lg text-our-white-100 bg-our-brown-200 py-6 w-44 rounded-xl',
        className
      )}
      variant={'noHover'}
      {...props}
    >
      <Upload
        color='white'
        className='[&_svg]:size-6 me-2'
      />
      رفع الغياب
    </Button>
  )
}

export default UploadFileButton
