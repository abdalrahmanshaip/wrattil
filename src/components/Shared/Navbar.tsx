

import { Search, User, Menu } from "lucide-react";
import wrattil from "../../assets/wrattil.png"; // Ensure the path is correct
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

function Navbar() {
  return (
    <header className="w-full h-16 bg-white px-6 shadow-md flex items-center justify-between z-20 border-b fixed top-0 left-0">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-2">
        <img src={wrattil} alt="Logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-orange-600">ورتل</span>
      </div>

      {/* Center Section - Search Bar */}
      <div className="relative flex-grow max-w-xl">
        <Input
          type="text"
          placeholder="ابحث عن طلب"
          className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-gray-700"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      {/* Right Section - User Profile */}
      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 cursor-pointer">
              <User className="w-10 h-10 text-gray-700" />
              <span className="text-gray-700 font-medium">عمر محمدي</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>الملف الشخصي</DropdownMenuItem>
            <DropdownMenuItem>الإعدادات</DropdownMenuItem>
            <DropdownMenuItem>تسجيل الخروج</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sidebar Toggle Button (if needed) */}
        <Button variant="ghost" size="icon">
          <Menu className="w-6 h-6 text-gray-700" />
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
