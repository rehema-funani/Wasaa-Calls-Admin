// src/components/billing/TransactionTable.tsx
import React from 'react';
import { Button } from '../ui/button';
import { Eye, MoreHorizontal, Undo, DollarSign, Calendar, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { format } from 'date-fns';
import type { Transaction } from '../../types/billing';

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
  onProcessRefund?: (id: string) => void;
}

// Enhanced Status Badge Component
const StatusBadge = ({ status }: { status: Transaction['status'] }) => {
  const statusConfig = {
    Settled: { 
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      icon: CheckCircle,
      dotColor: 'bg-green-500'
    },
    Pending: { 
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      icon: Clock,
      dotColor: 'bg-yellow-500'
    },
    Failed: { 
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      icon: XCircle,
      dotColor: 'bg-red-500'
    },
    Refunded: { 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      icon: RefreshCw,
      dotColor: 'bg-blue-500'
    }
  };

  const config = statusConfig[status] || statusConfig.Pending;
  const IconComponent = config.icon;

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.dotColor} ${status === 'Pending' ? 'animate-pulse' : ''}`}></div>
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent size={12} />
        {status}
      </span>
    </div>
  );
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  loading = false,
  onProcessRefund
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Transaction
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    Call {transaction.callId}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {transaction.userId} → {transaction.hostId}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    ID: {transaction.id}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(transaction.amount)}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {transaction.paymentMethod}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={transaction.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                    </span>
                    {transaction.settledAt && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Settled: {format(new Date(transaction.settledAt), 'MMM dd, yyyy')}
                      </span>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Eye size={14} />
                    View
                  </Button>
                  {transaction.status === 'Failed' && onProcessRefund && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onProcessRefund(transaction.id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                    >
                      <Undo size={14} />
                      Refund
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    size="sm"
                    className="p-2"
                  >
                    <MoreHorizontal size={14} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {transactions.length === 0 && !loading && (
        <div className="text-center py-16">
          <DollarSign size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No transactions found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};