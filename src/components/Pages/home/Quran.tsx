import { Questions, QuranBook } from '@/assets'
import { MoveLeft } from 'lucide-react'
import { Link } from 'react-router'

const Quran = () => {
  const quranCards = [
    { image: QuranBook, title: 'عرض طلاب القرآن الكريم', href: '/test' },
    { image: Questions, title: 'بنك الأسئلة للقرآن الكريم', href: '/test' },
  ]
  return (
    <div className='space-y-6'>
      <p className='text-black font-normal text-2xl'>القرآن الكريم</p>
      <div className='flex items-center gap-4'>
        {quranCards.map((item, index) => {
          return (
            <Link
              to={item.href}
              key={index}
              className='rounded-2xl py-20 px-10 bg-our-white-100 flex items-center justify-between gap-32'
            >
              <div className='flex items-center gap-5'>
                <img
                  src={item.image}
                  alt='القرآن الكريم'
                  width={60}
                  height={60}
                />
                <p className='text-2xl text-our-black'>{item.title}</p>
              </div>
              <MoveLeft
                className='mt-4'
                size={24}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Quran
