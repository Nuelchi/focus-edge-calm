
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface App {
  name: string;
  icon: string;
  blocked: boolean;
  category: string;
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
    { name: "Instagram", icon: "📷", blocked: true, category: "Social Media" },
    { name: "YouTube", icon: "📺", blocked: false, category: "Entertainment" },
    { name: "WhatsApp", icon: "💬", blocked: true, category: "Messaging" }
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

  const { toast } = useToast();

  const toggleAppBlock = (appName: string) => {
    setBlockedApps(prev => 
      prev.map(app => 
        app.name === appName 
          ? { ...app, blocked: !app.blocked }
          : app
      )
    );
    
    const app = blockedApps.find(app => app.name === appName);
    toast({
      title: `${appName} ${app?.blocked ? 'Unblocked' : 'Blocked'}`,
      description: `${appName} is now ${app?.blocked ? 'available' : 'blocked'}.`,
    });
  };

  const handleAddBlock = (newBlock: any) => {
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

  return {
    blockedApps,
    availableBlocks,
    toggleAppBlock,
    handleAddBlock
  };
};
