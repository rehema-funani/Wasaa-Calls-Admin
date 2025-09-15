// import { motion } from "framer-motion"
// import { Shield, AlertCircle, CheckCircle2, Download } from "lucide-react"
// import { useModeration } from "../../hooks/useModeration"
// import { Button } from "../../components/ui/button"
// import { Card } from "../../components/ui/card"
// import { Table } from "../../components/common/Table"
// import type { AuditLog } from "../../types/moderation"
// import { format } from "date-fns"

// export default function ModerationCompliance() {
//   const { logs, isLoading, exportLogs } = useModeration()

//   const columns = [
//     {
//       key: 'action' as keyof AuditLog,
//       header: 'Action',
//       render: (value: string, row: AuditLog) => (
//         <div className="flex items-center gap-2">
//           {row.status === "approved" ? (
//             <CheckCircle2 className="w-4 h-4 text-green-600" />
//           ) : (
//             <AlertCircle className="w-4 h-4 text-red-600" />
//           )}
//           {value}
//         </div>
//       )
//     },
//     { key: 'moderator' as keyof AuditLog, header: 'Moderator' },
//     {
//       key: 'status' as keyof AuditLog,
//       header: 'Status',
//       render: (value: string) => <span className="capitalize">{value}</span>
//     },
//     {
//       key: 'timestamp' as keyof AuditLog,
//       header: 'Timestamp',
//       render: (value: string) => format(new Date(value), "PPpp")
//     },
//     {
//       key: 'blockchain' as keyof AuditLog,
//       header: 'Proof',
//       render: (value: AuditLog['blockchain']) => (
//         value?.verified ? (
//           <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1" title={value.txId}>✓ Verified</span>
//         ) : (
//           <span className="text-xs text-gray-500">N/A</span>
//         )
//       )
//     }
//   ];

//   return (
//     <motion.div
//       className="p-6 space-y-6"
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <Shield className="text-blue-600" /> Moderation & Compliance
//         </h1>
//         <Button
//           variant="outline"
//           onClick={exportLogs}
//           className="flex items-center gap-2"
//         >
//           <Download className="w-4 h-4" /> Export Logs
//         </Button>
//       </div>

//       {/* Audit Logs Table */}
//       <Card className="shadow-md overflow-hidden">
//         <Table
//           columns={columns}
//           data={logs}
//           loading={isLoading}
//           emptyMessage="No compliance events found."
//         />
//       </Card>
//     </motion.div>
//   )
// }
import { motion } from "framer-motion";
import { 
  Shield, 
  Download, 
  Filter,
  FileText,
  Activity,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { useModeration } from "../../hooks/useModeration";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { AuditLogTable } from "../../components/moderation/AuditLogTable";

export default function ModerationCompliance() {
  const { logs, isLoading, exportLogs } = useModeration();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Shield className="text-blue-600 dark:text-blue-400" size={32} />
                Moderation & Compliance
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                Audit logs, compliance tracking, and blockchain verification
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <Activity size={18} className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-blue-700 dark:text-blue-400 font-semibold">
                  System Compliant
                </span>
              </div>
              <Button 
                variant="primary" 
                onClick={exportLogs}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Export Logs
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-6 shadow-sm border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <Filter size={20} className="text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Audit Log Filters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            </div>
          </Card>

          {/* Audit Logs Table */}
          <Card className="overflow-hidden shadow-sm border-0 bg-white dark:bg-gray-800">
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-gray-500 dark:text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Audit Logs
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {logs?.length || 0} entries
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <RefreshCw size={14} />
                    Refresh
                  </Button>
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <AlertTriangle size={14} />
                    Alerts
                  </Button>
                </div>
              </div>
            </div>

            <AuditLogTable logs={logs || []} isLoading={isLoading} />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}