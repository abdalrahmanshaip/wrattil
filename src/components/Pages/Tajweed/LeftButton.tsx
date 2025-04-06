import { DownloadButton, UploadFileButton } from '@/components/Shared'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

const LeftButton = () => {
  return (
    <div className='space-x-2'>
      <UploadFileButton />
      <Button
        className='text-lg text-our-white-100 bg-our-brown-200 py-6 w-44 rounded-xl'
        variant={'noHover'}
      >
        <PlusCircle
          color='white'
          className='[&_svg]:size-6 me-2'
        />
        إضافة طالب
      </Button>
      <DownloadButton />
    </div>
  )
}

export default LeftButton
