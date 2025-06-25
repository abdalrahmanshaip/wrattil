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
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Trash2, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'

interface DeletePopupProps {
  onConfirm: () => Promise<void>
  className?: string
}

const DeletePopup = ({ onConfirm, className }: DeletePopupProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onConfirm()
      // ✅ Manually close the dialog by clicking cancel programmatically
      cancelRef.current?.click()
    } catch (error) {
      console.error('Failed to delete:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            'bg-our-white-200 rounded-full flex items-center justify-center',
            className
          )}
          size="icon"
        >
          <Trash2 size={20} className="[&_size]:size-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">تأكيد الحذف</AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            هل أنت متأكد من أنك تريد حذف هذا العنصر؟ لا يمكن التراجع عن هذا
            الإجراء.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row-reverse gap-2">
          <AlertDialogCancel
            ref={cancelRef}
            disabled={isDeleting}
            className="bg-gray-100 hover:bg-gray-200"
          >
            إلغاء
          </AlertDialogCancel>
          <Button
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleDelete}
          >
            {isDeleting && <Loader2 className="animate-spin size-4 mr-2" />}
            حذف
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePopup
