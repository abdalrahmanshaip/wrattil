

import { useNavigate } from "react-router-dom";
import wrattil from "../../assets/wrattil.png"; // Ensure correct path



  const menuSections = [
   { id: "main", title: "الرئسيه", path: "/main"},
    { id: "quran", title: "القرآن الكريم", path: "/quran" },
    { id: "questions", title: "بنك الأسئله", path: "/questions" },
    { id: "codes", title:"إنشاء أكواد", path: "/codes"},
    { id: "settings", title:"الإعدادات", path: "/settings"},
    { id: "tajweed", title: "التجويد", path: "/tajweed" },
    { id: "supervision", title: "الإشراف", path: "/supervision" },
  ];
  

  function Sidebar() {
    const navigate = useNavigate();
  
    return (
      <aside className="w-72 bg-white border-l shadow-md flex flex-col h-screen pt-16">
        {/* Sidebar Header (Appears inside Navbar) */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-white flex items-center justify-center border-b">
          <img src={wrattil} alt="Logo" className="h-10" />
        </div>
  
        {/* Navigation Sections */}
        <nav className="mt-4 space-y-5">
          {menuSections.map((section) => (
            <div
              key={section.id}
              onClick={() => navigate(section.path)}
              className="flex items-center gap-3 p-3 rounded-md cursor-pointer 
                hover:bg-gray-100 text-gray-700 font-semibold text-lg"
            >
            
              <span>{section.title}</span>
            </div>
          ))}
        </nav>
      </aside>
    );
  }
  
  export default Sidebar;