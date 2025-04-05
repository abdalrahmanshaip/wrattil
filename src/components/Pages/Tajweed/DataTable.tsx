import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table'

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table'

import { Pencil, Trash2, Eye } from 'lucide-react'
import UploadFile from './UploadFile'
import Moderators from './Moderators'

// ✅ تعريف نوع البيانات
type Student = {
  id: number
  name: string
  phone: string
  email: string
  attendance: string
  Warnings: number
  grades: string
  lastSessions: boolean[]
}

const data: Student[] = [
  {
    id: 1,
    name: 'رحمة محمد محمود إسماعيل',
    phone: '01234567890',
    email: 'rahma2012@gmail.com',
    attendance: '80%',
    Warnings: 0,
    grades: '90%',
    lastSessions: [true, false, true, false, true],
  },
  {
    id: 2,
    name: 'محمد إسماعيل محمود',
    phone: '01234567890',
    email: 'mohammed22@gmail.com',
    attendance: '80%',
    Warnings: 1,
    grades: '50%',
    lastSessions: [false, true, true, false, true],
  },
  {
    id: 3,
    name: 'أسماء سمير عبدالله',
    phone: '01551845496',
    email: 'asmaasamir6699@gmail.com',
    attendance: '100%',
    Warnings: 0,
    grades: '100%',
    lastSessions: [true, true, true, true, true],
  },
  {
    id: 4,
    name: 'زياد ياسر',
    phone: '01069829323',
    email: 'ziad123@gmail.com',
    attendance: '80%',
    Warnings: 0,
    grades: '90%',
    lastSessions: [true, false, true, true, false],
  },
  {
    id: 5,
    name: 'مريم أحمد حسين',
    phone: '01125489632',
    email: 'mariam.ahmed@gmail.com',
    attendance: '95%',
    Warnings: 0,
    grades: '85%',
    lastSessions: [true, true, false, true, true],
  },
  {
    id: 6,
    name: 'خالد عبد الرحمن سعيد',
    phone: '01012345678',
    email: 'khaled.saied@gmail.com',
    attendance: '70%',
    Warnings: 2,
    grades: '65%',
    lastSessions: [false, true, false, true, false],
  },
  {
    id: 7,
    name: 'ياسمين محمود عادل',
    phone: '01298765432',
    email: 'yasmin.adel@gmail.com',
    attendance: '85%',
    Warnings: 1,
    grades: '80%',
    lastSessions: [true, false, true, false, true],
  },
  {
    id: 8,
    name: 'نور محمد السيد',
    phone: '01555678901',
    email: 'noor.sayed@gmail.com',
    attendance: '90%',
    Warnings: 0,
    grades: '88%',
    lastSessions: [true, true, true, false, true],
  },
  {
    id: 9,
    name: 'حسن إبراهيم علي',
    phone: '01056789012',
    email: 'hassan.ali@gmail.com',
    attendance: '60%',
    Warnings: 3,
    grades: '55%',
    lastSessions: [false, false, true, false, true],
  },
  {
    id: 10,
    name: 'فاطمة عبد الله حسن',
    phone: '01234567899',
    email: 'fatma.hassan@gmail.com',
    attendance: '98%',
    Warnings: 0,
    grades: '95%',
    lastSessions: [true, true, true, true, true],
  },
]

// ✅ تعديل تعريف الأعمدة
const columns: ColumnDef<Student>[] = [
  { accessorKey: 'id', header: () => 'م' },
  { accessorKey: 'name', header: () => 'اسم الطالب' },
  { accessorKey: 'phone', header: () => 'رقم الهاتف' },
  { accessorKey: 'email', header: () => 'الإيميل' },
  { accessorKey: 'attendance', header: () => 'نسبة الحضور' },
  { accessorKey: 'Warnings', header: () => 'الإنذارات' },
  { accessorKey: 'grades', header: () => 'نسبة الدرجات' },
  {
    accessorKey: 'lastSessions',
    header: () => 'غياب آخر 5 جلسات',
    cell: ({ row }) => (
      <div className='flex gap-1 justify-center'>
        {row.original.lastSessions.map((status: boolean, index: number) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              status ? 'bg-green-500' : 'bg-pink-500'
            }`}
          />
        ))}
      </div>
    ),
  },
  {
    id: 'actions', // ✅ هنا يجب تحديد `id` بدلًا من `accessorKey`
    header: () => 'خيارات',
    cell: () => (
      <div className='flex gap-2 justify-center'>
        <button className='text-[#1E1E1E] bg-gray-200 hover:text-gray-700 rounded-full p-2'>
          <Eye size={16} />
        </button>
        <button className='text-[#1E1E1E] bg-gray-200 hover:text-blue-700 rounded-full p-2'>
          <Pencil size={16} />
        </button>
        <button className='text-[#1E1E1E] bg-gray-200 hover:text-red-700 rounded-full p-2'>
          <Trash2 size={16} />
        </button>
      </div>
    ),
  },
]

export function DataTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <Moderators />
        <UploadFile />
      </div>
      <div className='rounded-lg border border-gray-300 shadow-sm p-4'>
        <Table>
          <TableHeader className='bg-[#F1DDD3] text-center'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className='px-4 py-2 text-center font-semibold'
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='text-center'>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className='text-center'
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className='px-4 py-2 text-center border-t'
                  >
                    {flexRender(
                      cell.column.columnDef.cell ?? String(cell.getValue()),
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable
