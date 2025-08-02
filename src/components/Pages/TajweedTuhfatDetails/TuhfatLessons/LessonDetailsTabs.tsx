import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import LessonAttendance from './LessonAttendance'

const LessonDetailsTabs = () => {
  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-3xl font-medium text-right mb-6">تفاصيل المجموعة</h1>

      <Tabs defaultValue="attendance" dir="rtl" className="w-full">
        <TabsList className="grid w-full max-w-4xl grid-cols-4 mb-8 gap-4">
          <TabsTrigger
            value="attendance"
            className="data-[state=active]:bg-our-orange data-[state=active]:text-white bg-gray-200 text-black py-3"
          >
            الحضور
          </TabsTrigger>
        </TabsList>


        <TabsContent value="attendance" className="mt-6">
          <LessonAttendance />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default LessonDetailsTabs