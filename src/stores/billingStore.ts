
// src/stores/billingStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EscrowAccount, Transaction, Dispute } from '../types/billing';

interface BillingFilters {
  status?: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  currency?: string;
}

interface BillingStore {
  // Data
  escrowData: EscrowAccount | null;
  transactions: Transaction[];
  disputes: Dispute[];
  
  // Filters
  transactionFilters: BillingFilters;
  disputeFilters: BillingFilters;
  
  // UI State
  selectedTransaction: Transaction | null;
  selectedDispute: Dispute | null;
  showRefundModal: boolean;
  showDisputeModal: boolean;
  
  // Actions
  setEscrowData: (data: EscrowAccount) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setDisputes: (disputes: Dispute[]) => void;
  setTransactionFilters: (filters: BillingFilters) => void;
  setDisputeFilters: (filters: BillingFilters) => void;
  setSelectedTransaction: (transaction: Transaction | null) => void;
  setSelectedDispute: (dispute: Dispute | null) => void;
  toggleRefundModal: () => void;
  toggleDisputeModal: () => void;
  
  // Computed values
  getFilteredTransactions: () => Transaction[];
  getFilteredDisputes: () => Dispute[];
  getTotalRevenue: () => number;
  getPendingRefunds: () => number;
}

export const useBillingStore = create<BillingStore>()(
  persist(
    (set, get) => ({
      // Initial state
      escrowData: null,
      transactions: [],
      disputes: [],
      transactionFilters: {},
      disputeFilters: {},
      selectedTransaction: null,
      selectedDispute: null,
      showRefundModal: false,
      showDisputeModal: false,

      // Actions
      setEscrowData: (data) => set({ escrowData: data }),
      setTransactions: (transactions) => set({ transactions }),
      setDisputes: (disputes) => set({ disputes }),
      setTransactionFilters: (filters) => set({ transactionFilters: filters }),
      setDisputeFilters: (filters) => set({ disputeFilters: filters }),
      setSelectedTransaction: (transaction) => set({ selectedTransaction: transaction }),
      setSelectedDispute: (dispute) => set({ selectedDispute: dispute }),
      toggleRefundModal: () => set((state) => ({ showRefundModal: !state.showRefundModal })),
      toggleDisputeModal: () => set((state) => ({ showDisputeModal: !state.showDisputeModal })),

      // Computed values
      getFilteredTransactions: () => {
        const { transactions, transactionFilters } = get();
        let filtered = [...transactions];

        if (transactionFilters.status) {
          filtered = filtered.filter(t => t.status === transactionFilters.status);
        }

        if (transactionFilters.dateRange) {
          const { from, to } = transactionFilters.dateRange;
          filtered = filtered.filter(t => {
            const date = new Date(t.createdAt);
            return date >= from && date <= to;
          });
        }

        if (transactionFilters.amountRange) {
          const { min, max } = transactionFilters.amountRange;
          filtered = filtered.filter(t => t.amount >= min && t.amount <= max);
        }

        if (transactionFilters.currency) {
          filtered = filtered.filter(t => t.currency === transactionFilters.currency);
        }

        return filtered;
      },

      getFilteredDisputes: () => {
        const { disputes, disputeFilters } = get();
        let filtered = [...disputes];

        if (disputeFilters.status) {
          filtered = filtered.filter(d => d.status === disputeFilters.status);
        }

        return filtered;
      },

      getTotalRevenue: () => {
        const { transactions } = get();
        return transactions
          .filter(t => t.status === 'Settled')
          .reduce((total, t) => total + t.amount, 0);
      },

      getPendingRefunds: () => {
        const { transactions } = get();
        return transactions
          .filter(t => t.status === 'Pending')
          .reduce((total, t) => total + t.amount, 0);
      }
    }),
    {
      name: 'billing-store',
      partialize: (state) => ({
        transactionFilters: state.transactionFilters,
        disputeFilters: state.disputeFilters
      })
    }
  )
);
