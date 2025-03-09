import { BGBlue, BGGreen, BGOrange, BGPink, BGYellow } from '@/assets'
import UserStatusItem from './_components/UserStatusItem'

const UserStatus = () => {
  const statusData = [
    { image: BGBlue, number: 1320, color: 'text-our-blue', title: 'طالب' },
    { image: BGOrange, number: 34, color: 'text-our-orange', title: 'مسار' },
    { image: BGYellow, number: 690, color: 'text-our-yellow', title: 'مرحلة' },
    { image: BGGreen, number: 4400, color: 'text-our-green', title: 'مجموعة' },
    { image: BGPink, number: 44, color: 'text-our-pink', title: 'مشرف' },
  ]
  return (
    <div className='p-12 bg-our-white-100 flex gap-6 rounded-2xl w-full'>
      {statusData.map((item, index) => {
        return (
          <UserStatusItem
            key={index}
            item={item}
          />
        )
      })}
    </div>
  )
}

export default UserStatus
