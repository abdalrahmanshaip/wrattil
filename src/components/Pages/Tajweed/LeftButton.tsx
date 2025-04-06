import {
  AddButton,
  DownloadButton,
  UploadFileButton,
} from '@/components/Shared'

const LeftButton = () => {
  return (
    <div className='space-x-2'>
      <UploadFileButton />
      <AddButton />
      <DownloadButton />
    </div>
  )
}

export default LeftButton
