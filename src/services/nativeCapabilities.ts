
import { Capacitor } from '@capacitor/core';

export interface AppInfo {
  name: string;
  packageName: string;
  icon?: string;
}

export interface BlockingRule {
  id: string;
  name: string;
  apps: string[];
  domains: string[];
  isActive: boolean;
  schedule?: {
    startTime: string;
    endTime: string;
    days: string[];
  };
}

class NativeCapabilitiesService {
  private isNative = Capacitor.isNativePlatform();

  async requestPermissions(): Promise<boolean> {
    if (!this.isNative) {
      console.log('Running in web mode - permissions simulation');
      return true;
    }

    try {
      // Request device admin permissions for app blocking
      // Request usage access permissions for monitoring
      // Request accessibility permissions for domain blocking
      console.log('Requesting native permissions...');
      return true;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  async getInstalledApps(): Promise<AppInfo[]> {
    if (!this.isNative) {
      // Return mock data for web testing
      return [
        { name: 'Instagram', packageName: 'com.instagram.android' },
        { name: 'YouTube', packageName: 'com.google.android.youtube' },
        { name: 'WhatsApp', packageName: 'com.whatsapp' },
        { name: 'TikTok', packageName: 'com.zhiliaoapp.musically' },
        { name: 'Facebook', packageName: 'com.facebook.katana' },
      ];
    }

    try {
      // Native implementation would use a custom plugin
      // to get installed apps from the device
      console.log('Getting installed apps...');
      return [];
    } catch (error) {
      console.error('Failed to get installed apps:', error);
      return [];
    }
  }

  async blockApps(appPackages: string[]): Promise<boolean> {
    if (!this.isNative) {
      console.log('Simulating app blocking for:', appPackages);
      return true;
    }

    try {
      // Native implementation would use device admin API
      // to block specified apps
      console.log('Blocking apps:', appPackages);
      return true;
    } catch (error) {
      console.error('Failed to block apps:', error);
      return false;
    }
  }

  async unblockApps(appPackages: string[]): Promise<boolean> {
    if (!this.isNative) {
      console.log('Simulating app unblocking for:', appPackages);
      return true;
    }

    try {
      // Native implementation would remove app restrictions
      console.log('Unblocking apps:', appPackages);
      return true;
    } catch (error) {
      console.error('Failed to unblock apps:', error);
      return false;
    }
  }

  async blockDomains(domains: string[]): Promise<boolean> {
    if (!this.isNative) {
      console.log('Simulating domain blocking for:', domains);
      return true;
    }

    try {
      // Native implementation would modify device DNS/VPN
      // or use accessibility service to block domains
      console.log('Blocking domains:', domains);
      return true;
    } catch (error) {
      console.error('Failed to block domains:', error);
      return false;
    }
  }

  async unblockDomains(domains: string[]): Promise<boolean> {
    if (!this.isNative) {
      console.log('Simulating domain unblocking for:', domains);
      return true;
    }

    try {
      // Native implementation would remove domain restrictions
      console.log('Unblocking domains:', domains);
      return true;
    } catch (error) {
      console.error('Failed to unblock domains:', error);
      return false;
    }
  }

  async startUsageMonitoring(): Promise<boolean> {
    if (!this.isNative) {
      console.log('Simulating usage monitoring start');
      return true;
    }

    try {
      // Native implementation would start background service
      // to monitor app usage and blocked attempts
      console.log('Starting usage monitoring...');
      return true;
    } catch (error) {
      console.error('Failed to start usage monitoring:', error);
      return false;
    }
  }

  async getUsageStats(timeRange: { start: Date; end: Date }): Promise<any[]> {
    if (!this.isNative) {
      // Return mock usage data for web testing
      return [
        {
          appName: 'Instagram',
          packageName: 'com.instagram.android',
          usageTime: 45 * 60 * 1000, // 45 minutes in milliseconds
          blockedAttempts: 12,
          lastUsed: new Date().toISOString(),
        },
        {
          appName: 'YouTube',
          packageName: 'com.google.android.youtube',
          usageTime: 30 * 60 * 1000, // 30 minutes
          blockedAttempts: 8,
          lastUsed: new Date().toISOString(),
        },
      ];
    }

    try {
      // Native implementation would query usage access API
      console.log('Getting usage stats for range:', timeRange);
      return [];
    } catch (error) {
      console.error('Failed to get usage stats:', error);
      return [];
    }
  }

  async scheduleBlocking(rule: BlockingRule): Promise<boolean> {
    if (!this.isNative) {
      console.log('Simulating scheduled blocking for rule:', rule.name);
      return true;
    }

    try {
      // Native implementation would use AlarmManager or WorkManager
      // to schedule blocking/unblocking based on time rules
      console.log('Scheduling blocking rule:', rule);
      return true;
    } catch (error) {
      console.error('Failed to schedule blocking:', error);
      return false;
    }
  }

  isRunningNatively(): boolean {
    return this.isNative;
  }
}

export const nativeCapabilities = new NativeCapabilitiesService();
