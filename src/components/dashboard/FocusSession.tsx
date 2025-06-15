
import { Pause, Bell, TestTube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface FocusSessionProps {
  activeSession: any;
  onEndSession: () => void;
  onTestNotification?: (type: 'high-priority' | 'normal' | 'call') => void;
}

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
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-600 font-medium">
                  Unlocked due to: {activeSession.unlockReason}
                </p>
                {activeSession.lastNotification && (
                  <div className="text-xs text-orange-700 mt-1">
                    <p><strong>{activeSession.lastNotification.source}:</strong> {activeSession.lastNotification.title}</p>
                    <p className="text-gray-600">{activeSession.lastNotification.body}</p>
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
              
              {/* Test notification buttons for demo */}
              {activeSession.status === 'active' && activeSession.unlockConditions?.unlockOnNotification && onTestNotification && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onTestNotification('normal')}
                    className="text-xs"
                  >
                    <TestTube className="h-3 w-3 mr-1" />
                    Test Email
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onTestNotification('call')}
                    className="text-xs"
                  >
                    <TestTube className="h-3 w-3 mr-1" />
                    Test Call
                  </Button>
                </>
              )}
            </div>
            
            {activeSession.unlockConditions?.unlockOnNotification && activeSession.status === 'active' && (
              <div className="text-xs text-blue-600 mt-2">
                <p>📱 Listening for notifications...</p>
                <p>Priority notifications will unlock your apps</p>
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
