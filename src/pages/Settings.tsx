import { useState } from "react";
import { Shield, User, CreditCard, Bell, Shield as ShieldIcon, Smartphone, Eye, EyeOff, Save, Lightbulb, Target, Clock, Brain, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "Sarah Chen",
    email: "sarah@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [strictMode, setStrictMode] = useState(false);
  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    dailyReports: true,
    weeklyInsights: false,
    appUpdates: true
  });
  
  const [showStrictWarning, setShowStrictWarning] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const { toast } = useToast();

  const handleStrictModeToggle = (enabled: boolean) => {
    if (enabled) {
      setShowStrictWarning(true);
    } else {
      setStrictMode(false);
      setShowStrictWarning(false);
    }
  };

  const confirmStrictMode = () => {
    setStrictMode(true);
    setShowStrictWarning(false);
    toast({
      title: "Strict Mode Enabled ⚡",
      description: "Focus sessions can no longer be interrupted until completion.",
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated! ✅",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleChangePassword = () => {
    if (profile.newPassword !== profile.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password changed! 🔐",
      description: "Your password has been updated successfully.",
    });
    
    setProfile(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const devices = [
    { name: "iPhone 14 Pro", type: "Mobile", status: "Active", lastSync: "2 minutes ago", id: 1 },
    { name: "MacBook Pro", type: "Desktop", status: "Active", lastSync: "1 hour ago", id: 2 },
    { name: "iPad Air", type: "Tablet", status: "Inactive", lastSync: "2 days ago", id: 3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-mint-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your focusEdge account and preferences</p>
            </div>
          </div>
          <Badge className="bg-green-100 text-green-800">
            Focus Starter Plan
          </Badge>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="tips">Focus Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPasswords.current ? "text" : "password"}
                          value={profile.currentPassword}
                          onChange={(e) => setProfile(prev => ({ ...prev, currentPassword: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        >
                          {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPasswords.new ? "text" : "password"}
                          value={profile.newPassword}
                          onChange={(e) => setProfile(prev => ({ ...prev, newPassword: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        >
                          {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showPasswords.confirm ? "text" : "password"}
                          value={profile.confirmPassword}
                          onChange={(e) => setProfile(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        >
                          {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleChangePassword} className="w-full md:w-auto">
                    Update Password
                  </Button>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShieldIcon className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                  <div className="flex-1">
                    <h3 className="font-semibold text-red-800">Strict Mode</h3>
                    <p className="text-sm text-red-600 mt-1">
                      When enabled, locks cannot be interrupted or disabled until the session ends. 
                      This prevents all forms of tampering during focus sessions.
                    </p>
                  </div>
                  <Switch
                    checked={strictMode}
                    onCheckedChange={handleStrictModeToggle}
                  />
                </div>

                {showStrictWarning && (
                  <Alert className="border-red-200 bg-red-50">
                    <ShieldIcon className="h-4 w-4 text-red-600" />
                    <AlertDescription>
                      <div className="space-y-3">
                        <p className="text-red-800 font-medium">⚠️ Warning: Strict Mode Cannot Be Disabled</p>
                        <p className="text-red-700">
                          Once enabled, Strict Mode will make it impossible to stop, pause, or modify 
                          focus sessions until they naturally complete. This is designed to eliminate 
                          all escape routes during your focus time.
                        </p>
                        <div className="flex space-x-3">
                          <Button 
                            onClick={confirmStrictMode}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            I Understand - Enable Strict Mode
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => setShowStrictWarning(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-gray-600">Use an authenticator app for additional security</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">SMS Verification</p>
                      <p className="text-sm text-gray-600">Receive verification codes via SMS</p>
                    </div>
                    <Button variant="outline">Setup</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-600">Chrome on MacBook Pro - San Francisco, CA</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-gray-600">iPhone - Last active 2 hours ago</p>
                      </div>
                      <Button variant="outline" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Focus Session Reminders</p>
                      <p className="text-sm text-gray-600">Get notified before scheduled sessions</p>
                    </div>
                    <Switch
                      checked={notifications.sessionReminders}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, sessionReminders: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Daily Progress Reports</p>
                      <p className="text-sm text-gray-600">Receive daily summaries of your focus activity</p>
                    </div>
                    <Switch
                      checked={notifications.dailyReports}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, dailyReports: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Insights</p>
                      <p className="text-sm text-gray-600">Get weekly productivity insights and tips</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyInsights}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, weeklyInsights: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">App Updates</p>
                      <p className="text-sm text-gray-600">Notifications about new features and updates</p>
                    </div>
                    <Switch
                      checked={notifications.appUpdates}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, appUpdates: checked }))
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Timing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quietHoursStart">Quiet Hours Start</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                          <SelectItem value="22:00">10:00 PM</SelectItem>
                          <SelectItem value="23:00">11:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="quietHoursEnd">Quiet Hours End</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="07:00">7:00 AM</SelectItem>
                          <SelectItem value="08:00">8:00 AM</SelectItem>
                          <SelectItem value="09:00">9:00 AM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5" />
                  <span>Connected Devices</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {devices.map((device) => (
                  <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Smartphone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-gray-600">{device.type} • Last sync: {device.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={device.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {device.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {device.status === 'Active' ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Add New Device
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Billing & Subscription</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-800">Focus Starter Plan</h3>
                      <p className="text-blue-600">$10/month • Next billing: Feb 15, 2024</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Upgrade to Focus Pro</span>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Upgrade Now
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold">Payment Method</h3>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-5 bg-blue-600 rounded"></div>
                        <span>•••• •••• •••• 4242</span>
                      </div>
                      <Button variant="outline" size="sm">Update</Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold">Billing History</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Focus Starter Plan</p>
                          <p className="text-sm text-gray-600">Jan 15, 2024</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$10.00</p>
                          <Badge className="bg-green-100 text-green-800">Paid</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Focus Starter Plan</p>
                          <p className="text-sm text-gray-600">Dec 15, 2023</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$10.00</p>
                          <Badge className="bg-green-100 text-green-800">Paid</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  <span>Productivity & Focus Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Target className="h-6 w-6 text-blue-600" />
                      <h3 className="font-semibold text-blue-800">Deep Work Sessions</h3>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li>• Schedule deep work for your peak energy hours</li>
                      <li>• Start with 45-90 minute blocks</li>
                      <li>• Remove all digital distractions</li>
                      <li>• Use the "phone in another room" rule</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Clock className="h-6 w-6 text-green-600" />
                      <h3 className="font-semibold text-green-800">Time Management</h3>
                    </div>
                    <ul className="text-sm text-green-700 space-y-2">
                      <li>• Use the Pomodoro Technique (25min work, 5min break)</li>
                      <li>• Time-block your calendar</li>
                      <li>• Batch similar tasks together</li>
                      <li>• Plan your day the night before</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <Brain className="h-6 w-6 text-purple-600" />
                      <h3 className="font-semibold text-purple-800">Mental Clarity</h3>
                    </div>
                    <ul className="text-sm text-purple-700 space-y-2">
                      <li>• Practice single-tasking</li>
                      <li>• Take regular breaks to recharge</li>
                      <li>• Use meditation apps for 5-10 minutes daily</li>
                      <li>• Keep a distraction log to identify patterns</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <div className="flex items-center space-x-2 mb-3">
                      <SettingsIcon className="h-6 w-6 text-orange-600" />
                      <h3 className="font-semibold text-orange-800">Environment Setup</h3>
                    </div>
                    <ul className="text-sm text-orange-700 space-y-2">
                      <li>• Create a dedicated workspace</li>
                      <li>• Use noise-canceling headphones</li>
                      <li>• Optimize lighting and temperature</li>
                      <li>• Keep your workspace clutter-free</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-800 mb-4">💡 Today's Focus Challenge</h3>
                  <p className="text-gray-700 mb-4">
                    Try the "Two-Minute Rule": If a task takes less than two minutes, do it immediately. 
                    This prevents small tasks from piling up and becoming overwhelming distractions.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Accept Challenge
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-blue-600">25</div>
                    <div className="text-sm text-gray-600">Minutes of deep work</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <div className="text-sm text-gray-600">Minute break after</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border">
                    <div className="text-2xl font-bold text-purple-600">4</div>
                    <div className="text-sm text-gray-600">Cycles then long break</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
