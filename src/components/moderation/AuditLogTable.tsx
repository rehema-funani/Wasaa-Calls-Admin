// src/components/moderation/AuditLogTable.tsx
import React from 'react';
import { Button } from '../ui/button';
import type { AuditLog } from '../../types/moderation';
import { format } from 'date-fns';
import { Shield, CheckCircle2, XCircle, Clock, Calendar, Eye, FileText, MoreHorizontal } from 'lucide-react';

// Enhanced Status Badge Component
const StatusBadge = ({ status }: { status: AuditLog['status'] }) => {
    const statusConfig = {
      approved: { 
        color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        icon: CheckCircle2,
        dotColor: 'bg-green-500'
      },
      rejected: { 
        color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        icon: XCircle,
        dotColor: 'bg-red-500'
      },
      pending: { 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        icon: Clock,
        dotColor: 'bg-yellow-500'
      }
    };
  
    const config = statusConfig[status.toLowerCase() as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;
  
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${config.dotColor} ${status === 'pending' ? 'animate-pulse' : ''}`}></div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
          <IconComponent size={12} />
          {status}
        </span>
      </div>
    );
  };

interface AuditLogTableProps {
    logs: AuditLog[];
    isLoading: boolean;
}

export const AuditLogTable: React.FC<AuditLogTableProps> = ({ logs, isLoading }) => {

    const columns = [
        {
          key: 'action' as keyof AuditLog,
          header: 'Action',
          render: (value: string, row: AuditLog) => (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                {row.status === "approved" ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : row.status === "rejected" ? (
                  <XCircle className="w-4 h-4 text-red-600" />
                ) : (
                  <Clock className="w-4 h-4 text-yellow-600" />
                )}
                <span className="font-medium text-gray-900 dark:text-white">{value}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Call #{row.callId || 'N/A'} • User {row.userId || 'System'}
              </div>
            </div>
          )
        },
        { 
          key: 'moderator' as keyof AuditLog, 
          header: 'Moderator',
          render: (value: string) => (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                {value?.charAt(0)?.toUpperCase() || 'S'}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{value || 'System'}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Administrator</span>
              </div>
            </div>
          )
        },
        {
          key: 'status' as keyof AuditLog,
          header: 'Status',
          render: (value: AuditLog['status']) => <StatusBadge status={value} />
        },
        {
          key: 'timestamp' as keyof AuditLog,
          header: 'Timestamp',
          render: (value: string) => (
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <div className="flex flex-col">
                <span className="text-sm text-gray-900 dark:text-white">
                  {format(new Date(value), "MMM dd, yyyy")}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {format(new Date(value), "HH:mm:ss")}
                </span>
              </div>
            </div>
          )
        },
        {
          key: 'blockchain' as keyof AuditLog,
          header: 'Proof',
          render: (value: AuditLog['blockchain']) => (
            <div className="flex items-center gap-2">
              {value?.verified ? (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Verified
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-xs text-gray-500">N/A</span>
                </div>
              )}
              <Button variant="secondary" size="sm" className="p-1">
                <Eye size={12} />
              </Button>
            </div>
          )
        },
        {
          key: 'id' as keyof AuditLog,
          header: 'Actions',
          render: () => (
            <div className="flex items-center gap-1">
              <Button variant="secondary" size="sm" className="p-2">
                <FileText size={14} />
              </Button>
              <Button variant="secondary" size="sm" className="p-2">
                <MoreHorizontal size={14} />
              </Button>
            </div>
          )
        }
      ];

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-500 dark:text-gray-400">Loading audit logs...</p>
                  </div>
                </td>
              </tr>
            ) : logs?.length > 0 ? (
              logs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  {columns.map((column) => (
                    <td key={column.key as string} className="px-6 py-4 whitespace-nowrap">
                      {column.render && column.render(log[column.key as keyof AuditLog] as any, log)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <Shield size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No compliance events found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
}