import { MoveLeft } from 'lucide-react'
import { Link } from 'react-router'

interface ItemProps {
  href: string
  image: string
  title: string
}

const CartItem = ({ item }: { item: ItemProps }) => {
  return (
    <Link
      to={item.href}
      className='rounded-2xl py-20 px-10 bg-our-white-100 flex items-center justify-between w-xl'
    >
      <div className='flex items-center gap-5'>
        <img
          src={item.image}
          alt={item.title}
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
}

export default CartItem
