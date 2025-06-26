import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TajweedStudents from './TajweedStudents'
import TajweedAdmins from './TajweedAdmins'
import TajweedAttendance from './TajweedAttendance'

const TajweedTabs = () => {
  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-3xl font-medium text-right mb-6">التجويد</h1>

      <Tabs defaultValue="students" dir="rtl" className="w-full">
        <TabsList className="grid w-full max-w-4xl grid-cols-4 mb-8 gap-4">
          <TabsTrigger
            value="students"
            className="data-[state=active]:bg-our-orange data-[state=active]:text-white bg-gray-200 text-black py-3"
          >
            طلبة
          </TabsTrigger>
          <TabsTrigger
            value="admins"
            className="data-[state=active]:bg-our-orange data-[state=active]:text-white bg-gray-200 text-black py-3"
          >
            مشرفين
          </TabsTrigger>
          <TabsTrigger
            value="attendance"
            className="data-[state=active]:bg-our-orange data-[state=active]:text-white bg-gray-200 text-black py-3"
          >
            حضور
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-6">
          <TajweedStudents />
        </TabsContent>

        <TabsContent value="admins" className="mt-6">
          <TajweedAdmins />
        </TabsContent>

        <TabsContent value="attendance" className="mt-6">
          <TajweedAttendance />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TajweedTabs
