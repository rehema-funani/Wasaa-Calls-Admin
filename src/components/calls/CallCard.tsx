// src/components/calls/CallCard.tsx
import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../common/Badge';
import { Button } from '../ui/button';
import { 
  Phone, 
  Video, 
  Users, 
  Clock, 
  Signal, 
  Activity, 
  Eye, 
  Mic, 
  UserX, 
  MoreHorizontal 
} from 'lucide-react';
import { formatTimeAgo, cn } from '../../utils/helpers';
import type { Call } from '../../types/calls';

interface CallCardProps {
  call: Call;
  onJoinCall?: (callId: string) => void;
  onMuteUser?: (callId: string, userId: string) => void;
  onKickUser?: (callId: string, userId: string) => void;
}

export const CallCard: React.FC<CallCardProps> = ({
  call,
  onJoinCall,
  onMuteUser,
  onKickUser
}) => {
  const getQualityBadge = (score: number) => {
    if (score >= 90) return { variant: 'success' as const, label: 'Excellent' };
    if (score >= 70) return { variant: 'warning' as const, label: 'Good' };
    return { variant: 'danger' as const, label: 'Poor' };
  };

  const quality = getQualityBadge(call.quality.score);
  const hasParticipants = call.participants.length > 0;

  return (
    <Card hover className="p-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              {call.type === 'Video' ? (
                <Video size={16} className="text-white" />
              ) : (
                <Phone size={16} className="text-white" />
              )}
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              Call {call.id}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Host: {call.host.name}
            </div>
          </div>
        </div>
        <Badge variant={quality.variant} size="sm">
          {quality.label} {call.quality.score}%
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <Users size={14} className="text-gray-500" />
          <span>{call.participants.length} participants</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-gray-500" />
          <span>{formatTimeAgo(call.startTime)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Signal size={14} className="text-gray-500" />
          <span>{call.quality.latency}ms latency</span>
        </div>
        <div className="flex items-center space-x-2">
          <Activity size={14} className="text-gray-500" />
          <span>{call.quality.bitrate} kbps</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={() => onJoinCall?.(call.id)}
          variant="primary"
          size="sm"
          className="flex-1"
        >
          <Eye size={14} className="mr-1" />
          Join as Admin
        </Button>
        <Button
          onClick={() => hasParticipants && onMuteUser?.(call.id, call.participants[0].id)}
          variant="ghost"
          size="sm"
          className={cn("p-1.5 h-auto bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 dark:text-orange-400", !hasParticipants && "opacity-50 cursor-not-allowed")}
          title="Mute User"
          disabled={!hasParticipants}
        >
          <Mic size={14} />
        </Button>
        <Button
          onClick={() => hasParticipants && onKickUser?.(call.id, call.participants[0].id)}
          variant="ghost"
          size="sm"
          className={cn("p-1.5 h-auto bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400", !hasParticipants && "opacity-50 cursor-not-allowed")}
          title="Kick User"
          disabled={!hasParticipants}
        >
          <UserX size={14} />
        </Button>
        <Button variant="ghost" size="sm" className="p-1.5 h-auto">
          <MoreHorizontal size={14} />
        </Button>
      </div>
    </Card>
  );
};