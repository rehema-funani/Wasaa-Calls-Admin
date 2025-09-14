
// src/types/billing.ts
export interface EscrowAccount {
  id: string;
  totalLocked: number;
  pendingRefunds: number;
  settledAmount: number;
  currency: string;
  lastUpdated: string;
}

export interface Transaction {
  id: string;
  callId: string;
  userId: string;
  hostId: string;
  amount: number;
  currency: string;
  status: 'Settled' | 'Pending' | 'Failed' | 'Refunded';
  paymentMethod: string;
  createdAt: string;
  settledAt?: string;
  blockchain?: {
    txHash: string;
    verified: boolean;
  };
}

export interface Dispute {
  id: string;
  callId: string;
  disputeBy: string;
  reason: string;
  status: 'Open' | 'Under Review' | 'Resolved' | 'Escalated';
  createdAt: string;
  resolvedAt?: string;
  resolution?: string;
  moderator?: string;
}