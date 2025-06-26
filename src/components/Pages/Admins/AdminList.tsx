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
import { Search, Ban, Loader2 } from 'lucide-react'
import API from '@/api'
import { toast } from 'sonner'

interface Admin {
  id: number
  name: string
  email: string
  phoneNumber: string
}

const AdminList = () => {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const size = 10
  const [totalElements, setTotalElements] = useState(0)
  const [blockingId, setBlockingId] = useState<number | null>(null)
  const [openDialogId, setOpenDialogId] = useState<number | null>(null)

  const fetchAdmins = async () => {
    try {
      const endpoint = searchTerm
        ? `/admins/search?searchTerm=${encodeURIComponent(searchTerm)}`
        : `/admins?page=${page}&size=${size}`
      const response = await API.get(endpoint)

      const data = response.data
      setAdmins(data.content || data)
      setTotalElements(data.totalElements || data.length || 0)
    } catch (error) {
      console.error('Error fetching admins:', error)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [page, searchTerm])

  const handleBlock = async (id: number) => {
    setBlockingId(id)
    try {
      await API.post(`/admins/${id}/block`)
      setOpenDialogId(null)
      toast.success('تم حذر المشرف بنجاح')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setBlockingId(null)
    }
  }

  const start = page * size + 1
  const end = Math.min((page + 1) * size, totalElements)

  return (
    <Card dir="rtl">
      <CardHeader>
        <CardTitle className="text-2xl">قائمة المشرفين</CardTitle>
        <div className="relative w-full max-w-sm">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="بحث عن مشرف..."
            className="pr-10"
            value={searchTerm}
            onChange={(e) => {
              setPage(0)
              setSearchTerm(e.target.value)
            }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">البريد الإلكتروني</TableHead>
                <TableHead className="text-right">رقم الهاتف</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell>{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.phoneNumber}</TableCell>
                    <TableCell className="text-center">
                      <AlertDialog open={openDialogId === admin.id} onOpenChange={(open) => setOpenDialogId(open ? admin.id : null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500"
                            disabled={blockingId === admin.id}
                          >
                            {blockingId === admin.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Ban className="h-4 w-4" />
                            )}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>تأكيد الحظر</AlertDialogTitle>
                            <AlertDialogDescription>
                              هل أنت متأكد أنك تريد حظر هذا المشرف؟ لن يتمكن من تسجيل الدخول.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <Button
                              className="bg-red-600 text-white"
                              onClick={() => handleBlock(admin.id)}
                              disabled={blockingId === admin.id}
                            >
                              {blockingId === admin.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                'تأكيد الحظر'
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
            <div className="flex space-x-2">
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

export default AdminList
