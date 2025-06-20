import { SharedSelectItem } from '@/components/Shared'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SubSelect = () => {
  const one = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `الجزء ${convertToArabicOrdinal(i + 1)}`
  }));

  function convertToArabicOrdinal(n) {
    const map = [
      'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس',
      'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر',
      'الحادي عشر', 'الثاني عشر', 'الثالث عشر', 'الرابع عشر', 'الخامس عشر',
      'السادس عشر', 'السابع عشر', 'الثامن عشر', 'التاسع عشر', 'العشرون',
      'الحادي والعشرون', 'الثاني والعشرون', 'الثالث والعشرون', 'الرابع والعشرون', 'الخامس والعشرون',
      'السادس والعشرون', 'السابع والعشرون', 'الثامن والعشرون', 'التاسع والعشرون', 'الثلاثون'
    ];
    return map[n - 1];
  }
  const two = [
    { id: 1, name: 'سورة الفاتحة' },
    { id: 2, name: 'سورة البقرة' },
    { id: 3, name: 'سورة آل عمران' },
    { id: 4, name: 'سورة النساء' },
    { id: 5, name: 'سورة المائدة' },
    { id: 6, name: 'سورة الأنعام' },
    { id: 7, name: 'سورة الأعراف' },
    { id: 8, name: 'سورة الأنفال' },
    { id: 9, name: 'سورة التوبة' },
    { id: 10, name: 'سورة يونس' },
    { id: 11, name: 'سورة هود' },
    { id: 12, name: 'سورة يوسف' },
    { id: 13, name: 'سورة الرعد' },
    { id: 14, name: 'سورة إبراهيم' },
    { id: 15, name: 'سورة الحجر' },
    { id: 16, name: 'سورة النحل' },
    { id: 17, name: 'سورة الإسراء' },
    { id: 18, name: 'سورة الكهف' },
    { id: 19, name: 'سورة مريم' },
    { id: 20, name: 'سورة طه' },
    { id: 21, name: 'سورة الأنبياء' },
    { id: 22, name: 'سورة الحج' },
    { id: 23, name: 'سورة المؤمنون' },
    { id: 24, name: 'سورة النور' },
    { id: 25, name: 'سورة الفرقان' },
    { id: 26, name: 'سورة الشعراء' },
    { id: 27, name: 'سورة النمل' },
    { id: 28, name: 'سورة القصص' },
    { id: 29, name: 'سورة العنكبوت' },
    { id: 30, name: 'سورة الروم' },
    { id: 31, name: 'سورة لقمان' },
    { id: 32, name: 'سورة السجدة' },
    { id: 33, name: 'سورة الأحزاب' },
    { id: 34, name: 'سورة سبأ' },
    { id: 35, name: 'سورة فاطر' },
    { id: 36, name: 'سورة يس' },
    { id: 37, name: 'سورة الصافات' },
    { id: 38, name: 'سورة ص' },
    { id: 39, name: 'سورة الزمر' },
    { id: 40, name: 'سورة غافر' },
    { id: 41, name: 'سورة فصلت' },
    { id: 42, name: 'سورة الشورى' },
    { id: 43, name: 'سورة الزخرف' },
    { id: 44, name: 'سورة الدخان' },
    { id: 45, name: 'سورة الجاثية' },
    { id: 46, name: 'سورة الأحقاف' },
    { id: 47, name: 'سورة محمد' },
    { id: 48, name: 'سورة الفتح' },
    { id: 49, name: 'سورة الحجرات' },
    { id: 50, name: 'سورة ق' },
    { id: 51, name: 'سورة الذاريات' },
    { id: 52, name: 'سورة الطور' },
    { id: 53, name: 'سورة النجم' },
    { id: 54, name: 'سورة القمر' },
    { id: 55, name: 'سورة الرحمن' },
    { id: 56, name: 'سورة الواقعة' },
    { id: 57, name: 'سورة الحديد' },
    { id: 58, name: 'سورة المجادلة' },
    { id: 59, name: 'سورة الحشر' },
    { id: 60, name: 'سورة الممتحنة' },
    { id: 61, name: 'سورة الصف' },
    { id: 62, name: 'سورة الجمعة' },
    { id: 63, name: 'سورة المنافقون' },
    { id: 64, name: 'سورة التغابن' },
    { id: 65, name: 'سورة الطلاق' },
    { id: 66, name: 'سورة التحريم' },
    { id: 67, name: 'سورة الملك' },
    { id: 68, name: 'سورة القلم' },
    { id: 69, name: 'سورة الحاقة' },
    { id: 70, name: 'سورة المعارج' },
    { id: 71, name: 'سورة نوح' },
    { id: 72, name: 'سورة الجن' },
    { id: 73, name: 'سورة المزمل' },
    { id: 74, name: 'سورة المدثر' },
    { id: 75, name: 'سورة القيامة' },
    { id: 76, name: 'سورة الإنسان' },
    { id: 77, name: 'سورة المرسلات' },
    { id: 78, name: 'سورة النبأ' },
    { id: 79, name: 'سورة النازعات' },
    { id: 80, name: 'سورة عبس' },
    { id: 81, name: 'سورة التكوير' },
    { id: 82, name: 'سورة الإنفطار' },
    { id: 83, name: 'سورة المطففين' },
    { id: 84, name: 'سورة الإنشقاق' },
    { id: 85, name: 'سورة البروج' },
    { id: 86, name: 'سورة الطارق' },
    { id: 87, name: 'سورة الأعلى' },
    { id: 88, name: 'سورة الغاشية' },
    { id: 89, name: 'سورة الفجر' },
    { id: 90, name: 'سورة البلد' },
    { id: 91, name: 'سورة الشمس' },
    { id: 92, name: 'سورة الليل' },
    { id: 93, name: 'سورة الضحى' },
    { id: 94, name: 'سورة الشرح' },
    { id: 95, name: 'سورة التين' },
    { id: 96, name: 'سورة العلق' },
    { id: 97, name: 'سورة القدر' },
    { id: 98, name: 'سورة البينة' },
    { id: 99, name: 'سورة الزلزلة' },
    { id: 100, name: 'سورة العاديات' },
    { id: 101, name: 'سورة القارعة' },
    { id: 102, name: 'سورة التكاثر' },
    { id: 103, name: 'سورة العصر' },
    { id: 104, name: 'سورة الهمزة' },
    { id: 105, name: 'سورة الفيل' },
    { id: 106, name: 'سورة قريش' },
    { id: 107, name: 'سورة الماعون' },
    { id: 108, name: 'سورة الكوثر' },
    { id: 109, name: 'سورة الكافرون' },
    { id: 110, name: 'سورة النصر' },
    { id: 111, name: 'سورة المسد' },
    { id: 112, name: 'سورة الإخلاص' },
    { id: 113, name: 'سورة الفلق' },
    { id: 114, name: 'سورة الناس' }
  ];

  const three = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    name: `الحزب ${i + 1}`
  }));

  const four = Array.from({ length: 240 }, (_, i) => ({
    id: i + 1,
    name: `الربع ${i + 1}`
  }));

  const five = [
    { id: 1, name: 'سهل' },
    { id: 2, name: 'متوسط' },
    { id: 3, name: 'صعب' }
  ];

  return (
    <div className='mt-4 grid  gap-4  xl:grid-cols-5 grid-cols-2'>
      <Select onValueChange={(value) => console.log(value)}>
        <SelectTrigger
          className='w-full bg-our-black text-white py-[30px] border-none '
          dir='rtl'
        >
          <SelectValue
            placeholder='الجزء'
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
            placeholder='الحزب'
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
            placeholder='السورة'
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
            placeholder='الربع'
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
            placeholder='الصعوبة'
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
