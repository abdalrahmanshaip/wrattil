import { CardItem } from '@/components/Shared'
import { Button } from '@/components/ui/button'
import { BatchesProps } from '@/types'
import { Trash2 } from 'lucide-react'

const Cards = ({ data, title, route }: { data: BatchesProps[]; title: string, route: string }) => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-4xl text-our-black'>{title}</h2>
        <Button
          variant={'noHover'}
          className='rounded-full bg-our-white-100 w-12 h-12 text-our-black text-base'
        >
          <Trash2 className='text-our-black [&_size]:size-5 ' />
        </Button>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
        {data.map((item, index) => {
          return (
            <CardItem
              data={item}
              key={index}
              route={route}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Cards
