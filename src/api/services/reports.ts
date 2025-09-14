// src/api/services/reports.ts
import { apiClient } from '../axios';
import type { CallAnalytics, RevenueAnalytics, RegionalStat } from '../../types/reports';

export const reportsService = {
  // Get call analytics
  getCallAnalytics: async (timeframe: '24h' | '7d' | '30d' | '90d' = '24h'): Promise<CallAnalytics> => {
    const response = await apiClient.get('/reports/calls', { params: { timeframe } });
    return response.data;
  },

  // Get revenue analytics
  getRevenueAnalytics: async (timeframe: string): Promise<RevenueAnalytics> => {
    // const response = await apiClient.get('/reports/revenue', { params: { timeframe } });
    // return response.data;
    console.log(`Fetching revenue analytics for ${timeframe}`);
    return Promise.resolve({
      totalRevenue: 375000,
      revenueBySource: {
        perMinute: 150000, // 40%
        tips: 131250,      // 35%
        subscriptions: 93750, // 25%
      },
      topEarningUsers: [
        { userId: 'usr_3', name: 'Peter Jones', revenue: 25000 },
        { userId: 'usr_5', name: 'David Brown', revenue: 18000 },
        { userId: 'usr_6', name: 'Susan Davis', revenue: 15000 },
      ],
    });
  },

  // Get QoS reports
  getQoSReports: async (filters?: {
    timeframe?: string;
    callType?: string;
    region?: string;
  }): Promise<any> => {
    const response = await apiClient.get('/reports/qos', { params: filters });
    return response.data;
  },

  // Get user activity reports
  getUserActivityReports: async (filters?: {
    timeframe?: string;
    userType?: string;
    region?: string;
  }): Promise<any> => {
    const response = await apiClient.get('/reports/user-activity', { params: filters });
    return response.data;
  },

  // Get financial reports
  getFinancialReports: async (filters?: {
    timeframe?: string;
    currency?: string;
    transactionType?: string;
  }): Promise<any> => {
    const response = await apiClient.get('/reports/financial', { params: filters });
    return response.data;
  },

  // Export reports
  exportReport: async (reportType: string, format: 'csv' | 'pdf' | 'xlsx', filters?: any): Promise<Blob> => {
    const response = await apiClient.get(`/reports/export/${reportType}`, {
      params: { format, ...filters },
      responseType: 'blob'
    });
    return response.data;
  },

  // Get system performance metrics
  getSystemMetrics: async (): Promise<{
    uptime: number;
    responseTime: number;
    errorRate: number;
    activeConnections: number;
  }> => {
    const response = await apiClient.get('/reports/system-metrics');
    return response.data;
  },

  // Get regional statistics
  getRegionalStats: async (): Promise<RegionalStat[]> => {
    // const response = await apiClient.get('/reports/regional-stats');
    // return response.data;
    return Promise.resolve([
      { region: 'Kenya', activeUsers: 1200, callsInProgress: 156, averageQuality: 92 },
      { region: 'Uganda', activeUsers: 800, callsInProgress: 89, averageQuality: 88 },
      { region: 'Tanzania', activeUsers: 950, callsInProgress: 97, averageQuality: 91 },
    ]);
  }
};
