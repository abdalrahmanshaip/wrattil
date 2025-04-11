import EditModerators from "./_components/EditModerators"

const Moderators = () => {
  return (
    <div className="flex items-center gap-6">
      <h1 className='text-2xl'>المشرفين</h1>
      <div className='flex items-center gap-1.5'>
        <p className='rounded-2xl bg-our-white-100 p-4 text-our-black text-base'>سمر عزيز</p>
        <p className='rounded-2xl bg-our-white-100 p-4 text-our-black text-base'>مريم عزت </p>
        <p className='rounded-2xl bg-our-white-100 p-4 text-our-black text-base'>رقية أحمد</p>
      </div>
      <div className='flex items-center gap-1.5'>
      <EditModerators />
      </div>
    </div>
  )
}

export default Moderators
