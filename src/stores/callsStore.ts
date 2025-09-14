// src/stores/callsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Call } from '../types/calls';

interface CallsFilters {
  status?: 'Live' | 'Ended' | 'Paused' | 'Failed';
  type?: 'Audio' | 'Video' | 'Group';
  host?: string;
  qualityRange?: {
    min: number;
    max: number;
  };
}

interface CallsStore {
  // Data
  activeCalls: Call[];
  callHistory: Call[];
  
  // Filters and search
  filters: CallsFilters;
  searchQuery: string;
  
  // UI State
  selectedCall: Call | null;
  viewMode: 'grid' | 'list';
  showQualityModal: boolean;
  sortBy: 'startTime' | 'duration' | 'participants' | 'quality';
  sortOrder: 'asc' | 'desc';
  
  // Real-time updates
  lastUpdated: Date | null;
  autoRefresh: boolean;
  refreshInterval: number; // in milliseconds
  
  // Actions
  setActiveCalls: (calls: Call[]) => void;
  setCallHistory: (calls: Call[]) => void;
  setFilters: (filters: CallsFilters) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCall: (call: Call | null) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setSortBy: (sortBy: CallsStore['sortBy']) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  toggleQualityModal: () => void;
  toggleAutoRefresh: () => void;
  setRefreshInterval: (interval: number) => void;
  updateLastUpdated: () => void;
  
  // Computed values
  getFilteredCalls: () => Call[];
  getSortedCalls: (calls: Call[]) => Call[];
  getCallsByStatus: () => Record<string, number>;
  getAverageQuality: () => number;
}

export const useCallsStore = create<CallsStore>()(
  persist(
    (set, get) => ({
      // Initial state
      activeCalls: [],
      callHistory: [],
      filters: {},
      searchQuery: '',
      selectedCall: null,
      viewMode: 'grid',
      showQualityModal: false,
      sortBy: 'startTime',
      sortOrder: 'desc',
      lastUpdated: null,
      autoRefresh: true,
      refreshInterval: 5000,

      // Actions
      setActiveCalls: (calls) => set({ activeCalls: calls }),
      setCallHistory: (calls) => set({ callHistory: calls }),
      setFilters: (filters) => set({ filters }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCall: (call) => set({ selectedCall: call }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (order) => set({ sortOrder: order }),
      toggleQualityModal: () => set((state) => ({ showQualityModal: !state.showQualityModal })),
      toggleAutoRefresh: () => set((state) => ({ autoRefresh: !state.autoRefresh })),
      setRefreshInterval: (interval) => set({ refreshInterval: interval }),
      updateLastUpdated: () => set({ lastUpdated: new Date() }),

      // Computed values
      getFilteredCalls: () => {
        const { activeCalls, filters, searchQuery } = get();
        let filtered = [...activeCalls];

        // Apply filters
        if (filters.status) {
          filtered = filtered.filter(call => call.status === filters.status);
        }

        if (filters.type) {
          filtered = filtered.filter(call => call.type === filters.type);
        }

        if (filters.host) {
          filtered = filtered.filter(call => 
            call.host.name.toLowerCase().includes(filters.host!.toLowerCase()) ||
            call.host.id === filters.host
          );
        }

        if (filters.qualityRange) {
          const { min, max } = filters.qualityRange;
          filtered = filtered.filter(call => 
            call.quality.score >= min && call.quality.score <= max
          );
        }

        // Apply search
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(call =>
            call.id.toLowerCase().includes(query) ||
            call.host.name.toLowerCase().includes(query) ||
            call.participants.some(p => p.name.toLowerCase().includes(query))
          );
        }

        return filtered;
      },

      getSortedCalls: (calls) => {
        const { sortBy, sortOrder } = get();
        
        return [...calls].sort((a, b) => {
          let aValue: any, bValue: any;
          
          switch (sortBy) {
            case 'startTime':
              aValue = new Date(a.startTime);
              bValue = new Date(b.startTime);
              break;
            case 'duration':
              aValue = a.duration || 0;
              bValue = b.duration || 0;
              break;
            case 'participants':
              aValue = a.participants.length;
              bValue = b.participants.length;
              break;
            case 'quality':
              aValue = a.quality.score;
              bValue = b.quality.score;
              break;
            default:
              return 0;
          }
          
          if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
          } else {
            return aValue < bValue ? 1 : -1;
          }
        });
      },

      getCallsByStatus: () => {
        const { activeCalls } = get();
        return activeCalls.reduce((acc, call) => {
          acc[call.status] = (acc[call.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
      },

      getAverageQuality: () => {
        const { activeCalls } = get();
        if (activeCalls.length === 0) return 0;
        
        const totalQuality = activeCalls.reduce((sum, call) => sum + call.quality.score, 0);
        return Math.round(totalQuality / activeCalls.length);
      }
    }),
    {
      name: 'calls-store',
      partialize: (state) => ({
        filters: state.filters,
        viewMode: state.viewMode,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
        autoRefresh: state.autoRefresh,
        refreshInterval: state.refreshInterval
      })
    }
  )
);