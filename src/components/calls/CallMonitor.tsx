// src/components/calls/CallMonitor.tsx
import React from 'react';
import { CallCard } from './CallCard';
import { Card } from '../ui/card';
import { Phone } from 'lucide-react';
import { useCallsContext } from '../../context/CallsContext';

export const CallMonitor: React.FC = () => {
  const { activeCalls, loading, joinCall, muteUser, kickUser } = useCallsContext();

  if (loading && activeCalls.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (activeCalls.length === 0) {
    return (
      <Card className="py-16 text-center">
        <Phone size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No active calls
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          All calls have ended. New calls will appear here when they start.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {activeCalls.map((call) => (
        <CallCard
          key={call.id}
          call={call}
          onJoinCall={joinCall}
          onMuteUser={muteUser}
          onKickUser={kickUser}
        />
      ))}
    </div>
  );
};