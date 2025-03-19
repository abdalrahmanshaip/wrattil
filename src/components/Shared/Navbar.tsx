import { User } from "lucide-react";
import wrattil from "../../assets/wrattil.png"; // Ensure the path is correct
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  return (
    <header className="w-full h-16 bg-transparent px-8 py-3 flex items-center justify-between z-30 fixed top-0 left-0">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        <img src={wrattil} alt="Logo" className="w-8 h-8  rounded-2xl" />
        <span className="text-xs font-bold text-orange-600">
          ورتــــــــــــــــــــــــــــــــل
        </span>
      </div>

      {/* Center Section - Search Bar */}
      <div className="relative flex-grow max-w-xl">
        <Input
          type="text"
          placeholder="ابحث عن طلب"
          className="pl-4 pr-4 py-2 border bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-gray-700"
        />
      </div>

      {/* Right Section - User Profile */}
      <div className="relative  max-w-xl">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 cursor-pointer hover:bg-blue-100 hover:text-blue-700 p-1 rounded-md bg-white">
           
              <span className="text-xs text-gray-700 font-medium px-1 py-0.5 rounded-md">
                عمر محمدي
              </span>
              <img src={wrattil} alt="Logo" className="w-6 h-6 rounded-xl " />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-40 bg-white shadow-md rounded-md border"
          >
            <DropdownMenuItem className="text-xs hover:bg-gray-100 px-2 py-1 rounded-md">
              الملف الشخصي
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-gray-100 px-2 py-1 rounded-md">
              الإعدادات
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs hover:bg-red-100 text-red-600 px-2 py-1 rounded-md">
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Navbar;
