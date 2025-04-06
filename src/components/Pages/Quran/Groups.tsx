import { Button } from '@/components/ui/button'
import { GroupsProps } from '@/types'
import { Trash2 } from 'lucide-react'
import GroupItem from './_components/GroupItem'

const Groups = ({ groups }: { groups: GroupsProps[] }) => {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-4xl text-our-black'>المسار الرابع</h2>
        <Button
          variant={'noHover'}
          className='rounded-full bg-our-white-100 w-12 h-12 text-our-black text-base'
        >
          <Trash2 className='text-our-black [&_size]:size-5 ' />
        </Button>
      </div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
        {groups.map((group, index) => {
          return (
         <GroupItem group={group} key={index}/>
          )
        })}
    
      </div>
    </div>
  )
}

export default Groups
