import React from 'react';
import { Card } from '../../components/ui/card';
import { cn } from '../../utils/helpers';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  gradient: string;
  description: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  gradient,
  description,
}) => {
  return (
    <Card className={cn('p-6 text-white', gradient)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-4 text-sm">
        <div className={`flex items-center ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{change}</span>
        </div>
        <span className="opacity-80">{description}</span>
      </div>
    </Card>
  );
};