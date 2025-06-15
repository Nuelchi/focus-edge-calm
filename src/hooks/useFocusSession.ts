
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { nativeCapabilities } from "@/services/nativeCapabilities";

interface FocusSession {
  id: string;
  title: string;
  blockId: string;
  status: 'active' | 'unlocked';
  unlockReason?: 'time' | 'notification' | 'manual';
  unlockedAt?: string;
  strictMode?: boolean;
  unlockConditions?: {
    unlockOnNotification: boolean;
    customTimeMinutes?: number;
    notificationSources: string[];
  };
}

export const useFocusSession = () => {
  const [activeSession, setActiveSession] = useState<FocusSession | null>(null);
  const [focusLogs, setFocusLogs] = useState<FocusSession[]>([]);
  const { toast } = useToast();

  const handleStartFocus = async (newSession: FocusSession) => {
    console.log('Starting focus session:', newSession);
    
    // Schedule the blocking rule with native capabilities
    const schedulingSuccess = await nativeCapabilities.scheduleBlocking({
      id: newSession.id,
      name: newSession.title,
      apps: [], // Will be populated based on blockId
      domains: [], // Will be populated based on blockId
      isActive: true,
      schedule: newSession.unlockConditions?.customTimeMinutes ? {
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + newSession.unlockConditions.customTimeMinutes * 60 * 1000).toISOString(),
        days: ['today']
      } : undefined
    });

    if (schedulingSuccess) {
      setActiveSession(newSession);
      setFocusLogs(prev => [...prev, newSession]);
      
      // Set up auto-unlock based on session settings
      if (newSession.unlockConditions) {
        setupAutoUnlock(newSession);
      }
      
      toast({
        title: "Focus session started! 🎯",
        description: `${newSession.title} is now active.`,
      });
    } else {
      toast({
        title: "Failed to start session",
        description: "Could not activate focus session. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const setupAutoUnlock = (session: FocusSession) => {
    const { unlockConditions } = session;
    
    // If notifications are enabled, set up notification listener
    if (unlockConditions?.unlockOnNotification) {
      console.log('Setting up notification-based unlock');
      // Request notification permission if not already granted
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
      
      // Listen for notifications (this would be implemented with actual notification API)
      // For demo, we'll simulate this
      if (unlockConditions.notificationSources.includes('any')) {
        // Set up listener for any notification
        setupNotificationListener(session);
      }
    }
    
    // Set up time-based unlock if specified and not in strict mode
    if (unlockConditions?.customTimeMinutes && !session.strictMode) {
      console.log(`Setting up time-based unlock in ${unlockConditions.customTimeMinutes} minutes`);
      setTimeout(() => {
        unlockApps(session, 'time');
      }, unlockConditions.customTimeMinutes * 60 * 1000);
    }
  };

  const setupNotificationListener = (session: FocusSession) => {
    // This is a simplified version - in a real app, you'd use the Notification API
    // and potentially integrate with system notifications
    console.log('Notification listener set up for session:', session.id);
    
    // Simulate notification unlock after 30 seconds for demo
    setTimeout(() => {
      unlockApps(session, 'notification');
    }, 30000);
  };

  const unlockApps = async (session: FocusSession, reason: 'time' | 'notification' | 'manual') => {
    console.log(`Unlocking apps for session ${session.id} due to: ${reason}`);
    
    // Update session status
    setActiveSession(prev => {
      if (prev && prev.id === session.id) {
        return {
          ...prev,
          status: 'unlocked',
          unlockReason: reason,
          unlockedAt: new Date().toISOString()
        };
      }
      return prev;
    });
    
    // Update focus logs
    setFocusLogs(prev => 
      prev.map(log => 
        log.id === session.id 
          ? { ...log, status: 'unlocked', unlockReason: reason, unlockedAt: new Date().toISOString() }
          : log
      )
    );
    
    const reasonText = reason === 'notification' ? 'incoming notification' : 
                      reason === 'time' ? 'time limit reached' : 'manual unlock';
    
    toast({
      title: "Apps Unlocked! 🔓",
      description: `Focus session ended due to ${reasonText}.`,
    });
  };

  const endSession = async () => {
    if (activeSession) {
      await unlockApps(activeSession, 'manual');
    }
    setActiveSession(null);
  };

  const getUsageStats = async (timeRange: { start: Date; end: Date }) => {
    return await nativeCapabilities.getUsageStats(timeRange);
  };

  return {
    activeSession,
    focusLogs,
    handleStartFocus,
    endSession,
    getUsageStats
  };
};
