import { BGBlue, BGGreen, BGOrange, BGPink, BGYellow } from '@/assets'

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
          <div
            key={index}
            className='text-center flex flex-col justify-between items-center'
          >
            <img
              src={item.image}
              width={50}
              alt={item.title}
            />
            <div>
              <p className={`font-semibold text-2xl ${item.color}`}>
                {item.number}
              </p>
              <p className='text-xl font-medium text-our-gray'>{item.title}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UserStatus
