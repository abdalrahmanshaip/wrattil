import { QuranHeader, QuranTable, TopSection } from '@/components/Pages/Quran'
import { Layout } from '@/Layouts'
import { useParams } from 'react-router'

const GroupDetails = () => {
  const { id } = useParams()
  return (
    <Layout className='space-y-8'>
      <TopSection />
      <QuranHeader />
      <QuranTable />
    </Layout>
  )
}

export default GroupDetails
