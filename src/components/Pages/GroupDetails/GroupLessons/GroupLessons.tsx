import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Loader2, Pencil, Trash2, Eye, BookOpen } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import API from '@/api'
import LessonForm from './LessonForm'

interface Lesson {
  id: number
  teacherName: string
  lessonDateTime: string
}


const GroupLessons = () => {
  const { groupId } = useParams<{ groupId: string }>()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [page, setPage] = useState(0)
  const size = 10
  const [totalElements, setTotalElements] = useState(0)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [openDialogId, setOpenDialogId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editLesson, setEditLesson] = useState<Lesson | null>(null)

  const fetchLessons = async () => {
    try {
      const endpoint = `/lessons?groupId=${groupId}&page=${page}&size=${size}`
      const response = await API.get(endpoint)

      const data = response.data
      setLessons(data.content || data)
      setTotalElements(data.totalElements || data.length || 0)
    } catch (error) {
      console.error('Error fetching lessons:', error)
    }
  }

  useEffect(() => {
    fetchLessons()
  }, [page])

  const handleDelete = async (id: number) => {
    setDeletingId(id)
    try {
      await API.delete(`/lessons/${id}`)
      fetchLessons()
      setOpenDialogId(null)
    } catch (error) {
      console.error('Error deleting lesson:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleAddClick = () => {
    setEditLesson(null)
    setShowForm(true)
  }

  const handleEditClick = (lesson: Lesson) => {
    setEditLesson(lesson)
    setShowForm(true)
  }

  const handleSuccess = () => {
    fetchLessons()
    setShowForm(false)
    setEditLesson(null)
  }

  const start = page * size + 1
  const end = Math.min((page + 1) * size, totalElements)

  if (showForm) {
    return <LessonForm initialData={editLesson || undefined} onSuccess={handleSuccess} onCancel={() => setShowForm(false)} />
  }

  return (
    <Card dir="rtl">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">الدروس</CardTitle>
          <Button className="bg-our-orange text-white" onClick={handleAddClick}>
            إضافة درس جديد
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">اسم المعلم</TableHead>
                <TableHead className="text-center">التاريخ</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell>{lesson.teacherName}</TableCell>
                    <TableCell>{lesson.lessonDateTime}</TableCell>
                    <TableCell className="text-center space-x-2 rtl:space-x-reverse">
                      <Link to={`/groups/${groupId}/lessons/${lesson.id}`}>
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" onClick={() => handleEditClick(lesson)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog open={openDialogId === lesson.id} onOpenChange={(open) => setOpenDialogId(open ? lesson.id : null)}>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" className="text-red-500" disabled={deletingId === lesson.id}>
                            {deletingId === lesson.id ? (
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
                              هل أنت متأكد من حذف هذا الدرس؟ لا يمكن التراجع بعد الحذف.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <Button className="bg-red-600 text-white" onClick={() => handleDelete(lesson.id)} disabled={deletingId === lesson.id}>
                              {deletingId === lesson.id ? (
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
                  <TableCell colSpan={4} className="h-24 text-center">
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
              <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0} className="px-4 py-2 text-sm text-white bg-our-orange rounded-md hover:bg-our-orange/90 disabled:opacity-50">
                السابق
              </button>
              <button onClick={() => setPage((prev) => (end < totalElements ? prev + 1 : prev))} disabled={end >= totalElements} className="px-4 py-2 text-sm text-white bg-our-orange rounded-md hover:bg-our-orange/90 disabled:opacity-50">
                التالي
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GroupLessons
