import { motion } from "framer-motion"
import { Shield, AlertCircle, CheckCircle2, Download } from "lucide-react"
import { useModeration } from "../../hooks/useModeration"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Table } from "../../components/common/Table"
import type { AuditLog } from "../../types/moderation"
import { format } from "date-fns"

export default function ModerationCompliance() {
  const { logs, isLoading, exportLogs } = useModeration()

  const columns = [
    {
      key: 'action' as keyof AuditLog,
      header: 'Action',
      render: (value: string, row: AuditLog) => (
        <div className="flex items-center gap-2">
          {row.status === "approved" ? (
            <CheckCircle2 className="w-4 h-4 text-green-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600" />
          )}
          {value}
        </div>
      )
    },
    { key: 'moderator' as keyof AuditLog, header: 'Moderator' },
    {
      key: 'status' as keyof AuditLog,
      header: 'Status',
      render: (value: string) => <span className="capitalize">{value}</span>
    },
    {
      key: 'timestamp' as keyof AuditLog,
      header: 'Timestamp',
      render: (value: string) => format(new Date(value), "PPpp")
    },
    {
      key: 'blockchain' as keyof AuditLog,
      header: 'Proof',
      render: (value: AuditLog['blockchain']) => (
        value?.verified ? (
          <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1" title={value.txId}>✓ Verified</span>
        ) : (
          <span className="text-xs text-gray-500">N/A</span>
        )
      )
    }
  ];

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="text-blue-600" /> Moderation & Compliance
        </h1>
        <Button
          variant="outline"
          onClick={exportLogs}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export Logs
        </Button>
      </div>

      {/* Audit Logs Table */}
      <Card className="shadow-md overflow-hidden">
        <Table
          columns={columns}
          data={logs}
          loading={isLoading}
          emptyMessage="No compliance events found."
        />
      </Card>
    </motion.div>
  )
}
