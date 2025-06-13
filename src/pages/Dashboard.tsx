import { useState } from "react";
import { Shield, Plus, Clock, Smartphone, Lock, Unlock, Play, Pause, Settings, Bell, BarChart3, Target, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import ProfileDropdown from "@/components/ProfileDropdown";
import ChatWidget from "@/components/ChatWidget";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [blockedApps, setBlockedApps] = useState([
    { name: "Instagram", icon: "📷", blocked: true, category: "Social Media" },
    { name: "YouTube", icon: "📺", blocked: false, category: "Entertainment" },
    { name: "WhatsApp", icon: "💬", blocked: true, category: "Messaging" }
  ]);
  const { toast } = useToast();

  const menuItems = [
    { title: "Dashboard", icon: BarChart3, active: true, path: "/dashboard" },
    { title: "Focus Sessions", icon: Target, path: "/dashboard" },
    { title: "Schedule", icon: Calendar, path: "/schedule" },
    { title: "App Management", icon: Smartphone, path: "/dashboard" },
    { title: "Settings", icon: Settings, path: "/settings" }
  ];

  const toggleAppBlock = (appName: string) => {
    setBlockedApps(prev => 
      prev.map(app => 
        app.name === appName 
          ? { ...app, blocked: !app.blocked }
          : app
      )
    );
    
    toast({
      title: `${appName} ${blockedApps.find(app => app.name === appName)?.blocked ? 'Unblocked' : 'Blocked'}`,
      description: `${appName} is now ${blockedApps.find(app => app.name === appName)?.blocked ? 'available' : 'blocked'}.`,
    });
  };

  const startFocusSession = () => {
    setActiveSession({ 
      duration: 25, 
      remaining: 25 * 60, 
      type: "Deep Work" 
    });
    toast({
      title: "Focus session started! 🎯",
      description: "Stay focused! You've got this 💪",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-purple-50 to-mint-50">
        <Sidebar className="bg-white/90 backdrop-blur-sm border-r">
          <SidebarHeader className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                focusEdge
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={item.active ? "bg-blue-50 text-blue-700" : ""}>
                    <Link to={item.path} className="flex items-center space-x-2">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
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

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Focus Streak</p>
                      <p className="text-3xl font-bold">7 days</p>
                    </div>
                    <Target className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Time Saved</p>
                      <p className="text-3xl font-bold">2.5h</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Blocked Apps</p>
                      <p className="text-3xl font-bold">{blockedApps.filter(app => app.blocked).length}</p>
                    </div>
                    <Lock className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Sessions Today</p>
                      <p className="text-3xl font-bold">3</p>
                    </div>
                    <Play className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Active Session */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Focus Session</span>
                      {activeSession && <Badge className="bg-green-100 text-green-800">Active</Badge>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeSession ? (
                      <div className="text-center space-y-4">
                        <div className="text-4xl font-bold text-blue-600">25:00</div>
                        <p className="text-gray-600">Deep Work Session</p>
                        <Progress value={80} className="w-full" />
                        <div className="flex justify-center space-x-4">
                          <Button variant="outline">
                            <Pause className="h-4 w-4 mr-2" />
                            Pause
                          </Button>
                          <Button variant="destructive">
                            End Session
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="text-gray-400 text-6xl">🎯</div>
                        <h3 className="text-xl font-semibold">Ready to focus?</h3>
                        <p className="text-gray-600">Start a focus session to block distractions and boost productivity.</p>
                        <Button onClick={startFocusSession} className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <Play className="h-4 w-4 mr-2" />
                          Start Focus Session
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New App Block
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Session
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="text-center">💡 Daily Tip</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600">
                      "The key to productivity is not working harder, but working smarter. 
                      Take regular breaks to maintain focus!"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* App Management */}
            <Card className="mt-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>App Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blockedApps.map((app) => (
                    <div key={app.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{app.icon}</span>
                        <div>
                          <p className="font-medium">{app.name}</p>
                          <p className="text-xs text-gray-500">{app.category}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleAppBlock(app.name)}
                        className={app.blocked ? "text-red-600 border-red-200" : "text-green-600 border-green-200"}
                      >
                        {app.blocked ? (
                          <>
                            <Lock className="h-4 w-4 mr-1" />
                            Blocked
                          </>
                        ) : (
                          <>
                            <Unlock className="h-4 w-4 mr-1" />
                            Allowed
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <ChatWidget />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
