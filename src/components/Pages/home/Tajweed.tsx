import { Boy, Questions } from '@/assets'
import CartItem from './_components/CartItem'

const Tajweed = () => {
  const quranCards = [
    { image: Boy, title: 'عرض طلاب التجويد', href: '/tajweed' },
    { image: Questions, title: 'بنك الأسئلة للتجويد', href: '/tajweed-questions' },
  ]
  return (
    <div className='space-y-4'>
      <p className='text-black font-normal text-2xl'>التجويد</p>
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

export default Tajweed
