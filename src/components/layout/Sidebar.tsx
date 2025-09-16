// import React, { useState, useMemo } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Users,
//   Phone,
//   CreditCard,
//   Shield,
//   BarChart3,
//   Settings,
//   LogOut,
//   ChevronRight,
//   Bell,
//   Search,
//   ChevronLeft,
//   Activity,
//   Zap
// } from 'lucide-react';
// import { useAuthContext } from '../../context/AuthContext';
// import { cn } from '../../utils/helpers';

// const sidebarItems = [
//   {
//     label: 'Dashboard',
//     path: '/dashboard',
//     icon: LayoutDashboard,
//     description: 'Overview & KPIs',
//     badge: null,
//   },
//   {
//     label: 'Users & Roles',
//     path: '/users',
//     icon: Users,
//     description: 'User management',
//     badge: '342',
//   },
//   {
//     label: 'Call Monitoring',
//     path: '/calls',
//     icon: Phone,
//     description: 'Active calls & QoS',
//     badge: 'Live',
//     badgeColor: 'green',
//   },
//   {
//     label: 'Billing & Wallet',
//     path: '/billing',
//     icon: CreditCard,
//     description: 'Escrow & settlements',
//     badge: null,
//   },
//   {
//     label: 'Moderation & Compliance',
//     path: '/moderation',
//     icon: Shield,
//     description: 'Audit logs & GDPR',
//     badge: null,
//   },
//   {
//     label: 'Reports & Analytics',
//     path: '/reports',
//     icon: BarChart3,
//     description: 'Performance metrics',
//     badge: null,
//   },
//   {
//     label: 'Settings & Integrations',
//     path: '/settings',
//     icon: Settings,
//     description: 'Configuration',
//     badge: null,
//   },
// ];

// const NavBadge: React.FC<{ text: string; color?: string; isLive?: boolean }> = ({ text, color = 'blue', isLive = false }) => {
//   const colorClasses = {
//     blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
//     green: 'bg-green-500/20 text-green-300 border-green-500/30',
//     red: 'bg-red-500/20 text-red-300 border-red-500/30',
//     yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
//   };

//   return (
//     <span className={cn('inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border', colorClasses[color as keyof typeof colorClasses], isLive && 'animate-pulse')}>
//       {isLive && <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></div>}
//       {text}
//     </span>
//   );
// };

// const SidebarItem: React.FC<{ item: typeof sidebarItems[0]; isActive: boolean; isCollapsed: boolean }> = ({ item, isActive, isCollapsed }) => {
//   const Icon = item.icon;
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link
//         to={item.path}
//         className={cn('w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative',
//           isActive
//             ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
//             : 'text-slate-300 hover:bg-slate-800 hover:text-white'
//         )}
//       >
//         <div className="flex items-center justify-center w-5 h-5">
//           <Icon size={18} className="flex-shrink-0" strokeWidth={1.5} />
//         </div>
        
//         {!isCollapsed && (
//           <>
//             <div className="ml-3 flex-1 text-left">
//               <div className="font-medium text-sm mb-0.5 flex items-center justify-between">
//                 {item.label}
//                 {item.badge && (
//                   <NavBadge 
//                     text={item.badge} 
//                     color={item.badgeColor} 
//                     isLive={item.badge === 'Live'}
//                   />
//                 )}
//               </div>
//               <div className="text-xs opacity-75">{item.description}</div>
//             </div>
//             {isActive && (
//               <ChevronRight size={14} className="opacity-75 ml-2" />
//             )}
//           </>
//         )}

//         {/* Active indicator */}
//         {isActive && (
//           <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
//         )}
//       </Link>

//       {/* Tooltip for collapsed state */}
//       {isCollapsed && isHovered && (
//         <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 z-50">
//           <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl min-w-48">
//             <div className="font-medium text-sm text-white">{item.label}</div>
//             <div className="text-xs text-slate-400 mt-1">{item.description}</div>
//             {item.badge && (
//               <div className="mt-2">
//                 <NavBadge 
//                   text={item.badge} 
//                   color={item.badgeColor} 
//                   isLive={item.badge === 'Live'}
//                 />
//               </div>
//             )}
//             {/* Arrow pointing to sidebar */}
//             <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-slate-800"></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// interface SidebarProps {
//   isCollapsed?: boolean;
//   onToggle?: () => void;
// }

// export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
//   const location = useLocation();
//   const { user, logout } = useAuthContext();
//   const [searchQuery, setSearchQuery] = useState('');

//   const isActivePath = (path: string) => {
//     return location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));
//   };

//   const filteredItems = useMemo(() => sidebarItems.filter(item =>
//     item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.description.toLowerCase().includes(searchQuery.toLowerCase())
//   ), [searchQuery]);

//   return (
//     <div
//       className={cn(
//         'bg-slate-900 text-white transition-all duration-300 flex flex-col h-screen border-r border-slate-800',
//         isCollapsed ? 'w-20' : 'w-72'
//       )}
//     >
//       {/* Header */}
//       <div className="p-6 border-b border-slate-800">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="relative">
//               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Phone size={20} className="text-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
//             </div>
//             {!isCollapsed && (
//               <div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
//                   WasaaChat Calls
//                 </h1>
//                 <p className="text-xs text-slate-400 flex items-center gap-1">
//                   <Activity size={12} />
//                   Admin Dashboard
//                 </p>
//               </div>
//             )}
//           </div>
          
//           <button
//             onClick={onToggle}
//             className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
//           >
//             {isCollapsed ? (
//               <ChevronRight size={16} className="text-slate-400" />
//             ) : (
//               <ChevronLeft size={16} className="text-slate-400" />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       {!isCollapsed && (
//         <div className="p-4 border-b border-slate-800">
//           <div className="relative">
//             <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//             <input
//               type="text"
//               placeholder="Search menu..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//             />
//           </div>
//         </div>
//       )}

//       {/* Navigation */}
//       <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-thin">
//         <div className="space-y-2">
//           {filteredItems.map((item) => (
//             <SidebarItem
//               key={item.path}
//               item={item}
//               isActive={isActivePath(item.path)}
//               isCollapsed={isCollapsed}
//             />
//           ))}
//         </div>

//         {/* Quick Stats */}
//         {!isCollapsed && (
//           <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
//             <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
//               <Zap size={14} className="text-blue-400" />
//               Quick Stats
//             </h3>
//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-xs text-slate-400">Active Users</span>
//                 <span className="text-xs font-medium text-green-400">342</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-xs text-slate-400">Live Calls</span>
//                 <span className="text-xs font-medium text-blue-400">28</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-xs text-slate-400">System Health</span>
//                 <span className="text-xs font-medium text-green-400">98%</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Notifications */}
//       {!isCollapsed && (
//         <div className="px-4 py-2">
//           <button className="w-full flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors border border-slate-700">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <Bell size={16} className="text-slate-300" />
//                 <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
//               </div>
//               <span className="text-sm font-medium text-slate-300">3 new alerts</span>
//             </div>
//             <ChevronRight size={14} className="text-slate-400" />
//           </button>
//         </div>
//       )}

//       {/* User Profile & Logout */}
//       <div className="p-4 border-t border-slate-800">
//         {!isCollapsed ? (
//           <div className="space-y-3">
//             <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700">
//               <div className="relative">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                   <span className="text-sm font-semibold text-white">
//                     {user?.name?.charAt(0) || 'A'}
//                   </span>
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</div>
//                 <div className="text-xs text-slate-400 truncate flex items-center gap-1">
//                   <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                   {user?.role || 'Administrator'}
//                 </div>
//               </div>
//             </div>
//             <button onClick={logout} className="w-full flex items-center justify-center px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200 border border-slate-700 hover:border-slate-600">
//               <LogOut size={16} className="mr-2" strokeWidth={1.5} />
//               <span className="text-sm font-medium">Logout</span>
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             <div className="flex flex-col items-center">
//               <div className="relative">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                   <span className="text-sm font-semibold text-white">
//                     {user?.name?.charAt(0) || 'A'}
//                   </span>
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
//               </div>
//             </div>
//             <button
//               onClick={logout}
//               className="w-full flex justify-center px-2 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200"
//               title="Logout"
//             >
//               <LogOut size={16} strokeWidth={1.5} />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

import React, { useState, useMemo } from 'react';
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
  ChevronRight,
  Bell,
  Search,
  ChevronLeft,
  Activity,
  Zap
} from 'lucide-react';
// import { useAuthContext } from '../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';

import { cn } from '../../utils/helpers';

const sidebarItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & KPIs',
    badge: null,
  },
  {
    label: 'Users & Roles',
    path: '/users',
    icon: Users,
    description: 'User management',
    badge: '342',
  },
  {
    label: 'Call Monitoring',
    path: '/calls',
    icon: Phone,
    description: 'Active calls & QoS',
    badge: 'Live',
    badgeColor: 'green',
  },
  {
    label: 'Billing & Wallet',
    path: '/billing',
    icon: CreditCard,
    description: 'Escrow & settlements',
    badge: null,
  },
  {
    label: 'Moderation & Compliance',
    path: '/moderation',
    icon: Shield,
    description: 'Audit logs & GDPR',
    badge: null,
  },
  {
    label: 'Reports & Analytics',
    path: '/reports',
    icon: BarChart3,
    description: 'Performance metrics',
    badge: null,
  },
  {
    label: 'Settings & Integrations',
    path: '/settings',
    icon: Settings,
    description: 'Configuration',
    badge: null,
  },
];

const NavBadge: React.FC<{ text: string; color?: string; isLive?: boolean }> = ({ text, color = 'blue', isLive = false }) => {
  const colorClasses = {
    blue: 'bg-blue-600 text-white',
    green: 'bg-green-600 text-white',
    red: 'bg-red-600 text-white',
    yellow: 'bg-yellow-600 text-white',
  };

  return (
    <span className={cn('inline-flex items-center px-2 py-1 rounded-full text-xs font-medium', colorClasses[color as keyof typeof colorClasses], isLive && 'animate-pulse')}>
      {isLive && <div className="w-1.5 h-1.5 bg-white rounded-full mr-1"></div>}
      {text}
    </span>
  );
};

const SidebarItem: React.FC<{ item: typeof sidebarItems[0]; isActive: boolean; isCollapsed: boolean }> = ({ item, isActive, isCollapsed }) => {
  const Icon = item.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={item.path}
        className={cn('w-full flex items-center px-4 py-3 rounded-none transition-all duration-200 group relative',
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        )}
      >
        <div className="flex items-center justify-center w-5 h-5">
          <Icon size={20} className="flex-shrink-0" strokeWidth={1.5} />
        </div>
        
        {!isCollapsed && (
          <>
            <div className="ml-3 flex-1 text-left">
              <div className="font-medium text-sm mb-1">
                {item.label}
              </div>
              <div className="text-xs opacity-75">{item.description}</div>
            </div>
            {item.badge && (
              <NavBadge 
                text={item.badge} 
                color={item.badgeColor} 
                isLive={item.badge === 'Live'}
              />
            )}
            {isActive && (
              <ChevronRight size={16} className="opacity-75 ml-2" />
            )}
          </>
        )}
      </Link>

      {/* Tooltip for collapsed state */}
      {isCollapsed && isHovered && (
        <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl min-w-48">
            <div className="font-medium text-sm text-white">{item.label}</div>
            <div className="text-xs text-slate-400 mt-1">{item.description}</div>
            {item.badge && (
              <div className="mt-2">
                <NavBadge 
                  text={item.badge} 
                  color={item.badgeColor} 
                  isLive={item.badge === 'Live'}
                />
              </div>
            )}
            {/* Arrow pointing to sidebar */}
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-slate-800"></div>
          </div>
        </div>
      )}
    </div>
  );
};

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const isActivePath = (path: string) => {
    return location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path));
  };

  const filteredItems = useMemo(() => sidebarItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  ), [searchQuery]);

  return (
    <div
      className={cn(
        'bg-slate-900 text-white transition-all duration-300 flex flex-col h-screen',
        isCollapsed ? 'w-20' : 'w-72'
      )}
    >
      {/* Header */}
      <div className="px-4 py-6 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Phone size={20} className="text-white" />
              </div>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-white">
                  WasaaChat Calls
                </h1>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Activity size={12} />
                  Admin Dashboard
                </p>
              </div>
            )}
          </div>
          
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight size={16} className="text-slate-400" />
            ) : (
              <ChevronLeft size={16} className="text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-4 py-4 border-b border-slate-800">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="py-4">
          {filteredItems.map((item) => (
            <SidebarItem
              key={item.path}
              item={item}
              isActive={isActivePath(item.path)}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        {/* Quick Stats */}
        {!isCollapsed && (
          <div className="px-4 pb-4">
            <div className="p-4 bg-slate-800/50 rounded-none border-t border-slate-700">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Zap size={14} className="text-blue-400" />
                Quick Stats
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Active Users</span>
                  <span className="text-xs font-medium text-green-400">342</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Live Calls</span>
                  <span className="text-xs font-medium text-blue-400">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">System Health</span>
                  <span className="text-xs font-medium text-green-400">98%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Notifications */}
      {!isCollapsed && (
        <div className="px-4 pb-4">
          <button className="w-full flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell size={16} className="text-slate-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-slate-300">3 new alerts</span>
            </div>
            <ChevronRight size={14} className="text-slate-400" />
          </button>
        </div>
      )}

      {/* User Profile & Logout */}
      <div className="px-4 py-4 border-t border-slate-800">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</div>
                <div className="text-xs text-slate-400 truncate flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  {user?.role || 'Administrator'}
                </div>
              </div>
            </div>
            <button onClick={logout} className="w-full flex items-center justify-center px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200 border border-slate-700 hover:border-slate-600">
              <LogOut size={16} className="mr-2" strokeWidth={1.5} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex justify-center px-2 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200"
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