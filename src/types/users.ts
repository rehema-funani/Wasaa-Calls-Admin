// src/types/users.ts
import type { User } from './index';

export interface UserProfile extends User {
  bio?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  paymentMethods?: Array<{
    type: 'M-Pesa' | 'Card';
    last4?: string;
    isDefault: boolean;
  }>;
}

export interface UserActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: Record<string, any>;
}

export interface UserVerificationRequest {
  id: string;
  userId: string;
  documentType: 'ID' | 'Passport' | 'BusinessPermit';
  documentUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewerId?: string;
}