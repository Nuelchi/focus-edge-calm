
import { Clock, Lock, Target, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsOverviewProps {
  blockedAppsCount: number;
}

const StatsOverview = ({ blockedAppsCount }: StatsOverviewProps) => {
  return (
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
              <p className="text-3xl font-bold">{blockedAppsCount}</p>
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
  );
};

export default StatsOverview;
