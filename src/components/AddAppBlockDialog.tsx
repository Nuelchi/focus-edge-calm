
import { useState } from "react";
import { Plus, Smartphone, Globe, Users, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface AddAppBlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddBlock: (block: any) => void;
}

const popularApps = [
  { name: "Instagram", icon: "📷", category: "Social Media" },
  { name: "TikTok", icon: "🎵", category: "Entertainment" },
  { name: "YouTube", icon: "📺", category: "Entertainment" },
  { name: "Facebook", icon: "👥", category: "Social Media" },
  { name: "Twitter", icon: "🐦", category: "Social Media" },
  { name: "Snapchat", icon: "👻", category: "Social Media" },
  { name: "WhatsApp", icon: "💬", category: "Messaging" },
  { name: "Netflix", icon: "🎬", category: "Entertainment" },
  { name: "Gaming Apps", icon: "🎮", category: "Games" },
  { name: "News Apps", icon: "📰", category: "News" }
];

const AddAppBlockDialog = ({ open, onOpenChange, onAddBlock }: AddAppBlockDialogProps) => {
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [customDomains, setCustomDomains] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const { toast } = useToast();

  const handleAddApp = (appName: string) => {
    if (!selectedApps.includes(appName)) {
      setSelectedApps([...selectedApps, appName]);
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

    onAddBlock(newBlock);
    
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
                      : handleAddApp(app.name)
                    }
                    className="justify-start"
                  >
                    <span className="mr-2">{app.icon}</span>
                    {app.name}
                  </Button>
                ))}
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
          <Button onClick={handleCreateBlock} className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Users className="h-4 w-4 mr-2" />
            Create Block
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppBlockDialog;
