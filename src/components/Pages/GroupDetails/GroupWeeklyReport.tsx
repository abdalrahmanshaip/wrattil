'use client'

import { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import API from '@/api'
import { useParams } from 'react-router-dom'

interface WeeklyGroupReportRowDTO {
  studentName: string
  studentEmail: string
  studentPhone: string
  totalStudentWarnings: string
  attendedLastLesson: string
  eljazariyyahQuizGrade: string
  tuhfatQuizGrade: string
  recitingCount: string
  warned: string
}

interface WeeklyGroupReportDTO {
  id: number
  reportDate: string
  rows: WeeklyGroupReportRowDTO[]
}

const GroupStudentsWeeklyReport = () => {
  const { groupId } = useParams<{ groupId: string }>()
  const [report, setReport] = useState<WeeklyGroupReportDTO | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>('')

  const handleShowReport = async () => {
    if (!selectedDate) {
      alert('الرجاء اختيار التاريخ')
      return
    }
    setLoading(true)
    try {
      const res = await API.get('/reports/weekly-group-reports', {
        params: {
          groupId,
          reportDate: selectedDate,
        },
      })
      setReport(res.data)
      console.log(res.data)
    } catch (error) {
      console.error(error)
      alert('فشل تحميل التقرير')
    } finally {
      setLoading(false)
    }
  }

const handleCreateReport = async () => {
  if (!selectedDate) {
    alert('الرجاء اختيار التاريخ')
    return
  }
  if (!groupId) {
    alert('الرجاء تحديد المجموعة')
    return
  }

  setLoading(true)
  try {
    const res = await API.post<WeeklyGroupReportDTO>(
      `/reports/weekly-group-reports`,
      {
        groupId: parseInt(groupId),
        reportDate: selectedDate,
      }
    )
    setReport(res.data)
  } catch (error) {
    console.error(error)
    alert('فشل إنشاء التقرير')
  } finally {
    setLoading(false)
  }
}


  const isTrue = (val: string | null | undefined) => val?.toLowerCase() === 'true'

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl mb-4">تقرير الطلاب الأسبوعي</CardTitle>
        <div className="flex gap-4 items-center flex-wrap mt-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          />
          <Button onClick={handleShowReport}>عرض التقرير</Button>
          <Button variant="secondary" onClick={handleCreateReport}>إنشاء تقرير</Button>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
          </div>
        ) : report && report.rows && report.rows.length > 0 ? (
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">م</TableHead>
                  <TableHead className="text-right">اسم الطالب</TableHead>
                  <TableHead className="text-right">البريد الإلكتروني</TableHead>
                  <TableHead className="text-right">رقم الجوال</TableHead>
                  <TableHead className="text-right">حضر الدرس الأخير؟</TableHead>
                  <TableHead className="text-right">درجة الجزرية</TableHead>
                  <TableHead className="text-right">درجة التحفة</TableHead>
                  <TableHead className="text-right">عدد التسميعات</TableHead>
                  <TableHead className="text-right">إنذار</TableHead>
                  <TableHead className="text-right">عدد الإنذارات الكلية</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.studentName || '-'}</TableCell>
                    <TableCell>{row.studentEmail || '-'}</TableCell>
                    <TableCell>{row.studentPhone || '-'}</TableCell>
                    <TableCell>{isTrue(row.attendedLastLesson) ? 'نعم' : 'لا'}</TableCell>
                    <TableCell>{row.eljazariyyahQuizGrade || '-'}</TableCell>
                    <TableCell>{row.tuhfatQuizGrade || '-'}</TableCell>
                    <TableCell>{row.recitingCount || '-'}</TableCell>
                    <TableCell>{isTrue(row.warned) ? 1 : 0}</TableCell>
                    <TableCell>{row.totalStudentWarnings || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4">لا توجد نتائج</div>
        )}
      </CardContent>
    </Card>
  )
}

export default GroupStudentsWeeklyReport
