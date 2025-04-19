import { Boy, Control, Logo, House } from '@/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import { Questions, QuranBook } from '@/assets'

const menuSections = [
  { id: 'main', title: 'الرئيسية', path: '/', icon: House  },
  { id: 'quran', title: 'القرآن الكريم', path: '/quran', icon: QuranBook },
  { id: 'questions', title: 'بنك الأسئلة القرآن', path: '/quran-questions', icon: Questions  },
  // { id: 'codes', title: 'إنشاء أكواد', path: '/codes' },
  // { id: 'settings', title: 'الإعدادات', path: '/settings' },
  { id: 'tajweed', title: 'التجويد', path: '/tajweed', icon: Boy  },
  { id: 'supervision', title: 'الإشراف', path: '/supervision', icon: Control  },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className='flex flex-col bg-transparent xl:mt-2 mt-5 '>
      <button onClick={() => navigate('/')} className='flex items-center cursor-pointer'>
        <img
          src={Logo}
          alt='Logo'
          />
      </button>
      <nav className='mt-6 space-y-2'>
        {menuSections.map((section) => (
          <div
            key={section.id}
            onClick={() => navigate(section.path)}
            className={`items-center gap-3 p-3 py-5 rounded-xl cursor-pointer transition-all 
                text-gray-700 font-semibold text-lg
                ${
                  location.pathname === section.path
                    ? 'bg-our-brown-300 text-white'
                    : 'hover:bg-our-brown-300/70 hover:text-white'
                }`}
          >
            <span className='ps-4  xl:flex hidden'>{section.title}</span>
            <img className='xl:hidden flex mx-auto' src={section.icon} alt={section.title} width={25} height={25} />
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
