
// src/components/dashboard/LiveCallMap.tsx
import React from 'react';
import { Card } from '../ui/card';
import { Globe } from 'lucide-react';

export const LiveCallMap: React.FC = () => {
  const regionData = [
    { country: 'Kenya', calls: 156, flag: '🇰🇪', status: 'high' },
    { country: 'Uganda', calls: 89, flag: '🇺🇬', status: 'medium' },
    { country: 'Tanzania', calls: 97, flag: '🇹🇿', status: 'high' },
    { country: 'Rwanda', calls: 23, flag: '🇷🇼', status: 'low' },
    { country: 'Ethiopia', calls: 45, flag: '🇪🇹', status: 'medium' }
  ];

  const statusColorMap: { [key: string]: string } = {
    high: 'bg-green-500',
    medium: 'bg-yellow-500',
    low: 'bg-red-500',
    default: 'bg-gray-500',
  };

  return (
    <Card hover>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Live Call Map
        </h3>
        <Globe size={20} className="text-primary-500" />
      </div>
      
      <div className="relative h-48 mb-6">
        <Globe size={128} className="absolute inset-0 w-full h-full text-gray-200 dark:text-gray-700 opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">Live Call Distribution</p>
        </div>
      </div>

      <div className="space-y-3">
        {regionData.map((region) => (
          <div key={region.country} className="flex items-center justify-between p-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{region.flag}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {region.country}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className={`w-2.5 h-2.5 rounded-full ${statusColorMap[region.status] || statusColorMap.default}`}></div>
              <div className="text-gray-800 dark:text-gray-200">
                <span className="font-semibold">{region.calls}</span>
                <span className="text-gray-500 dark:text-gray-400"> calls</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};