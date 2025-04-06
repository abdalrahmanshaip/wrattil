import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

const DownloadButton = () => {
  return (
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
  )
}

export default DownloadButton
