"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, Calendar, Package, Hash } from "lucide-react"
import { useAnalyticsStore } from "@/lib/store"
import { formatDate } from "@/lib/utils"

export default function RetailerAnalytics() {
  const { retailers, loadRetailers } = useAnalyticsStore()
  const [expandedRetailers, setExpandedRetailers] = useState<Set<string>>(new Set())

  useEffect(() => {
    loadRetailers()
  }, [loadRetailers])

  const toggleRetailer = (retailerName: string) => {
    const newExpanded = new Set(expandedRetailers)
    if (newExpanded.has(retailerName)) {
      newExpanded.delete(retailerName)
    } else {
      newExpanded.add(retailerName)
    }
    setExpandedRetailers(newExpanded)
  }

  const getTotalQuantity = (retailer: any) => {
    return retailer.orders.reduce((total: number, order: any) => {
      return total + order.products.reduce((orderTotal: number, product: any) => orderTotal + product.quantity, 0)
    }, 0)
  }

  const getTotalOrders = (retailer: any) => retailer.orders.length

  if (!retailers.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading retailer data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {retailers.map((retailer) => {
        const isExpanded = expandedRetailers.has(retailer.name)
        const totalQuantity = getTotalQuantity(retailer)
        const totalOrders = getTotalOrders(retailer)

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
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {totalOrders} orders
                          </span>
                          <span className="flex items-center gap-1">
                            <Hash className="h-4 w-4" />
                            {totalQuantity} total items
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{totalOrders} Orders</Badge>
                      <Badge variant="outline">{totalQuantity} Items</Badge>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {retailer.orders.map((order, orderIndex) => (
                      <Card key={orderIndex} className="bg-gray-50">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {formatDate(order.date)}
                            </CardTitle>
                            <Badge variant="outline">
                              {order.products.reduce((sum: number, p: any) => sum + p.quantity, 0)} items
                            </Badge>
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
                                <Badge variant="secondary">{product.quantity}</Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        )
      })}
    </div>
  )
}
