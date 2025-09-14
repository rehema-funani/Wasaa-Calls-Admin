// src/components/users/RoleManager.tsx
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../common/Badge';
import { Button } from '../ui/button';
import { Shield, Users, Plus } from 'lucide-react';
import type { User } from '../../types';

interface Role {
  id: string;
  name: User['role'];
  description: string;
  userCount: number;
  permissions: string[];
}

export const RoleManager: React.FC = () => {
  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access and management capabilities',
      userCount: 3,
      permissions: ['manage_users', 'manage_calls', 'manage_billing', 'manage_system']
    },
    {
      id: '2',
      name: 'Moderator',
      description: 'Call moderation and user management',
      userCount: 12,
      permissions: ['moderate_calls', 'manage_users', 'view_reports']
    },
    {
      id: '3',
      name: 'Business',
      description: 'Business account with advanced calling features',
      userCount: 245,
      permissions: ['create_calls', 'access_analytics', 'priority_support']
    },
    {
      id: '4',
      name: 'Host',
      description: 'Can host and manage calls',
      userCount: 1847,
      permissions: ['create_calls', 'manage_participants', 'record_calls']
    },
    {
      id: '5',
      name: 'User',
      description: 'Standard user with basic calling capabilities',
      userCount: 22785,
      permissions: ['join_calls', 'make_payments']
    }
  ]);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Role Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage user roles and permissions
          </p>
        </div>
        <Button variant="primary">
          <Plus size={16} className="mr-2" />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <Badge variant={getRoleBadge(role.name)} size="sm">
                    {role.name}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {role.description}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <Users size={14} className="text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {role.userCount.toLocaleString()} users
                </span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Permissions
              </h4>
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((permission) => (
                  <span
                    key={permission}
                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
                  >
                    {permission.replace('_', ' ')}
                  </span>
                ))}
                {role.permissions.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                    +{role.permissions.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                Edit
              </Button>
              <Button variant="ghost" size="sm">
                View Users
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};