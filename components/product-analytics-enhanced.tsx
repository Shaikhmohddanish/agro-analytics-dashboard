"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Package, Calendar, Users, TrendingUp, Search, Download } from "lucide-react"
import { dataService, type ProductAnalytics } from "@/lib/data-service"

export default function ProductAnalyticsEnhanced() {
  const [products, setProducts] = useState<ProductAnalytics[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductAnalytics | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("all") // Updated default value
  const [viewMode, setViewMode] = useState<"timeline" | "clubbing" | "buyers">("timeline")
  const [filterOptions, setFilterOptions] = useState({
    products: [] as string[],
    months: [] as string[],
  })

  useEffect(() => {
    const productData = dataService.getProductAnalytics()
    const options = dataService.getFilterOptions()

    setProducts(productData)
    setFilterOptions(options)
  }, [])

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getMovementHeatmapData = (product: ProductAnalytics) => {
    const heatmapData = product.monthlyMovement.map((month) => ({
      month: month.month,
      quantity: month.quantity,
      intensity: Math.min(100, (month.quantity / Math.max(...product.monthlyMovement.map((m) => m.quantity))) * 100),
    }))
    return heatmapData
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-600" />
                Product-Based Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive product analysis with movement timeline, clubbing patterns, and buyer insights
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem> {/* Updated value prop */}
                {filterOptions.months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="View Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="timeline">Movement Timeline</SelectItem>
                <SelectItem value="clubbing">Product Clubbing</SelectItem>
                <SelectItem value="buyers">Top Buyers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Product Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {filteredProducts.map((product) => {
              const totalQuantity = product.movementTimeline.reduce((sum, movement) => sum + movement.quantity, 0)
              const totalValue = product.movementTimeline.reduce((sum, movement) => sum + movement.value, 0)

              return (
                <Card
                  key={product.name}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedProduct?.name === product.name ? "ring-2 ring-purple-500" : ""
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Package className="h-4 w-4 text-purple-600" />
                      {product.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {product.movementTimeline.length} orders
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {totalQuantity} units
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{product.topBuyers.length} Buyers</Badge>
                      <Badge variant="outline">₹{(totalValue / 1000).toFixed(1)}K</Badge>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Product Details */}
      {selectedProduct && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-600" />
                {selectedProduct.name} - Detailed Analytics
              </CardTitle>
              <CardDescription>
                Comprehensive analysis of product performance, movement patterns, and buyer behavior
              </CardDescription>
            </CardHeader>
          </Card>

          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">Movement Timeline</TabsTrigger>
              <TabsTrigger value="clubbing">Product Clubbing</TabsTrigger>
              <TabsTrigger value="buyers">Top Buyers</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-6">
              {/* Movement Timeline Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Movement Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedProduct.monthlyMovement}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="quantity"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          dot={{ fill: "#8b5cf6" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Movement Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Movement Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-6 gap-2">
                    {getMovementHeatmapData(selectedProduct).map((data, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg text-center text-white text-sm"
                        style={{
                          backgroundColor: `rgba(139, 92, 246, ${data.intensity / 100})`,
                          color: data.intensity > 50 ? "white" : "black",
                        }}
                      >
                        <div className="font-medium">{data.month}</div>
                        <div className="text-xs">{data.quantity}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedProduct.movementTimeline.slice(0, 10).map((movement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{new Date(movement.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {movement.retailer}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{movement.quantity} units</Badge>
                          <div className="text-xs text-gray-500 mt-1">₹{(movement.value / 1000).toFixed(1)}K</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clubbing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Product Clubbing Analysis</CardTitle>
                  <CardDescription>Products frequently ordered together, grouped by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedProduct.clubbing.map((monthData, index) => (
                      <Card key={index} className="bg-gray-50">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">{monthData.month}</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          {monthData.products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {monthData.products.map((product, productIndex) => (
                                <div
                                  key={productIndex}
                                  className="flex items-center justify-between p-2 bg-white rounded border"
                                >
                                  <span className="text-sm font-medium">{product.name}</span>
                                  <Badge variant="outline" className="text-xs">
                                    {product.frequency}x
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">No clubbing data available for this month</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="buyers" className="space-y-6">
              {/* Top Buyers Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top Buyers by Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedProduct.topBuyers.slice(0, 10)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="retailer" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip formatter={(value) => [`₹${(Number(value) / 1000).toFixed(1)}K`, "Total Value"]} />
                        <Bar dataKey="totalValue" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Top Buyers List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Top 10 Buyers Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedProduct.topBuyers.slice(0, 10).map((buyer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{buyer.retailer}</p>
                            <p className="text-sm text-gray-600">{buyer.frequency} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{(buyer.totalValue / 1000).toFixed(1)}K</div>
                          <div className="text-sm text-gray-600">{buyer.totalQuantity} units</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
