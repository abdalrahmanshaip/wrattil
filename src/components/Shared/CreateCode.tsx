import { codeXml } from '@/assets'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import axios from 'axios'
import { Input } from '@/components/ui/input'
import { Copy } from 'lucide-react'

const CreateCode = () => {
  const [copied, setCopied] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText('asd')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const requestCode = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/registration-applications`
      )
      console.log('Code sent successfully')
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger asChild>
        <Button
          onClick={requestCode}
          className='items-center justify-start gap-3 p-3 py-8 text-start rounded-xl cursor-pointer transition-all font-semibold text-lg text-gray-700 hover:bg-our-brown-300/70 hover:text-white w-full'
        >
          <span className='ps-4 xl:flex hidden'>إنشاء كود تسجيل</span>
          <img
            className='xl:hidden flex mx-auto'
            src={codeXml || '/placeholder.svg'}
            alt='إنشاء كود تسجيل'
            width={25}
            height={25}
          />
        </Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-md'
        dir='rtl'
      >
        <DialogHeader dir='rtl'>
          <DialogTitle className='text-xl'>إنشاء كود تسجيل</DialogTitle>
          <DialogDescription>
            يمكنك نسخ الكود التالي واستخدامه للتسجيل في النظام
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-5 relative'>
          <Input />
          <Button
            className='bg-our-sec-gray absolute left-0 top-0  hover:bg-our-sec-gray/90 text-white'
            onClick={copyToClipboard}
          >
            <Copy />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default CreateCode
