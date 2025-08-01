import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GroupStudents from './GroupStudents'
import GroupAdmins from './GroupAdmins'
import GroupLessons from './GroupLessons/GroupLessons'
import GroupWeeklyReport from './GroupWeeklyReport'

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
            value="reports"
            className="data-[state=active]:bg-our-orange data-[state=active]:text-white bg-gray-200 text-black py-3"
          >
            تقارير
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="mt-6">
          <GroupLessons />
        </TabsContent>

        <TabsContent value="students" className="mt-6">
          <GroupStudents />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <GroupWeeklyReport />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default GroupDetailsTabs
