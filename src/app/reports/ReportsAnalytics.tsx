import { useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, PieChart, Download } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
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
  { name: "Audio", value: 40 },
  { name: "Video", value: 50 },
  { name: "Group", value: 10 },
]

const COLORS = ["#0066CC", "#00BFA6", "#E53935"]

export default function ReportsAnalytics() {
  useEffect(() => {
    // In real app, fetch report data here via API
  }, [])

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="text-blue-600" /> Reports & Analytics
        </h1>
        <Button
          variant="outline"
          onClick={() => console.log("Exporting report...")}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* Revenue Trend */}
      <Card className="shadow-md">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Monthly Revenue Trend
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockRevenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0066CC"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Call Type Distribution */}
      <Card className="shadow-md">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-600" />
            Call Type Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <RePieChart>
              <Pie
                data={mockCallTypeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {mockCallTypeData.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
