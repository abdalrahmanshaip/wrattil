import { Logo } from '@/assets'
import { useNavigate, useLocation } from 'react-router-dom'

const menuSections = [
  { id: 'main', title: 'الرئيسية', path: '/' },
  { id: 'quran', title: 'القرآن الكريم', path: '/quran' },
  { id: 'questions', title: 'بنك الأسئلة', path: '/questions' },
  { id: 'codes', title: 'إنشاء أكواد', path: '/codes' },
  { id: 'settings', title: 'الإعدادات', path: '/settings' },
  { id: 'tajweed', title: 'التجويد', path: '/tajweed' },
  { id: 'supervision', title: 'الإشراف', path: '/supervision' },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation() // Get current path to highlight active link

  return (
    <aside className='flex flex-col bg-transparent'>
      {/* Sidebar Header (Appears inside Navbar) */}
      <div className='flex items-center'>
        <img
          src={Logo}
          alt='Logo'
          className=''
        />
      </div>
      {/* Navigation Sections */}
      <nav className='mt-6 space-y-2 px-4'>
        {menuSections.map((section) => (
          <div
            key={section.id}
            onClick={() => navigate(section.path)}
            className={`flex items-center gap-3 p-3 py-5 rounded-xl cursor-pointer transition-all 
                text-gray-700 font-semibold text-lg
                ${
                  location.pathname === section.path
                    ? 'bg-our-brown-300 text-white'
                    : 'hover:bg-our-brown-300/70 hover:text-white'
                }`}
          >
            <span className='ps-4'>{section.title}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
