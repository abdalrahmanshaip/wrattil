'use client'

import { useState } from 'react'
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
import { Search, Trash2, Loader2 } from 'lucide-react'
import API from '@/api'
import { toast } from 'sonner'

interface Student {
  id: number
  name: string
  phoneNumber: string
  email: string
}

interface Warning {
  id: number
  reason: string
  student: Student
  createdAt: string
}

const WarningsList = () => {
  const [warnings, setWarnings] = useState<Warning[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingId, setLoadingId] = useState<number | null>(null)
  const [openDialogId, setOpenDialogId] = useState<number | null>(null)

  const fetchWarnings = async () => {
    if (!searchTerm.trim()) {
      toast.warning('يرجى إدخال بريد إلكتروني أولاً')
      return
    }

    setLoading(true)
    try {
      const response = await API.get(`/warnings?studentEmail=${encodeURIComponent(searchTerm.trim())}`)
      setWarnings(response.data || [])
    } catch (error) {
      toast.error('فشل في تحميل التحذيرات')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setLoadingId(id)
    try {
      await API.delete(`/warnings/${id}`)
      setWarnings((prev) => prev.filter((w) => w.id !== id))
      toast.success('تم حذف التحذير بنجاح')
    } catch (error) {
      toast.error('فشل في حذف التحذير')
    } finally {
      setLoadingId(null)
      setOpenDialogId(null)
    }
  }

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    const pad = (n: number) => n.toString().padStart(2, '0')

    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl">قائمة التحذيرات</CardTitle>
        <div className="flex gap-2 max-w-md items-center">
          <div className="relative w-full">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="أدخل بريد الطالب الإلكتروني..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={fetchWarnings} disabled={loading} className="bg-our-orange text-white h-10">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'عرض التحذيرات'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">اسم الطالب</TableHead>
                <TableHead className="text-right">البريد الإلكتروني</TableHead>
                <TableHead className="text-right">رقم الهاتف</TableHead>
                <TableHead className="text-right">السبب</TableHead>
                <TableHead className="text-right">تاريخ الإنشاء</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warnings.length > 0 ? (
                warnings.map((warning) => (
                  <TableRow key={warning.id}>
                    <TableCell>{warning.student.name}</TableCell>
                    <TableCell>{warning.student.email}</TableCell>
                    <TableCell>{warning.student.phoneNumber}</TableCell>
                    <TableCell>{warning.reason}</TableCell>
                    <TableCell>{formatDate(warning.createdAt)}</TableCell>
                    <TableCell className="text-center">
                      <AlertDialog open={openDialogId === warning.id} onOpenChange={(open) => setOpenDialogId(open ? warning.id : null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500"
                            disabled={loadingId === warning.id}
                          >
                            {loadingId === warning.id ? (
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
                              هل أنت متأكد من حذف هذا التحذير؟
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <Button
                              className="bg-red-600 text-white"
                              onClick={() => handleDelete(warning.id)}
                              disabled={loadingId === warning.id}
                            >
                              {loadingId === warning.id ? (
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
                  <TableCell colSpan={6} className="h-24 text-center">
                    لا توجد نتائج
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default WarningsList
