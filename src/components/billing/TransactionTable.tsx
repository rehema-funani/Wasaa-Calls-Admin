// src/components/billing/TransactionTable.tsx
import React from 'react';
import { Table } from '../common/Table';
import { Badge } from '../common/Badge';
import { Eye, RefreshCw } from 'lucide-react';
import { formatCurrency, formatTimeAgo } from '../../utils/helpers';
import type { Transaction } from '../../types/billing';

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
  onViewTransaction?: (id: string) => void;
  onProcessRefund?: (id: string) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  loading = false,
  onViewTransaction,
  onProcessRefund
}) => {
  const getStatusBadge = (status: Transaction['status']) => {
    const statusMap = {
      'Settled': 'success' as const,
      'Pending': 'warning' as const,
      'Failed': 'danger' as const,
      'Refunded': 'neutral' as const
    };
    return statusMap[status] || 'neutral';
  };

  const columns = [
    {
      key: 'id' as keyof Transaction,
      header: 'Transaction',
      render: (value: string, row: Transaction) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            Call {row.callId}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.userId} → {row.hostId}
          </div>
          <div className="text-xs text-gray-400">
            ID: {value}
          </div>
        </div>
      )
    },
    {
      key: 'amount' as keyof Transaction,
      header: 'Amount',
      render: (value: number, row: Transaction) => (
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {formatCurrency(value, row.currency)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {row.paymentMethod}
          </div>
        </div>
      )
    },
    {
      key: 'status' as keyof Transaction,
      header: 'Status',
      render: (value: Transaction['status'], row: Transaction) => (
        <div>
          <Badge variant={getStatusBadge(value)} size="sm">
            {value}
          </Badge>
          {row.blockchain?.verified && (
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">
              ✓ Blockchain verified
            </div>
          )}
        </div>
      )
    },
    {
      key: 'createdAt' as keyof Transaction,
      header: 'Date',
      render: (value: string, row: Transaction) => (
        <div>
          <div className="text-sm text-gray-900 dark:text-white">
            {formatTimeAgo(value)}
          </div>
          {row.settledAt && (
            <div className="text-xs text-gray-400">
              Settled: {formatTimeAgo(row.settledAt)}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'id' as keyof Transaction,
      header: 'Actions',
      className: 'text-right',
      render: (value: string, row: Transaction) => (
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => onViewTransaction?.(value)}
            className="p-1.5 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          {row.status === 'Pending' && onProcessRefund && (
            <button
              onClick={() => onProcessRefund(value)}
              className="p-1.5 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
              title="Process Refund"
            >
              <RefreshCw size={16} />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <Table
      data={transactions}
      columns={columns}
      loading={loading}
      emptyMessage="No transactions found"
    />
  );
};