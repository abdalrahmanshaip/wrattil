import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { Cards, SharedSelectItem } from '@/components/Shared'
const Groups = () => {
  const tracks = [
    { name: 'المسار الأول', id: 1 },
    { name: 'المسار الثاني', id: 2 },
    { name: 'المسار الثالث', id: 3 },
    { name: 'المسار الرابع', id: 4 },
  ]
  const batches = [
    { name: 'الفرقة الأول', id: 1 },
    { name: 'الفرقة الثاني', id: 2 },
    { name: 'الفرقة الثالث', id: 3 },
    { name: 'الفرقة الرابع', id: 4 },
  ]
  const groups = [
    { name: 'المجموعة الأول', id: 1 },
    { name: 'المجموعة الثاني', id: 2 },
    { name: 'المجموعة الثالث', id: 3 },
    { name: 'المجموعة الرابع', id: 4 },
  ]
  return (
    <div className='space-y-6'>
      <div className='flex gap-1.5 items-center lg:flex-row flex-col'>
        <Select onValueChange={(value) => console.log(value)}>
          <SelectTrigger
            className='w-full bg-our-black text-white py-[30px] border-none '
            dir='rtl'
          >
            <SelectValue
              placeholder='أختر المسار'
              className='text-white'
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup dir='rtl'>
              {tracks.map((track, index) => {
                return (
                  <SharedSelectItem
                    key={index}
                    group={track}
                  />
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => console.log(value)}>
          <SelectTrigger
            className='w-full bg-our-brown-400 text-white py-[30px] border-none '
            dir='rtl'
          >
            <SelectValue
              placeholder='أختر الفرقة'
              className='text-white'
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup dir='rtl'>
              {batches.map((batch, index) => {
                return (
                  <SharedSelectItem
                    key={index}
                    group={batch}
                  />
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Cards
        data={groups}
        title='الفرقة الأولى'
        route='group'
      />
      <Button
        className='text-lg text-our-white-100 bg-our-brown-200 py-8 w-full rounded-xl'
        size={'lg'}
        variant={'noHover'}
      >
        <div className='rounded-full bg-our-white-100   text-our-black text-base'>
          <Plus
            className='[&_size]:size-2 text-our-orange'
            size={20}
          />
        </div>
        إضافة مجموعة
      </Button>
    </div>
  )
}

export default Groups
