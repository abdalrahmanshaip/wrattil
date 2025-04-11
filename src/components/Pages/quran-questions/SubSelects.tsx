import { SharedSelectItem } from '@/components/Shared'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SubSelect = () => {
  const one = [{ name: 'الجزء الثاني والعشرون', id: 1 }]
  const two = [{ name: 'سورة يس', id: 1 }]
  const three = [{ name: 'الحزب 44', id: 1 }]
  const four = [{ name: 'الربع 4', id: 1 }]
  const five = [{ name: 'مستوى الصعوبة', id: 1 }]
  return (
    <div className='mt-4 grid  gap-4  xl:grid-cols-5 grid-cols-2'>
      <Select onValueChange={(value) => console.log(value)}>
        <SelectTrigger
          className='w-full bg-our-black text-white py-[30px] border-none '
          dir='rtl'
        >
          <SelectValue
            placeholder='القرأن الكريم'
            className='text-white'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup dir='rtl'>
            {one.map((item, index) => {
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
      <Select onValueChange={(value) => console.log(value)}>
        <SelectTrigger
          className='w-full bg-our-black text-white py-[30px] border-none '
          dir='rtl'
        >
          <SelectValue
            placeholder='القرأن الكريم'
            className='text-white'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup dir='rtl'>
            {three.map((item, index) => {
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
      <Select onValueChange={(value) => console.log(value)}>
        <SelectTrigger
          className='w-full bg-our-black text-white py-[30px] border-none '
          dir='rtl'
        >
          <SelectValue
            placeholder='القرأن الكريم'
            className='text-white'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup dir='rtl'>
            {two.map((item, index) => {
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
      <Select onValueChange={(value) => console.log(value)}>
        <SelectTrigger
          className='w-full bg-our-black text-white py-[30px] border-none '
          dir='rtl'
        >
          <SelectValue
            placeholder='القرأن الكريم'
            className='text-white'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup dir='rtl'>
            {four.map((item, index) => {
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
      <Select onValueChange={(value) => console.log(value)}>
        <SelectTrigger
          className='w-full bg-our-black text-white py-[30px] border-none xl:col-span-1 col-span-2'
          dir='rtl'
        >
          <SelectValue
            placeholder='القرأن الكريم'
            className='text-white'
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup dir='rtl'>
            {five.map((item, index) => {
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
    </div>
  )
}

export default SubSelect
