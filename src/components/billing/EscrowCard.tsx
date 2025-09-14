// src/components/billing/EscrowCard.tsx
import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../common/Badge';
import { CreditCard, Lock, TrendingUp, RefreshCw } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

interface EscrowCardProps {
  totalLocked: number;
  pendingRefunds: number;
  settledAmount: number;
  currency?: string;
}

export const EscrowCard: React.FC<EscrowCardProps> = ({
  totalLocked,
  pendingRefunds,
  settledAmount,
  currency = 'KES'
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
            <Lock size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Escrow Overview
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Real-time escrow balances
            </p>
          </div>
        </div>
        <Badge variant="success" size="sm">Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <CreditCard size={16} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs text-blue-600 dark:text-blue-400">Locked</span>
          </div>
          <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {formatCurrency(totalLocked, currency)}
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <RefreshCw size={16} className="text-orange-600 dark:text-orange-400" />
            <span className="text-xs text-orange-600 dark:text-orange-400">Pending</span>
          </div>
          <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
            {formatCurrency(pendingRefunds, currency)}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
            <span className="text-xs text-green-600 dark:text-green-400">Settled</span>
          </div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-300">
            {formatCurrency(settledAmount, currency)}
          </div>
        </div>
      </div>
    </Card>
  );
};