export interface CapacitorConfig {
  appId: string;
  appName: string;
  webDir: string;
  server?: {
    androidScheme?: string;
  };
}

const config: CapacitorConfig = {
  appId: 'com.icity.core',
  appName: 'ICity Core',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
