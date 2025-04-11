import { SelectItem } from '@/components/ui/select'
import { BatchesProps } from '@/types'

const SharedSelectItem = ({ group }: { group: BatchesProps }) => {
  return (
    <SelectItem
      value={group.name}
      className='text-our-black'
    >
      {group.name}
    </SelectItem>
  )
}

export default SharedSelectItem
