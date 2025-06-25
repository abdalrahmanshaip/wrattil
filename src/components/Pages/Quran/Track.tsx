import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, Plus, Trash2, Loader2, Pencil } from 'lucide-react'
import { Link } from 'react-router-dom'
import API from '@/api'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { defultTrackValues, TrackSchema } from '@/schemas/TrackSchema'
import { ITrack } from '@/types'

type TrackFormData = z.infer<typeof TrackSchema>

const Track = () => {
  const [tracks, setTracks] = useState<ITrack[]>([])
  const [loading, setLoading] = useState(true)

  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const [editTrack, setEditTrack] = useState<{ id: number; title: string } | null>(null)
  
  const [addLoading, setAddLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null)

  const fetchTracks = async () => {
    setLoading(true)
    try {
      const res = await API.get('/quran-tracks')
      setTracks(res.data)
    } catch (err) {
      toast.error('فشل في تحميل المسارات')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTracks()
  }, [])

  // Add form
  const addForm = useForm<TrackFormData>({
    resolver: zodResolver(TrackSchema),
    defaultValues: defultTrackValues,
  })

  const onAddSubmit = async (data: TrackFormData) => {
    setAddLoading(true)
    try {
      await API.post('/quran-tracks', data)
      toast.success('تمت إضافة المسار')
      addForm.reset()
      setAddOpen(false)
      await fetchTracks()
    } catch (err) {
      toast.error('فشل في إضافة المسار')
    } finally {
      setAddLoading(false)
    }
  }

  // Edit form
  const editForm = useForm<TrackFormData>({
    resolver: zodResolver(TrackSchema),
    defaultValues: defultTrackValues,
  })

  const openEdit = (track: { id: number; title: string }) => {
    setEditTrack(track)
    editForm.reset({ title: track.title })
    setEditOpen(true)
  }

  const onEditSubmit = async (data: TrackFormData) => {
    if (!editTrack) return
    setEditLoading(true)
    try {
      await API.put(`/quran-tracks`, {quranTrackId:editTrack.id, title: data.title})
      toast.success('تم تحديث المسار')
      setEditOpen(false)
      await fetchTracks()
    } catch (err) {
      toast.error('فشل في التحديث')
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setDeleteLoadingId(id)
    try {
      await API.delete(`/quran-tracks/${id}`)
      toast.success('تم الحذف بنجاح')
      await fetchTracks()
    } catch (err) {
      toast.error('فشل في الحذف')
    } finally {
      setDeleteLoadingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* ✅ Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogTrigger asChild>
          <Button className="text-lg text-white bg-our-brown-200 py-8 rounded-xl lg:w-fit w-full">
            <div className="rounded-full bg-white text-black text-base">
              <Plus className="text-our-orange" size={20} />
            </div>
            إضافة مسار جديد
          </Button>
        </DialogTrigger>
        <DialogContent dir="rtl" className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>إضافة مسار جديد</DialogTitle>
            <DialogDescription>قم بإدخال اسم المسار الجديد</DialogDescription>
          </DialogHeader>
          <Form {...addForm}>
            <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
              <FormField
                control={addForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المسار</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={addLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-our-orange text-white" disabled={addLoading}>
                {addLoading ? 'جاري الإضافة...' : 'إضافة'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* ✅ Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent dir="rtl" className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل اسم المسار</DialogTitle>
            <DialogDescription>قم بتحديث اسم المسار</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المسار</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={editLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-our-orange text-white" disabled={editLoading}>
                {editLoading ? 'جاري التحديث...' : 'تحديث'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* ✅ Track List */}
      {loading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="bg-our-white-100 p-6 rounded-xl flex items-center justify-between"
            >
              <p className="font-medium text-xl text-our-black">{track.title}</p>
              <div className="flex gap-1.5">
                <Button className="bg-our-white-200 rounded-full" size="icon" asChild>
                  <Link to={`/quran/${track.id}/academic-years`}>
                    <Eye size={20} />
                  </Link>
                </Button>
                <Button
                  className="bg-our-white-200 rounded-full"
                  size="icon"
                  onClick={() => openEdit(track)}
                >
                  <Pencil size={20} />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="bg-our-white-200 rounded-full"
                      size="icon"
                      disabled={deleteLoadingId === track.id}
                    >
                      {deleteLoadingId === track.id ? (
                        <Loader2 className="animate-spin size-5" />
                      ) : (
                        <Trash2 size={20} />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-right">تأكيد الحذف</AlertDialogTitle>
                      <AlertDialogDescription className="text-right">
                        هل أنت متأكد أنك تريد حذف هذا المسار؟
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-row-reverse gap-2">
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleDelete(track.id)}
                        disabled={deleteLoadingId === track.id}
                      >
                        {deleteLoadingId === track.id && (
                          <Loader2 className="animate-spin size-4 mr-2" />
                        )}
                        حذف
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Track
