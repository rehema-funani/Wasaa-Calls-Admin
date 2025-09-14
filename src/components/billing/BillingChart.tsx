
// src/components/billing/BillingChart.tsx
import React from 'react';
import { Card } from '../ui/card';
import { TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatCurrency } from '../../utils/helpers';

export const BillingChart: React.FC = () => {
  const mockData = [
    { month: 'Jan', revenue: 45000, transactions: 234 },
    { month: 'Feb', revenue: 52000, transactions: 267 },
    { month: 'Mar', revenue: 48000, transactions: 245 },
    { month: 'Apr', revenue: 61000, transactions: 312 },
    { month: 'May', revenue: 55000, transactions: 289 },
    { month: 'Jun', revenue: 67000, transactions: 334 }
  ];

  const latestRevenue = mockData[mockData.length - 1].revenue;
  const previousRevenue = mockData[mockData.length - 2].revenue;
  const growth = ((latestRevenue - previousRevenue) / previousRevenue) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Revenue Trends
        </h3>
        <TrendingUp size={20} className="text-primary-500" />
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary-500)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--color-primary-500)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              stroke="var(--color-text-secondary)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `${formatCurrency(value, 'KES').replace('KES', 'K ')}`}
              domain={['dataMin - 5000', 'dataMax + 5000']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--background)', 
                borderColor: 'var(--border)',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'var(--foreground)' }}
              itemStyle={{ color: 'var(--color-primary-500)' }}
              formatter={(value) => formatCurrency(value as number, 'KES')}
            />
            <Area type="monotone" dataKey="revenue" stroke="var(--color-primary-500)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-center">
        <div className="text-center">
          <div className="text-primary-500 font-semibold">{formatCurrency(latestRevenue, 'KES')}</div>
          <div className="text-gray-500 dark:text-gray-400">This Month</div>
        </div>
        <div className="text-center">
          <div className={`font-semibold ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
          </div>
          <div className="text-gray-500 dark:text-gray-400">Growth</div>
        </div>
      </div>
    </Card>
  );
};
