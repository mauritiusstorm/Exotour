import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.exotour.app',
  appName: 'Exotour',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
