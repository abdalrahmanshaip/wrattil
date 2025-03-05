import { Quran, Supervisor, Tajweed } from '@/components/Pages/home'
import { Layout } from '@/Layouts'

const HomePage = () => {
  return (
    <Layout>
      <div className='space-y-10'>
        <Quran />
        <Tajweed />
        <Supervisor />
      </div>
    </Layout>
  )
}

export default HomePage
