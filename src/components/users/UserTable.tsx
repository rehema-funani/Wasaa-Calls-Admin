// src/components/users/UserTable.tsx
import React from 'react';
import { Table } from '../common/Table';
import { Badge } from '../common/Badge';
import { Button } from '../ui/button';
import { UserCheck, UserX, Shield, MoreHorizontal } from 'lucide-react';
import { formatTimeAgo, cn } from '../../utils/helpers';
import type { User } from '../../types';

interface UserTableProps {
  users: User[];
  loading?: boolean;
  onViewUser: (user: User) => void;
  onSuspendUser: (userId: string) => void;
  onUpdateRole: (userId: string, role: User['role']) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  onViewUser,
  onSuspendUser,
  onUpdateRole
}) => {
  const getRoleBadge = (role: User['role']) => {
    const roleColors = {
      User: 'neutral' as const,
      Host: 'info' as const,
      Moderator: 'warning' as const,
      Admin: 'danger' as const,
      Business: 'success' as const
    };
    return roleColors[role];
  };

  const getStatusBadge = (status: User['status']): 'success' | 'neutral' => {
    return status === 'Online' ? 'success' as const : 'neutral' as const;
  };

  const columns = [
    {
      key: 'name' as keyof User,
      header: 'User',
      render: (_: string, row: User) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {row.name.charAt(0)}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {row.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {row.email}
            </div>
            <div className="text-xs text-gray-400">
              ID: {row.id}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'role' as keyof User,
      header: 'Role',
      render: (value: User['role']) => (
        <Badge variant={getRoleBadge(value)} size="sm">{value}</Badge>
      )
    },
    {
      key: 'status' as keyof User,
      header: 'Status',
      render: (value: User['status']) => (
        <div className="flex items-center">
          <div className={cn("w-2 h-2 rounded-full mr-2", value === 'Online' ? 'bg-green-500' : 'bg-gray-400')}></div>
          <Badge variant={getStatusBadge(value)} size="sm">{value}</Badge>
        </div>
      )
    },
    { key: 'activeCalls' as keyof User, header: 'Active Calls' },
    { key: 'lastSeen' as keyof User, header: 'Last Seen', render: (value: string) => formatTimeAgo(value) },
    {
      key: 'id' as keyof User,
      header: 'Actions',
      className: 'text-right',
      render: (value: string, row: User) => (
        <div className="flex items-center justify-end space-x-1">
          <Button variant="ghost" size="sm" className="p-1.5 h-auto" onClick={() => onViewUser(row)} title="View Profile"><UserCheck size={16} /></Button>
          <Button variant="ghost" size="sm" className="p-1.5 h-auto text-red-600 hover:text-red-700" onClick={() => onSuspendUser(value)} title="Suspend User"><UserX size={16} /></Button>
          <Button variant="ghost" size="sm" className="p-1.5 h-auto text-orange-600 hover:text-orange-700" onClick={() => onUpdateRole(value, 'Moderator')} title="Change Role"><Shield size={16} /></Button>
          <Button variant="ghost" size="sm" className="p-1.5 h-auto"><MoreHorizontal size={16} /></Button>
        </div>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      data={users}
      loading={loading}
      emptyMessage="No users found. Try adjusting your search or filter criteria."
    />
  );
};