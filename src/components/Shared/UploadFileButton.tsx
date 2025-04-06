import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

const UploadFileButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  return (
    <Button
      className='text-lg text-our-white-100 bg-our-brown-200 py-6 w-44 rounded-xl'
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
