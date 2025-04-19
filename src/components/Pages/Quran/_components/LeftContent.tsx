import { Clock, Calendar, User } from 'lucide-react'

const LeftContent = () => {
  return (
    <div className=' py-3 px-4 flex xl:justify-between  items-center gap-10'>
      <div className='flex items-center gap-2 text-gray-600'>
        <User className='text-gray-500' size={30}/>
        <span className='text-sm font-medium'>566 طالب</span>
      </div>
      <div className='flex items-center gap-2 text-gray-600'>
        <Calendar className='text-gray-500' size={30}/>
        <span className='text-sm font-medium'>الأحد و الربيع</span>
      </div>

      <div className='flex items-center gap-2 text-gray-600'>
        <Clock className='text-gray-500' size={30}/>
        <span className='text-sm font-medium'>الساعة 5</span>
      </div>
    </div>
  )
}

export default LeftContent
