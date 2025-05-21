import {
  AddButton,
  DownloadButton,
  UploadFileButton,
} from '@/components/Shared'

const LeftButton = () => {
  return (
    <div className='flex gap-2 flex-wrap'>
      <UploadFileButton />
      <AddButton />
      <DownloadButton />
    </div>
  )
}

export default LeftButton
