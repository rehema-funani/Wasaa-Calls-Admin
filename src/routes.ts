// src/routes.ts
export const ROUTES = {
  // Auth routes
  LOGIN: '/auth/login',
  
  // Main routes
  DASHBOARD: '/dashboard',
  
  // Calls routes
  CALLS: '/calls',
  CALLS_MONITORING: '/calls/monitoring',
  CALLS_RECORDINGS: '/calls/recordings',
  CALLS_QUALITY: '/calls/quality',
  
  // Users routes
  USERS: '/users',
  USERS_ROLES: '/users/roles',
  USERS_VERIFICATION: '/users/verification',
  
  // Billing routes
  BILLING: '/billing',
  BILLING_DISPUTES: '/billing/disputes',
  BILLING_SETTLEMENTS: '/billing/settlements',
  
  // Moderation routes
  MODERATION: '/moderation',
  MODERATION_GDPR: '/moderation/gdpr',
  MODERATION_BLOCKCHAIN: '/moderation/blockchain',
  
  // Reports routes
  REPORTS: '/reports',
  REPORTS_QUALITY: '/reports/quality',
  REPORTS_FINANCIAL: '/reports/financial',
  REPORTS_USAGE: '/reports/usage',
  
  // Settings routes
  SETTINGS: '/settings',
  SETTINGS_API: '/settings/api',
  SETTINGS_WEBHOOKS: '/settings/webhooks'
} as const;