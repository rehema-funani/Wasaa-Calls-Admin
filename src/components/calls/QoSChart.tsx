// src/components/calls/QoSChart.tsx
import React from 'react';
import { Card } from '../ui/card';
import { Activity, TrendingUp } from 'lucide-react';

export const QoSChart: React.FC = () => {
  const mockMetrics = {
    avgLatency: 28,
    avgJitter: 2.1,
    packetLoss: 0.1,
    qualityScore: 94.2
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Quality of Service (QoS)
        </h3>
        <Activity size={20} className="text-primary-500" />
      </div>
      
      <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400 mb-6">
        <div className="text-center">
          <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
          <p>QoS Line Chart Component</p>
          <p className="text-sm">Real-time quality metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-700 dark:text-green-300">
            {mockMetrics.avgLatency}ms
          </div>
          <div className="text-xs text-green-600 dark:text-green-400">
            Avg Latency
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
            {mockMetrics.avgJitter}ms
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Avg Jitter
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
            {mockMetrics.packetLoss}%
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-400">
            Packet Loss
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-orange-700 dark:text-orange-300">
            {mockMetrics.qualityScore}%
          </div>
          <div className="text-xs text-orange-600 dark:text-orange-400">
            Overall Score
          </div>
        </div>
      </div>
    </Card>
  );
};