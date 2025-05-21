import { SharedSelectItem } from '@/components/Shared'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const MainSelect = () => {
  const data = [{ name: 'القرأن الكريم', id: 1 }]
  return (
      <Select onValueChange={(value) => console.log(value)}>
        <SelectTrigger
          className='w-full bg-our-brown-400 text-white py-[30px] border-none '
          dir='rtl'
        >
          <SelectValue
            placeholder='القرأن الكريم'
            className='text-white'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup dir='rtl'>
            {data.map((item, index) => {
              return (
                <SharedSelectItem
                  key={index}
                  group={item}
                />
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}

export default MainSelect
