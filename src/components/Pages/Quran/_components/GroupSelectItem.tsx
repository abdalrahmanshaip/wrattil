import { SelectItem } from '@/components/ui/select'
import { GroupsProps } from '@/types'

const GroupSelectItem = ({ group }: { group: GroupsProps }) => {
  return (
    <SelectItem
      value={group.name}
      className='text-our-black'
    >
      {group.name}
    </SelectItem>
  )
}

export default GroupSelectItem
