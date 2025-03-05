interface ItemProp {
  color: string
  title: string
  number: string
}
const StatusProperty = ({ item }: { item: ItemProp }) => {
  return (
    <div className='flex justify-between border-b border-our-black pb-8'>
      <div className='flex items-center gap-2'>
        <p className={`w-2 h-2 ${item.color} rounded-full`}></p>
        <p className='font-medium text-base text-our-black'>{item.title}</p>
      </div>
      <span className='font-medium text-our-black'>{item.number}</span>
    </div>
  )
}

export default StatusProperty
