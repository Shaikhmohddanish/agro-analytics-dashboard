"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo, ReactNode } from "react"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line, Legend, PieChart, Pie, Cell
} from "recharts"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, TrendingUp, Star, ArrowUpRight, ArrowDownRight, Download, 
  ChevronUp, ChevronDown, ChevronRight, BarChart as BarChartIcon, PieChart as PieChartIcon, 
  Activity, Target, Award, RefreshCw, Zap, Package
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Type definitions
interface TypeWiseOrder {
  bio: number;
  chemical: number;
  organic: number;
}

interface Performance {
  salesTarget: number;
  customerRetention: number;
  deliverySpeed: number;
  productQuality: number;
}

// Interface for pie chart label props
interface PieChartLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  index?: number;
  name?: string;
  value?: number;
}

interface MonthlyTrend {
  month: string;
  orders: number;
  revenue: number;
}

interface CustomerSegment {
  name: string;
  value: number;
}

interface RetailerData {
  name: string;
  totalOrder: number;
  typeWiseOrder: TypeWiseOrder;
  totalRecovered: number;
  recoveryRatio: number;
  orderFrequency: number;
  rating: number;
  performance: Performance;
  monthlyTrend: MonthlyTrend[];
  customerSegments: CustomerSegment[];
  growthRate: number;
  marketShare: number;
}

interface KeyMetric {
  title: string;
  ret1Value: string | number;
  ret2Value: string | number;
  diff: string;
  icon: ReactNode;
}

interface RetailerDataMap {
  [key: string]: RetailerData;
}

const retailerData: RetailerDataMap = {
  retailer1: {
    name: "Retailer A",
    totalOrder: 156,
    typeWiseOrder: { bio: 45, chemical: 78, organic: 33 },
    totalRecovered: 142,
    recoveryRatio: 91.0,
    orderFrequency: 2.1,
    rating: 4.7,
    performance: {
      salesTarget: 88,
      customerRetention: 92,
      deliverySpeed: 85,
      productQuality: 90
    },
    monthlyTrend: [
      { month: "Jan", orders: 22, revenue: 154000 },
      { month: "Feb", orders: 25, revenue: 168000 },
      { month: "Mar", orders: 18, revenue: 143000 },
      { month: "Apr", orders: 28, revenue: 172000 },
      { month: "May", orders: 30, revenue: 184000 },
      { month: "Jun", orders: 33, revenue: 192000 }
    ],
    customerSegments: [
      { name: "Farmers", value: 45 },
      { name: "Distributors", value: 35 },
      { name: "Suppliers", value: 20 }
    ],
    growthRate: 12.5,
    marketShare: 28.5
  },
  retailer2: {
    name: "Retailer B",
    totalOrder: 203,
    typeWiseOrder: { bio: 67, chemical: 89, organic: 47 },
    totalRecovered: 185,
    recoveryRatio: 91.1,
    orderFrequency: 2.8,
    rating: 4.5,
    performance: {
      salesTarget: 92,
      customerRetention: 88,
      deliverySpeed: 94,
      productQuality: 87
    },
    monthlyTrend: [
      { month: "Jan", orders: 28, revenue: 178000 },
      { month: "Feb", orders: 32, revenue: 196000 },
      { month: "Mar", orders: 30, revenue: 187000 },
      { month: "Apr", orders: 35, revenue: 210000 },
      { month: "May", orders: 38, revenue: 225000 },
      { month: "Jun", orders: 40, revenue: 236000 }
    ],
    customerSegments: [
      { name: "Farmers", value: 38 },
      { name: "Distributors", value: 42 },
      { name: "Suppliers", value: 20 }
    ],
    growthRate: 15.8,
    marketShare: 32.4
  },
  retailer3: {
    name: "Retailer C",
    totalOrder: 178,
    typeWiseOrder: { bio: 58, chemical: 62, organic: 58 },
    totalRecovered: 165,
    recoveryRatio: 92.7,
    orderFrequency: 2.4,
    rating: 4.8,
    performance: {
      salesTarget: 95,
      customerRetention: 94,
      deliverySpeed: 88,
      productQuality: 93
    },
    monthlyTrend: [
      { month: "Jan", orders: 25, revenue: 165000 },
      { month: "Feb", orders: 28, revenue: 182000 },
      { month: "Mar", orders: 26, revenue: 172000 },
      { month: "Apr", orders: 30, revenue: 192000 },
      { month: "May", orders: 33, revenue: 205000 },
      { month: "Jun", orders: 36, revenue: 215000 }
    ],
    customerSegments: [
      { name: "Farmers", value: 52 },
      { name: "Distributors", value: 28 },
      { name: "Suppliers", value: 20 }
    ],
    growthRate: 14.2,
    marketShare: 25.6
  }
}

// Colors for charts
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

// Helper function to format numbers with commas
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Helper function to calculate percentage difference
const calculateDifference = (val1: number, val2: number): string => {
  return ((val2 - val1) / val1 * 100).toFixed(1)
}

export default function RetailerComparison() {
  const { toast } = useToast()
  const [selectedRetailer1, setSelectedRetailer1] = useState("retailer1")
  const [selectedRetailer2, setSelectedRetailer2] = useState("retailer2")
  const [activeTab, setActiveTab] = useState("overview")
  const [chartType, setChartType] = useState("bar")
  
  // Check if same retailer is selected
  const isSameRetailer = selectedRetailer1 === selectedRetailer2;
  
  // Handle retailer selection changes
  const handleRetailer1Change = (value: string) => {
    setSelectedRetailer1(value);
    if (value === selectedRetailer2) {
      toast({
        title: "Same retailer selected",
        description: "You're comparing the same retailer. Consider choosing different retailers for meaningful comparison.",
        variant: "default",
      });
    }
  };
  
  const handleRetailer2Change = (value: string) => {
    setSelectedRetailer2(value);
    if (value === selectedRetailer1) {
      toast({
        title: "Same retailer selected",
        description: "You're comparing the same retailer. Consider choosing different retailers for meaningful comparison.",
        variant: "default",
      });
    }
  };

  // Get retailer data
  const ret1Data = retailerData[selectedRetailer1 as keyof typeof retailerData]
  const ret2Data = retailerData[selectedRetailer2 as keyof typeof retailerData]

  // Prepare dynamic comparison data based on selected retailers
  const comparisonData = useMemo(() => [
    { metric: "Total Orders", [selectedRetailer1]: ret1Data.totalOrder, [selectedRetailer2]: ret2Data.totalOrder },
    { metric: "Recovered", [selectedRetailer1]: ret1Data.totalRecovered, [selectedRetailer2]: ret2Data.totalRecovered },
    { metric: "Bio Orders", [selectedRetailer1]: ret1Data.typeWiseOrder.bio, [selectedRetailer2]: ret2Data.typeWiseOrder.bio },
    { metric: "Chemical Orders", [selectedRetailer1]: ret1Data.typeWiseOrder.chemical, [selectedRetailer2]: ret2Data.typeWiseOrder.chemical },
    { metric: "Organic Orders", [selectedRetailer1]: ret1Data.typeWiseOrder.organic, [selectedRetailer2]: ret2Data.typeWiseOrder.organic },
  ], [selectedRetailer1, selectedRetailer2, ret1Data, ret2Data])

  // Performance radar data
  const performanceData = useMemo(() => [
    { 
      subject: 'Sales Target', 
      [selectedRetailer1]: ret1Data.performance.salesTarget, 
      [selectedRetailer2]: ret2Data.performance.salesTarget,
      fullMark: 100 
    },
    { 
      subject: 'Customer Retention', 
      [selectedRetailer1]: ret1Data.performance.customerRetention, 
      [selectedRetailer2]: ret2Data.performance.customerRetention,
      fullMark: 100 
    },
    { 
      subject: 'Delivery Speed', 
      [selectedRetailer1]: ret1Data.performance.deliverySpeed, 
      [selectedRetailer2]: ret2Data.performance.deliverySpeed,
      fullMark: 100 
    },
    { 
      subject: 'Product Quality', 
      [selectedRetailer1]: ret1Data.performance.productQuality, 
      [selectedRetailer2]: ret2Data.performance.productQuality,
      fullMark: 100 
    },
  ], [selectedRetailer1, selectedRetailer2, ret1Data, ret2Data])

  // Key metrics with difference calculation
  const keyMetrics = useMemo(() => [
    {
      title: "Total Orders",
      ret1Value: ret1Data.totalOrder,
      ret2Value: ret2Data.totalOrder,
      diff: calculateDifference(ret1Data.totalOrder, ret2Data.totalOrder),
      icon: <Package className="h-5 w-5" />
    },
    {
      title: "Recovery Ratio",
      ret1Value: `${ret1Data.recoveryRatio}%`,
      ret2Value: `${ret2Data.recoveryRatio}%`,
      diff: calculateDifference(ret1Data.recoveryRatio, ret2Data.recoveryRatio),
      icon: <Target className="h-5 w-5" />
    },
    {
      title: "Order Frequency",
      ret1Value: `${ret1Data.orderFrequency}x/month`,
      ret2Value: `${ret2Data.orderFrequency}x/month`,
      diff: calculateDifference(ret1Data.orderFrequency, ret2Data.orderFrequency),
      icon: <Activity className="h-5 w-5" />
    },
    {
      title: "Customer Rating",
      ret1Value: ret1Data.rating,
      ret2Value: ret2Data.rating,
      diff: calculateDifference(ret1Data.rating, ret2Data.rating),
      icon: <Star className="h-5 w-5" />
    },
    {
      title: "Market Share",
      ret1Value: `${ret1Data.marketShare}%`,
      ret2Value: `${ret2Data.marketShare}%`,
      diff: calculateDifference(ret1Data.marketShare, ret2Data.marketShare),
      icon: <PieChartIcon className="h-5 w-5" />
    },
    {
      title: "Growth Rate",
      ret1Value: `${ret1Data.growthRate}%`,
      ret2Value: `${ret2Data.growthRate}%`,
      diff: calculateDifference(ret1Data.growthRate, ret2Data.growthRate),
      icon: <TrendingUp className="h-5 w-5" />
    }
  ], [ret1Data, ret2Data])

  // Export comparison data
  const exportComparison = () => {
    try {
      // Show loading toast
      toast({
        title: "Exporting comparison data...",
        description: `Preparing comparison between ${ret1Data.name} and ${ret2Data.name}.`,
      })
      
      // Create headers and rows for CSV
      const headers = ["Metric", ret1Data.name, ret2Data.name, "Difference (%)"]
      const rows = keyMetrics.map(metric => [
        metric.title, 
        metric.ret1Value, 
        metric.ret2Value, 
        `${metric.diff}%`
      ])
      
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
      ].join('\n')
      
      // Create blob and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `retailer-comparison-${ret1Data.name}-vs-${ret2Data.name}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up
      URL.revokeObjectURL(url)
      
      // Success toast
      toast({
        title: "Export Successful",
        description: `Comparison data has been downloaded as CSV.`,
        variant: "default",
      })
    } catch (error) {
      console.error("Export failed:", error)
      toast({
        title: "Export Failed",
        description: "There was a problem exporting your data. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-white" />
                Advanced Retailer Comparison
              </CardTitle>
              <p className="text-blue-100">Comprehensive comparative analysis of retailer performance metrics</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={exportComparison}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Comparison
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="border-t border-white/10 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-blue-100">Select retailers to compare:</div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-300"></div>
                <Select value={selectedRetailer1} onValueChange={handleRetailer1Change}>
                  <SelectTrigger className={`w-32 sm:w-40 bg-white/10 border-white/20 text-white ${isSameRetailer ? 'ring-2 ring-orange-400' : ''}`}>
                    <SelectValue placeholder="Retailer A" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retailer1">Retailer A</SelectItem>
                    <SelectItem value="retailer2">Retailer B</SelectItem>
                    <SelectItem value="retailer3">Retailer C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className={`${isSameRetailer ? 'text-orange-300 font-bold' : 'text-white/70'}`}>vs</span>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-300"></div>
                <Select value={selectedRetailer2} onValueChange={handleRetailer2Change}>
                  <SelectTrigger className={`w-32 sm:w-40 bg-white/10 border-white/20 text-white ${isSameRetailer ? 'ring-2 ring-orange-400' : ''}`}>
                    <SelectValue placeholder="Retailer B" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retailer1">Retailer A</SelectItem>
                    <SelectItem value="retailer2">Retailer B</SelectItem>
                    <SelectItem value="retailer3">Retailer C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {isSameRetailer && (
                <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                  Same Retailer Selected
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Comparison Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gray-50 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <div className={`p-1.5 rounded-full ${index % 2 === 0 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {metric.icon}
                    </div>
                    {metric.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{ret1Data.name}</p>
                      <p className="text-lg font-bold">{metric.ret1Value}</p>
                    </div>
                    <div className="text-center px-3 py-1 rounded-full bg-gray-100">
                      <div className="flex items-center gap-1 text-sm">
                        {parseFloat(metric.diff) > 0 ? (
                          <>
                            <ArrowUpRight className="h-3 w-3 text-green-600" />
                            <span className="text-green-600">+{metric.diff}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="h-3 w-3 text-red-600" />
                            <span className="text-red-600">{metric.diff}%</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">{ret2Data.name}</p>
                      <p className="text-lg font-bold">{metric.ret2Value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Retailer Details Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Retailer 1 */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                    <h3 className="text-lg font-medium">{ret1Data.name}</h3>
                  </div>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    Retailer A
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <p>
                      <span className="font-medium">1. Total Order:</span> {formatNumber(ret1Data.totalOrder)}
                    </p>
                    <p>
                      <span className="font-medium">2. Type wise order:</span>
                    </p>
                    <div className="pl-4 space-y-1">
                      <p>• Bio: {formatNumber(ret1Data.typeWiseOrder.bio)}</p>
                      <p>• Chemical: {formatNumber(ret1Data.typeWiseOrder.chemical)}</p>
                      <p>• Organic: {formatNumber(ret1Data.typeWiseOrder.organic)}</p>
                    </div>
                    <p>
                      <span className="font-medium">3. Total Recovered:</span> {formatNumber(ret1Data.totalRecovered)}
                    </p>
                    <p>
                      <span className="font-medium">4. Recovery Ratio:</span> {ret1Data.recoveryRatio}%
                    </p>
                    <p>
                      <span className="font-medium">5. Order Frequency:</span> {ret1Data.orderFrequency}x/month
                    </p>
                    <p>
                      <span className="font-medium">6. Market Share:</span> {ret1Data.marketShare}%
                    </p>
                    <p>
                      <span className="font-medium">7. Growth Rate:</span> {ret1Data.growthRate}%
                    </p>
                  </div>
                  <div className="pt-3 border-t border-blue-500">
                    <p className="flex items-center gap-2">
                      <span className="font-medium">8. Rating:</span>
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-bold">{ret1Data.rating}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Retailer 2 */}
            <Card className="border-2 border-green-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-green-600"></div>
                    <h3 className="text-lg font-medium">{ret2Data.name}</h3>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Retailer B
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <p>
                      <span className="font-medium">1. Total Order:</span> {formatNumber(ret2Data.totalOrder)}
                    </p>
                    <p>
                      <span className="font-medium">2. Type wise order:</span>
                    </p>
                    <div className="pl-4 space-y-1">
                      <p>• Bio: {formatNumber(ret2Data.typeWiseOrder.bio)}</p>
                      <p>• Chemical: {formatNumber(ret2Data.typeWiseOrder.chemical)}</p>
                      <p>• Organic: {formatNumber(ret2Data.typeWiseOrder.organic)}</p>
                    </div>
                    <p>
                      <span className="font-medium">3. Total Recovered:</span> {formatNumber(ret2Data.totalRecovered)}
                    </p>
                    <p>
                      <span className="font-medium">4. Recovery Ratio:</span> {ret2Data.recoveryRatio}%
                    </p>
                    <p>
                      <span className="font-medium">5. Order Frequency:</span> {ret2Data.orderFrequency}x/month
                    </p>
                    <p>
                      <span className="font-medium">6. Market Share:</span> {ret2Data.marketShare}%
                    </p>
                    <p>
                      <span className="font-medium">7. Growth Rate:</span> {ret2Data.growthRate}%
                    </p>
                  </div>
                  <div className="pt-3 border-t border-green-500">
                    <p className="flex items-center gap-2">
                      <span className="font-medium">8. Rating:</span>
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-bold">{ret2Data.rating}</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Performance Comparison
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant={chartType === "bar" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setChartType("bar")}
                >
                  <BarChartIcon className="h-4 w-4 mr-1" /> Bar
                </Button>
                <Button 
                  variant={chartType === "radar" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setChartType("radar")}
                >
                  <Target className="h-4 w-4 mr-1" /> Radar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "bar" ? (
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey={selectedRetailer1} fill={COLORS[0]} name={ret1Data.name} />
                      <Bar dataKey={selectedRetailer2} fill={COLORS[1]} name={ret2Data.name} />
                    </BarChart>
                  ) : (
                    <RadarChart outerRadius={90} data={performanceData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar 
                        name={ret1Data.name} 
                        dataKey={selectedRetailer1} 
                        stroke={COLORS[0]} 
                        fill={COLORS[0]} 
                        fillOpacity={0.5}
                      />
                      <Radar 
                        name={ret2Data.name} 
                        dataKey={selectedRetailer2} 
                        stroke={COLORS[1]} 
                        fill={COLORS[1]} 
                        fillOpacity={0.5} 
                      />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab Content */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                Key Performance Indicators
              </CardTitle>
              <CardDescription>
                Detailed comparison of performance metrics between retailers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Radar Chart */}
                <div className="h-80">
                  <p className="text-sm font-medium mb-2 text-center">Performance Radar</p>
                  <ResponsiveContainer width="100%" height="90%">
                    <RadarChart outerRadius={90} data={performanceData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name={ret1Data.name}
                        dataKey={selectedRetailer1}
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.5}
                      />
                      <Radar
                        name={ret2Data.name}
                        dataKey={selectedRetailer2}
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.5}
                      />
                      <Legend />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Performance Metrics List */}
                <div className="space-y-4">
                  {Object.entries(ret1Data.performance).map(([key, value], index) => {
                    const ret2Value = ret2Data.performance[key as keyof typeof ret2Data.performance]
                    const diff = calculateDifference(value as number, ret2Value as number)
                    const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())
                    
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{formattedKey}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-blue-600 font-medium">{ret1Data.name}: {value}%</span>
                            <span className="text-sm text-green-600 font-medium">{ret2Data.name}: {ret2Value}%</span>
                            <Badge
                              variant={parseFloat(diff) > 0 ? "default" : "outline"}
                              className={parseFloat(diff) > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                            >
                              {parseFloat(diff) > 0 ? "+" : ""}{diff}%
                            </Badge>
                          </div>
                        </div>
                        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-blue-600"
                            style={{ width: `${value}%` }}
                          />
                          <div
                            className="absolute top-0 left-0 h-full bg-green-500 border-l-2 border-white"
                            style={{ width: `${ret2Value}%`, opacity: 0.7 }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Performance Details */}
          <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    {ret1Data.recoveryRatio > ret2Data.recoveryRatio ? ret1Data.name : ret2Data.name}
                  </div>
                  <div className="text-sm text-gray-300">Better Recovery Ratio</div>
                  <div className="text-xs text-green-400 mt-1">
                    +{Math.abs(ret1Data.recoveryRatio - ret2Data.recoveryRatio).toFixed(1)}% difference
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {ret1Data.orderFrequency > ret2Data.orderFrequency ? ret1Data.name : ret2Data.name}
                  </div>
                  <div className="text-sm text-gray-300">Higher Order Frequency</div>
                  <div className="text-xs text-green-400 mt-1">
                    +{Math.abs(ret1Data.orderFrequency - ret2Data.orderFrequency).toFixed(1)}x monthly
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {ret1Data.rating > ret2Data.rating ? ret1Data.name : ret2Data.name}
                  </div>
                  <div className="text-sm text-gray-300">Better Customer Rating</div>
                  <div className="text-xs text-blue-400 mt-1">
                    +{Math.abs(ret1Data.rating - ret2Data.rating).toFixed(1)} stars
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {ret1Data.growthRate > ret2Data.growthRate ? ret1Data.name : ret2Data.name}
                  </div>
                  <div className="text-sm text-gray-300">Fastest Growing</div>
                  <div className="text-xs text-purple-400 mt-1">
                    +{Math.abs(ret1Data.growthRate - ret2Data.growthRate).toFixed(1)}% higher growth
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab Content */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Monthly Trends Comparison
              </CardTitle>
              <CardDescription>
                Monthly order and revenue performance for the selected retailers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Orders Trend */}
                <div>
                  <h4 className="text-sm font-medium mb-4">Monthly Orders</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        data={[...ret1Data.monthlyTrend]} // Base data structure
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="month" 
                          allowDuplicatedCategory={false}
                          type="category"
                        />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Line 
                          data={ret1Data.monthlyTrend} 
                          type="monotone" 
                          dataKey="orders" 
                          stroke="#3b82f6" 
                          name={ret1Data.name}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          data={ret2Data.monthlyTrend} 
                          type="monotone" 
                          dataKey="orders" 
                          stroke="#10b981" 
                          name={ret2Data.name}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Revenue Trend */}
                <div>
                  <h4 className="text-sm font-medium mb-4">Monthly Revenue</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        data={[...ret1Data.monthlyTrend]} // Base data structure
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="month" 
                          allowDuplicatedCategory={false}
                          type="category"
                        />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: number) => [`₹${formatNumber(value)}`, "Revenue"]}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Line 
                          data={ret1Data.monthlyTrend} 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#8b5cf6" 
                          name={ret1Data.name}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          data={ret2Data.monthlyTrend} 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#f59e0b" 
                          name={ret2Data.name}
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trend Summary */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-blue-700">{ret1Data.name} Summary</h3>
                  <div className="flex items-center justify-between">
                    <span>First to Last Month Growth:</span>
                    <Badge className={ret1Data.monthlyTrend[5].orders > ret1Data.monthlyTrend[0].orders ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {((ret1Data.monthlyTrend[5].orders - ret1Data.monthlyTrend[0].orders) / ret1Data.monthlyTrend[0].orders * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Highest Orders Month:</span>
                    <Badge>{ret1Data.monthlyTrend.reduce((max, item) => item.orders > max.orders ? item : max, ret1Data.monthlyTrend[0]).month}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Monthly Revenue:</span>
                    <Badge variant="outline" className="font-medium">
                      ₹{formatNumber(ret1Data.monthlyTrend.reduce((sum, item) => sum + item.revenue, 0) / ret1Data.monthlyTrend.length)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-green-700">{ret2Data.name} Summary</h3>
                  <div className="flex items-center justify-between">
                    <span>First to Last Month Growth:</span>
                    <Badge className={ret2Data.monthlyTrend[5].orders > ret2Data.monthlyTrend[0].orders ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {((ret2Data.monthlyTrend[5].orders - ret2Data.monthlyTrend[0].orders) / ret2Data.monthlyTrend[0].orders * 100).toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Highest Orders Month:</span>
                    <Badge>{ret2Data.monthlyTrend.reduce((max, item) => item.orders > max.orders ? item : max, ret2Data.monthlyTrend[0]).month}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Monthly Revenue:</span>
                    <Badge variant="outline" className="font-medium">
                      ₹{formatNumber(ret2Data.monthlyTrend.reduce((sum, item) => sum + item.revenue, 0) / ret2Data.monthlyTrend.length)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Segments Tab */}
        <TabsContent value="segments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-600" />
                Customer Segmentation Analysis
              </CardTitle>
              <CardDescription>
                Comparison of customer segments between retailers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Retailer 1 Segments */}
                <div>
                  <h4 className="text-sm font-medium mb-4 text-center flex items-center justify-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                    <span>{ret1Data.name} Customer Segments</span>
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ret1Data.customerSegments}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={(props: PieChartLabelProps) => `${props.name} ${props.percent ? (props.percent * 100).toFixed(0) : 0}%`}
                        >
                          {ret1Data.customerSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value}%`, "Segment Share"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Segment details */}
                  <div className="mt-4 space-y-2">
                    {ret1Data.customerSegments.map((segment, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{segment.name}</span>
                        </div>
                        <span className="font-medium">{segment.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Retailer 2 Segments */}
                <div>
                  <h4 className="text-sm font-medium mb-4 text-center flex items-center justify-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-600"></div>
                    <span>{ret2Data.name} Customer Segments</span>
                  </h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ret2Data.customerSegments}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={(props: PieChartLabelProps) => `${props.name} ${props.percent ? (props.percent * 100).toFixed(0) : 0}%`}
                        >
                          {ret2Data.customerSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value}%`, "Segment Share"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Segment details */}
                  <div className="mt-4 space-y-2">
                    {ret2Data.customerSegments.map((segment, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span>{segment.name}</span>
                        </div>
                        <span className="font-medium">{segment.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segment Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Segment Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {ret1Data.customerSegments.map((segment, index) => {
                  const ret2Segment = ret2Data.customerSegments.find(s => s.name === segment.name)
                  const diff = ret2Segment ? calculateDifference(segment.value, ret2Segment.value) : "N/A"
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="font-medium">{segment.name}</span>
                        </div>
                        <Badge
                          variant={parseFloat(diff) > 0 ? "default" : "outline"}
                          className={parseFloat(diff) > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {diff !== "N/A" ? `${parseFloat(diff) > 0 ? "+" : ""}${diff}%` : "N/A"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        <div className="col-span-2 flex items-center">
                          <span className="text-sm text-blue-600">{ret1Data.name}: {segment.value}%</span>
                        </div>
                        <div className="col-span-1 flex justify-center">
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="col-span-2 flex items-center">
                          <span className="text-sm text-green-600">
                            {ret2Data.name}: {ret2Segment ? ret2Segment.value : "N/A"}%
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${segment.value}%` }}
                        />
                        <div
                          className="bg-green-600 h-2 rounded-full mt-1"
                          style={{ width: `${ret2Segment ? ret2Segment.value : 0}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
