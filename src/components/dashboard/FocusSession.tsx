
import { Pause, Bell, TestTube, Smartphone, Mail, MessageCircle, Calendar, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface FocusSessionProps {
  activeSession: any;
  onEndSession: () => void;
  onTestNotification?: (type: 'high-priority' | 'normal' | 'call' | 'whatsapp' | 'work-email') => void;
}

const getAppIcon = (source: string, category?: string) => {
  switch (source) {
    case 'phone':
      return <Smartphone className="h-4 w-4" />;
    case 'whatsapp':
      return <MessageCircle className="h-4 w-4" />;
    case 'email':
    case 'gmail':
    case 'outlook':
      return <Mail className="h-4 w-4" />;
    case 'calendar':
      return <Calendar className="h-4 w-4" />;
    case 'emergency':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getAppColor = (category?: string, priority?: string) => {
  if (category === 'emergency' || priority === 'high') return 'text-red-600';
  if (category === 'call') return 'text-blue-600';
  if (category === 'work') return 'text-purple-600';
  if (category === 'message' || category === 'social') return 'text-green-600';
  return 'text-gray-600';
};

const FocusSession = ({ activeSession, onEndSession, onTestNotification }: FocusSessionProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Focus Session</span>
          {activeSession && (
            <div className="flex items-center space-x-2">
              {activeSession.unlockConditions?.unlockOnNotification && (
                <Badge variant="outline" className="text-xs">
                  <Bell className="h-3 w-3 mr-1" />
                  Unlock on notifications
                </Badge>
              )}
              <Badge className={
                activeSession.status === 'unlocked' 
                  ? "bg-orange-100 text-orange-800" 
                  : "bg-green-100 text-green-800"
              }>
                {activeSession.status === 'unlocked' ? 'Unlocked' : 'Active'}
              </Badge>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeSession ? (
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-blue-600">25:00</div>
            <p className="text-gray-600">{activeSession.title}</p>
            
            {activeSession.status === 'unlocked' && (
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-center mb-2">
                  {activeSession.lastNotification && getAppIcon(
                    activeSession.lastNotification.source, 
                    activeSession.lastNotification.category
                  )}
                  <p className="text-sm text-orange-600 font-medium ml-2">
                    Unlocked by: {activeSession.lastNotification?.appName || 'Notification'}
                  </p>
                </div>
                
                {activeSession.lastNotification && (
                  <div className="text-sm space-y-2">
                    <div className="bg-white/60 rounded-md p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-medium ${getAppColor(
                          activeSession.lastNotification.category, 
                          activeSession.lastNotification.priority
                        )}`}>
                          {activeSession.lastNotification.appName}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {activeSession.lastNotification.priority}
                        </Badge>
                      </div>
                      <p className="font-medium text-gray-800">
                        {activeSession.lastNotification.title}
                      </p>
                      <p className="text-gray-600 text-xs">
                        {activeSession.lastNotification.body}
                      </p>
                      {activeSession.lastNotification.packageName && (
                        <p className="text-gray-400 text-xs mt-1">
                          {activeSession.lastNotification.packageName}
                        </p>
                      )}
                    </div>
                    
                    <div className="text-xs text-orange-700">
                      <p>
                        📱 {activeSession.lastNotification.category === 'call' ? 'Incoming call' : 
                             activeSession.lastNotification.category === 'emergency' ? 'Emergency alert' :
                             activeSession.lastNotification.category === 'work' ? 'Work notification' :
                             'High priority notification'} received at{' '}
                        {new Date(activeSession.lastNotification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <Progress value={80} className="w-full" />
            
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" size="sm">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button variant="destructive" size="sm" onClick={onEndSession}>
                End Session
              </Button>
              
              {/* Enhanced test notification buttons */}
              {activeSession.status === 'active' && activeSession.unlockConditions?.unlockOnNotification && onTestNotification && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onTestNotification('whatsapp')}
                    className="text-xs"
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onTestNotification('call')}
                    className="text-xs"
                  >
                    <Smartphone className="h-3 w-3 mr-1" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onTestNotification('work-email')}
                    className="text-xs"
                  >
                    <Mail className="h-3 w-3 mr-1" />
                    Work Email
                  </Button>
                </>
              )}
            </div>
            
            {activeSession.unlockConditions?.unlockOnNotification && activeSession.status === 'active' && (
              <div className="text-xs text-blue-600 mt-2">
                <p>📱 Monitoring notifications from specified apps...</p>
                <p>High priority notifications and calls will unlock your apps</p>
                {activeSession.unlockConditions.notificationSources?.length > 0 && (
                  <p className="mt-1 text-gray-600">
                    Watching: {activeSession.unlockConditions.notificationSources.join(', ')}
                  </p>
                )}
              </div>
            )}
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
  );
};

export default FocusSession;
