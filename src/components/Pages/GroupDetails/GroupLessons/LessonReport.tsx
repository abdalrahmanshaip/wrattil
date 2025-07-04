'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader2 } from 'lucide-react'

interface GroupStudentReport {
  id: number
  groupId: number
  studentName: string
  attendedLastLesson: boolean
  recitingWithFriend: string
  eljazariyyahQuizGrade: number
  tuhfatQuizGrade: number
  recitingCount: number
  totalStudentWarnings: number
}

const GroupStudentsWeeklyReport = () => {
  const [data, setData] = useState<GroupStudentReport[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching from backend
    setTimeout(() => {
    setData([
      {
        id: 1073741824,
        groupId: 1073741824,
        studentName: "أحمد محمد",
        attendedLastLesson: true,
        recitingWithFriend: "علي",
        eljazariyyahQuizGrade: 9.5,
        tuhfatQuizGrade: 8.0,
        recitingCount: 5,
        totalStudentWarnings: 2
      },
      {
        id: 1073741825,
        groupId: 1073741824,
        studentName: "سارة أحمد",
        attendedLastLesson: false,
        recitingWithFriend: "منى",
        eljazariyyahQuizGrade: 7.0,
        tuhfatQuizGrade: 9.0,
        recitingCount: 3,
        totalStudentWarnings: 1
      },
      {
        id: 1073741826,
        groupId: 1073741824,
        studentName: "محمد سمير",
        attendedLastLesson: true,
        recitingWithFriend: "كريم",
        eljazariyyahQuizGrade: 10.0,
        tuhfatQuizGrade: 9.5,
        recitingCount: 6,
        totalStudentWarnings: 0
      },
      {
        id: 1073741827,
        groupId: 1073741824,
        studentName: "ريم خالد",
        attendedLastLesson: false,
        recitingWithFriend: "ندى",
        eljazariyyahQuizGrade: 6.0,
        tuhfatQuizGrade: 7.5,
        recitingCount: 4,
        totalStudentWarnings: 3
      },
      {
        id: 1073741828,
        groupId: 1073741824,
        studentName: "ياسين إبراهيم",
        attendedLastLesson: true,
        recitingWithFriend: "عبدالله",
        eljazariyyahQuizGrade: 8.5,
        tuhfatQuizGrade: 8.0,
        recitingCount: 7,
        totalStudentWarnings: 1
      }
    ])
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl mb-4">تقرير الطلاب الأسبوعي</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
          </div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">م</TableHead>
                  <TableHead className="text-right">اسم الطالب</TableHead>
                  <TableHead className="text-right">حضر الدرس الأخير؟</TableHead>
                  <TableHead className="text-right">تسميع مع صديق</TableHead>
                  <TableHead className="text-right">درجة الجزرية</TableHead>
                  <TableHead className="text-right">درجة التحفة</TableHead>
                  <TableHead className="text-right">عدد التسميعات</TableHead>
                  <TableHead className="text-right">عدد الإنذارات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  data.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{student.studentName}</TableCell>
                      <TableCell>{student.attendedLastLesson ? 'نعم' : 'لا'}</TableCell>
                      <TableCell>{student.recitingWithFriend}</TableCell>
                      <TableCell>{student.eljazariyyahQuizGrade}</TableCell>
                      <TableCell>{student.tuhfatQuizGrade}</TableCell>
                      <TableCell>{student.recitingCount}</TableCell>
                      <TableCell>{student.totalStudentWarnings}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      لا توجد نتائج
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GroupStudentsWeeklyReport
