import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.dedd10bce4b54e63af4701942e33b069',
  appName: 'hariyali-mitra-aid',
  webDir: 'dist',
  server: {
    url: 'https://dedd10bc-e4b5-4e63-af47-01942e33b069.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ["camera", "photos"]
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;