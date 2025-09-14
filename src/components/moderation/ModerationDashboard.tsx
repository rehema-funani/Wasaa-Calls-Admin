// src/components/moderation/ModerationDashboard.tsx
import React from 'react';
import { Card } from '../common/Card';
import { cn } from '../../utils/helpers';
import { Shield, FileText, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const statDetails = {
  compliance: { icon: <FileText />, color: 'text-yellow-500', bg: 'bg-yellow-500' },
  moderation: { icon: <Shield />, color: 'text-blue-500', bg: 'bg-blue-500' },
  verification: { icon: <UserCheck />, color: 'text-green-500', bg: 'bg-green-500' },
};

const ModerationDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Pending Compliance Requests',
      value: 5,
      details: statDetails.compliance,
      link: '/moderation/gdpr',
    },
    {
      title: 'Recent Moderation Actions',
      value: 128,
      details: statDetails.moderation,
      link: '/moderation/audit',
    },
    {
      title: 'Pending Verifications',
      value: 12,
      details: statDetails.verification,
      link: '/users/verification',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Moderation & Compliance</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of moderation activities and compliance status.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link to={stat.link} key={stat.title}>
            <Card hover className="p-6">
              <div className="flex items-center justify-between">
                <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center bg-opacity-10', stat.details.bg)}>
                  {React.cloneElement(stat.details.icon, { className: cn('w-6 h-6', stat.details.color) })}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ModerationDashboard;