
// src/components/calls/RecordingsList.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table } from '../common/Table';
import { Badge } from '../common/Badge';
import { Play, Download, Shield, AlertTriangle } from 'lucide-react';
import { formatDuration, formatTimeAgo, formatFileSize } from '../../utils/helpers';
import { callsService } from '../../api/services/calls';
import type { CallRecording as Recording } from '../../types/calls';

export const RecordingsList: React.FC = () => {
  const { 
    data: recordingsData, 
    isLoading: loading,
  } = useQuery({
    queryKey: ['recordings'],
    queryFn: () => callsService.getRecordings({ limit: 50 }),
  });

  const recordings = recordingsData?.data || [];

  const columns = [
    {
      key: 'callId' as keyof Recording,
      header: 'Call ID',
      render: (value: string, row: Recording) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
            Call {value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.participants.length} participants
          </div>
        </div>
      )
    },
    {
      key: 'duration' as keyof Recording,
      header: 'Duration',
      render: (value: number) => formatDuration(value)
    },
    {
      key: 'size' as keyof Recording,
      header: 'File Size',
      render: (value: number) => formatFileSize(value)
    },
    {
      key: 'hasConsent' as keyof Recording,
      header: 'Consent Status',
      render: (value: boolean) => (
        <div className="flex items-center">
          {value ? (
            <Badge variant="success" size="sm">
              <Shield size={12} className="mr-1" />
              Verified
            </Badge>
          ) : (
            <Badge variant="warning" size="sm">
              <AlertTriangle size={12} className="mr-1" />
              Missing
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'createdAt' as keyof Recording,
      header: 'Created',
      render: (value: string) => formatTimeAgo(value)
    },
    {
      key: 'id' as keyof Recording,
      header: 'Actions',
      className: 'text-right',
      render: (value: string, row: Recording) => (
        <div className="flex items-center justify-end space-x-2">
          <button
            onClick={() => alert(`Playing recording for call ${row.callId}`)}
            className="p-1.5 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
            title="Play Recording"
          >
            <Play size={16} />
          </button>
          <button
            onClick={() => alert(`Downloading recording ${value}`)}
            className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
            title="Download"
          >
            <Download size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <Table
      data={recordings || []}
      columns={columns}
      loading={loading}
      emptyMessage="No recordings found"
    />
  );
};