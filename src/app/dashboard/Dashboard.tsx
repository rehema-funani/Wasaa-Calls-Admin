import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  Phone, 
  Users, 
  CreditCard, 
  Clock, 
  Activity, 
  Bell,
  ArrowUpRight,
  Globe
} from 'lucide-react';
import { KPICard } from '../../components/dashboard/KPICard';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { callsService } from '../../api/services/calls';
import { usersService } from '../../api/services/users';
import { billingService } from '../../api/services/billing';
import { reportsService } from '../../api/services/reports';
import { formatCurrency, formatTimeAgo } from '../../utils/helpers';
import type { RevenueAnalytics, RegionalStat } from '../../types/reports';

interface DashboardStats {
  activeCalls: number;
  escrowLocked: number;
  avgCallDuration: number;
  qosScore: number;
  totalUsers: number;
  onlineUsers: number;
}

interface Activity {
  id: string;
  type: 'call_start' | 'escrow_lock' | 'moderation' | 'user_register';
  user?: string;
  target?: string;
  time: string;
  icon: React.ElementType;
  color: string;
  amount?: number;
  moderator?: string;
  action?: string;
  role?: string;
}

const activityColorClasses: { [key: string]: { bg: string; text: string } } = {
  green: { bg: 'bg-green-500', text: 'text-green-500' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-500' },
  orange: { bg: 'bg-orange-500', text: 'text-orange-500' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-500' },
  default: { bg: 'bg-gray-500', text: 'text-gray-500' },
};

const qosData = [
  { time: '24h ago', score: 91 },
  { time: '18h ago', score: 94 },
  { time: '12h ago', score: 88 },
  { time: '6h ago', score: 92 },
  { time: 'now', score: 95 },
];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    activeCalls: 342,
    escrowLocked: 120500,
    avgCallDuration: 12,
    qosScore: 92,
    totalUsers: 24892,
    onlineUsers: 3745
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [regionalStats, setRegionalStats] = useState<RegionalStat[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueAnalytics | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch all dashboard data in parallel
      const [callsData, usersData, billingData, revenueAnalytics, regionData, activityData] = await Promise.all([
        callsService.getAnalytics('24h'),
        usersService.getUsers({ limit: 5 }),
        billingService.getEscrowOverview(),
        reportsService.getRevenueAnalytics('30d'),
        reportsService.getRegionalStats(),
        Promise.resolve([
          { id: '1', type: 'call_start', user: 'U123', target: 'C101', time: new Date(Date.now() - 2 * 60 * 1000).toISOString(), icon: Phone, color: 'green' },
          { id: '2', type: 'escrow_lock', amount: 500, target: 'C102', time: new Date(Date.now() - 5 * 60 * 1000).toISOString(), icon: CreditCard, color: 'blue' },
          { id: '3', type: 'moderation', moderator: 'Mod123', action: 'muted', target: 'U456', time: new Date(Date.now() - 12 * 60 * 1000).toISOString(), icon: Bell, color: 'orange' },
          { id: '4', type: 'user_register', user: 'U999', role: 'Host', time: new Date(Date.now() - 18 * 60 * 1000).toISOString(), icon: Users, color: 'purple' },
        ] as Activity[])
      ]);

      setStats({
        activeCalls: callsData.activeCalls || 192,
        escrowLocked: billingData.totalLocked || 98568,
        avgCallDuration: callsData.avgDuration || 1,
        qosScore: callsData.avgQoS || 92,
        totalUsers: usersData.total || 24892,
        onlineUsers: callsData.activeUsers || 3745
      });
      setRegionalStats(regionData);
      setRevenueData(revenueAnalytics);
      setRecentActivity(activityData);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 },
    },
  };

  const renderActivityMessage = (activity: Activity) => {
    switch (activity.type) {
      case 'call_start':
        return <><span className="font-medium">{activity.user}</span> started call <span className="font-medium">{activity.target}</span></>;
      case 'escrow_lock':
        return <>Escrow locked <span className="font-medium">{formatCurrency(activity.amount!)}</span> for call {activity.target}</>;
      case 'moderation':
        return <>Moderator <span className="font-medium">{activity.moderator}</span> {activity.action} <span className="font-medium">{activity.target}</span></>;
      case 'user_register':
        return <>New user <span className="font-medium">{activity.user}</span> registered as {activity.role}</>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Page Header */}
        <motion.div variants={itemVariants}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                WasaaChat Calls Admin
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Real-time monitoring and management dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-700 dark:text-green-400 font-medium">
                  System Online
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={itemVariants}
        >
          <KPICard
            title="Active Calls"
            value={stats.activeCalls}
            change="+8.2%"
            isPositive={true}
            icon={<Phone size={24} className="text-white" />}
            gradient="bg-gradient-to-br from-green-500 to-emerald-500"
            description="Currently live"
          />
          <KPICard
            title="Escrow Locked"
            value={formatCurrency(stats.escrowLocked)}
            change="+12.5%"
            isPositive={true}
            icon={<CreditCard size={24} className="text-white" />}
            gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
            description="Total funds in escrow"
          />
          <KPICard
            title="Avg Call Duration"
            value={`${stats.avgCallDuration} min`}
            change="+2.1%"
            isPositive={true}
            icon={<Clock size={24} className="text-white" />}
            gradient="bg-gradient-to-br from-purple-500 to-violet-500"
            description="Per call average"
          />
          <KPICard
            title="QoS Score"
            value={`${stats.qosScore}%`}
            change="+1.8%"
            isPositive={true}
            icon={<Activity size={24} className="text-white" />}
            gradient="bg-gradient-to-br from-orange-500 to-red-500"
            description="Quality of Service"
          />
        </motion.div>

        {/* Charts Section */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-8" variants={itemVariants}>
          {/* QoS Trends Chart */}
          <Card className="lg:col-span-2 p-6" hover>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                QoS Trends (Last 24h)
              </h3>
              <Badge variant="success" size="sm">Real-time</Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={qosData} margin={{ top: 5, right: 20, left: -15, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorQoS" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="var(--muted-foreground)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="var(--muted-foreground)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    domain={[80, 100]} 
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                    itemStyle={{ color: 'var(--primary)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="var(--primary)" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorQoS)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Live Call Map */}
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Live Call Map
              </h3>
              <Globe size={20} className="text-primary-500" />
            </div>
            <div className="h-64 overflow-y-auto pr-2">
              {regionalStats.length > 0 ? (
                <div className="space-y-3">
                  {regionalStats.map((stat) => (
                    <div key={stat.region} className="flex items-center justify-between text-sm p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                      <span className="font-medium text-gray-800 dark:text-gray-200">{stat.region}</span>
                      <Badge variant={stat.averageQuality > 90 ? 'success' : 'warning'} size="sm">
                        {stat.callsInProgress} calls
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  <p>No regional data available.</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Activity and Revenue Section */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={itemVariants}>
          {/* Recent Activity Feed */}
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h3>
              <button className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
                View all <ArrowUpRight size={16} className="ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const ActivityIcon = activity.icon;
                const colorClass = activityColorClasses[activity.color] || activityColorClasses.default;
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className={`w-2 h-2 ${colorClass.bg} rounded-full mt-2 flex-shrink-0 ${activity.type === 'call_start' ? 'animate-pulse' : ''}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {renderActivityMessage(activity)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeAgo(activity.time)}
                      </p>
                    </div>
                    <ActivityIcon size={16} className={`${colorClass.text} mt-0.5 flex-shrink-0`} />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Revenue Chart */}
          <Card className="p-6" hover>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Revenue Trends
              </h3>
              <Badge variant="info" size="sm">Monthly</Badge>
            </div>
            {revenueData ? (
              <div className="h-64">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Per-minute', value: revenueData.revenueBySource.perMinute },
                      { name: 'Tips', value: revenueData.revenueBySource.tips },
                      { name: 'Subscriptions', value: revenueData.revenueBySource.subscriptions },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#10b981" />
                    <Cell fill="#8b5cf6" />
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <p>Loading revenue data...</p>
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
  );
};

export default Dashboard;