import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.numeneon.nexusgeomlab',
  appName: 'Nexus Geom Lab',
  webDir: 'dist',
  
  // Server configuration for development
  server: {
    // Enable cleartext traffic for local development (disable in production)
    androidScheme: 'https',
    iosScheme: 'https',
  },

  // Plugin configurations
  plugins: {
    // Camera plugin configuration
    Camera: {
      // iOS-specific settings
      presentationStyle: 'fullScreen',
    },

    // Push Notifications configuration
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },

    // Local Notifications configuration
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#00ffff',
      sound: 'beep.wav',
    },

    // Preferences (Storage) configuration
    Preferences: {
      // Group for iOS App Groups sharing
      group: 'group.com.numeneon.nexusgeomlab',
    },

    // Splash Screen configuration matching PWA theme
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      launchFadeOutDuration: 500,
      backgroundColor: '#0a0a0f',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      spinnerColor: '#00ffff',
      splashFullScreen: true,
      splashImmersive: true,
    },

    // Status Bar configuration
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0a0a0f',
    },

    // Keyboard configuration
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
  },

  // iOS-specific configuration
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'NexusGeomLab',
  },

  // Android-specific configuration
  android: {
    allowMixedContent: false,
    backgroundColor: '#0a0a0f',
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
};

export default config;
