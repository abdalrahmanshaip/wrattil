import { Chart, Quran, Supervisor, Tajweed, UserStatus } from '@/components/Pages/Home'
import { Layout } from '@/Layouts'

const HomePage = () => {
  return (
    <Layout>
      <div className='flex 2xl:flex-row flex-col  gap-6'>
        <div className='space-y-10 w-full'>
          <Quran />
          <Tajweed />
          <Supervisor />
        </div>
        <div className='space-y-5'>
          <UserStatus />
          <Chart />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
