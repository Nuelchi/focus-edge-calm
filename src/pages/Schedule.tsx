
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Edit, Trash2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const Schedule = () => {
  const [schedules] = useState([
    {
      id: 1,
      title: "Morning Focus",
      time: "09:00 - 11:00",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      block: "Social Media Block",
      active: true
    },
    {
      id: 2,
      title: "Afternoon Deep Work",
      time: "14:00 - 16:00",
      days: ["Mon", "Wed", "Fri"],
      block: "Entertainment",
      active: false
    },
    {
      id: 3,
      title: "Evening Study",
      time: "19:00 - 21:00",
      days: ["Sun", "Tue", "Thu"],
      block: "Social Media Block",
      active: true
    }
  ]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Schedule</h2>
            <p className="text-gray-600">Manage your focus sessions and automated blocks</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="h-4 w-4 mr-2" />
            New Schedule
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Schedules</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {schedules.filter(s => s.active).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Hours/Week</p>
                  <p className="text-2xl font-bold text-green-600">14h</p>
                </div>
                <Clock className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Next Session</p>
                  <p className="text-lg font-bold text-purple-600">Tomorrow 9:00 AM</p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-purple-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedules List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Schedules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`h-3 w-3 rounded-full ${schedule.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div>
                      <h3 className="font-medium">{schedule.title}</h3>
                      <p className="text-sm text-gray-600">{schedule.time}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">Block:</span>
                        <Badge variant="outline" className="text-xs">{schedule.block}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-1">
                      {schedule.days.map((day) => (
                        <Badge key={day} variant="secondary" className="text-xs px-2 py-1">
                          {day}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar View Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm">{day}</h4>
                  <div className="mt-2 space-y-1">
                    {schedules
                      .filter(s => s.days.includes(day))
                      .map(s => (
                        <div key={s.id} className="text-xs p-1 bg-blue-100 text-blue-800 rounded">
                          {s.time.split(' - ')[0]}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Schedule;
