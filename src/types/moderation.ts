// src/types/moderation.ts
export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  moderatorId: string;
  moderator: string;
  status: 'approved' | 'rejected' | 'pending';
  callId?: string;
  reason?: string;
  timestamp: string;
  blockchain?: {
    txId: string;
    verified: boolean;
  };
  details?: Record<string, any>;
}

export interface ComplianceRequest {
  id: string;
  type: 'GDPR_Export' | 'GDPR_Delete' | 'Data_Portability';
  userId: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  requestedAt: string;
  completedAt?: string;
  downloadUrl?: string;
  expiresAt?: string;
}