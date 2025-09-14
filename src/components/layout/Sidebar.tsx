// src/components/layout/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Phone,
  CreditCard,
  Shield,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { cn } from '../../utils/helpers';

const sidebarItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & KPIs'
  },
  {
    label: 'Users & Roles',
    path: '/users',
    icon: Users,
    description: 'User management'
  },
  {
    label: 'Call Monitoring',
    path: '/calls',
    icon: Phone,
    description: 'Active calls & QoS'
  },
  {
    label: 'Billing & Wallet',
    path: '/billing',
    icon: CreditCard,
    description: 'Escrow & settlements'
  },
  {
    label: 'Moderation & Compliance',
    path: '/moderation',
    icon: Shield,
    description: 'Audit logs & GDPR'
  },
  {
    label: 'Reports & Analytics',
    path: '/reports',
    icon: BarChart3,
    description: 'Performance metrics'
  },
  {
    label: 'Settings & Integrations',
    path: '/settings',
    icon: Settings,
    description: 'Configuration'
  }
];

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  const location = useLocation();
  const { user, logout } = useAuthContext();

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className={cn(
      'bg-dark-bg text-white transition-all duration-300 flex flex-col h-full',
      isCollapsed ? 'w-20' : 'w-60'
    )}>
      {/* Header */}
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <Phone size={16} className="text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold">WasaaChat Calls</h1>
              <p className="text-xs text-gray-400">Admin Dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col px-4 py-6 gap-y-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActivePath(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center px-3 py-3 rounded-lg transition-all duration-200 group relative',
                isActive
                  ? 'bg-primary-500 text-white sidebar-active'
                  : 'text-gray-300 hover:bg-dark-surface hover:text-white'
              )}
            >
              <Icon size={20} className="flex-shrink-0" strokeWidth={1.5} />
              
              {!isCollapsed && (
                <>
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-sm mb-0.5">{item.label}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                  {isActive && (
                    <ChevronRight size={16} className="opacity-75" />
                  )}
                </>
              )}

              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-dark-surface rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                  <div className="font-medium text-sm whitespace-nowrap">{item.label}</div>
                  <div className="text-xs opacity-75 whitespace-nowrap">{item.description}</div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-dark-border">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-dark-surface rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{user?.name || 'Admin'}</div>
                <div className="text-xs text-gray-400 truncate">{user?.role || 'Administrator'}</div>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center px-3 py-2 text-gray-300 hover:text-white hover:bg-dark-surface rounded-lg transition-colors duration-200"
            >
              <LogOut size={16} className="mr-3" strokeWidth={1.5} />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex justify-center px-2 py-2 text-gray-300 hover:text-white hover:bg-dark-surface rounded-lg transition-colors duration-200"
              title="Logout"
            >
              <LogOut size={16} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
