// src/context/CallsContext.tsx
import React, { createContext, useContext } from 'react';
import { useCalls } from '../hooks/useCalls';
import type { Call } from '../types/calls';

interface CallsContextType {
  activeCalls: Call[];
  loading: boolean;
  error: string | null;
  refreshCalls: () => void;
  joinCall: (callId: string) => Promise<void>;
  muteUser: (callId: string, userId: string) => Promise<void>;
  kickUser: (callId: string, userId: string, reason?: string) => Promise<void>;
  endCall: (callId: string, reason?: string) => Promise<void>;
}

const CallsContext = createContext<CallsContextType | undefined>(undefined);

export const CallsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activeCalls,
    loadingCalls,
    callsError,
    joinCall: joinCallMutation,
    muteUser: muteUserMutation,
    kickUser: kickUserMutation,
    endCall: endCallMutation,
    refreshCalls,
  } = useCalls();

  const value: CallsContextType = {
    activeCalls,
    loading: loadingCalls,
    error: callsError ? 'Failed to fetch active calls' : null,
    refreshCalls,
    joinCall: async (callId) => joinCallMutation({ callId }),
    muteUser: async (callId, userId) => muteUserMutation({ callId, userId }),
    kickUser: async (callId, userId, reason) => kickUserMutation({ callId, userId, reason }),
    endCall: async (callId, reason) => endCallMutation({ callId, reason }),
  };

  return (
    <CallsContext.Provider value={value}>
      {children}
    </CallsContext.Provider>
  );
};

export const useCallsContext = () => {
  const context = useContext(CallsContext);
  if (context === undefined) {
    throw new Error('useCallsContext must be used within a CallsProvider');
  }
  return context;
};