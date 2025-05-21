const Pagination = () => {
  return (
    <div className='mt-8'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-600'>عرض 1-10 من 50 نتيجة</p>
        <div className='flex space-x-2'>
          <button className='px-4 py-2 text-sm text-white bg-our-orange rounded-md hover:bg-our-orange/90'>
            السابق
          </button>
          <button className='px-4 py-2 text-sm text-white bg-our-orange rounded-md hover:bg-our-orange/90'>
            التالي
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination
