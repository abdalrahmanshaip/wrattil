import DeletePopup from '@/components/Shared/DeletePopup'
import { BatchesProps } from '@/types'
import GroupCardItem from './GroupCardItem'

const GroupCards = ({ data }: { data: BatchesProps[] }) => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-4xl text-our-black'> المجموعات</h2>
        <DeletePopup
          className='rounded-full bg-our-white-100 w-12 h-12 text-our-black text-2xl'
          onConfirm={() => console.log(1)}
        />
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
        {data.map((item, index) => {
          return (
            <GroupCardItem
              data={item}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default GroupCards
