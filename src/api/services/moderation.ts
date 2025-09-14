// src/api/services/moderation.ts
import { apiClient } from '../axios';
import type { AuditLog, ComplianceRequest } from '../../types/moderation';

const mockAuditLogs: AuditLog[] = [
  { id: 'log1', action: 'Muted User in Call #123', moderator: 'Admin Jane', status: 'approved', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), userId: 'user-abc', moderatorId: 'mod-jane', callId: 'call_123', reason: 'Spamming chat', blockchain: { txId: '0x123...abc', verified: true } },
  { id: 'log2', action: 'Banned User for ToS violation', moderator: 'Admin John', status: 'approved', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), userId: 'user-def', moderatorId: 'mod-john', reason: 'Inappropriate behavior' },
  { id: 'log3', action: 'Rejected compliance request', moderator: 'System', status: 'rejected', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), userId: 'user-ghi', moderatorId: 'system', reason: 'Insufficient data' },
];

export const moderationService = {
  // Get audit logs
  getAuditLogs: async (filters?: {
    action?: string;
    userId?: string;
    moderatorId?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: AuditLog[]; total: number }> => {
    // const response = await apiClient.get('/moderation/audit-logs', { params: filters });
    // return response.data;
    return Promise.resolve({ data: mockAuditLogs, total: mockAuditLogs.length });
  },

  // Get compliance requests
  getComplianceRequests: async (filters?: {
    type?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: ComplianceRequest[]; total: number }> => {
    const response = await apiClient.get('/moderation/compliance', { params: filters });
    return response.data;
  },

  // Process compliance request
  processComplianceRequest: async (requestId: string): Promise<void> => {
    await apiClient.post(`/moderation/compliance/${requestId}/process`);
  },

  // Export user data for GDPR
  exportUserData: async (userId: string): Promise<Blob> => {
    const response = await apiClient.get(`/moderation/compliance/export/${userId}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Delete user data for GDPR
  deleteUserData: async (userId: string): Promise<void> => {
    await apiClient.delete(`/moderation/compliance/delete/${userId}`);
  }
};