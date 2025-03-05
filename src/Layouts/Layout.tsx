import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex p-6'>
      <aside className='h-screen w-[15%]'>Sidebar</aside>
      <div>
        <div className='mb-20'>Navbar</div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
