import type { EscrowAccount, Transaction, Dispute } from '../../types/billing';

const mockTransactions: Transaction[] = [
    { id: 'txn_1', callId: 'call_1', userId: 'usr_1', hostId: 'usr_3', amount: 100, currency: 'KES', status: 'Settled', paymentMethod: 'M-Pesa', createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), settledAt: new Date(Date.now() - 5 * 60 * 1000).toISOString() },
    { id: 'txn_2', callId: 'call_2', userId: 'usr_2', hostId: 'usr_4', amount: 50, currency: 'KES', status: 'Pending', paymentMethod: 'Card', createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString() },
    { id: 'txn_3', callId: 'call_3', userId: 'usr_5', hostId: 'usr_6', amount: 200, currency: 'KES', status: 'Failed', paymentMethod: 'M-Pesa', createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
];

const mockDisputes: Dispute[] = [
    { id: 'disp_1', callId: 'call_prev_10', disputeBy: 'usr_10', reason: 'Poor call quality', status: 'Open', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { id: 'disp_2', callId: 'call_prev_12', disputeBy: 'usr_12', reason: 'Host did not show up', status: 'Under Review', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
];

export const billingService = {
  getEscrowOverview: async (): Promise<EscrowAccount> => {
    console.log('Fetching escrow overview');
    // Mock response
    return Promise.resolve({
        id: 'escrow_1',
        totalLocked: Math.floor(Math.random() * 200000),
        pendingRefunds: 12500,
        settledAmount: 1250000,
        currency: 'KES',
        lastUpdated: new Date().toISOString(),
    });
  },

  getTransactions: async (params: { limit?: number, callId?: string, status?: string }): Promise<{ data: Transaction[], total: number }> => {
    console.log('Fetching transactions with params:', params);
    let filtered = mockTransactions;
    if (params.callId) {
      filtered = filtered.filter(t => t.callId.toLowerCase().includes(params.callId!.toLowerCase()));
    }
    if (params.status && params.status !== 'all') {
      filtered = filtered.filter(t => t.status === params.status);
    }
    return Promise.resolve({ data: filtered, total: filtered.length });
  },

  getDisputes: async (params: { limit?: number }): Promise<{ data: Dispute[], total: number }> => {
    console.log('Fetching disputes with params:', params);
    return Promise.resolve({ data: mockDisputes, total: mockDisputes.length });
  },

  processRefund: async (transactionId: string, reason: string): Promise<void> => {
    console.log(`Processing refund for transaction ${transactionId} with reason: ${reason}`);
    return Promise.resolve();
  },

  resolveDispute: async (disputeId: string, resolution: string): Promise<void> => {
    console.log(`Resolving dispute ${disputeId} with resolution: ${resolution}`);
    return Promise.resolve();
  },

  getBillingAnalytics: async (timeframe: string): Promise<any> => {
    console.log(`Fetching billing analytics for ${timeframe}`);
    return Promise.resolve({
        revenue: 375000,
        transactions: 1234,
        refunds: 56,
    });
  },
};