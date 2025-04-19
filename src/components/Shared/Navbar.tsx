import { Avatar } from '@/assets' // Ensure the path is correct
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

function Navbar() {
  return (
    <header className='w-full bg-transparent   flex items-center justify-between mt-2'>
      <p className='xl:text-base text-xs'>مساء الخير يا أستاذة علا</p>
      {/* Center Section - Search Bar */}
      <div className='relative flex-grow max-w-xl xl:flex hidden '>
        <Input
          type='text'
          placeholder='ابحث عن طلب'
          className='pr-4  border py-6 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-gray-700'
        />
        <Search className='absolute left-4 top-4' color='gray' size={20}/>
      </div>

      {/* Right Section - User Profile */}
      <div className='relative  max-w-xl'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='flex items-center gap-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 p-1 rounded-2xl bg-white'>
              <span className='text-xs text-gray-700 font-medium px-2 py-4'>
                عمر محمدي
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
            <DropdownMenuItem className='text-xs hover:bg-gray-100 px-2 py-3 rounded-md'>
              الإعدادات
            </DropdownMenuItem>
            <DropdownMenuItem className='text-xs hover:bg-red-100 text-red-600 px-2 py-3 rounded-md'>
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Navbar
