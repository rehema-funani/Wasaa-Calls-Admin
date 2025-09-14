// src/hooks/useCalls.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { callsService } from '../api/services/calls';
import { toast } from 'react-hot-toast';

export const useCalls = () => {
  const queryClient = useQueryClient();

  // Get active calls
  const {
    data: activeCalls = [],
    isLoading: loadingCalls,
    error: callsError
  } = useQuery({
    queryKey: ['calls', 'active'],
    queryFn: callsService.getActiveCalls,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  // Join call as admin
  const joinCallMutation = useMutation({
    mutationFn: ({ callId }: { callId: string }) => callsService.joinCallAsAdmin(callId),
    onSuccess: (data) => {
      window.open(data.roomUrl, '_blank');
      toast.success('Joined call successfully');
    },
    onError: () => {
      toast.error('Failed to join call');
    }
  });

  // Mute user
  const muteUserMutation = useMutation({
    mutationFn: ({ callId, userId }: { callId: string; userId: string }) =>
      callsService.muteUser(callId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
      toast.success('User muted successfully');
    },
    onError: () => {
      toast.error('Failed to mute user');
    }
  });

  // Kick user
  const kickUserMutation = useMutation({
    mutationFn: ({ callId, userId, reason }: { callId: string; userId: string; reason?: string }) =>
      callsService.kickUser(callId, userId, reason || 'Admin intervention'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
      toast.success('User kicked successfully');
    },
    onError: () => {
      toast.error('Failed to kick user');
    }
  });

  // End call
  const endCallMutation = useMutation({
    mutationFn: ({ callId, reason }: { callId: string; reason?: string }) =>
      callsService.endCall(callId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calls'] });
      toast.success('Call ended successfully');
    },
    onError: () => {
      toast.error('Failed to end call');
    }
  });

  return {
    activeCalls,
    loadingCalls,
    callsError,
    joinCall: joinCallMutation.mutate,
    muteUser: muteUserMutation.mutate,
    kickUser: kickUserMutation.mutate,
    endCall: endCallMutation.mutate,
    isJoining: joinCallMutation.isPending,
    isMuting: muteUserMutation.isPending,
    isKicking: kickUserMutation.isPending,
    isEnding: endCallMutation.isPending,
    refreshCalls: () => queryClient.invalidateQueries({ queryKey: ['calls', 'active'] }),
  };
};
