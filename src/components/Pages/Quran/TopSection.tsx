import {
  AddButton,
  SharedSelectItem,
  UploadFileButton,
} from '@/components/Shared'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Upload } from 'lucide-react'

const TopSection = () => {
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
    <div className='flex flex-wrap 2xl:flex-nowrap items-center gap-2.5'>
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
            {tracks.map((item, index) => {
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
            {groups.map((group, index) => {
              return (
                <SharedSelectItem
                  key={index}
                  group={group}
                />
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <UploadFileButton className='py-[32px]' />
      <Button
        className='text-lg text-our-white-100 bg-our-brown-200 py-[32px] w-44 rounded-xl'
        variant={'noHover'}
      >
        <Upload
          color='white'
          className='[&_svg]:size-6 me-2'
        />
        رفع درجات
      </Button>
      <AddButton className='py-[32px]' />
    </div>
  )
}

export default TopSection
