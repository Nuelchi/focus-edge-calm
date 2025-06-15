
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

  const handleStartFocus = (newSession: FocusSession) => {
    setActiveSession(newSession);
    setFocusLogs(prev => [...prev, newSession]);
    
    console.log('Starting focus session:', newSession);
    
    // Set up auto-unlock based on session settings
    if (newSession.unlockConditions) {
      setupAutoUnlock(newSession);
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

  const unlockApps = (session: FocusSession, reason: 'time' | 'notification' | 'manual') => {
    console.log(`Unlocking apps for session ${session.id} due to: ${reason}`);
    
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
    
    const reasonText = reason === 'notification' ? 'incoming notification' : 
                      reason === 'time' ? 'time limit reached' : 'manual unlock';
    
    toast({
      title: "Apps Unlocked! 🔓",
      description: `Focus session ended due to ${reasonText}.`,
    });
  };

  const endSession = () => {
    setActiveSession(null);
  };

  return {
    activeSession,
    focusLogs,
    handleStartFocus,
    endSession
  };
};
