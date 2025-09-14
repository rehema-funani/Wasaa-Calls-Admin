
// src/app/billing/BillingWallet.tsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  CreditCard, 
  TrendingUp, 
  RefreshCw,
  Download,
  Search
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { KPICard } from '../../components/dashboard/KPICard';
import { TransactionTable } from '../../components/billing/TransactionTable';
import { useBilling } from '../../hooks/useBilling';
import { formatCurrency } from '../../utils/helpers';

const BillingWallet: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { 
    escrowData, 
    transactions, 
    loadingEscrow, 
    loadingTransactions, 
    processRefund 
  } = useBilling({ 
    autoRefresh: true,
    filters: {
      callId: searchTerm || undefined,
      status: statusFilter === 'all' ? undefined : statusFilter,
    }
  });

  const handleProcessRefund = async (transactionId: string) => {
    processRefund({ transactionId, reason: 'Admin approved refund' });
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Billing & Wallet
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage escrow accounts and transaction settlements
              </p>
            </div>
            <Button variant="primary">
              <Download size={16} className="mr-2" />
              Export Report
            </Button>
          </div>

          {/* Escrow Overview */}
          {loadingEscrow ? <div>Loading escrow data...</div> : escrowData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <KPICard
                title="Total Escrow Locked"
                value={formatCurrency(escrowData.totalLocked)}
                change="+12.5%"
                isPositive={true}
                icon={<CreditCard size={20} className="text-white" />}
                gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
                description="Currently held in escrow"
              />
              <KPICard
                title="Pending Refunds"
                value={formatCurrency(escrowData.pendingRefunds)}
                change="-5.2%"
                isPositive={false}
                icon={<RefreshCw size={20} className="text-white" />}
                gradient="bg-gradient-to-r from-orange-500 to-red-500"
                description="Awaiting processing"
              />
              <KPICard
                title="Settled Amount"
                value={formatCurrency(escrowData.settledAmount)}
                change="+18.3%"
                isPositive={true}
                icon={<TrendingUp size={20} className="text-white" />}
                gradient="bg-gradient-to-r from-green-500 to-emerald-500"
                description="Successfully processed"
              />
            </div>
          )}

          {/* Transactions Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Transactions
              </h3>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by Call ID..."
                    className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="Settled">Settled</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>

            <TransactionTable 
              transactions={transactions} 
              loading={loadingTransactions}
              onProcessRefund={handleProcessRefund}
            />
          </Card>
        </div>
      } />
      <Route path="/disputes" element={<div>Dispute Management Page</div>} />
      <Route path="/settlements" element={<div>Settlement History Page</div>} />
    </Routes>
  );
};

export default BillingWallet;