
// src/api/services/settings.ts
import { apiClient } from '../axios';

interface SystemSettings {
  maxCallDuration: number;
  defaultQuality: 'low' | 'medium' | 'high';
  recordingEnabled: boolean;
  notificationsEnabled: boolean;
  maintenanceMode: boolean;
}

interface ApiSettings {
  enabled: boolean;
  rateLimit: number;
  webhookUrl: string;
  webhookSecret: string;
  allowedOrigins: string[];
}

interface SecuritySettings {
  twoFactorRequired: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  passwordPolicy: {
    minLength: number;
    requireSpecialChars: boolean;
    requireNumbers: boolean;
    requireUppercase: boolean;
  };
}

export const settingsService = {
  // System settings
  getSystemSettings: async (): Promise<SystemSettings> => {
    const response = await apiClient.get('/settings/system');
    return response.data;
  },

  updateSystemSettings: async (settings: Partial<SystemSettings>): Promise<SystemSettings> => {
    const response = await apiClient.put('/settings/system', settings);
    return response.data;
  },

  // API settings
  getApiSettings: async (): Promise<ApiSettings> => {
    // const response = await apiClient.get('/settings/api');
    // return response.data;
    return Promise.resolve({
      enabled: true,
      rateLimit: 1000,
      webhookUrl: 'https://api.example.com/v1/webhook',
      webhookSecret: 'wh_secret_xxxxxxxxxxxx',
      allowedOrigins: ['https://app.wasaachat.com'],
    });
  },

  updateApiSettings: async (settings: Partial<ApiSettings>): Promise<ApiSettings> => {
    const response = await apiClient.put('/settings/api', settings);
    return response.data;
  },

  // Security settings
  getSecuritySettings: async (): Promise<SecuritySettings> => {
    // const response = await apiClient.get('/settings/security');
    // return response.data;
    return Promise.resolve({
      twoFactorRequired: true,
      sessionTimeout: 3600,
      maxLoginAttempts: 5,
      passwordPolicy: {
        minLength: 8,
        requireSpecialChars: true,
        requireNumbers: true,
        requireUppercase: true,
      },
    });
  },

  updateSecuritySettings: async (settings: Partial<SecuritySettings>): Promise<SecuritySettings> => {
    const response = await apiClient.put('/settings/security', settings);
    return response.data;
  },

  // Webhook management
  testWebhook: async (url: string): Promise<{ success: boolean; response: string; responseTime: number }> => {
    const response = await apiClient.post('/settings/webhook/test', { url });
    return response.data;
  },

  // Feature flags
  getFeatureFlags: async (): Promise<Record<string, boolean>> => {
    const response = await apiClient.get('/settings/features');
    return response.data;
  },

  updateFeatureFlags: async (flags: Record<string, boolean>): Promise<Record<string, boolean>> => {
    const response = await apiClient.put('/settings/features', flags);
    return response.data;
  },

  // Integration settings
  getIntegrations: async (): Promise<Array<{
    id: string;
    name: string;
    status: 'connected' | 'disconnected' | 'error';
    lastSync: string;
    config: Record<string, any>;
  }>> => {
    const response = await apiClient.get('/settings/integrations');
    return response.data;
  },

  updateIntegration: async (integrationId: string, config: Record<string, any>): Promise<void> => {
    await apiClient.put(`/settings/integrations/${integrationId}`, config);
  },

  testIntegration: async (integrationId: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post(`/settings/integrations/${integrationId}/test`);
    return response.data;
  }
};
