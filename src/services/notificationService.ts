
export interface NotificationConfig {
  sources: string[];
  unlockOnNotification: boolean;
  priority?: 'high' | 'normal' | 'low';
}

export interface NotificationEvent {
  source: string;
  appName: string;
  packageName?: string;
  title: string;
  body: string;
  timestamp: string;
  priority: 'high' | 'normal' | 'low';
  category?: 'message' | 'call' | 'email' | 'social' | 'work' | 'emergency';
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
    // Enhanced simulation with more detailed app information
    const simulatedNotifications = [
      { 
        source: 'whatsapp', 
        appName: 'WhatsApp', 
        packageName: 'com.whatsapp',
        title: 'New Message from Mom', 
        body: 'Hey, are you free to talk?', 
        priority: 'high' as const,
        category: 'message' as const
      },
      { 
        source: 'email', 
        appName: 'Gmail', 
        packageName: 'com.google.android.gm',
        title: 'Important: Meeting Reminder', 
        body: 'Your 3 PM meeting starts in 15 minutes', 
        priority: 'high' as const,
        category: 'work' as const
      },
      { 
        source: 'calendar', 
        appName: 'Google Calendar', 
        packageName: 'com.google.android.calendar',
        title: 'Meeting in 5 minutes', 
        body: 'Daily standup with the team', 
        priority: 'high' as const,
        category: 'work' as const
      },
      { 
        source: 'slack', 
        appName: 'Slack', 
        packageName: 'com.slack',
        title: 'Direct Message', 
        body: 'You have been mentioned in #urgent-channel', 
        priority: 'high' as const,
        category: 'work' as const
      },
      { 
        source: 'phone', 
        appName: 'Phone', 
        packageName: 'com.android.dialer',
        title: 'Incoming Call', 
        body: 'Call from: Mom (+1 555-0123)', 
        priority: 'high' as const,
        category: 'call' as const
      },
      { 
        source: 'instagram', 
        appName: 'Instagram', 
        packageName: 'com.instagram.android',
        title: 'New follower', 
        body: 'john_doe started following you', 
        priority: 'normal' as const,
        category: 'social' as const
      },
      { 
        source: 'emergency', 
        appName: 'Emergency Alerts', 
        packageName: 'com.android.emergency',
        title: 'Emergency Alert', 
        body: 'Severe weather warning in your area', 
        priority: 'high' as const,
        category: 'emergency' as const
      }
    ];

    // Randomly trigger a notification between 10-60 seconds for demo purposes
    const delay = Math.random() * 50000 + 10000; // 10-60 seconds
    
    this.simulationTimer = setTimeout(() => {
      const randomNotification = simulatedNotifications[Math.floor(Math.random() * simulatedNotifications.length)];
      
      // Check if this notification source should trigger unlock
      const shouldUnlock = config.sources.includes('any') || 
                          config.sources.includes(randomNotification.source) ||
                          config.sources.includes(randomNotification.appName.toLowerCase()) ||
                          (config.priority && randomNotification.priority === 'high') ||
                          randomNotification.category === 'emergency' ||
                          randomNotification.category === 'call';

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

  // Enhanced method to manually trigger specific app notifications for testing
  triggerTestNotification(type: 'high-priority' | 'normal' | 'call' | 'whatsapp' | 'work-email' = 'normal'): NotificationEvent {
    const testNotifications = {
      'high-priority': { 
        source: 'emergency', 
        appName: 'Emergency Alerts', 
        packageName: 'com.android.emergency',
        title: 'Emergency Alert!', 
        body: 'Critical system notification', 
        priority: 'high' as const,
        category: 'emergency' as const
      },
      'normal': { 
        source: 'email', 
        appName: 'Gmail', 
        packageName: 'com.google.android.gm',
        title: 'Test Email', 
        body: 'This is a test notification from Gmail', 
        priority: 'normal' as const,
        category: 'email' as const
      },
      'call': { 
        source: 'phone', 
        appName: 'Phone', 
        packageName: 'com.android.dialer',
        title: 'Incoming Call', 
        body: 'Call from: Test Contact', 
        priority: 'high' as const,
        category: 'call' as const
      },
      'whatsapp': { 
        source: 'whatsapp', 
        appName: 'WhatsApp', 
        packageName: 'com.whatsapp',
        title: 'New WhatsApp Message', 
        body: 'Hey! Important message here', 
        priority: 'high' as const,
        category: 'message' as const
      },
      'work-email': { 
        source: 'email', 
        appName: 'Outlook', 
        packageName: 'com.microsoft.office.outlook',
        title: 'Urgent: Project Deadline', 
        body: 'The client needs the report by 5 PM today', 
        priority: 'high' as const,
        category: 'work' as const
      }
    };

    return {
      ...testNotifications[type],
      timestamp: new Date().toISOString()
    };
  }

  // Method to get available notification sources for configuration
  getAvailableNotificationSources(): Array<{source: string, appName: string, description: string}> {
    return [
      { source: 'any', appName: 'Any App', description: 'All notifications from any app' },
      { source: 'whatsapp', appName: 'WhatsApp', description: 'Messages from WhatsApp' },
      { source: 'phone', appName: 'Phone', description: 'Incoming calls' },
      { source: 'email', appName: 'Email Apps', description: 'Gmail, Outlook, etc.' },
      { source: 'slack', appName: 'Slack', description: 'Work messages from Slack' },
      { source: 'calendar', appName: 'Calendar', description: 'Meeting reminders' },
      { source: 'emergency', appName: 'Emergency', description: 'Emergency alerts only' },
    ];
  }
}

export const notificationService = new NotificationService();
