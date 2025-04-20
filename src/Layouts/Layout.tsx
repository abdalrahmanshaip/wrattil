import { Navbar, Sidebar } from '@/components/Shared'
import { ReactNode } from 'react'

const Layout = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className='flex xl:p-6 p-4 overflow-hidden'>
      <aside className='h-screen xl:w-[18%] min-w-[15%] transition-all xl:me-5 me-3'>
        <Sidebar />
      </aside>
      <div className='w-full'>
        <div className='pb-5'>
          <Navbar />
        </div>
        <div className={className}>{children}</div>
      </div>
    </div>
  )
}

export default Layout
