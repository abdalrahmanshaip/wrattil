'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Search, Loader2, Pencil, Trash2, ListOrdered } from 'lucide-react'
import { Link } from 'react-router-dom'
import API from '@/api'
import ExamForm from './ExamForm'

interface Exam {
  id: number
  title: string
  description: string
  grade: number
  examDate: string
}

const ExamList = () => {
  const [exams, setExams] = useState<Exam[]>([])
  const [page, setPage] = useState(0)
  const size = 10
  const [totalElements, setTotalElements] = useState(0)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [openDialogId, setOpenDialogId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editExam, setEditExam] = useState<Exam | null>(null)

  const fetchExams = async () => {
    try {
      const endpoint = `/exams?page=${page}&size=${size}`
      const response = await API.get(endpoint)

      const data = response.data
      setExams(data.content || data)
      setTotalElements(data.totalElements || data.length || 0)
    } catch (error) {
      console.error('Error fetching exams:', error)
    }
  }

  useEffect(() => {
    fetchExams()
  }, [page])

  const handleDelete = async (id: number) => {
    setDeletingId(id)
    try {
      await API.delete(`/exams/${id}`)
      fetchExams()
      setOpenDialogId(null)
    } catch (error) {
      console.error('Error deleting exam:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleAddClick = () => {
    setEditExam(null)
    setShowForm(true)
  }

  const handleEditClick = (exam: Exam) => {
    setEditExam(exam)
    setShowForm(true)
  }

  const handleSuccess = () => {
    fetchExams()
    setShowForm(false)
    setEditExam(null)
  }

  if (showForm) {
    return (
      <ExamForm
        initialData={editExam || undefined}
        onSuccess={handleSuccess}
        onCancel={() => setShowForm(false)}
      />
    )
  }

  const start = page * size + 1
  const end = Math.min((page + 1) * size, totalElements)

  return (
    <Card dir="rtl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">قائمة الامتحانات</CardTitle>
          <Button className="bg-our-orange text-white" onClick={handleAddClick}>
            إضافة امتحان جديد
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">الوصف</TableHead>
                <TableHead className="text-right">الدرجة</TableHead>
                <TableHead className="text-center">التاريخ</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>{exam.title}</TableCell>
                    <TableCell>{exam.description}</TableCell>
                    <TableCell>{exam.grade}</TableCell>
                    <TableCell>{exam.examDate}</TableCell>
                    <TableCell className="text-center space-x-2 rtl:space-x-reverse">
                      <Link to={`/exams/${exam.id}/grades`}>
                        <Button variant="outline" size="icon">
                          <ListOrdered className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditClick(exam)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog open={openDialogId === exam.id} onOpenChange={(open) => setOpenDialogId(open ? exam.id : null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500"
                            disabled={deletingId === exam.id}
                          >
                            {deletingId === exam.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                            <AlertDialogDescription>
                              هل أنت متأكد من حذف هذا الامتحان؟ لا يمكن التراجع بعد الحذف.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <Button
                              className="bg-red-600 text-white"
                              onClick={() => handleDelete(exam.id)}
                              disabled={deletingId === exam.id}
                            >
                              {deletingId === exam.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                'تأكيد الحذف'
                              )}
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    لا توجد نتائج
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              عرض {start}-{end} من {totalElements} نتيجة
            </p>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
                className="px-4 py-2 text-sm text-white bg-our-orange rounded-md hover:bg-our-orange/90 disabled:opacity-50"
              >
                السابق
              </button>
              <button
                onClick={() =>
                  setPage((prev) => (end < totalElements ? prev + 1 : prev))
                }
                disabled={end >= totalElements}
                className="px-4 py-2 text-sm text-white bg-our-orange rounded-md hover:bg-our-orange/90 disabled:opacity-50"
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ExamList