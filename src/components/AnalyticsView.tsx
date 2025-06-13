
import { useState } from "react";
import { BarChart3, Clock, Target, Shield, TrendingUp, Calendar, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalyticsViewProps {
  focusLogs: any[];
  schedules: any[];
  blocks: any[];
}

const AnalyticsView = ({ focusLogs, schedules, blocks }: AnalyticsViewProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  // Mock analytics data - in real app this would be calculated from actual logs
  const analyticsData = {
    totalFocusTime: 127, // minutes today
    remainingHours: 5.5, // hours left in current session
    weeklyProgress: 75, // percentage
    sessionsThisWeek: 12,
    prematureBreaks: 3,
    strictModePreventions: 8,
    longestStreak: 7, // days
    averageSessionLength: 45 // minutes
  };

  const recentLogs = [
    { id: 1, type: "Focus Session", app: "Social Media Block", duration: 45, timestamp: "2 hours ago", completed: true },
    { id: 2, type: "Schedule Block", app: "YouTube", duration: 120, timestamp: "4 hours ago", completed: false },
    { id: 3, type: "Quick Block", app: "Instagram", duration: 30, timestamp: "6 hours ago", completed: true },
    { id: 4, type: "Focus Session", app: "Entertainment", duration: 60, timestamp: "1 day ago", completed: true },
    { id: 5, type: "Schedule Block", app: "Gaming Apps", duration: 90, timestamp: "1 day ago", completed: false }
  ];

  const weeklyData = [
    { day: "Mon", completed: 3, failed: 1 },
    { day: "Tue", completed: 2, failed: 0 },
    { day: "Wed", completed: 4, failed: 2 },
    { day: "Thu", completed: 1, failed: 1 },
    { day: "Fri", completed: 3, failed: 0 },
    { day: "Sat", completed: 0, failed: 1 },
    { day: "Sun", completed: 2, failed: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Focus Time Today</p>
                <p className="text-2xl font-bold text-blue-600">{Math.floor(analyticsData.totalFocusTime / 60)}h {analyticsData.totalFocusTime % 60}m</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weekly Progress</p>
                <p className="text-2xl font-bold text-green-600">{analyticsData.weeklyProgress}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
            <Progress value={analyticsData.weeklyProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-purple-600">{analyticsData.longestStreak} days</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Strict Mode Saves</p>
                <p className="text-2xl font-bold text-orange-600">{analyticsData.strictModePreventions}</p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Recent Logs</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sessions This Week</span>
                  <Badge>{analyticsData.sessionsThisWeek}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Session Length</span>
                  <Badge variant="outline">{analyticsData.averageSessionLength}min</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Premature Breaks</span>
                  <Badge variant="destructive">{analyticsData.prematureBreaks}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <Badge className="bg-green-100 text-green-800">
                    {Math.round(((analyticsData.sessionsThisWeek - analyticsData.prematureBreaks) / analyticsData.sessionsThisWeek) * 100)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Daily Goal Progress</span>
                    <span className="text-sm font-medium">6.2h / 8h</span>
                  </div>
                  <Progress value={77.5} />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Time Remaining Today</span>
                    <span className="text-sm font-medium">{analyticsData.remainingHours}h</span>
                  </div>
                  <Progress value={30} className="bg-orange-100" />
                </div>
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    You're {analyticsData.remainingHours > 0 ? 'ahead of' : 'behind'} schedule by {Math.abs(analyticsData.remainingHours)}h
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${log.completed ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <p className="font-medium">{log.app}</p>
                        <p className="text-sm text-gray-600">{log.type} • {log.duration}min • {log.timestamp}</p>
                      </div>
                    </div>
                    <Badge variant={log.completed ? "default" : "destructive"}>
                      {log.completed ? "Completed" : "Broken"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium">{day.day}</div>
                    <div className="flex-1 flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(day.completed)].map((_, i) => (
                          <div key={i} className="w-6 h-6 bg-green-500 rounded" />
                        ))}
                        {[...Array(day.failed)].map((_, i) => (
                          <div key={i} className="w-6 h-6 bg-red-500 rounded" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {day.completed} completed, {day.failed} failed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsView;
