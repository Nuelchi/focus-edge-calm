
export interface NotificationConfig {
  sources: string[];
  unlockOnNotification: boolean;
  priority?: 'high' | 'normal' | 'low';
}

export interface NotificationEvent {
  source: string;
  title: string;
  body: string;
  timestamp: string;
  priority: 'high' | 'normal' | 'low';
}

class NotificationService {
  private listeners: Map<string, (event: NotificationEvent) => void> = new Map();
  private permissionGranted = false;
  private simulationTimer: NodeJS.Timeout | null = null;

  async requestPermission(): Promise<boolean> {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        this.permissionGranted = permission === 'granted';
        console.log('Notification permission:', permission);
        return this.permissionGranted;
      } catch (error) {
        console.error('Failed to request notification permission:', error);
        return false;
      }
    }
    return false;
  }

  hasPermission(): boolean {
    if ('Notification' in window) {
      return Notification.permission === 'granted';
    }
    return false;
  }

  startListening(sessionId: string, config: NotificationConfig, callback: (event: NotificationEvent) => void): void {
    console.log(`Starting notification listener for session ${sessionId}`, config);
    
    this.listeners.set(sessionId, callback);

    // In a real mobile app, this would integrate with:
    // - Android: NotificationListenerService
    // - iOS: UserNotifications framework
    
    // For web demo, we'll simulate notifications with various scenarios
    this.simulateNotifications(sessionId, config, callback);
  }

  stopListening(sessionId: string): void {
    console.log(`Stopping notification listener for session ${sessionId}`);
    this.listeners.delete(sessionId);
    
    if (this.simulationTimer) {
      clearTimeout(this.simulationTimer);
      this.simulationTimer = null;
    }
  }

  private simulateNotifications(sessionId: string, config: NotificationConfig, callback: (event: NotificationEvent) => void): void {
    // Simulate different types of notifications that might arrive
    const simulatedNotifications = [
      { source: 'whatsapp', title: 'New Message', body: 'Hey, are you free?', priority: 'high' as const },
      { source: 'email', title: 'Important Email', body: 'Meeting reminder', priority: 'normal' as const },
      { source: 'calendar', title: 'Meeting in 15 min', body: 'Daily standup', priority: 'high' as const },
      { source: 'slack', title: 'Slack notification', body: 'You have been mentioned', priority: 'normal' as const },
      { source: 'phone', title: 'Incoming Call', body: 'Mom calling', priority: 'high' as const },
    ];

    // Randomly trigger a notification between 10-60 seconds for demo purposes
    const delay = Math.random() * 50000 + 10000; // 10-60 seconds
    
    this.simulationTimer = setTimeout(() => {
      const randomNotification = simulatedNotifications[Math.floor(Math.random() * simulatedNotifications.length)];
      
      // Check if this notification source should trigger unlock
      const shouldUnlock = config.sources.includes('any') || 
                          config.sources.includes(randomNotification.source) ||
                          (config.priority && randomNotification.priority === 'high');

      if (shouldUnlock && config.unlockOnNotification) {
        const notificationEvent: NotificationEvent = {
          ...randomNotification,
          timestamp: new Date().toISOString()
        };

        console.log('Notification received that triggers unlock:', notificationEvent);
        callback(notificationEvent);
      } else {
        console.log('Notification received but does not trigger unlock:', randomNotification);
        // Continue listening for more notifications
        this.simulateNotifications(sessionId, config, callback);
      }
    }, delay);
  }

  // Method to manually trigger a notification for testing
  triggerTestNotification(type: 'high-priority' | 'normal' | 'call' = 'normal'): NotificationEvent {
    const testNotifications = {
      'high-priority': { source: 'emergency', title: 'Urgent!', body: 'Emergency contact', priority: 'high' as const },
      'normal': { source: 'email', title: 'Test Email', body: 'This is a test notification', priority: 'normal' as const },
      'call': { source: 'phone', title: 'Incoming Call', body: 'Test caller', priority: 'high' as const }
    };

    return {
      ...testNotifications[type],
      timestamp: new Date().toISOString()
    };
  }
}

export const notificationService = new NotificationService();
