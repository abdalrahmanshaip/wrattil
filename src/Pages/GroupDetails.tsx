import { Groups } from '@/components/Pages/Quran'
import { Layout } from '@/Layouts'
import { useParams } from 'react-router'

const GroupDetails = () => {
  const { id } = useParams()
  return (
    <Layout>
      <Groups />
    </Layout>
  )
}

export default GroupDetails
