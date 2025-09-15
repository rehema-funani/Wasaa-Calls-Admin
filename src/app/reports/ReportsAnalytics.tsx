// import { useEffect } from "react"
// import { motion } from "framer-motion"
// import { BarChart3, PieChart, Download } from "lucide-react"
// import { Card, CardContent } from "../../components/ui/card"
// import { Button } from "../../components/ui/button"
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart as RePieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts"

// const mockRevenueData = [
//   { month: "Jan", revenue: 120000 },
//   { month: "Feb", revenue: 135000 },
//   { month: "Mar", revenue: 128000 },
//   { month: "Apr", revenue: 150000 },
//   { month: "May", revenue: 162500 },
//   { month: "Jun", revenue: 140000 },
// ]

// const mockCallTypeData = [
//   { name: "Audio", value: 40 },
//   { name: "Video", value: 50 },
//   { name: "Group", value: 10 },
// ]

// const COLORS = ["#0066CC", "#00BFA6", "#E53935"]

// export default function ReportsAnalytics() {
//   useEffect(() => {
//     // In real app, fetch report data here via API
//   }, [])

//   return (
//     <motion.div
//       className="p-6 space-y-6"
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <BarChart3 className="text-blue-600" /> Reports & Analytics
//         </h1>
//         <Button
//           variant="outline"
//           onClick={() => console.log("Exporting report...")}
//           className="flex items-center gap-2"
//         >
//           <Download className="w-4 h-4" /> Export CSV
//         </Button>
//       </div>

//       {/* Revenue Trend */}
//       <Card className="shadow-md">
//         <CardContent className="p-4">
//           <h2 className="font-semibold mb-4 flex items-center gap-2">
//             <BarChart3 className="w-4 h-4 text-blue-600" />
//             Monthly Revenue Trend
//           </h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={mockRevenueData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="#0066CC"
//                 strokeWidth={2}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       {/* Call Type Distribution */}
//       <Card className="shadow-md">
//         <CardContent className="p-4">
//           <h2 className="font-semibold mb-4 flex items-center gap-2">
//             <PieChart className="w-4 h-4 text-blue-600" />
//             Call Type Distribution
//           </h2>
//           <ResponsiveContainer width="100%" height={250}>
//             <RePieChart>
//               <Pie
//                 data={mockCallTypeData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={90}
//                 label
//               >
//                 {mockCallTypeData.map((entry, index) => (
//                   <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </RePieChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }
import { useEffect, useState } from "react"
import { BarChart3, PieChart, Download, TrendingUp, Phone, DollarSign, Users, Calendar } from "lucide-react"
import {
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area
} from "recharts"

const mockRevenueData = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 135000 },
  { month: "Mar", revenue: 128000 },
  { month: "Apr", revenue: 150000 },
  { month: "May", revenue: 162500 },
  { month: "Jun", revenue: 140000 },
]

const mockCallTypeData = [
  { name: "Video", value: 50, count: 2500 },
  { name: "Audio", value: 40, count: 2000 },
  { name: "Group", value: 10, count: 500 },
]

const mockStatsData = [
  { icon: DollarSign, label: "Total Revenue", value: "$835,500", change: "+12.5%", positive: true },
  { icon: Phone, label: "Total Calls", value: "5,000", change: "+8.3%", positive: true },
  { icon: Users, label: "Active Users", value: "342", change: "-2.1%", positive: false },
  { icon: TrendingUp, label: "Avg Call Duration", value: "4.2 min", change: "+5.7%", positive: true },
]

const COLORS = ["#3B82F6", "#10B981", "#EF4444"]

const StatCard = ({ icon: Icon, label, value, change, positive }: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) => (
  <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:bg-slate-750 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <p className="text-slate-400 text-sm">{label}</p>
          <p className="text-white text-xl font-semibold">{value}</p>
        </div>
      </div>
      <div className={`text-sm font-medium ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </div>
    </div>
  </div>
)

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: any[];
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
        <p className="text-slate-300 text-sm">{label}</p>
        <p className="text-white font-semibold">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

const PieTooltip = ({ active, payload }: {
  active?: boolean;
  payload?: any[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold">{payload[0].name}</p>
        <p className="text-slate-300 text-sm">
          {payload[0].value}% ({payload[0].payload.count} calls)
        </p>
      </div>
    )
  }
  return null
}

export default function ReportsAnalytics() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-800 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-800 rounded-xl"></div>
            ))}
          </div>
          <div className="h-80 bg-slate-800 rounded-xl"></div>
          <div className="h-80 bg-slate-800 rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <BarChart3 className="text-blue-400 w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStatsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Revenue Trend - Takes up 2/3 width */}
        <div className="xl:col-span-2">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Monthly Revenue Trend
              </h2>
              <div className="text-sm text-slate-400">
                Total: $835,500
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={mockRevenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Call Type Distribution - Takes up 1/3 width */}
        <div className="xl:col-span-1">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-400" />
              Call Type Distribution
            </h2>
            <ResponsiveContainer width="100%" height={240}>
              <RePieChart>
                <Pie
                  data={mockCallTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={2}
                >
                  {mockCallTypeData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </RePieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div className="mt-4 space-y-2">
              {mockCallTypeData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <span className="text-sm text-slate-300">{entry.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Key Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white text-sm font-medium">Revenue Growth</p>
                <p className="text-slate-400 text-sm">Monthly revenue increased by 12.5% compared to last period</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white text-sm font-medium">Video Calls Leading</p>
                <p className="text-slate-400 text-sm">Video calls represent 50% of all communication</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <div>
                <p className="text-white text-sm font-medium">Peak Performance</p>
                <p className="text-slate-400 text-sm">May showed the highest revenue at $162,500</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
              <div className="text-white text-sm font-medium">Generate Monthly Report</div>
              <div className="text-slate-400 text-xs">Export detailed analytics for the current month</div>
            </button>
            <button className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
              <div className="text-white text-sm font-medium">Schedule Automated Reports</div>
              <div className="text-slate-400 text-xs">Set up recurring report delivery</div>
            </button>
            <button className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
              <div className="text-white text-sm font-medium">View Detailed Analytics</div>
              <div className="text-slate-400 text-xs">Access comprehensive performance metrics</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}