"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Search, Package, Calendar, TrendingUp, Users } from "lucide-react"
import { useAnalyticsStore } from "@/lib/store"
import { formatDate } from "@/lib/utils"

export default function ProductAnalytics() {
  const { products, loadProducts } = useAnalyticsStore()
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getProductChartData = (product: any) => {
    return product.orders.map((order: any) => ({
      date: formatDate(order.date),
      quantity: order.quantity,
      retailer: order.retailer,
    }))
  }

  const getProductClubbing = (product: any) => {
    const clubbingMap = new Map()

    product.orders.forEach((order: any) => {
      const month = new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "long" })
      if (!clubbingMap.has(month)) {
        clubbingMap.set(month, new Map())
      }

      order.clubbing.forEach((clubProduct: string) => {
        const monthMap = clubbingMap.get(month)
        monthMap.set(clubProduct, (monthMap.get(clubProduct) || 0) + 1)
      })
    })

    return Array.from(clubbingMap.entries()).map(([month, products]) => ({
      month,
      products: Array.from(products.entries()).map(([name, count]) => ({ name, count })),
    }))
  }

  const getTotalQuantity = (product: any) => {
    return product.orders.reduce((total: number, order: any) => total + order.quantity, 0)
  }

  if (!products.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading product data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Product List */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.name}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedProduct?.name === product.name ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  {product.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {product.orders.length} orders
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {getTotalQuantity(product)} total
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{product.orders.length} Orders</Badge>
                  <Badge variant="outline">{getTotalQuantity(product)} Units</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Details */}
      {selectedProduct && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                {selectedProduct.name} - Detailed Analytics
              </CardTitle>
              <CardDescription>Order history, quantity trends, and product clubbing analysis</CardDescription>
            </CardHeader>
          </Card>

          {/* Quantity Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quantity Trend Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getProductChartData(selectedProduct)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="quantity"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ fill: "#2563eb" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedProduct.orders.map((order: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">{formatDate(order.date)}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {order.retailer}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{order.quantity} units</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Product Clubbing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Clubbing Analysis</CardTitle>
              <CardDescription>Products frequently ordered together, grouped by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getProductClubbing(selectedProduct).map((monthData, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{monthData.month}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {monthData.products.map((product, productIndex) => (
                          <div
                            key={productIndex}
                            className="flex items-center justify-between p-2 bg-white rounded border"
                          >
                            <span className="text-sm font-medium">{product.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {product.count}x
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
