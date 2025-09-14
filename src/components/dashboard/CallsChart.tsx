
// src/components/dashboard/CallsChart.tsx
import React from 'react';
import { Card } from '../ui/card';
import { Phone } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const CallsChart: React.FC = () => {
  const mockData = [
    { hour: '00:00', calls: 45 },
    { hour: '04:00', calls: 28 },
    { hour: '08:00', calls: 125 },
    { hour: '12:00', calls: 234 },
    { hour: '16:00', calls: 189 },
    { hour: '20:00', calls: 156 }
  ];

  return (
    <Card hover>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Call Volume (24h)
        </h3>
        <Phone size={20} className="text-primary-500" />
      </div>
      
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary-500)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--color-primary-500)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="hour" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)', 
                borderColor: 'var(--border)',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'var(--foreground)' }}
              itemStyle={{ color: 'var(--color-primary-500)' }}
            />
            <Area type="monotone" dataKey="calls" stroke="var(--color-primary-500)" strokeWidth={2} fillOpacity={1} fill="url(#colorCalls)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-center">
        <div>
          <div className="text-primary-500 font-semibold">342</div>
          <div className="text-gray-500 dark:text-gray-400">Active Now</div>
        </div>
        <div>
          <div className="text-green-500 font-semibold">1,847</div>
          <div className="text-gray-500 dark:text-gray-400">Today</div>
        </div>
        <div>
          <div className="text-blue-500 font-semibold">12.5min</div>
          <div className="text-gray-500 dark:text-gray-400">Avg Duration</div>
        </div>
      </div>
    </Card>
  );
};