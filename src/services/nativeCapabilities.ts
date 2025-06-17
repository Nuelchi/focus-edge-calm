import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';

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
  private hasPermission: boolean = false;

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
  }

  isRunningNatively(): boolean {
    return this.isNative;
  }

  async openSettings(): Promise<void> {
    try {
      await App.openSettings();
    } catch (error) {
      console.error('Error opening settings:', error);
    }
  }

  async requestPermissions(): Promise<boolean> {
    if (!this.isNative) return true;

    try {
      // For Android
      if (Capacitor.getPlatform() === 'android') {
        // Request app usage access permission
        const result = await Device.requestPermissions({
          permissions: ['usageStats']
        });
        
        if (result.usageStats !== 'granted') {
          // Open settings if permission not granted
          await this.openSettings();
          return false;
        }
        
        this.hasPermission = true;
        return true;
      }
      
      // For iOS
      if (Capacitor.getPlatform() === 'ios') {
        // Request app tracking transparency permission
        const result = await App.requestTrackingAuthorization();
        
        if (result.status !== 'authorized') {
          // Open settings if permission not granted
          await this.openSettings();
          return false;
        }
        
        this.hasPermission = true;
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error requesting permissions:', error);
      return false;
    }
  }

  async getInstalledApps(): Promise<AppInfo[]> {
    if (!this.isNative) {
      // Mock data for web testing
      return [
        { name: "Instagram", packageName: "com.instagram.android", icon: "📷" },
        { name: "YouTube", packageName: "com.google.android.youtube", icon: "📺" },
        { name: "WhatsApp", packageName: "com.whatsapp", icon: "💬" }
      ];
    }

    if (!this.hasPermission) {
      throw new Error('Permission required to get installed apps');
    }

    try {
      // For Android
      if (Capacitor.getPlatform() === 'android') {
        // Use the App plugin to get app info
        const appInfo = await App.getInfo();
        return [{
          name: appInfo.name,
          packageName: appInfo.id,
          icon: "📱"
        }];
      }
      
      // For iOS
      if (Capacitor.getPlatform() === 'ios') {
        // Use the App plugin to get app info
        const appInfo = await App.getInfo();
        return [{
          name: appInfo.name,
          packageName: appInfo.id,
          icon: "📱"
        }];
      }

      return [];
    } catch (error) {
      console.error('Error getting installed apps:', error);
      return [];
    }
  }

  async blockApps(packageNames: string[]): Promise<boolean> {
    if (!this.isNative) {
      console.log('Blocking apps (web):', packageNames);
      return true;
    }

    try {
      // Implement native app blocking logic here
      console.log('Blocking apps (native):', packageNames);
      return true;
    } catch (error) {
      console.error('Failed to block apps:', error);
      return false;
    }
  }

  async unblockApps(packageNames: string[]): Promise<boolean> {
    if (!this.isNative) {
      console.log('Unblocking apps (web):', packageNames);
      return true;
    }

    try {
      // Implement native app unblocking logic here
      console.log('Unblocking apps (native):', packageNames);
      return true;
    } catch (error) {
      console.error('Failed to unblock apps:', error);
      return false;
    }
  }

  async blockDomains(domains: string[]): Promise<boolean> {
    if (!this.isNative) {
      console.log('Blocking domains (web):', domains);
      return true;
    }

    try {
      // Implement native domain blocking logic here
      console.log('Blocking domains (native):', domains);
      return true;
    } catch (error) {
      console.error('Failed to block domains:', error);
      return false;
    }
  }

  async unblockDomains(domains: string[]): Promise<boolean> {
    if (!this.isNative) {
      console.log('Unblocking domains (web):', domains);
      return true;
    }

    try {
      // Implement native domain unblocking logic here
      console.log('Unblocking domains (native):', domains);
      return true;
    } catch (error) {
      console.error('Failed to unblock domains:', error);
      return false;
    }
  }

  async startUsageMonitoring(): Promise<void> {
    if (!this.isNative) {
      console.log('Starting usage monitoring (web)');
      return;
    }

    try {
      // Implement native usage monitoring logic here
      console.log('Starting usage monitoring (native)');
    } catch (error) {
      console.error('Failed to start usage monitoring:', error);
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
}

export const nativeCapabilities = new NativeCapabilitiesService();
export type { AppInfo };
