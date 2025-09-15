
// // src/app/billing/BillingWallet.tsx
// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { 
//   CreditCard, 
//   TrendingUp, 
//   RefreshCw,
//   Download,
//   Search
// } from 'lucide-react';
// import { Card } from '../../components/ui/card';
// import { Button } from '../../components/ui/button';
// import { KPICard } from '../../components/dashboard/KPICard';
// import { TransactionTable } from '../../components/billing/TransactionTable';
// import { useBilling } from '../../hooks/useBilling';
// import { formatCurrency } from '../../utils/helpers';

// const BillingWallet: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');

//   const { 
//     escrowData, 
//     transactions, 
//     loadingEscrow, 
//     loadingTransactions, 
//     processRefund 
//   } = useBilling({ 
//     autoRefresh: true,
//     filters: {
//       callId: searchTerm || undefined,
//       status: statusFilter === 'all' ? undefined : statusFilter,
//     }
//   });

//   const handleProcessRefund = async (transactionId: string) => {
//     processRefund({ transactionId, reason: 'Admin approved refund' });
//   };

//   return (
//     <Routes>
//       <Route path="/" element={
//         <div className="space-y-6">
//           {/* Header */}
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                 Billing & Wallet
//               </h1>
//               <p className="text-gray-600 dark:text-gray-400 mt-1">
//                 Manage escrow accounts and transaction settlements
//               </p>
//             </div>
//             <Button variant="primary">
//               <Download size={16} className="mr-2" />
//               Export Report
//             </Button>
//           </div>

//           {/* Escrow Overview */}
//           {loadingEscrow ? <div>Loading escrow data...</div> : escrowData && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <KPICard
//                 title="Total Escrow Locked"
//                 value={formatCurrency(escrowData.totalLocked)}
//                 change="+12.5%"
//                 isPositive={true}
//                 icon={<CreditCard size={20} className="text-white" />}
//                 gradient="bg-gradient-to-r from-blue-500 to-cyan-500"
//                 description="Currently held in escrow"
//               />
//               <KPICard
//                 title="Pending Refunds"
//                 value={formatCurrency(escrowData.pendingRefunds)}
//                 change="-5.2%"
//                 isPositive={false}
//                 icon={<RefreshCw size={20} className="text-white" />}
//                 gradient="bg-gradient-to-r from-orange-500 to-red-500"
//                 description="Awaiting processing"
//               />
//               <KPICard
//                 title="Settled Amount"
//                 value={formatCurrency(escrowData.settledAmount)}
//                 change="+18.3%"
//                 isPositive={true}
//                 icon={<TrendingUp size={20} className="text-white" />}
//                 gradient="bg-gradient-to-r from-green-500 to-emerald-500"
//                 description="Successfully processed"
//               />
//             </div>
//           )}

//           {/* Transactions Section */}
//           <Card className="p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Recent Transactions
//               </h3>
//               <div className="flex items-center space-x-6">
//                 <div className="relative">
//                   <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search by Call ID..."
//                     className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                   className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
//                 >
//                   <option value="all">All Status</option>
//                   <option value="Settled">Settled</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Failed">Failed</option>
//                   <option value="Refunded">Refunded</option>
//                 </select>
//               </div>
//             </div>

//             <TransactionTable 
//               transactions={transactions} 
//               loading={loadingTransactions}
//               onProcessRefund={handleProcessRefund}
//             />
//           </Card>
//         </div>
//       } />
//       <Route path="/disputes" element={<div>Dispute Management Page</div>} />
//       <Route path="/settlements" element={<div>Settlement History Page</div>} />
//     </Routes>
//   );
// };

// export default BillingWallet;

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  CreditCard, 
  TrendingUp, 
  RefreshCw,
  Download,
  Filter,
  Calendar,
  DollarSign, AlertCircle
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { KPICard } from '../../components/dashboard/KPICard';
import { TransactionTable } from '../../components/billing/TransactionTable';
import { useBilling } from '../../hooks/useBilling';
import { formatCurrency } from '../../utils/helpers';

const BillingWallet: React.FC = () => {
  const [searchTerm] = useState('');
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Routes>
          <Route path="/" element={
            <>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    Billing & Wallet
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                    Manage escrow accounts and transaction settlements
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <TrendingUp size={18} className="text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-700 dark:text-green-400 font-semibold">
                      System Healthy
                    </span>
                  </div>
                  <Button variant="primary" className="flex items-center gap-2">
                    <Download size={16} />
                    Export Report
                  </Button>
                </div>
              </div>

              {/* Escrow Overview */}
              {loadingEscrow ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-6 animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </Card>
                  ))}
                </div>
              ) : escrowData && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <KPICard
                    title="Total Escrow Locked"
                    value={formatCurrency(escrowData.totalLocked)}
                    change="+12.5%"
                    isPositive={true}
                    icon={<CreditCard size={24} className="text-white" />}
                    gradient="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600"
                    description="Currently held in escrow"
                    className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  />
                  <KPICard
                    title="Pending Refunds"
                    value={formatCurrency(escrowData.pendingRefunds)}
                    change="-5.2%"
                    isPositive={false}
                    icon={<RefreshCw size={24} className="text-white" />}
                    gradient="bg-gradient-to-br from-orange-500 via-orange-600 to-red-500"
                    description="Awaiting processing"
                    className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  />
                  <KPICard
                    title="Settled Amount"
                    value={formatCurrency(escrowData.settledAmount)}
                    change="+18.3%"
                    isPositive={true}
                    icon={<TrendingUp size={24} className="text-white" />}
                    gradient="bg-gradient-to-br from-green-500 via-green-600 to-emerald-500"
                    description="Successfully processed"
                    className="transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  />
                </div>
              )}

              {/* Filters */}
              <Card className="p-6 shadow-sm border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Filter size={20} className="text-gray-500 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transaction Filters</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors shadow-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="Settled">Settled</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                  <Button variant="secondary" className="flex items-center gap-2 justify-center">
                    <Calendar size={16} />
                    Custom Range
                  </Button>
                </div>
              </Card>

              {/* Transactions Section */}
              <Card className="overflow-hidden shadow-sm border-0 bg-white dark:bg-gray-800">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <DollarSign size={20} className="text-gray-500 dark:text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Transactions
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {transactions.length} total
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="secondary" size="sm" className="flex items-center gap-2">
                        <RefreshCw size={14} />
                        Refresh
                      </Button>
                      <Button variant="secondary" size="sm" className="flex items-center gap-2">
                        <Filter size={14} />
                        More Filters
                      </Button>
                    </div>
                  </div>
                </div>

                <TransactionTable
                  transactions={transactions}
                  loading={loadingTransactions}
                  onProcessRefund={handleProcessRefund}
                />
              </Card>
            </>
          } />
          <Route path="/disputes" element={
            <Card className="p-8 text-center">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dispute Management</h3>
              <p className="text-gray-500 dark:text-gray-400">Coming soon - Manage transaction disputes and resolutions</p>
            </Card>
          } />
          <Route path="/settlements" element={
            <Card className="p-8 text-center">
              <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Settlement History</h3>
              <p className="text-gray-500 dark:text-gray-400">Coming soon - View detailed settlement history and reports</p>
            </Card>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default BillingWallet;