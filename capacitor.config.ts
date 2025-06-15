
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e73318f8acaf4f99ac6cc0f4a6ef2433',
  appName: 'focus-edge-calm',
  webDir: 'dist',
  server: {
    url: 'https://e73318f8-acaf-4f99-ac6c-c0f4a6ef2433.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999"
    }
  }
};

export default config;
