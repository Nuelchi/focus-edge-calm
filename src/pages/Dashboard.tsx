import { useState } from "react";
import { Plus, Clock, Lock, Unlock, Play, Pause, BarChart3, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AddAppBlockDialog from "@/components/AddAppBlockDialog";
import ScheduleBlockDialog from "@/components/ScheduleBlockDialog";
import AnalyticsView from "@/components/AnalyticsView";
import AppLayout from "@/components/AppLayout";

const Dashboard = () => {
  const [activeSession, setActiveSession] = useState(null);
  const [blockedApps, setBlockedApps] = useState([
    { name: "Instagram", icon: "📷", blocked: true, category: "Social Media" },
    { name: "YouTube", icon: "📺", blocked: false, category: "Entertainment" },
    { name: "WhatsApp", icon: "💬", blocked: true, category: "Messaging" }
  ]);

  // Dialog states
  const [addAppBlockOpen, setAddAppBlockOpen] = useState(false);
  const [scheduleBlockOpen, setScheduleBlockOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  // Mock data for blocks and schedules
  const [availableBlocks, setAvailableBlocks] = useState([
    {
      id: "1",
      name: "Social Media Block",
      apps: ["Instagram", "Facebook", "TikTok"],
      domains: ["facebook.com", "instagram.com"],
      type: "mixed",
      blocked: false
    },
    {
      id: "2", 
      name: "Entertainment",
      apps: ["YouTube", "Netflix"],
      domains: ["youtube.com", "netflix.com"],
      type: "mixed",
      blocked: false
    }
  ]);

  const [schedules, setSchedules] = useState([]);
  const [focusLogs, setFocusLogs] = useState([]);

  const { toast } = useToast();

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

  const handleAddBlock = (newBlock: any) => {
    const blockWithId = {
      ...newBlock,
      id: Date.now().toString(),
      blocked: false
    };
    
    console.log('Adding new block:', blockWithId);
    setAvailableBlocks(prev => {
      const updated = [...prev, blockWithId];
      console.log('Updated available blocks:', updated);
      return updated;
    });
    
    toast({
      title: "Block created successfully! 🎯",
      description: `${newBlock.name} has been added to your available blocks.`,
    });
  };

  const handleScheduleBlock = (newSchedule: any) => {
    setSchedules(prev => [...prev, newSchedule]);
  };

  const handleStartFocus = (newSession: any) => {
    setActiveSession(newSession);
    setFocusLogs(prev => [...prev, newSession]);
    
    // Apply the selected block
    const selectedBlock = availableBlocks.find(block => block.id === newSession.blockId);
    if (selectedBlock) {
      console.log('Activating block:', selectedBlock);
      
      // Set up auto-unlock based on session settings
      if (newSession.unlockConditions) {
        setupAutoUnlock(newSession);
      }
    }
  };

  const setupAutoUnlock = (session: any) => {
    const { unlockConditions } = session;
    
    // If notifications are enabled, set up notification listener
    if (unlockConditions.unlockOnNotification) {
      console.log('Setting up notification-based unlock');
      // Request notification permission if not already granted
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
      
      // Listen for notifications (this would be implemented with actual notification API)
      // For demo, we'll simulate this
      if (unlockConditions.notificationSources.includes('any')) {
        // Set up listener for any notification
        setupNotificationListener(session);
      }
    }
    
    // Set up time-based unlock if specified and not in strict mode
    if (unlockConditions.customTimeMinutes && !session.strictMode) {
      console.log(`Setting up time-based unlock in ${unlockConditions.customTimeMinutes} minutes`);
      setTimeout(() => {
        unlockApps(session, 'time');
      }, unlockConditions.customTimeMinutes * 60 * 1000);
    }
  };

  const setupNotificationListener = (session: any) => {
    // This is a simplified version - in a real app, you'd use the Notification API
    // and potentially integrate with system notifications
    console.log('Notification listener set up for session:', session.id);
    
    // Simulate notification unlock after 30 seconds for demo
    setTimeout(() => {
      unlockApps(session, 'notification');
    }, 30000);
  };

  const unlockApps = (session: any, reason: 'time' | 'notification' | 'manual') => {
    console.log(`Unlocking apps for session ${session.id} due to: ${reason}`);
    
    setActiveSession(prev => {
      if (prev && prev.id === session.id) {
        return {
          ...prev,
          status: 'unlocked',
          unlockReason: reason,
          unlockedAt: new Date().toISOString()
        };
      }
      return prev;
    });
    
    const reasonText = reason === 'notification' ? 'incoming notification' : 
                      reason === 'time' ? 'time limit reached' : 'manual unlock';
    
    toast({
      title: "Apps Unlocked! 🔓",
      description: `Focus session ended due to ${reasonText}.`,
    });
  };

  return (
    <AppLayout 
      availableBlocks={availableBlocks} 
      onStartFocus={handleStartFocus}
    >
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
                {activeSession && (
                  <Badge className={
                    activeSession.status === 'unlocked' 
                      ? "bg-orange-100 text-orange-800" 
                      : "bg-green-100 text-green-800"
                  }>
                    {activeSession.status === 'unlocked' ? 'Unlocked' : 'Active'}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeSession ? (
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-blue-600">25:00</div>
                  <p className="text-gray-600">{activeSession.title}</p>
                  {activeSession.status === 'unlocked' && (
                    <p className="text-sm text-orange-600">
                      Unlocked due to: {activeSession.unlockReason}
                    </p>
                  )}
                  <Progress value={80} className="w-full" />
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                    <Button variant="destructive" onClick={() => setActiveSession(null)}>
                      End Session
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-gray-400 text-6xl">🎯</div>
                  <h3 className="text-xl font-semibold">Ready to focus?</h3>
                  <p className="text-gray-600">Start a focus session to block distractions and boost productivity.</p>
                  <p className="text-sm text-blue-600">Click "Focus Sessions" in the sidebar to get started!</p>
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
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setAddAppBlockOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New App Block
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setScheduleBlockOpen(true)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setAnalyticsOpen(true)}
              >
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
    </AppLayout>
  );
};

export default Dashboard;
