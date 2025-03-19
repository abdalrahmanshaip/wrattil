import Navbar from '@/components/Shared/Navbar'
import Sidebar from '@/components/Shared/Sidebar'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex p-6 overflow-hidden'>
      <aside className='h-screen w-[18%] me-5'>
        <Sidebar />
      </aside>
      <div className='w-full'>
        <div className='pb-5'>
          <Navbar />
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
