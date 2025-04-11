import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Download } from 'lucide-react'

interface DownloadButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
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
      <Download
        color='white'
        className='[&_svg]:size-6 me-2'
      />
      تحميل
    </Button>
  )
}

export default DownloadButton
