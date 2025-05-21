import CircularProgressChart from './_components/CircularProgressChart'
import StatusProperty from './_components/StatusProperty'

const Chart = () => {
  const statusProperty = [
    { color: 'bg-our-yellow', title: 'طلاب القرآن الكريم', number: '75K' },
    { color: 'bg-our-blue', title: 'طلاب التجويد', number: '95K' },
    { color: 'bg-our-pink', title: 'طلاب منذرين', number: '120K' },
    { color: 'bg-our-black', title: 'المجموع', number: '150K' },
  ]
  return (
    <div className='bg-our-white-100 rounded-2xl flex flex-col gap-y-10 py-10 px-10'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <p className='w-2 h-2 bg-our-yellow rounded-full'></p>
          <p className='font-medium text-base text-our-black'>50%</p>
        </div>
        <div className='flex items-center gap-2'>
          <p className='w-2 h-2 bg-our-blue rounded-full'></p>
          <p className='font-medium text-base text-our-black'>55%</p>
        </div>
        <div className='flex items-center gap-2'>
          <p className='w-2 h-2 bg-our-pink rounded-full'></p>
          <p className='font-medium text-base text-our-black'>65%</p>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <CircularProgressChart />
      </div>
      <div className='space-y-8'>
        {statusProperty.map((item, index) => {
          return (
            <StatusProperty
              item={item}
              key={index}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Chart
