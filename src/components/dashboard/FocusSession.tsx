
import { Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface FocusSessionProps {
  activeSession: any;
  onEndSession: () => void;
}

const FocusSession = ({ activeSession, onEndSession }: FocusSessionProps) => {
  return (
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
              <Button variant="destructive" onClick={onEndSession}>
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
  );
};

export default FocusSession;
