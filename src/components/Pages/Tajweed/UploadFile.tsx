import { Button } from '@/components/ui/button'
import { Download, PlusCircle, Upload } from 'lucide-react'

const UploadFile = () => {
  return (
    <div className='space-x-2'>
      <Button
        className='text-lg text-our-white-100 bg-our-brown-200 py-6 w-44 rounded-xl'
        variant={'noHover'}
      >
        <Upload
          color='white'
          className='[&_svg]:size-6 me-2'
        />
        رفع الغياب
      </Button>
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
      <Button
        className='text-lg text-our-white-100 bg-our-brown-200 py-6 w-44 rounded-xl'
        variant={'noHover'}
      >
        <Download
          color='white'
          className='[&_svg]:size-6 me-2'
        />
        تحميل
      </Button>
    </div>
  )
}

export default UploadFile
