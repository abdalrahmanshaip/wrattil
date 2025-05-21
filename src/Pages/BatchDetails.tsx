import { Groups } from '@/components/Pages/Quran'
import { Layout } from '@/Layouts'
import { useParams } from 'react-router'

const BatchDetails = () => {
  const { id } = useParams()
  return (
    <Layout>
      <Groups />
    </Layout>
  )
}

export default BatchDetails
