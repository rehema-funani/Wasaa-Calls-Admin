
// src/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../api';
import { toast } from 'react-hot-toast';
import type { User } from '../types';

interface UseUsersOptions {
  search?: string;
  role?: string;
  status?: string;
}

export const useUsers = (options: UseUsersOptions = {}) => {
  const queryClient = useQueryClient();

  // Get users
  const {
    data: usersData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['users', options],
    queryFn: () => userService.getUsers({
      ...options,
      limit: 50
    }),
  });

  // Update user role
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: User['role'] }) =>
      userService.updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User role updated successfully');
    },
    onError: () => {
      toast.error('Failed to update user role');
    }
  });

  // Suspend user
  const suspendUserMutation = useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason?: string }) =>
      userService.suspendUser(userId, reason || 'Admin action'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User suspended successfully');
    },
    onError: () => {
      toast.error('Failed to suspend user');
    }
  });

  // Add user
  const addUserMutation = useMutation({
    mutationFn: (userData: Omit<User, 'id' | 'createdAt' | 'lastSeen' | 'activeCalls' | 'status'>) =>
      userService.addUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User added successfully');
    },
    onError: () => {
      toast.error('Failed to add user');
    }
  });

  return {
    users: usersData?.users || [],
    totalUsers: usersData?.total || 0,
    isLoading,
    error,
    updateRole: updateRoleMutation.mutate,
    suspendUser: suspendUserMutation.mutate,
    addUser: addUserMutation.mutate,
    isUpdatingRole: updateRoleMutation.isPending,
    isSuspending: suspendUserMutation.isPending,
    isAddingUser: addUserMutation.isPending,
  };
};
