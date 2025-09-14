// src/hooks/useBilling.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { billingService } from '../api/services/billing';
import { toast } from 'react-hot-toast';

interface UseBillingOptions {
  autoRefresh?: boolean;
  filters?: {
    callId?: string;
    status?: string;
  }
}

export const useBilling = (options: UseBillingOptions = {}) => {
  const queryClient = useQueryClient();
  const { autoRefresh = false, filters } = options;

  // Get escrow overview
  const {
    data: escrowData,
    isLoading: loadingEscrow,
    error: escrowError
  } = useQuery({
    queryKey: ['billing', 'escrow'],
    queryFn: billingService.getEscrowOverview,
    refetchInterval: autoRefresh ? 10000 : false, // Refresh every 10 seconds if enabled
  });

  // Get transactions
  const {
    data: transactionsData,
    isLoading: loadingTransactions,
    error: transactionsError
  } = useQuery({
    queryKey: ['billing', 'transactions', filters],
    queryFn: () => billingService.getTransactions({ limit: 50, ...filters }),
  });

  // Get disputes
  const {
    data: disputesData,
    isLoading: loadingDisputes,
    error: disputesError
  } = useQuery({
    queryKey: ['billing', 'disputes'],
    queryFn: () => billingService.getDisputes({ limit: 50 }),
  });

  // Process refund mutation
  const processRefundMutation = useMutation({
    mutationFn: ({ transactionId, reason }: { transactionId: string; reason: string }) =>
      billingService.processRefund(transactionId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing', 'transactions'] });
      queryClient.invalidateQueries({ queryKey: ['billing', 'escrow'] });
      toast.success('Refund processed successfully');
    },
    onError: () => {
      toast.error('Failed to process refund');
    }
  });

  // Resolve dispute mutation
  const resolveDisputeMutation = useMutation({
    mutationFn: ({ disputeId, resolution }: { disputeId: string; resolution: string }) =>
      billingService.resolveDispute(disputeId, resolution),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing', 'disputes'] });
      toast.success('Dispute resolved successfully');
    },
    onError: () => {
      toast.error('Failed to resolve dispute');
    }
  });

  // Get analytics
  const {
    data: analyticsData,
    isLoading: loadingAnalytics
  } = useQuery({
    queryKey: ['billing', 'analytics'],
    queryFn: () => billingService.getBillingAnalytics('30d'),
  });

  return {
    // Data
    escrowData,
    transactions: transactionsData?.data || [],
    totalTransactions: transactionsData?.total || 0,
    disputes: disputesData?.data || [],
    totalDisputes: disputesData?.total || 0,
    analyticsData,

    // Loading states
    loadingEscrow,
    loadingTransactions,
    loadingDisputes,
    loadingAnalytics,

    // Errors
    escrowError,
    transactionsError,
    disputesError,

    // Actions
    processRefund: processRefundMutation.mutate,
    resolveDispute: resolveDisputeMutation.mutate,

    // Mutation states
    isProcessingRefund: processRefundMutation.isPending,
    isResolvingDispute: resolveDisputeMutation.isPending,

    // Refresh functions
    refreshEscrow: () => queryClient.invalidateQueries({ queryKey: ['billing', 'escrow'] }),
    refreshTransactions: () => queryClient.invalidateQueries({ queryKey: ['billing', 'transactions'] }),
    refreshDisputes: () => queryClient.invalidateQueries({ queryKey: ['billing', 'disputes'] })
  };
};