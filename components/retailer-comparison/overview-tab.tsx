"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend, PieChart
} from "recharts"
import { BarChart3, PieChart as PieChartIcon } from "lucide-react"
import { RetailerData } from "./types"
import { calculateDifference } from "./utils"

interface OverviewTabProps {
  ret1Data: RetailerData
  ret2Data: RetailerData
  comparisonData: any[]
}

export function OverviewTab({
  ret1Data,
  ret2Data,
  comparisonData
}: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Performance Comparison
          </CardTitle>
          <CardDescription>
            High-level overview comparison between retailers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    name={ret1Data.name}
                    dataKey="retailer1"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    name={ret2Data.name}
                    dataKey="retailer2"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {Object.entries(comparisonData).map(([_, item], index) => {
                if (typeof item !== 'object' || !item) return null;
                if (!('name' in item) || !('retailer1' in item) || !('retailer2' in item)) return null;

                const metricName = item.name as string
                const ret1Value = item.retailer1 as number
                const ret2Value = item.retailer2 as number
                const diff = calculateDifference(ret1Value, ret2Value)
                
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{metricName}</span>
                      <Badge
                        variant={parseFloat(diff) > 0 ? "default" : "outline"}
                        className={parseFloat(diff) > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {parseFloat(diff) > 0 ? "+" : ""}{diff}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                        <span className="text-xs">{ret1Data.name}</span>
                      </div>
                      <span className="text-sm font-medium">{ret1Value}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-green-600"></div>
                        <span className="text-xs">{ret2Data.name}</span>
                      </div>
                      <span className="text-sm font-medium">{ret2Value}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Overview Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-purple-600" />
            Key Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Average Order Value"
              bgColor="bg-blue-50"
              textColor="text-blue-700"
              ret1Data={ret1Data}
              ret2Data={ret2Data}
              metricName="avgOrderValue"
              prefix="₹"
            />
            
            <MetricCard
              title="Conversion Rate"
              bgColor="bg-green-50"
              textColor="text-green-700"
              ret1Data={ret1Data}
              ret2Data={ret2Data}
              metricName="conversionRate"
              suffix="%"
            />

            <MetricCard
              title="Customer Retention"
              bgColor="bg-purple-50"
              textColor="text-purple-700"
              ret1Data={ret1Data}
              ret2Data={ret2Data}
              metricName="customerRetention"
              suffix="%"
            />

            <MetricCard
              title="Market Share"
              bgColor="bg-yellow-50"
              textColor="text-yellow-700"
              ret1Data={ret1Data}
              ret2Data={ret2Data}
              metricName="marketShare"
              suffix="%"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface MetricCardProps {
  title: string
  bgColor: string
  textColor: string
  ret1Data: RetailerData
  ret2Data: RetailerData
  metricName: keyof RetailerData
  prefix?: string
  suffix?: string
}

function MetricCard({
  title,
  bgColor,
  textColor,
  ret1Data,
  ret2Data,
  metricName,
  prefix = "",
  suffix = ""
}: MetricCardProps) {
  const ret1Value = ret1Data[metricName] as number
  const ret2Value = ret2Data[metricName] as number

  return (
    <Card className={bgColor}>
      <CardContent className="p-4">
        <div className="flex flex-col">
          <span className={`text-sm ${textColor} font-medium`}>{title}</span>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-700"></div>
              <span className="text-xs font-medium">{ret1Data.name}</span>
            </div>
            <span className="font-bold">{prefix}{ret1Value}{suffix}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-700"></div>
              <span className="text-xs font-medium">{ret2Data.name}</span>
            </div>
            <span className="font-bold">{prefix}{ret2Value}{suffix}</span>
          </div>
          <Badge 
            className="mt-2 self-end w-fit" 
            variant="outline"
          >
            {calculateDifference(ret1Value, ret2Value)}% diff
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
