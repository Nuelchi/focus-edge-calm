
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { nativeCapabilities, AppInfo } from "@/services/nativeCapabilities";

interface App {
  name: string;
  icon: string;
  blocked: boolean;
  category: string;
  packageName?: string;
}

interface Block {
  id: string;
  name: string;
  apps: string[];
  domains: string[];
  type: string;
  blocked: boolean;
}

export const useAppBlocks = () => {
  const [blockedApps, setBlockedApps] = useState<App[]>([
    { name: "Instagram", icon: "📷", blocked: true, category: "Social Media", packageName: "com.instagram.android" },
    { name: "YouTube", icon: "📺", blocked: false, category: "Entertainment", packageName: "com.google.android.youtube" },
    { name: "WhatsApp", icon: "💬", blocked: true, category: "Messaging", packageName: "com.whatsapp" }
  ]);

  const [availableBlocks, setAvailableBlocks] = useState<Block[]>([
    {
      id: "1",
      name: "Social Media Block",
      apps: ["Instagram", "Facebook", "TikTok"],
      domains: ["facebook.com", "instagram.com"],
      type: "mixed",
      blocked: false
    },
    {
      id: "2", 
      name: "Entertainment",
      apps: ["YouTube", "Netflix"],
      domains: ["youtube.com", "netflix.com"],
      type: "mixed",
      blocked: false
    }
  ]);

  const [installedApps, setInstalledApps] = useState<AppInfo[]>([]);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    initializeNativeCapabilities();
  }, []);

  const initializeNativeCapabilities = async () => {
    console.log('Initializing native capabilities...');
    
    // Request permissions
    const permissions = await nativeCapabilities.requestPermissions();
    setPermissionsGranted(permissions);
    
    if (permissions) {
      // Get installed apps
      const apps = await nativeCapabilities.getInstalledApps();
      setInstalledApps(apps);
      
      // Start usage monitoring
      await nativeCapabilities.startUsageMonitoring();
      
      toast({
        title: nativeCapabilities.isRunningNatively() ? "Native capabilities enabled! 📱" : "Demo mode active 🌐",
        description: nativeCapabilities.isRunningNatively() 
          ? "App blocking and monitoring features are now active."
          : "Running in web demo mode. Install as mobile app for full functionality.",
      });
    } else {
      toast({
        title: "Permissions required",
        description: "Please grant necessary permissions for app blocking to work.",
        variant: "destructive"
      });
    }
  };

  const toggleAppBlock = async (appName: string) => {
    const app = blockedApps.find(app => app.name === appName);
    if (!app) return;

    const newBlockedState = !app.blocked;
    
    // Update local state first
    setBlockedApps(prev => 
      prev.map(app => 
        app.name === appName 
          ? { ...app, blocked: newBlockedState }
          : app
      )
    );

    // Apply native blocking/unblocking
    if (app.packageName) {
      const success = newBlockedState 
        ? await nativeCapabilities.blockApps([app.packageName])
        : await nativeCapabilities.unblockApps([app.packageName]);
        
      if (!success) {
        // Revert state if native operation failed
        setBlockedApps(prev => 
          prev.map(app => 
            app.name === appName 
              ? { ...app, blocked: !newBlockedState }
              : app
          )
        );
        
        toast({
          title: "Failed to update block",
          description: `Could not ${newBlockedState ? 'block' : 'unblock'} ${appName}.`,
          variant: "destructive"
        });
        return;
      }
    }
    
    toast({
      title: `${appName} ${newBlockedState ? 'Blocked' : 'Unblocked'}`,
      description: `${appName} is now ${newBlockedState ? 'blocked' : 'available'}.`,
    });
  };

  const handleAddBlock = async (newBlock: any) => {
    const blockWithId = {
      ...newBlock,
      id: Date.now().toString(),
      blocked: false
    };
    
    console.log('Adding new block:', blockWithId);
    setAvailableBlocks(prev => {
      const updated = [...prev, blockWithId];
      console.log('Updated available blocks:', updated);
      return updated;
    });
    
    toast({
      title: "Block created successfully! 🎯",
      description: `${newBlock.name} has been added to your available blocks.`,
    });
  };

  const activateBlock = async (blockId: string) => {
    const block = availableBlocks.find(b => b.id === blockId);
    if (!block) return;

    // Get package names for apps to block
    const appsToBlock = block.apps.map(appName => {
      const installedApp = installedApps.find(app => app.name === appName);
      return installedApp?.packageName;
    }).filter(Boolean) as string[];

    // Block apps and domains
    const [appsBlocked, domainsBlocked] = await Promise.all([
      appsToBlock.length > 0 ? nativeCapabilities.blockApps(appsToBlock) : true,
      block.domains.length > 0 ? nativeCapabilities.blockDomains(block.domains) : true
    ]);

    if (appsBlocked && domainsBlocked) {
      setAvailableBlocks(prev => 
        prev.map(b => 
          b.id === blockId ? { ...b, blocked: true } : b
        )
      );
      
      toast({
        title: "Block activated! 🚫",
        description: `${block.name} is now active.`,
      });
    } else {
      toast({
        title: "Failed to activate block",
        description: "Could not activate all blocking rules.",
        variant: "destructive"
      });
    }
  };

  const deactivateBlock = async (blockId: string) => {
    const block = availableBlocks.find(b => b.id === blockId);
    if (!block) return;

    // Get package names for apps to unblock
    const appsToUnblock = block.apps.map(appName => {
      const installedApp = installedApps.find(app => app.name === appName);
      return installedApp?.packageName;
    }).filter(Boolean) as string[];

    // Unblock apps and domains
    const [appsUnblocked, domainsUnblocked] = await Promise.all([
      appsToUnblock.length > 0 ? nativeCapabilities.unblockApps(appsToUnblock) : true,
      block.domains.length > 0 ? nativeCapabilities.unblockDomains(block.domains) : true
    ]);

    if (appsUnblocked && domainsUnblocked) {
      setAvailableBlocks(prev => 
        prev.map(b => 
          b.id === blockId ? { ...b, blocked: false } : b
        )
      );
      
      toast({
        title: "Block deactivated! ✅",
        description: `${block.name} is now inactive.`,
      });
    } else {
      toast({
        title: "Failed to deactivate block",
        description: "Could not remove all blocking rules.",
        variant: "destructive"
      });
    }
  };

  return {
    blockedApps,
    availableBlocks,
    installedApps,
    permissionsGranted,
    toggleAppBlock,
    handleAddBlock,
    activateBlock,
    deactivateBlock,
    initializeNativeCapabilities
  };
};
