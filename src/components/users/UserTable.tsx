// src/components/users/UserTable.tsx
import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../common/Badge';
import { Mail, Phone, Calendar, Shield, UserX, MoreHorizontal, Users } from 'lucide-react';
import type { User as UserType } from '../../types';
import { formatTimeAgo } from '../../utils/helpers';

interface UserTableProps {
  users: UserType[];
  loading: boolean;
  onViewUser: (user: UserType) => void;
  onSuspendUser: (userId: string) => void;
  onUpdateRole: (userId: string, role: UserType['role']) => void;
}

const getRoleBadgeVariant = (role: string) => {
  const roleMap: { [key: string]: string } = {
    'Admin': 'admin',
    'Moderator': 'moderator',
    'Business': 'business',
    'Host': 'host',
    'User': 'user'
  };
  return roleMap[role] || 'default';
};

const getStatusBadgeVariant = (status: UserType['status']) => {
  return status === 'Online' ? 'success' : 'default' as const;
};

export const UserTable: React.FC<UserTableProps> = ({ users, loading, onViewUser, onSuspendUser, onUpdateRole }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Active Calls
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Last Seen
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user: UserType) => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-12 w-12">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Mail size={14} />
                      {user.email}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      ID: {user.id}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getRoleBadgeVariant(user.role) as any}>
                  <Shield size={12} className="mr-1" />
                  {user.role}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    user.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  <Badge variant={getStatusBadgeVariant(user.status)}>
                    {user.status}
                  </Badge>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.activeCalls || 0}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(user.lastSeen) || 'Never'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onViewUser(user)}
                    className="flex items-center gap-1">View</Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onUpdateRole(user.id, user.role)}
                    className="flex items-center gap-1"
                  >
                    <Shield size={14} />
                    Role
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onSuspendUser(user.id)}
                    className="flex items-center gap-1"
                  >
                    <UserX size={14} />
                    Suspend
                  </Button>
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
      
      {users.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No users found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};