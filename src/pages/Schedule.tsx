
import { useState } from "react";
import { Calendar, Clock, Plus, Edit, Trash2, Play, Users, Target, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface FocusSession {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: "Deep Work" | "Study" | "Creative" | "Meeting";
  description?: string;
  reminder: boolean;
  recurring: "none" | "daily" | "weekly" | "monthly";
}

const Schedule = () => {
  const [sessions, setSessions] = useState<FocusSession[]>([
    {
      id: "1",
      title: "Morning Deep Work",
      date: "2024-06-15",
      time: "09:00",
      duration: 120,
      type: "Deep Work",
      description: "Focus on project planning and development",
      reminder: true,
      recurring: "daily"
    },
    {
      id: "2",
      title: "Study Session",
      date: "2024-06-15",
      time: "14:00",
      duration: 90,
      type: "Study",
      description: "Review React documentation",
      reminder: true,
      recurring: "none"
    },
    {
      id: "3",
      title: "Creative Time",
      date: "2024-06-16",
      time: "10:30",
      duration: 60,
      type: "Creative",
      description: "Design new UI components",
      reminder: false,
      recurring: "weekly"
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<FocusSession | null>(null);
  const [newSession, setNewSession] = useState<Partial<FocusSession>>({
    title: "",
    date: selectedDate,
    time: "09:00",
    duration: 60,
    type: "Deep Work",
    description: "",
    reminder: true,
    recurring: "none"
  });

  const { toast } = useToast();

  const handleSaveSession = () => {
    if (!newSession.title || !newSession.date || !newSession.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const sessionToSave: FocusSession = {
      id: editingSession?.id || Date.now().toString(),
      title: newSession.title!,
      date: newSession.date!,
      time: newSession.time!,
      duration: newSession.duration || 60,
      type: newSession.type as FocusSession["type"] || "Deep Work",
      description: newSession.description,
      reminder: newSession.reminder || false,
      recurring: newSession.recurring || "none"
    };

    if (editingSession) {
      setSessions(prev => prev.map(s => s.id === editingSession.id ? sessionToSave : s));
      toast({
        title: "Session Updated! ✅",
        description: `${sessionToSave.title} has been updated successfully.`
      });
    } else {
      setSessions(prev => [...prev, sessionToSave]);
      toast({
        title: "Session Created! 🎯",
        description: `${sessionToSave.title} has been scheduled successfully.`
      });
    }

    setIsDialogOpen(false);
    setEditingSession(null);
    setNewSession({
      title: "",
      date: selectedDate,
      time: "09:00",
      duration: 60,
      type: "Deep Work",
      description: "",
      reminder: true,
      recurring: "none"
    });
  };

  const handleEditSession = (session: FocusSession) => {
    setEditingSession(session);
    setNewSession(session);
    setIsDialogOpen(true);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    toast({
      title: "Session Deleted",
      description: "The focus session has been removed from your schedule."
    });
  };

  const startSession = (session: FocusSession) => {
    toast({
      title: "Focus Session Started! 🎯",
      description: `${session.title} is now active. Stay focused!`
    });
  };

  const getSessionsForDate = (date: string) => {
    return sessions.filter(session => session.date === date);
  };

  const getTypeColor = (type: FocusSession["type"]) => {
    switch (type) {
      case "Deep Work": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Study": return "bg-green-100 text-green-800 border-green-200";
      case "Creative": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Meeting": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDaysInWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day.toISOString().split('T')[0]);
    }
    
    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-mint-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Focus Schedule</h1>
              <p className="text-gray-600">Plan and manage your focus sessions</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                New Session
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingSession ? "Edit Focus Session" : "Create New Focus Session"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Session Title</Label>
                  <Input
                    id="title"
                    value={newSession.title}
                    onChange={(e) => setNewSession(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter session title"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newSession.time}
                      onChange={(e) => setNewSession(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="15"
                      max="480"
                      value={newSession.duration}
                      onChange={(e) => setNewSession(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Session Type</Label>
                    <Select
                      value={newSession.type}
                      onValueChange={(value: FocusSession["type"]) => setNewSession(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Deep Work">Deep Work</SelectItem>
                        <SelectItem value="Study">Study</SelectItem>
                        <SelectItem value="Creative">Creative</SelectItem>
                        <SelectItem value="Meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={newSession.description}
                    onChange={(e) => setNewSession(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Add session details..."
                    rows={3}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="reminder"
                      checked={newSession.reminder}
                      onCheckedChange={(checked) => setNewSession(prev => ({ ...prev, reminder: checked }))}
                    />
                    <Label htmlFor="reminder">Enable reminder</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="recurring">Repeat:</Label>
                    <Select
                      value={newSession.recurring}
                      onValueChange={(value: FocusSession["recurring"]) => setNewSession(prev => ({ ...prev, recurring: value }))}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveSession} className="bg-gradient-to-r from-blue-600 to-purple-600">
                    {editingSession ? "Update Session" : "Create Session"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Week View */}
        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {getDaysInWeek().map((date, index) => {
                const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
                const dayNumber = new Date(date).getDate();
                const todaysSessions = getSessionsForDate(date);
                const isToday = date === new Date().toISOString().split('T')[0];
                
                return (
                  <div
                    key={date}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">{dayName}</p>
                      <p className={`text-lg font-bold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                        {dayNumber}
                      </p>
                    </div>
                    <div className="mt-2 space-y-1">
                      {todaysSessions.slice(0, 2).map((session) => (
                        <div key={session.id} className="text-xs p-1 rounded bg-white/50 truncate">
                          {session.time} - {session.title}
                        </div>
                      ))}
                      {todaysSessions.length > 2 && (
                        <div className="text-xs text-gray-500">+{todaysSessions.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Day Sessions */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                Sessions for {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <Badge className="bg-blue-100 text-blue-800">
                {getSessionsForDate(selectedDate).length} sessions
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getSessionsForDate(selectedDate).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No sessions scheduled for this day</p>
                <p className="text-sm">Click "New Session" to add one</p>
              </div>
            ) : (
              <div className="space-y-4">
                {getSessionsForDate(selectedDate)
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{session.time}</div>
                          <div className="text-xs text-gray-500">{session.duration}min</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{session.title}</h3>
                            <Badge className={getTypeColor(session.type)}>
                              {session.type}
                            </Badge>
                            {session.reminder && <Bell className="h-4 w-4 text-yellow-500" />}
                            {session.recurring !== "none" && <Clock className="h-4 w-4 text-green-500" />}
                          </div>
                          {session.description && (
                            <p className="text-sm text-gray-600">{session.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => startSession(session)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Start
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditSession(session)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteSession(session.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
