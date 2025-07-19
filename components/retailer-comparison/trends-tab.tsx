"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"
import { Activity, TrendingUp } from "lucide-react"
import { RetailerData } from "./types"
import { formatNumber } from "./utils"

interface TrendsTabProps {
  ret1Data: RetailerData
  ret2Data: RetailerData
  trendData: any[]
}

export function TrendsTab({
  ret1Data,
  ret2Data,
  trendData
}: TrendsTabProps) {
  return (
    <div className="space-y-6">
      {/* Revenue Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Revenue Trends
          </CardTitle>
          <CardDescription>
            Monthly revenue comparison between retailers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${formatNumber(value as number)}`, "Revenue"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="retailer1Revenue"
                  name={`${ret1Data.name} Revenue`}
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="retailer2Revenue"
                  name={`${ret2Data.name} Revenue`}
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RetailerSummary retailerData={ret1Data} textColor="text-blue-700" />
            <RetailerSummary retailerData={ret2Data} textColor="text-green-700" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface RetailerSummaryProps {
  retailerData: RetailerData
  textColor: string
}

function RetailerSummary({ retailerData, textColor }: RetailerSummaryProps) {
  const firstToLastGrowth = ((retailerData.monthlyTrend[5].orders - retailerData.monthlyTrend[0].orders) / 
    retailerData.monthlyTrend[0].orders * 100).toFixed(1);
  
  const isGrowthPositive = retailerData.monthlyTrend[5].orders > retailerData.monthlyTrend[0].orders;
  
  const highestOrderMonth = retailerData.monthlyTrend.reduce(
    (max, item) => item.orders > max.orders ? item : max, 
    retailerData.monthlyTrend[0]
  ).month;
  
  const avgMonthlyRevenue = retailerData.monthlyTrend.reduce(
    (sum, item) => sum + item.revenue, 0
  ) / retailerData.monthlyTrend.length;
  
  return (
    <div className="space-y-4">
      <h3 className={`font-medium ${textColor}`}>{retailerData.name} Summary</h3>
      <div className="flex items-center justify-between">
        <span>First to Last Month Growth:</span>
        <Badge className={isGrowthPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
          {firstToLastGrowth}%
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <span>Highest Orders Month:</span>
        <Badge>{highestOrderMonth}</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span>Average Monthly Revenue:</span>
        <Badge variant="outline" className="font-medium">
          ₹{formatNumber(avgMonthlyRevenue)}
        </Badge>
      </div>
    </div>
  );
}
