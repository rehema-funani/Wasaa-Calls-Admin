// src/components/users/UserModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../ui/button';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { Input } from '../ui/input';
import { User, Mail, Phone, Calendar, Shield, MapPin } from 'lucide-react';
import { formatTimeAgo } from '../../utils/helpers';
import type { User as UserType } from '../../types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  isAddMode?: boolean;
  onAddUser?: (userData: Omit<UserType, 'id' | 'createdAt' | 'lastSeen' | 'activeCalls' | 'status'>) => void;
  onUpdateRole?: (userId: string, role: UserType['role']) => void;
  onSuspendUser?: (userId: string) => void;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  user,
  isAddMode = false,
  onAddUser,
  onUpdateRole,
  onSuspendUser
}) => {
  const [selectedRole, setSelectedRole] = useState<UserType['role']>('User');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserType['role']>('User');

  useEffect(() => {
    if (user && !isAddMode) {
      setSelectedRole(user.role);
    } else if (isAddMode) {
      // Reset form when opening in add mode
      setNewUserName('');
      setNewUserEmail('');
      setNewUserRole('User');
    }
  }, [user, isAddMode]);

  if (!user && !isAddMode) return null;

  const handleRoleUpdate = () => {
    if (!user) return;
    if (selectedRole !== user.role) {
      onUpdateRole?.(user.id, selectedRole);
    }
    onClose();
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) {
      // Basic validation
      return;
    }
    onAddUser?.({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      isVerified: false, // New users are not verified by default
      // Other optional fields can be added here if needed
    });
    onClose();
  };

  const getRoleBadge = (role: UserType['role']) => {
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
    <Modal isOpen={isOpen} onClose={onClose} title={isAddMode ? "Add New User" : "User Details"} size="lg">
      <div className="space-y-6">
        {isAddMode ? (
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <Input value={newUserName} onChange={(e) => setNewUserName(e.target.value)} required placeholder="e.g. John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <Input type="email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} required placeholder="e.g. john.doe@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
              <select
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value as UserType['role'])}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="User">User</option>
                <option value="Host">Host</option>
                <option value="Moderator">Moderator</option>
                <option value="Admin">Admin</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit">Add User</Button>
            </div>
          </form>
        ) : user ? (
          <>
            {/* User Header */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <Avatar name={user.name} size="lg" showOnlineStatus isOnline={user.status === 'Online'} />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                  {user.isVerified && (<span title="Verified Account"><Shield size={16} className="text-blue-500" /></span>)}
                </div>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant={getRoleBadge(user.role)} size="sm">{user.role}</Badge>
                  <Badge variant={user.status === 'Online' ? 'success' : 'neutral'} size="sm">{user.status}</Badge>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Contact Information</h4>
                <div className="flex items-center space-x-3 text-sm"><User size={16} className="text-gray-400" /><span className="text-gray-700 dark:text-gray-300">{user.name}</span></div>
                <div className="flex items-center space-x-3 text-sm"><Mail size={16} className="text-gray-400" /><span className="text-gray-700 dark:text-gray-300">{user.email}</span></div>
                {user.phoneNumber && (<div className="flex items-center space-x-3 text-sm"><Phone size={16} className="text-gray-400" /><span className="text-gray-700 dark:text-gray-300">{user.phoneNumber}</span></div>)}
                {user.country && (<div className="flex items-center space-x-3 text-sm"><MapPin size={16} className="text-gray-400" /><span className="text-gray-700 dark:text-gray-300">{user.country}</span></div>)}
                <div className="flex items-center space-x-3 text-sm"><Calendar size={16} className="text-gray-400" /><span className="text-gray-700 dark:text-gray-300">Joined {formatTimeAgo(user.createdAt)}</span></div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Active Calls:</span><span className="font-medium text-gray-900 dark:text-white">{user.activeCalls}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Last Seen:</span><span className="font-medium text-gray-900 dark:text-white">{formatTimeAgo(user.lastSeen)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Account Status:</span><span className="font-medium text-gray-900 dark:text-white">{user.isVerified ? 'Verified' : 'Unverified'}</span></div>
                </div>
              </div>
            </div>

            {/* Role Management */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Role Management</h4>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Change Role</label>
                  <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value as UserType['role'])} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="User">User</option>
                    <option value="Host">Host</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                {selectedRole !== user.role && (<Button variant="primary" size="sm" onClick={handleRoleUpdate}>Update Role</Button>)}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button variant="danger" onClick={() => { onSuspendUser?.(user.id); onClose(); }}>Suspend User</Button>
              <div className="flex items-center space-x-3"><Button variant="ghost" onClick={onClose}>Close</Button></div>
            </div>
          </>
        ) : null}
      </div>
    </Modal>
  );
};
