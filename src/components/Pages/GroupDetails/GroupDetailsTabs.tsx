import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GroupStudents from './GroupStudents'
import GroupAdmins from './GroupAdmins'
import GroupAttendance from './GroupAttendance'
import GroupLessons from './GroupLessons/GroupLessons'

const GroupDetailsTabs = () => {
  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-3xl font-medium text-right mb-6">تفاصيل المجموعة</h1>

      <Tabs defaultValue="lessons" dir="rtl" className="w-full">
        <TabsList className="grid w-full max-w-4xl grid-cols-4 mb-8 gap-4">
          <TabsTrigger
            value="lessons"
            className="data-[state=active]:bg-our-orange data-[state=active]:text-white bg-gray-200 text-black py-3"
          >
            حلقات
          </TabsTrigger>
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
        </TabsList>

        <TabsContent value="lessons" className="mt-6">
          <GroupLessons />
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <GroupStudents />
        </TabsContent>

        <TabsContent value="admins" className="mt-6">
          <GroupAdmins />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default GroupDetailsTabs
