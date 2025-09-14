
// src/types/calls.ts
import type { User } from './index';

export interface Call {
  id: string;
  host: User;
  participants: User[];
  status: 'Live' | 'Ended' | 'Paused' | 'Failed';
  type: 'Audio' | 'Video' | 'Group';
  startTime: string;
  endTime?: string;
  duration?: number;
  quality: QualityMetrics;
  recording?: CallRecording;
  billing: CallBilling;
}

export interface QualityMetrics {
  latency: number; // ms
  jitter: number; // ms
  packetLoss: number; // %
  bitrate: number; // kbps
  resolution?: string; // for video calls
  score: number; // 0-100
}

export interface CallRecording {
  id: string;
  callId: string;
  url?: string;
  duration: number;
  size: number; // bytes
  hasConsent: boolean;
  participants: string[]; // user IDs who consented
  createdAt: string;
}

export interface CallBilling {
  escrowAmount: number;
  currency: string;
  paymentMethod: string;
  status: 'Locked' | 'Settled' | 'Pending' | 'Refunded';
  transactionId?: string;
}