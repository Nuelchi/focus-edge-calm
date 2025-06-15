
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { nativeCapabilities } from "@/services/nativeCapabilities";
import { notificationService, NotificationEvent } from "@/services/notificationService";

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
  lastNotification?: NotificationEvent;
}

export const useFocusSession = () => {
  const [activeSession, setActiveSession] = useState<FocusSession | null>(null);
  const [focusLogs, setFocusLogs] = useState<FocusSession[]>([]);
  const { toast } = useToast();

  const handleStartFocus = async (newSession: FocusSession) => {
    console.log('Starting focus session:', newSession);
    
    // Request notification permission if unlock on notification is enabled
    if (newSession.unlockConditions?.unlockOnNotification) {
      const hasPermission = await notificationService.requestPermission();
      if (!hasPermission) {
        toast({
          title: "Notification Permission Required",
          description: "Please grant notification permission for unlock-on-notification to work.",
          variant: "destructive"
        });
      }
    }
    
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
    
    // Set up notification-based unlock
    if (unlockConditions?.unlockOnNotification) {
      console.log('Setting up notification-based unlock with sources:', unlockConditions.notificationSources);
      
      notificationService.startListening(
        session.id,
        {
          sources: unlockConditions.notificationSources,
          unlockOnNotification: true,
          priority: 'high' // Only high priority notifications trigger unlock by default
        },
        (notificationEvent: NotificationEvent) => {
          console.log('Notification triggered unlock:', notificationEvent);
          unlockApps(session, 'notification', notificationEvent);
        }
      );
    }
    
    // Set up time-based unlock if specified and not in strict mode
    if (unlockConditions?.customTimeMinutes && !session.strictMode) {
      console.log(`Setting up time-based unlock in ${unlockConditions.customTimeMinutes} minutes`);
      setTimeout(() => {
        // Only unlock if session is still active (not already unlocked by notification)
        setActiveSession(current => {
          if (current && current.id === session.id && current.status === 'active') {
            unlockApps(session, 'time');
          }
          return current;
        });
      }, unlockConditions.customTimeMinutes * 60 * 1000);
    }
  };

  const unlockApps = async (session: FocusSession, reason: 'time' | 'notification' | 'manual', notificationEvent?: NotificationEvent) => {
    console.log(`Unlocking apps for session ${session.id} due to: ${reason}`);
    
    // Stop listening for notifications
    notificationService.stopListening(session.id);
    
    // Update session status
    setActiveSession(prev => {
      if (prev && prev.id === session.id) {
        return {
          ...prev,
          status: 'unlocked',
          unlockReason: reason,
          unlockedAt: new Date().toISOString(),
          lastNotification: notificationEvent
        };
      }
      return prev;
    });
    
    // Update focus logs
    setFocusLogs(prev => 
      prev.map(log => 
        log.id === session.id 
          ? { 
              ...log, 
              status: 'unlocked', 
              unlockReason: reason, 
              unlockedAt: new Date().toISOString(),
              lastNotification: notificationEvent
            }
          : log
      )
    );
    
    const reasonText = reason === 'notification' 
      ? `${notificationEvent?.source || 'incoming'} notification: "${notificationEvent?.title}"` 
      : reason === 'time' 
        ? 'time limit reached' 
        : 'manual unlock';
    
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

  // Method to manually trigger notification for testing
  const triggerTestNotification = (type: 'high-priority' | 'normal' | 'call' = 'normal') => {
    if (activeSession && activeSession.unlockConditions?.unlockOnNotification) {
      const testEvent = notificationService.triggerTestNotification(type);
      unlockApps(activeSession, 'notification', testEvent);
    }
  };

  return {
    activeSession,
    focusLogs,
    handleStartFocus,
    endSession,
    getUsageStats,
    triggerTestNotification
  };
};
