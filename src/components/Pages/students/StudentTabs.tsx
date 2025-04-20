import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StudentForm from './StudentForm'
import StudentList from './StudentList'
const StudentTabs = () => {
  return (
    <div>
      <div className='container py-8 mx-auto'>
        <h1 className='text-3xl font-bold text-right mb-6'>إدارة الطلاب</h1>

        <Tabs
          defaultValue='list'
          dir='rtl'
          className='w-full'
        >
          <TabsList className='grid w-full max-w-md grid-cols-2 mb-8 gap-4'>
            <TabsTrigger
              value='list'
              className='data-[state=active]:bg-our-orange data-[state=active]:text-white bg-gray-200 text-black py-3'
            >
              قائمة الطلاب
            </TabsTrigger>
            <TabsTrigger
              value='create'
              className='data-[state=active]:bg-our-orange data-[state=active]:text-white bg-gray-200 text-black py-3'
            >
              إضافة طالب جديد
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value='list'
            className='mt-6'
          >
              <StudentList />
          </TabsContent>

          <TabsContent
            value='create'
            className='mt-6'
          >
            <StudentForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default StudentTabs
