"use client"

import { useState, lazy, Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Store, Package, Users, TrendingUp } from "lucide-react"
import AdvancedAnalytics from "@/components/advanced-analytics"
import CustomerSegmentation from "@/components/customer-segmentation"
import RetailerComparison from "@/components/retailer-comparison"
import RetailerAnalyticsEnhanced from "@/components/retailer-analytics-enhanced"

// Lazy load ProductAnalyticsEnhanced for better initial load performance
const ProductAnalyticsEnhanced = lazy(() => 
  import("@/components/product-analytics-enhanced")
)

// Loading component for the product analytics tab
const ProductTabLoading = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="h-4 w-72 bg-gray-100 animate-pulse rounded mt-2"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-100 animate-pulse rounded"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 bg-gray-100 animate-pulse rounded"></div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("retailers")
  const [productsTabLoaded, setProductsTabLoaded] = useState(false)
  
  // Pre-load products tab data when hovering over the tab
  const handleProductsTabHover = () => {
    if (!productsTabLoaded) {
      // Mark that we've started loading the products tab
      setProductsTabLoaded(true)
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Comprehensive retailer and product analytics</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Retailers</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Active retailers</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">Unique products</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="retailers" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Retailers
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="flex items-center gap-2"
              onMouseEnter={handleProductsTabHover} // Pre-load on hover
              onClick={() => setProductsTabLoaded(true)} // Ensure loading on click
            >
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Advanced
            </TabsTrigger>
            <TabsTrigger value="segmentation" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Segmentation
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="retailers" className="space-y-6">
            <RetailerAnalyticsEnhanced />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {/* Render loading placeholder first, then load the actual component */}
            <Suspense fallback={<ProductTabLoading />}>
              <ProductAnalyticsEnhanced />
            </Suspense>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="segmentation" className="space-y-6">
            <CustomerSegmentation />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <RetailerComparison />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
