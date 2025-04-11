import { Navbar, Sidebar } from '@/components/Shared'
import { ReactNode } from 'react'

const Layout = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className='flex p-6 overflow-hidden'>
      <aside className='h-screen w-[18%] me-5'>
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
