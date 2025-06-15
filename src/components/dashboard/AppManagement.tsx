
import { Lock, Unlock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface App {
  name: string;
  icon: string;
  blocked: boolean;
  category: string;
}

interface AppManagementProps {
  blockedApps: App[];
  onToggleAppBlock: (appName: string) => void;
}

const AppManagement = ({ blockedApps, onToggleAppBlock }: AppManagementProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
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
                onClick={() => onToggleAppBlock(app.name)}
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
  );
};

export default AppManagement;
