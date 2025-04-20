import StudentList from './StudentList'
const StudentTabs = () => {
  return (
    <div>
      <div className='container py-8 mx-auto'>
        <h1 className='text-3xl font-medium text-right mb-6'>قائمة الطلاب</h1>
        <StudentList />
      </div>
    </div>
  )
}

export default StudentTabs
