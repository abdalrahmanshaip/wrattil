interface UserStatusProp {
  image: string
  title: string
  color: string
  number: number
}
const UserStatusItem = ({ item }: { item: UserStatusProp }) => {
  return (
    <div className='text-center flex flex-col justify-between items-center mx-auto'>
      <img
        src={item.image}
        width={50}
        alt={item.title}
      />
      <div>
        <p className={`font-semibold text-2xl ${item.color}`}>{item.number}</p>
        <p className='2xl:text-xl  font-medium text-our-gray'>{item.title}</p>
      </div>
    </div>
  )
}

export default UserStatusItem
