import { Boy, Control } from '@/assets'
import CartItem from './_components/CartItem'

const Supervisor = () => {
  const quranCards = [
    { image: Control, title: 'عرض المشرفين', href: '/admins' },
    { image: Boy, title: 'عرض الطلبة', href: '/test' },
  ]
  return (
    <div className='space-y-4'>
      <p className='text-black font-normal text-2xl'>الإشراف</p>
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

export default Supervisor
