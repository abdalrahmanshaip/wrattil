'use client'

import { Pagination } from '@/components/Shared'
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
import { Search, Trash2 } from 'lucide-react'
import { useState } from 'react'

const initialAdmins = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phoneNumber: '0512345678',
  },
  {
    id: 2,
    name: 'محمد علي',
    email: 'mohammed@example.com',
    phoneNumber: '0598765432',
  },
  {
    id: 3,
    name: 'فاطمة أحمد',
    email: 'fatima@example.com',
    phoneNumber: '0567891234',
  },
]

const AdminList = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleDelete = (id: number) => {
    console.log(id)
  }

  return (
    <Card dir='rtl'>
      <CardHeader>
        <div className='relative w-full max-w-sm'>
          <Search className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
          <Input
            placeholder='بحث عن طالب...'
            className='pr-10'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-right'>الاسم</TableHead>
                <TableHead className='text-right'>البريد الإلكتروني</TableHead>
                <TableHead className='text-right'>رقم الهاتف</TableHead>
                <TableHead className='text-center'>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialAdmins.length > 0 ? (
                initialAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className='font-medium'>{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.phoneNumber}</TableCell>
                    <TableCell className='text-center'>
                      <div className='flex justify-center space-x-2'>
                        <Button
                          variant='outline'
                          size='icon'
                          className='text-red-500'
                          onClick={() => handleDelete(admin.id)}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className='h-24 text-center'
                  >
                    لا توجد نتائج
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination />
      </CardContent>
    </Card>
  )
}
export default AdminList
