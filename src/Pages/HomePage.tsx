import { Quran, Supervisor, Tajweed, UserStatus } from '@/components/Pages/home'
import { Layout } from '@/Layouts'

const HomePage = () => {
  return (
    <Layout>
      <div className='flex gap-6'>
        <div className='space-y-10'>
          <Quran />
          <Tajweed />
          <Supervisor />
        </div>
        <div>
          <UserStatus />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
