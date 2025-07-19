"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Users, TrendingUp, Star } from "lucide-react"

const retailerData = {
  retailer1: {
    name: "Retailer A",
    totalOrder: 156,
    typeWiseOrder: { bio: 45, chemical: 78, organic: 33 },
    totalRecovered: 142,
    recoveryRatio: "91.0%",
    orderFrequency: "2.1x/month",
    rating: 4.7,
  },
  retailer2: {
    name: "Retailer B",
    totalOrder: 203,
    typeWiseOrder: { bio: 67, chemical: 89, organic: 47 },
    totalRecovered: 185,
    recoveryRatio: "91.1%",
    orderFrequency: "2.8x/month",
    rating: 4.5,
  },
}

const comparisonData = [
  { metric: "Total Orders", retailer1: 156, retailer2: 203 },
  { metric: "Recovered", retailer1: 142, retailer2: 185 },
  { metric: "Bio Orders", retailer1: 45, retailer2: 67 },
  { metric: "Chemical Orders", retailer1: 78, retailer2: 89 },
]

export default function RetailerComparison() {
  const [selectedRetailer1, setSelectedRetailer1] = useState("retailer1")
  const [selectedRetailer2, setSelectedRetailer2] = useState("retailer2")

  const ret1Data = retailerData[selectedRetailer1 as keyof typeof retailerData]
  const ret2Data = retailerData[selectedRetailer2 as keyof typeof retailerData]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Retailer Comparison
          </CardTitle>
          <CardDescription>Compare performance metrics between different retailers</CardDescription>
        </CardHeader>
      </Card>

      {/* Retailer Selection and Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Retailer 1 */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Select value={selectedRetailer1} onValueChange={setSelectedRetailer1}>
                <SelectTrigger className="w-48 bg-blue-600 text-white border-blue-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retailer1">Ret 1</SelectItem>
                  <SelectItem value="retailer2">Ret 2</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                {ret1Data.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-600 text-white p-6 rounded-lg space-y-3">
              <div className="grid grid-cols-1 gap-2 text-sm">
                <p>
                  <span className="font-medium">1. Total Order:</span> {ret1Data.totalOrder}
                </p>
                <p>
                  <span className="font-medium">2. Type wise order:</span>
                </p>
                <div className="pl-4 space-y-1">
                  <p>• Bio: {ret1Data.typeWiseOrder.bio}</p>
                  <p>• Chemical: {ret1Data.typeWiseOrder.chemical}</p>
                  <p>• Organic: {ret1Data.typeWiseOrder.organic}</p>
                </div>
                <p>
                  <span className="font-medium">3. Total Recovered:</span> {ret1Data.totalRecovered}
                </p>
                <p>
                  <span className="font-medium">4. Recovery Ratio:</span> {ret1Data.recoveryRatio}
                </p>
                <p>
                  <span className="font-medium">5. Order Frequency:</span> {ret1Data.orderFrequency}
                </p>
              </div>
              <div className="pt-3 border-t border-blue-500">
                <p className="flex items-center gap-2">
                  <span className="font-medium">6. Rating:</span>
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
              <Select value={selectedRetailer2} onValueChange={setSelectedRetailer2}>
                <SelectTrigger className="w-48 bg-blue-600 text-white border-blue-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retailer1">Ret 1</SelectItem>
                  <SelectItem value="retailer2">Ret 2</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {ret2Data.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-600 text-white p-6 rounded-lg space-y-3">
              <div className="grid grid-cols-1 gap-2 text-sm">
                <p>
                  <span className="font-medium">1. Total Order:</span> {ret2Data.totalOrder}
                </p>
                <p>
                  <span className="font-medium">2. Type wise order:</span>
                </p>
                <div className="pl-4 space-y-1">
                  <p>• Bio: {ret2Data.typeWiseOrder.bio}</p>
                  <p>• Chemical: {ret2Data.typeWiseOrder.chemical}</p>
                  <p>• Organic: {ret2Data.typeWiseOrder.organic}</p>
                </div>
                <p>
                  <span className="font-medium">3. Total Recovered:</span> {ret2Data.totalRecovered}
                </p>
                <p>
                  <span className="font-medium">4. Recovery Ratio:</span> {ret2Data.recoveryRatio}
                </p>
                <p>
                  <span className="font-medium">5. Order Frequency:</span> {ret2Data.orderFrequency}
                </p>
              </div>
              <div className="pt-3 border-t border-blue-500">
                <p className="flex items-center gap-2">
                  <span className="font-medium">6. Rating:</span>
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Performance Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="retailer1" fill="#3b82f6" name={ret1Data.name} />
                <Bar dataKey="retailer2" fill="#10b981" name={ret2Data.name} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
