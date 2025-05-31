
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, LogOut, User, Crown } from "lucide-react";

interface NavbarProps {
  userRole: "brand" | "creator" | "admin";
  setUserRole: (role: "brand" | "creator" | "admin") => void;
}

const Navbar = ({ userRole, setUserRole }: NavbarProps) => {
  const [notifications] = useState(3);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-500";
      case "creator": return "bg-purple-500";
      default: return "bg-blue-500";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Crown className="h-3 w-3" />;
      case "creator": return <User className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CR</span>
              </div>
              <span className="text-xl font-bold text-gray-900">CreatorBridge</span>
            </div>
            
            {/* Role Badge */}
            <Badge className={`${getRoleColor(userRole)} text-white flex items-center gap-1`}>
              {getRoleIcon(userRole)}
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </Badge>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Discover
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Campaigns
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Analytics
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Messages
            </Button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Role Switcher (Demo purposes) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Switch Role
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Demo: Switch User Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setUserRole("brand")}>
                  Brand Manager
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserRole("creator")}>
                  Creator
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserRole("admin")}>
                  Admin
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@company.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
