import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Trash2 } from 'lucide-react'

interface DeletePopupProps {
  onConfirm: () => void
  className?: string
}

const DeletePopup = ({ onConfirm, className }: DeletePopupProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            'bg-our-white-200 rounded-full   flex items-center justify-center',
            className
          )}
          size={'icon'}
        >
          <Trash2
            size={20}
            className='[&_size]:size-5'
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-right'>تأكيد الحذف</AlertDialogTitle>
          <AlertDialogDescription className='text-right'>
            هل أنت متأكد من أنك تريد حذف هذا العنصر؟ لا يمكن التراجع عن هذا
            الإجراء.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex-row-reverse gap-2'>
          <AlertDialogCancel className='bg-gray-100 hover:bg-gray-200'>
            إلغاء
          </AlertDialogCancel>
          <AlertDialogAction
            className='bg-red-600 hover:bg-red-700 text-white'
            onClick={onConfirm}
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePopup
