import logo from "@/assets/logo.png";
import { Search, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = ({ username = "Pouya", onLogout }) => {
  return (
    <header className="h-16 px-4 border-b border-gray-200 bg-white flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-3">
        <img src={logo} className="w-17 h-17 object-contain" />
        <h1 className="text-xl font-semibold text-gray-800">My Notes</h1>
      </div>

      {/* Center — search with leading icon */}
      <div className="w-1/3">
        <InputGroup className="bg-gray-50 focus-within:ring-2! focus-within:ring-teal-500! focus-within:border-teal-500! transition">
          <InputGroupInput placeholder="Search notes..." type="search" />
          <InputGroupAddon>
            <Search className="text-teal-600" size={18} />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Right — avatar dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton={false}
          render={
            <Avatar className="h-10 w-10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <AvatarFallback className="bg-gray-200 hover:bg-gray-300">
                <User size={20} />
              </AvatarFallback>
            </Avatar>
          }
        />

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={onLogout}
            variant="destructive"
            className="cursor-pointer"
          >
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
