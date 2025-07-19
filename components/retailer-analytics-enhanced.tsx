"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Store, Calendar, Package, Star, ChevronDown, ChevronRight, Download, Search } from "lucide-react"
import { dataService, type RetailerProfile } from "@/lib/data-service"

export default function RetailerAnalyticsEnhanced() {
  const [retailers, setRetailers] = useState<RetailerProfile[]>([])
  const [filteredRetailers, setFilteredRetailers] = useState<RetailerProfile[]>([])
  const [selectedRetailer, setSelectedRetailer] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "chart">("table")
  const [expandedRetailers, setExpandedRetailers] = useState<Set<string>>(new Set())
  const [filterOptions, setFilterOptions] = useState({
    retailers: [] as string[],
    locations: [] as string[],
    months: [] as string[],
  })

  useEffect(() => {
    const retailerData = dataService.getRetailerProfiles()
    const options = dataService.getFilterOptions()

    setRetailers(retailerData)
    setFilteredRetailers(retailerData)
    setFilterOptions(options)
  }, [])

  useEffect(() => {
    let filtered = retailers

    if (selectedRetailer !== "all") {
      filtered = filtered.filter((r) => r.name === selectedRetailer)
    }
    if (selectedLocation !== "all") {
      filtered = filtered.filter((r) => r.location === selectedLocation)
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredRetailers(filtered)
  }, [selectedRetailer, selectedLocation, searchTerm, retailers])

  const toggleRetailer = (retailerName: string) => {
    const newExpanded = new Set(expandedRetailers)
    if (newExpanded.has(retailerName)) {
      newExpanded.delete(retailerName)
    } else {
      newExpanded.add(retailerName)
    }
    setExpandedRetailers(newExpanded)
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "High":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const exportData = (format: "csv" | "xlsx") => {
    dataService.exportData(format)
    // Here you would implement actual export functionality
    alert(`Exporting data in ${format.toUpperCase()} format`)
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5 text-blue-600" />
                Retailer-Based Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive retailer profiles with order history, recovery metrics, and performance analysis
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => exportData("csv")}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => exportData("xlsx")}>
                <Download className="h-4 w-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search retailers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedRetailer} onValueChange={setSelectedRetailer}>
              <SelectTrigger>
                <SelectValue placeholder="Select Retailer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Retailers</SelectItem>
                {filterOptions.retailers.map((retailer) => (
                  <SelectItem key={retailer} value={retailer}>
                    {retailer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {filterOptions.locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {[...filterOptions.months]
                  .sort((a, b) => {
                    // Parse the month strings in format "MMM YYYY" (e.g., "Jan 2023")
                    const [monthA, yearA] = a.split(" ");
                    const [monthB, yearB] = b.split(" ");
                    
                    // Compare years first
                    if (yearA !== yearB) {
                      return parseInt(yearA) - parseInt(yearB);
                    }
                    
                    // If years are the same, compare months
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return months.indexOf(monthA) - months.indexOf(monthB);
                  })
                  .map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "table" | "chart")}>
            <TabsList>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="chart">Chart View</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="space-y-4">
              {filteredRetailers.map((retailer) => {
                const isExpanded = expandedRetailers.has(retailer.name)

                return (
                  <Card key={retailer.name} className="overflow-hidden">
                    <Collapsible open={isExpanded} onOpenChange={() => toggleRetailer(retailer.name)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {isExpanded ? (
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              ) : (
                                <ChevronRight className="h-5 w-5 text-gray-500" />
                              )}
                              <div>
                                <CardTitle className="text-lg">{retailer.name}</CardTitle>
                                <CardDescription className="flex items-center gap-4 mt-1">
                                  <span>{retailer.location}</span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {retailer.orders.length} orders
                                  </span>
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Badge className={getFrequencyColor(retailer.orderFrequency)}>
                                {retailer.orderFrequency} Frequency
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="font-medium">{retailer.rating.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          {/* Recovery Metrics */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">
                                ₹{(retailer.totalOrdered / 1000).toFixed(0)}K
                              </div>
                              <div className="text-sm text-gray-600">Total Ordered</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">
                                ₹{(retailer.totalRecovered / 1000).toFixed(0)}K
                              </div>
                              <div className="text-sm text-gray-600">Total Recovered</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">
                                {(retailer.recoveryRatio * 100).toFixed(1)}%
                              </div>
                              <div className="text-sm text-gray-600">Recovery Ratio</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">{retailer.orderFrequency}</div>
                              <div className="text-sm text-gray-600">Order Frequency</div>
                            </div>
                          </div>

                          {/* Order History */}
                          <div className="space-y-4">
                            <h4 className="font-semibold text-lg">Order History</h4>
                            {retailer.orders.slice(0, 5).map((order, orderIndex) => (
                              <Card key={orderIndex} className="bg-gray-50">
                                <CardHeader className="pb-3">
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-base flex items-center gap-2">
                                      <Calendar className="h-4 w-4" />
                                      {new Date(order.date).toLocaleDateString()}
                                    </CardTitle>
                                    <div className="flex gap-2">
                                      <Badge variant="outline">₹{(order.totalValue / 1000).toFixed(1)}K</Badge>
                                      <Badge variant="secondary">{order.products.length} products</Badge>
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {order.products.map((product, productIndex) => (
                                      <div
                                        key={productIndex}
                                        className="flex items-center justify-between p-3 bg-white rounded-lg border"
                                      >
                                        <div className="flex items-center gap-2">
                                          <Package className="h-4 w-4 text-blue-600" />
                                          <span className="font-medium text-sm">{product.name}</span>
                                        </div>
                                        <div className="text-right">
                                          <div className="font-medium">{product.quantity}</div>
                                          <div className="text-xs text-gray-500">
                                            ₹{(product.value / 1000).toFixed(1)}K
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          {/* Monthly Sales Chart */}
                          <div className="mt-6">
                            <h4 className="font-semibold text-lg mb-4">Monthly Sales Trend</h4>
                            <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={retailer.monthlySales}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <Tooltip formatter={(value) => [`₹${(Number(value) / 1000).toFixed(1)}K`, "Sales"]} />
                                  <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                )
              })}
            </TabsContent>

            <TabsContent value="chart" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recovery Ratio Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recovery Ratio Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={filteredRetailers.slice(0, 10)}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, "Recovery Ratio"]} />
                          <Bar dataKey="recoveryRatio" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Frequency Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Frequency Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["High", "Medium", "Low"].map((frequency) => {
                        const count = filteredRetailers.filter((r) => r.orderFrequency === frequency).length
                        const percentage = (count / filteredRetailers.length) * 100

                        return (
                          <div key={frequency} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium">{frequency} Frequency</span>
                              <span>
                                {count} retailers ({percentage.toFixed(1)}%)
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  frequency === "High"
                                    ? "bg-green-500"
                                    : frequency === "Medium"
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
