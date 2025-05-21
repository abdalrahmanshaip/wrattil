import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts'

const data = [
  { name: 'A', value: 65, fill: '#e56399' },
  { name: 'B', value: 55, fill: '#1e69d9' },
  { name: 'C', value: 50, fill: '#f9c83a' },
]

const CircularProgressChart = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-64'>
      <ResponsiveContainer
        height={200}
        width={'100%'}
      >
        <RadialBarChart
          innerRadius='70%'
          outerRadius='100%'
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            background
            dataKey='value'
            cornerRadius={20}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className='absolute text-xl font-bold text-black'>150k</div>
    </div>
  )
}

export default CircularProgressChart
