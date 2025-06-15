
import { Plus, Calendar, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuickActionsProps {
  onAddAppBlock: () => void;
  onScheduleBlock: () => void;
  onViewAnalytics: () => void;
}

const QuickActions = ({ onAddAppBlock, onScheduleBlock, onViewAnalytics }: QuickActionsProps) => {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            className="w-full justify-start" 
            variant="outline"
            onClick={onAddAppBlock}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New App Block
          </Button>
          <Button 
            className="w-full justify-start" 
            variant="outline"
            onClick={onScheduleBlock}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
          <Button 
            className="w-full justify-start" 
            variant="outline"
            onClick={onViewAnalytics}
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
  );
};

export default QuickActions;
