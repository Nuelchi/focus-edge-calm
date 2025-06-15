
import { ReactNode, useState } from "react";
import { Shield, BarChart3, Target, Calendar, Smartphone, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import ProfileDropdown from "@/components/ProfileDropdown";
import ChatWidget from "@/components/ChatWidget";
import { Link, useLocation } from "react-router-dom";
import StartFocusDialog from "@/components/StartFocusDialog";

interface AppLayoutProps {
  children: ReactNode;
  availableBlocks?: any[];
  onStartFocus?: (session: any) => void;
}

const AppLayout = ({ children, availableBlocks = [], onStartFocus }: AppLayoutProps) => {
  const location = useLocation();
  const [startFocusOpen, setStartFocusOpen] = useState(false);

  const menuItems = [
    { title: "Dashboard", icon: BarChart3, path: "/dashboard" },
    { title: "Focus Sessions", icon: Target, path: "/dashboard", action: "focus" },
    { title: "Schedule", icon: Calendar, path: "/schedule" },
    { title: "App Management", icon: Smartphone, path: "/dashboard" },
    { title: "Settings", icon: Settings, path: "/settings" }
  ];

  const handleMenuClick = (item: any) => {
    if (item.action === "focus") {
      setStartFocusOpen(true);
    }
  };

  const handleStartFocus = (session: any) => {
    if (onStartFocus) {
      onStartFocus(session);
    }
    setStartFocusOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-purple-50 to-mint-50">
        <Sidebar className="bg-white/90 backdrop-blur-sm border-r">
          <SidebarHeader className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FocusGuard
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild={!item.action}
                    className={location.pathname === item.path ? "bg-blue-50 text-blue-700" : ""}
                    onClick={item.action ? () => handleMenuClick(item) : undefined}
                  >
                    {item.action ? (
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                    ) : (
                      <Link to={item.path} className="flex items-center space-x-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Good morning, Sarah! 👋</h1>
                <p className="text-gray-600 mt-1">Ready to have a productive day?</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-green-100 text-green-800">Free Trial - 5 days left</Badge>
                <ProfileDropdown userName="Sarah Chen" userEmail="sarah@example.com" />
                <SidebarTrigger />
              </div>
            </div>
            {children}
          </div>
        </main>
        
        <ChatWidget />

        <StartFocusDialog
          open={startFocusOpen}
          onOpenChange={setStartFocusOpen}
          availableBlocks={availableBlocks}
          onStartFocus={handleStartFocus}
        />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
