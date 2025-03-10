import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex p-6 overflow-hidden'>
      <aside className='h-screen w-[14%]'>Sidebar</aside>
      <div className='w-full'>
        <div className='mb-20'>Navbar</div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
