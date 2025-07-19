"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Target,
  Activity,
  Zap,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
} from "lucide-react"

const salesTrendData = [
  { month: "Jan", sales: 45000, orders: 120, customers: 85, target: 50000 },
  { month: "Feb", sales: 52000, orders: 135, customers: 92, target: 50000 },
  { month: "Mar", sales: 48000, orders: 128, customers: 88, target: 50000 },
  { month: "Apr", sales: 61000, orders: 155, customers: 105, target: 55000 },
  { month: "May", sales: 55000, orders: 142, customers: 98, target: 55000 },
  { month: "Jun", sales: 67000, orders: 168, customers: 115, target: 60000 },
  { month: "Jul", sales: 72000, orders: 185, customers: 125, target: 65000 },
]

const productPerformanceData = [
  { name: "Micronutrient", value: 35, sales: 245000, growth: 12.5 },
  { name: "Bio-Fertilizer", value: 28, sales: 198000, growth: 8.3 },
  { name: "Chelated", value: 22, sales: 156000, growth: -2.1 },
  { name: "Organic", value: 15, sales: 89000, growth: 15.7 },
]

const regionData = [
  { region: "North", sales: 180000, orders: 450, growth: 15.2 },
  { region: "South", sales: 220000, orders: 520, growth: 12.8 },
  { region: "East", sales: 165000, orders: 380, growth: 8.5 },
  { region: "West", sales: 195000, orders: 465, growth: 18.3 },
]

const performanceData = [
  { name: "Sales Target", value: 92, color: "#10b981" },
  { name: "Customer Satisfaction", value: 94, color: "#3b82f6" },
  { name: "Order Fulfillment", value: 96, color: "#8b5cf6" },
  { name: "Quality Score", value: 88, color: "#f59e0b" },
]

const kpiData = [
  { title: "Revenue Growth", value: "12.5%", change: "+2.3%", trend: "up", color: "text-green-600" },
  { title: "Customer Acquisition", value: "125", change: "+15", trend: "up", color: "text-blue-600" },
  { title: "Order Frequency", value: "2.8x", change: "+0.3x", trend: "up", color: "text-purple-600" },
  { title: "Churn Rate", value: "3.2%", change: "-0.8%", trend: "down", color: "text-red-600" },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

export default function AdvancedAnalytics() {
  const [selectedView, setSelectedView] = useState("sales")
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedRegion, setSelectedRegion] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold mb-2">Advanced Analytics Dashboard</CardTitle>
              <p className="text-blue-100">Comprehensive business intelligence and performance metrics</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales View</SelectItem>
                  <SelectItem value="products">Products View</SelectItem>
                  <SelectItem value="customers">Customers View</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="secondary"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>

              <Button
                variant="secondary"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${kpi.color}`}>{kpi.change}</span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-full bg-gradient-to-r ${
                    index === 0
                      ? "from-green-400 to-green-600"
                      : index === 1
                        ? "from-blue-400 to-blue-600"
                        : index === 2
                          ? "from-purple-400 to-purple-600"
                          : "from-red-400 to-red-600"
                  }`}
                >
                  {index === 0 && <DollarSign className="h-6 w-6 text-white" />}
                  {index === 1 && <Users className="h-6 w-6 text-white" />}
                  {index === 2 && <Activity className="h-6 w-6 text-white" />}
                  {index === 3 && <TrendingDown className="h-6 w-6 text-white" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Sales Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Sales Performance & Targets
            </CardTitle>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Target: 92% Achieved
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={salesTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="orders" fill="#e5e7eb" name="Orders" radius={[2, 2, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Sales"
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target"
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Performance List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              Product Mix Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productPerformanceData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{item.value}%</span>
                      <span className={`text-sm ${item.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                        {item.growth > 0 ? "+" : ""}
                        {item.growth}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              Regional Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionData.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{region.region}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">₹{(region.sales / 1000).toFixed(0)}K</span>
                      <Badge
                        variant={region.growth > 15 ? "default" : region.growth > 10 ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        +{region.growth}%
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(region.sales / 250000) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{region.orders} orders</span>
                    <span>{((region.sales / 250000) * 100).toFixed(1)}% of target</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className="font-bold">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="text-lg font-semibold text-gray-700">Overall Score</div>
              <div className="text-4xl font-bold text-purple-600 mt-2">92.5</div>
              <div className="text-sm text-gray-600 mt-1">Excellent Performance</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Intelligence Panel */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Business Intelligence Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">₹1.2M</div>
              <div className="text-sm text-gray-300">Business Till Date</div>
              <div className="text-xs text-green-400 mt-1">+15.2% vs last period</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">91.5%</div>
              <div className="text-sm text-gray-300">Recovery Ratio</div>
              <div className="text-xs text-green-400 mt-1">+2.3% improvement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">2.8x</div>
              <div className="text-sm text-gray-300">Order Frequency</div>
              <div className="text-xs text-blue-400 mt-1">Monthly average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">High</div>
              <div className="text-sm text-gray-300">Classification Score</div>
              <div className="text-xs text-purple-400 mt-1">Premium tier</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
