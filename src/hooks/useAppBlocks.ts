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
  createdAt: string;
  lastModified?: string;
}

export const useAppBlocks = () => {
  const [blockedApps, setBlockedApps] = useState<App[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<Block[]>([]);
  const [installedApps, setInstalledApps] = useState<AppInfo[]>([]);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    initializeNativeCapabilities();
    // Load saved blocks from storage
    loadSavedBlocks();
  }, []);

  // Check for app changes periodically
  useEffect(() => {
    const checkInterval = setInterval(async () => {
      const currentApps = await nativeCapabilities.getInstalledApps();
      handleAppChanges(currentApps);
    }, 30000); // Check every 30 seconds

    return () => clearInterval(checkInterval);
  }, [installedApps, availableBlocks]);

  const loadSavedBlocks = async () => {
    try {
      const savedBlocks = localStorage.getItem('appBlocks');
      if (savedBlocks) {
        setAvailableBlocks(JSON.parse(savedBlocks));
      }
    } catch (error) {
      console.error('Failed to load saved blocks:', error);
    }
  };

  const saveBlocks = (blocks: Block[]) => {
    try {
      localStorage.setItem('appBlocks', JSON.stringify(blocks));
    } catch (error) {
      console.error('Failed to save blocks:', error);
    }
  };

  const handleAppChanges = (currentApps: AppInfo[]) => {
    // Check for newly installed apps that were previously blocked
    const newApps = currentApps.filter(app => 
      !installedApps.some(installed => installed.packageName === app.packageName)
    );

    // Check for uninstalled apps
    const uninstalledApps = installedApps.filter(app =>
      !currentApps.some(current => current.packageName === app.packageName)
    );

    // Update blocks for newly installed apps
    if (newApps.length > 0) {
      setAvailableBlocks(prevBlocks => {
        const updatedBlocks = prevBlocks.map(block => {
          const hasNewApp = newApps.some(app => block.apps.includes(app.name));
          if (hasNewApp) {
            return {
              ...block,
              lastModified: new Date().toISOString()
            };
          }
          return block;
        });
        saveBlocks(updatedBlocks);
        return updatedBlocks;
      });

      toast({
        title: "New Apps Detected",
        description: `${newApps.length} new app(s) installed. Blocking rules have been updated.`,
      });
    }

    // Handle uninstalled apps
    if (uninstalledApps.length > 0) {
      setAvailableBlocks(prevBlocks => {
        const updatedBlocks = prevBlocks.map(block => {
          const hasUninstalledApp = uninstalledApps.some(app => block.apps.includes(app.name));
          if (hasUninstalledApp) {
            return {
              ...block,
              lastModified: new Date().toISOString()
            };
          }
          return block;
        });
        saveBlocks(updatedBlocks);
        return updatedBlocks;
      });

      toast({
        title: "Apps Uninstalled",
        description: `${uninstalledApps.length} app(s) were uninstalled. Blocking rules have been updated.`,
      });
    }

    setInstalledApps(currentApps);
  };

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
      blocked: false,
      createdAt: new Date().toISOString()
    };
    
    setAvailableBlocks(prev => {
      const updated = [...prev, blockWithId];
      saveBlocks(updated);
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
      setAvailableBlocks(prev => {
        const updated = prev.map(b => 
          b.id === blockId ? { ...b, blocked: true, lastModified: new Date().toISOString() } : b
        );
        saveBlocks(updated);
        return updated;
      });
      
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
      setAvailableBlocks(prev => {
        const updated = prev.map(b => 
          b.id === blockId ? { ...b, blocked: false, lastModified: new Date().toISOString() } : b
        );
        saveBlocks(updated);
        return updated;
      });
      
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
