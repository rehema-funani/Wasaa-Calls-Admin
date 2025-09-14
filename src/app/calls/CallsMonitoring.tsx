// src/app/calls/CallsMonitoring.tsx
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { 
  Phone, 
  Video,
  Activity
} from 'lucide-react';
import { CallMonitor } from '../../components/calls/CallMonitor';
import { RecordingsList } from '../../components/calls/RecordingsList';
import { QoSChart } from '../../components/calls/QoSChart';
import { cn } from '../../utils/helpers';

const tabs = [
  { name: 'Active Calls', path: '/calls', icon: Phone },
  { name: 'Recordings', path: '/calls/recordings', icon: Video },
  { name: 'QoS Metrics', path: '/calls/quality', icon: Activity },
];

const CallsMonitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Call Monitoring
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Monitor active calls, review recordings, and analyze quality of service.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <NavLink
              key={tab.name}
              to={tab.path}
              end={tab.path === '/calls'}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2',
                  isActive
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                )
              }
            >
              <tab.icon size={16} />
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        <Routes>
          <Route path="/" element={<CallMonitor />} />
          <Route path="/recordings" element={<RecordingsList />} />
          <Route path="/quality" element={<QoSChart />} />
        </Routes>
      </div>
    </div>
  );
};

export default CallsMonitoring;