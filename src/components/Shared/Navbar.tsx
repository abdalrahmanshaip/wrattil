import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@/assets' // Make sure path is correct
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function Navbar() {
  const [email, setEmail] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedEmail = localStorage.getItem('email')
    setEmail(storedEmail)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login') // Redirect to login page
  }

  return (
    <header className='w-full bg-transparent flex items-center justify-between mt-2'>
      <p className='xl:text-xl text-base'>مساء الخير يا أستاذة </p>

      <div className='relative max-w-xl'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='flex items-center gap-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 p-1 rounded-2xl bg-white'>
              <span className='text-xs text-gray-700 font-medium px-2 py-4'>
                {email || 'المستخدم'}
              </span>
              <img
                src={Avatar}
                alt='avatar'
                className='xl:w-10 w-6 xl:h-10 h-6 rounded-xl'
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='center'
            className='w-40 bg-white shadow-md rounded-md border'
          >
            <DropdownMenuItem className='text-xs hover:bg-gray-100 px-2 py-3 rounded-md'>
              الملف الشخصي
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className='text-xs hover:bg-red-100 text-red-600 px-2 py-3 rounded-md cursor-pointer'
            >
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Navbar
