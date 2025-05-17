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
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Check, Copy } from 'lucide-react'
import API from '@/api'

const CreateCode = () => {
  const [copied, setCopied] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [code, setCode] = useState('')

  const copyToClipboard = () => {
    if (!code) return
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const requestCode = async () => {
    try {
      const response = await API.post('/registration-applications')
      const generatedId = response.data?.id
      if (generatedId) {
        setCode(generatedId.toString())
        console.log('Code generated:', generatedId)
      }
    } catch (error) {
      console.error('Error creating registration code:', error)
    }
  }

  // Auto request code when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      requestCode()
    } else {
      setCode('')
    }
  }, [isDialogOpen])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsDialogOpen(true)}
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
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl'>إنشاء كود تسجيل</DialogTitle>
          <DialogDescription>
            يمكنك نسخ الكود التالي واستخدامه لتسجيل الطلبه
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-5 relative'>
          <Input value={code} readOnly />
          <Button
            className={`absolute left-0 top-0 text-white ${
              copied ? 'bg-our-green' : 'bg-our-sec-gray hover:bg-our-sec-gray/90'
            }`}
            onClick={copyToClipboard}
            disabled={!code}
          >
            {copied ? <Check /> : <Copy />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCode
