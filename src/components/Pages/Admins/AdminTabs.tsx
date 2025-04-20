import { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminList from './AdminList'
import AdminForm from './AdminForm'
const AdminTabs = () => {
  return (
    <div>
      <div className='container py-8 mx-auto'>
        <h1 className='text-3xl font-bold text-right mb-6'>إدارة المشرفين</h1>

        <Tabs
          defaultValue='list'
          dir='rtl'
          className='w-full'
        >
          <TabsList className='grid w-full max-w-md grid-cols-2 mb-8 gap-4'>
            <TabsTrigger
              value='list'
              className='data-[state=active]:bg-our-orange data-[state=active]:text-white bg-gray-200 text-black py-3'
            >
              قائمة المشرفين
            </TabsTrigger>
            <TabsTrigger
              value='create'
              className='data-[state=active]:bg-our-orange data-[state=active]:text-white bg-gray-200 text-black py-3'
            >
              إضافة مشرف جديد
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value='list'
            className='mt-6'
          >
            <Suspense fallback={<div>جاري التحميل...</div>}>
              <AdminList />
            </Suspense>
          </TabsContent>

          <TabsContent
            value='create'
            className='mt-6'
          >
            <AdminForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AdminTabs
