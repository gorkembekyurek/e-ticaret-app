import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'e-ticaret-uygulama',
  webDir: 'www',
  server: {
    cleartext: true,
    allowNavigation: ['*'],
    androidScheme: 'http'
  },
  android: {
    webContentsDebuggingEnabled: true
  }
};

export default config;
