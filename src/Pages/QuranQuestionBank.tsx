import {
  MainSelect,
  SubSelects,
  Questions,
  Answers,
  CreateQuestion,
} from '@/components/Pages/quran-questions'
import { Layout } from '@/Layouts'

const QuranQuestionBank = () => {
  return (
    <Layout>
      <MainSelect />
      <SubSelects />
      <Questions />
      <Answers />
      <CreateQuestion />
    </Layout>
  )
}

export default QuranQuestionBank
