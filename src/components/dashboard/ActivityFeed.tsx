// src/components/dashboard/ActivityFeed.tsx
import React from 'react';
import { Card } from '../ui/card';
import { Phone, CreditCard, Bell, Users, ArrowUpRight } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'call' | 'escrow' | 'moderation' | 'user';
  message: string;
  timestamp: string;
  icon: React.ReactNode;
  color: string;
}

export const ActivityFeed: React.FC = () => {
  const mockActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'call',
      message: 'U123 started call C101',
      timestamp: '2 minutes ago',
      icon: <Phone size={16} className="text-green-500 mt-0.5" />,
      color: 'bg-green-500'
    },
    {
      id: '2',
      type: 'escrow',
      message: 'Escrow locked KES 500 for call C102',
      timestamp: '5 minutes ago',
      icon: <CreditCard size={16} className="text-blue-500 mt-0.5" />,
      color: 'bg-blue-500'
    },
    {
      id: '3',
      type: 'moderation',
      message: 'Moderator Mod123 muted U456',
      timestamp: '12 minutes ago',
      icon: <Bell size={16} className="text-orange-500 mt-0.5" />,
      color: 'bg-orange-500'
    },
    {
      id: '4',
      type: 'user',
      message: 'New user U999 registered as Host',
      timestamp: '18 minutes ago',
      icon: <Users size={16} className="text-purple-500 mt-0.5" />,
      color: 'bg-purple-500'
    }
  ];

  return (
    <Card hover>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <button className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
          View all <ArrowUpRight size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className={`w-2 h-2 rounded-full mt-2 ${activity.color} ${activity.type === 'call' ? 'animate-pulse' : ''}`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {activity.timestamp}
              </p>
            </div>
            {activity.icon}
          </div>
        ))}
      </div>
    </Card>
  );
};