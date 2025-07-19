import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Store, Package, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-full">
              <BarChart3 className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Comprehensive analytics platform for retailers and products. Gain insights into ordering patterns, product
            performance, and business trends.
          </p>
          <Link href="/analytics">
            <Button size="lg" className="text-lg px-8 py-3">
              View Analytics Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center">
            <CardHeader>
              <Store className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle>Retailer Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Track retailer performance, order history, and product preferences</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle>Product Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Analyze product trends, clubbing patterns, and demand forecasting</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle>Interactive Charts</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Visualize data with interactive charts and comprehensive reports</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
