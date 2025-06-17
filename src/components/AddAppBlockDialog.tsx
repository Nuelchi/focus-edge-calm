import { useState, useEffect } from "react";
import { Plus, Smartphone, Globe, Users, X, Search, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { nativeCapabilities, AppInfo } from "@/services/nativeCapabilities";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AddAppBlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddApp: (app: { name: string; packageName?: string }) => void;
}

const popularApps = [
  { name: "Instagram", icon: "📷", category: "Social Media", packageName: "com.instagram.android" },
  { name: "TikTok", icon: "🎵", category: "Entertainment", packageName: "com.zhiliaoapp.musically" },
  { name: "YouTube", icon: "📺", category: "Entertainment", packageName: "com.google.android.youtube" },
  { name: "Facebook", icon: "👥", category: "Social Media", packageName: "com.facebook.katana" },
  { name: "Twitter", icon: "🐦", category: "Social Media", packageName: "com.twitter.android" },
  { name: "Snapchat", icon: "👻", category: "Social Media", packageName: "com.snapchat.android" },
  { name: "WhatsApp", icon: "💬", category: "Messaging", packageName: "com.whatsapp" },
  { name: "Netflix", icon: "🎬", category: "Entertainment", packageName: "com.netflix.mediaclient" },
  { name: "Gaming Apps", icon: "🎮", category: "Games" },
  { name: "News Apps", icon: "📰", category: "News" }
];

export function AddAppBlockDialog({ open, onOpenChange, onAddApp }: AddAppBlockDialogProps) {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [customDomains, setCustomDomains] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [installedApps, setInstalledApps] = useState<AppInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadInstalledApps();
    }
  }, [open]);

  const loadInstalledApps = async () => {
    setIsLoading(true);
    setPermissionError(null);
    try {
      // Request permissions if not already granted
      if (!hasPermission) {
        const granted = await nativeCapabilities.requestPermissions();
        setHasPermission(granted);
        if (!granted) {
          setPermissionError("Please grant the required permissions to access installed apps.");
          return;
        }
      }

      const apps = await nativeCapabilities.getInstalledApps();
      setInstalledApps(apps);
    } catch (error) {
      console.error('Failed to load installed apps:', error);
      setPermissionError("Failed to load installed apps. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSettings = async () => {
    await nativeCapabilities.openSettings();
  };

  const handleAddApp = () => {
    if (!selectedApp) {
      toast({
        title: "No App Selected",
        description: "Please select an app to add.",
        variant: "destructive"
      });
      return;
    }

    const app = installedApps.find(app => app.packageName === selectedApp);
    if (app) {
      onAddApp({
        name: app.name,
        packageName: app.packageName
      });
      setSelectedApp("");
      onOpenChange(false);
    }
  };

  const handleRemoveApp = (appName: string) => {
    setSelectedApps(selectedApps.filter(app => app !== appName));
  };

  const handleAddDomain = () => {
    if (newDomain && !customDomains.includes(newDomain)) {
      setCustomDomains([...customDomains, newDomain]);
      setNewDomain("");
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setCustomDomains(customDomains.filter(d => d !== domain));
  };

  const handleCreateBlock = () => {
    if (selectedApps.length === 0 && customDomains.length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one app or domain to block.",
        variant: "destructive"
      });
      return;
    }

    const blockName = groupName || (selectedApps.length + customDomains.length === 1 
      ? selectedApps[0] || customDomains[0] 
      : "Mixed Block");

    const newBlock = {
      id: Date.now().toString(),
      name: blockName,
      apps: selectedApps,
      domains: customDomains,
      type: selectedApps.length > 0 && customDomains.length > 0 ? "mixed" : 
            selectedApps.length > 0 ? "apps" : "domains",
      blocked: false,
      createdAt: new Date().toISOString()
    };

    onAddApp(newBlock);
    
    // Reset form
    setSelectedApps([]);
    setCustomDomains([]);
    setGroupName("");
    setNewDomain("");
    
    toast({
      title: "Block created! 🚫",
      description: `${blockName} has been added to your block list.`
    });
    
    onOpenChange(false);
  };

  const filteredApps = installedApps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add New App Block</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="apps" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="apps" className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4" />
              <span>Apps</span>
            </TabsTrigger>
            <TabsTrigger value="domains" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Domains</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="apps" className="space-y-4">
            <div>
              <Label>Popular Apps</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {popularApps.map((app) => (
                  <Button
                    key={app.name}
                    variant={selectedApps.includes(app.name) ? "default" : "outline"}
                    size="sm"
                    onClick={() => selectedApps.includes(app.name) 
                      ? handleRemoveApp(app.name) 
                      : setSelectedApp(app.packageName)
                    }
                    className="justify-start"
                  >
                    <span className="mr-2">{app.icon}</span>
                    {app.name}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Installed Apps</Label>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search installed apps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                  disabled={!hasPermission}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-[200px] overflow-y-auto">
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    <Select value={selectedApp} onValueChange={setSelectedApp}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an app" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredApps.map((app) => (
                          <SelectItem key={app.packageName} value={app.packageName || ""}>
                            <div className="flex items-center gap-2">
                              {app.icon && <span>{app.icon}</span>}
                              <span>{app.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </ScrollArea>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="domains" className="space-y-4">
            <div>
              <Label htmlFor="domain">Add Custom Domain</Label>
              <div className="flex space-x-2 mt-2">
                <Input
                  id="domain"
                  placeholder="e.g., facebook.com, youtube.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddDomain()}
                />
                <Button onClick={handleAddDomain} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Selected Items */}
        {(selectedApps.length > 0 || customDomains.length > 0) && (
          <div className="space-y-2">
            <Label>Selected Items ({selectedApps.length + customDomains.length})</Label>
            <div className="flex flex-wrap gap-2">
              {selectedApps.map((app) => (
                <Badge key={app} variant="secondary" className="flex items-center space-x-1">
                  <span>{app}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveApp(app)}
                  />
                </Badge>
              ))}
              {customDomains.map((domain) => (
                <Badge key={domain} variant="outline" className="flex items-center space-x-1">
                  <span>{domain}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleRemoveDomain(domain)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Group Name */}
        {(selectedApps.length + customDomains.length) > 1 && (
          <div className="space-y-2">
            <Label htmlFor="groupName">Group Name (Optional)</Label>
            <Input
              id="groupName"
              placeholder="e.g., Social Media, Entertainment"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateBlock} 
            disabled={!selectedApp || isLoading || !hasPermission}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <Users className="h-4 w-4 mr-2" />
            Create Block
          </Button>
        </div>

        {permissionError && (
          <div className="mt-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Permission Required</AlertTitle>
              <AlertDescription className="flex flex-col gap-2">
                <p>{permissionError}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleOpenSettings}
                  className="w-fit"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Open Settings
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
