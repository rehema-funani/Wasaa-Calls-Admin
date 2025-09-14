// src/stores/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface UserFilters {
  role?: User['role'] | 'all';
  status?: User['status'] | 'all';
  searchQuery?: string;
}

interface UserStore {
  // Data
  users: User[];
  
  // Filters
  filters: UserFilters;
  
  // UI State
  selectedUser: User | null;
  showUserModal: boolean;
  
  // Actions
  setUsers: (users: User[]) => void;
  setFilters: (filters: Partial<UserFilters>) => void;
  setSelectedUser: (user: User | null) => void;
  toggleUserModal: (isOpen?: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Initial state
      users: [],
      filters: { role: 'all', status: 'all', searchQuery: '' },
      selectedUser: null,
      showUserModal: false,

      // Actions
      setUsers: (users) => set({ users }),
      setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      setSelectedUser: (user) => set({ selectedUser: user }),
      toggleUserModal: (isOpen) => set((state) => ({ showUserModal: isOpen ?? !state.showUserModal })),
    }),
    {
      name: 'user-store',
      partialize: (state) => ({ filters: state.filters })
    }
  )
);