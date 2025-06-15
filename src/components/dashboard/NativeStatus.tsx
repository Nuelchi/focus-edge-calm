
import { useState, useEffect } from "react";
import { Smartphone, Wifi, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { nativeCapabilities } from "@/services/nativeCapabilities";

const NativeStatus = () => {
  const [isNative, setIsNative] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    checkNativeStatus();
  }, []);

  const checkNativeStatus = async () => {
    setIsNative(nativeCapabilities.isRunningNatively());
    // This would check actual permissions in a real implementation
    setPermissionsGranted(true);
  };

  const requestPermissions = async () => {
    const granted = await nativeCapabilities.requestPermissions();
    setPermissionsGranted(granted);
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {isNative ? <Smartphone className="h-5 w-5" /> : <Wifi className="h-5 w-5" />}
          <span>App Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Platform</span>
          <Badge variant={isNative ? "default" : "secondary"}>
            {isNative ? "Native Mobile" : "Web Demo"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Blocking Capabilities</span>
          <Badge variant={permissionsGranted ? "default" : "destructive"}>
            {permissionsGranted ? "Active" : "Limited"}
          </Badge>
        </div>

        {!isNative && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-xs text-blue-800">
                <p className="font-medium">Web Demo Mode</p>
                <p>Install as mobile app for full blocking capabilities</p>
              </div>
            </div>
          </div>
        )}

        {isNative && !permissionsGranted && (
          <Button 
            onClick={requestPermissions} 
            size="sm" 
            className="w-full"
            variant="outline"
          >
            Grant Permissions
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default NativeStatus;
