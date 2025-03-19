import { useNavigate, useLocation } from "react-router-dom";

const menuSections = [
  { id: "main", title: "الرئيسية", path: "/main" },
  { id: "quran", title: "القرآن الكريم", path: "/quran" },
  { id: "questions", title: "بنك الأسئلة", path: "/questions" },
  { id: "codes", title: "إنشاء أكواد", path: "/codes" },
  { id: "settings", title: "الإعدادات", path: "/settings" },
  { id: "tajweed", title: "التجويد", path: "/tajweed" },
  { id: "supervision", title: "الإشراف", path: "/supervision" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get current path to highlight active link

  return (
    <aside className="w-72 flex flex-col h-screen pt-16 bg-transparent">
      {/* Sidebar Header (Appears inside Navbar) */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-center bg-transparent">
     
      </div>

      {/* Navigation Sections */}
      <nav className="mt-6 space-y-2 px-4">
        {menuSections.map((section) => (
          <div
            key={section.id}
            onClick={() => navigate(section.path)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all 
                text-gray-700 font-semibold text-lg
                ${
                  location.pathname === section.path
                    ? "bg-gray-200 text-blue-700"
                    : "hover:bg-blue-100 hover:text-blue-700"
                }`}
          >
            <span>{section.title}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
