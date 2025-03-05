
const Chart = () => {
  return (
    <div className='bg-our-white-100 rounded-2xl flex flex-col gap-y-10 py-10 px-12'>
      <div className='flex justify-between items-center'>
        <div className="flex items-center gap-2">
          <p className='w-2 h-2 bg-our-yellow rounded-full'></p>
          <p className='font-medium text-base text-our-black'>50%</p>
        </div>
        <div className="flex items-center gap-2">
          <p className='w-2 h-2 bg-our-blue rounded-full'></p>
          <p className='font-medium text-base text-our-black'>55%</p>
        </div>
        <div className="flex items-center gap-2">
          <p className='w-2 h-2 bg-our-pink rounded-full'></p>
          <p className='font-medium text-base text-our-black'>65%</p>
        </div>
      </div>
      <div className="text-center py-36 rounded-full border-4 border-our-pink">
        <p className="font-bold text-2xl text-our-black">150k</p>
      </div>
    </div>
  )
}

export default Chart
