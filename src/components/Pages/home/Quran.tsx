import { Questions, QuranBook } from '@/assets'
import CartItem from './_components/CartItem'

const Quran = () => {
  const quranCards = [
    { image: QuranBook, title: 'عرض طلاب القرآن الكريم', href: '/quran' },
    { image: Questions, title: 'بنك الأسئلة للقرآن الكريم', href: '/test' },
  ]
  return (
    <div className='space-y-4 '>
      <p className='text-black font-normal text-2xl'>القرآن الكريم</p>
      <div className='flex lg:flex-row flex-col items-center gap-4'>
        {quranCards.map((item, index) => {
          return (
            <CartItem
              key={index}
              item={item}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Quran
