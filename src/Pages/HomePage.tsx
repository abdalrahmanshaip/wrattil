import { Chart, Quran, Supervisor, Tajweed, UserStatus } from '@/components/Pages/Home'
import { Layout } from '@/Layouts'

const HomePage = () => {
  return (
    <Layout>
      <div className='flex 2xl:flex-row flex-col  gap-6'>
        <div className='space-y-10 w-full'>
          <UserStatus />
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
