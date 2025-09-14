// src/types/reports.ts

export interface CallAnalytics {
  totalCalls: number;
  averageDuration: number; // in minutes
  peakHour: string;
  callTypes: {
    audio: number;
    video: number;
    group: number;
  };
}

export interface RevenueAnalytics {
  totalRevenue: number;
  revenueBySource: {
    perMinute: number;
    tips: number;
    subscriptions: number;
  };
  topEarningUsers: Array<{
    userId: string;
    name: string;
    revenue: number;
  }>;
}

export interface RegionalStat {
  region: string;
  activeUsers: number;
  callsInProgress: number;
  averageQuality: number;
}