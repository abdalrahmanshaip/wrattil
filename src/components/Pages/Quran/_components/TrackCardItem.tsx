import DeletePopup from '@/components/Shared/DeletePopup'
import { Button } from '@/components/ui/button'
import { BatchesProps } from '@/types'
import { Edit2, Eye } from 'lucide-react'
import { Link } from 'react-router'

interface TrackCardItemProps {
  data: BatchesProps
  quranTrackId?: number | null
}

const TrackCardItem = ({ data, quranTrackId }: TrackCardItemProps) => {
  // Build URL with query param if quranTrackId is present
  const linkTo = quranTrackId
    ? `/quran/batch/${data.id}?quranTrackId=${quranTrackId}`
    : `/quran/batch/${data.id}`

  return (
    <div className='bg-our-white-100 p-6 rounded-xl flex items-center justify-between'>
      <p className='font-medium text-xl text-our-black'>{data.name}</p>
      <div className='flex gap-1.5'>
        <Button
          className='bg-our-white-200 rounded-full flex items-center justify-center'
          size={'icon'}
          asChild
        >
          <Link to={linkTo}>
            <Eye size={20} className='[&_size]:size-5' />
          </Link>
        </Button>
        <Button
          className='bg-our-white-200 rounded-full flex items-center justify-center'
          size={'icon'}
        >
          <Edit2 size={20} className='[&_size]:size-5' />
        </Button>
        <DeletePopup onConfirm={() => console.log(data.id)} />
      </div>
    </div>
  )
}

export default TrackCardItem
