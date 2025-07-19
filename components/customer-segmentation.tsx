"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Package, Target } from "lucide-react"

const topBuyers = [
  { category: "Micronutrient", buyers: ["AgriCorp", "FarmTech", "GreenGrow"] },
  { category: "Bio", buyers: ["BioFarms", "OrganicPlus", "NatureCrop"] },
  { category: "Bio-Fer", buyers: ["FertilMax", "BioBoost", "CropCare"] },
  { category: "Chelated", buyers: ["ChemAgri", "PureFert", "MaxYield"] },
]

const frequentBuyers = [
  { name: "AgriCorp", frequency: "Weekly", monthlyFreq: 4.2 },
  { name: "FarmTech", frequency: "Bi-weekly", monthlyFreq: 2.1 },
  { name: "GreenGrow", frequency: "Monthly", monthlyFreq: 1.0 },
]

const productClubbing = [
  { primary: "Micronutrient", clubbed: ["Bio-Fer", "Chelated"], strength: "High" },
  { primary: "Bio", clubbed: ["Micronutrient", "Organic"], strength: "Medium" },
  { primary: "Chelated", clubbed: ["Bio-Fer", "NPK"], strength: "High" },
]

const productMovement = [
  { product: "Micronutrient", trend: "↗️ +15%", status: "Growing" },
  { product: "Bio-Fer", trend: "↘️ -5%", status: "Declining" },
  { product: "Chelated", trend: "→ 0%", status: "Stable" },
  { product: "Bio", trend: "↗️ +22%", status: "Growing" },
]

export default function CustomerSegmentation() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-600" />
            Customer Segmentation
          </CardTitle>
          <CardDescription>Analyze customer behavior, product preferences, and buying patterns</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Buyers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Top 10 Buyers of Each Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBuyers.map((category) => (
                <div key={category.category} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-2">{category.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.buyers.map((buyer, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {index + 1}. {buyer}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Frequent Buyers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Most Frequent Buyers
            </CardTitle>
            <CardDescription>
              &gt; Frequency of Buying more
              <br />
              &gt; Monthly Frequency!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {frequentBuyers.map((buyer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{buyer.name}</p>
                    <p className="text-sm text-gray-600">{buyer.frequency}</p>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {buyer.monthlyFreq}x/month
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Clubbing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-600" />
              Product Clubbing!
            </CardTitle>
            <CardDescription>Products frequently bought together</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productClubbing.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-600">{item.primary}</h4>
                    <Badge variant={item.strength === "High" ? "default" : "secondary"}>{item.strength}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Often bought with:</p>
                  <div className="flex gap-2 mt-1">
                    {item.clubbed.map((product, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Movement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-600" />
              Product Movement!!!
            </CardTitle>
            <CardDescription>Track product performance trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {productMovement.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.product}</p>
                    <p className="text-sm font-mono">{item.trend}</p>
                  </div>
                  <Badge
                    variant={
                      item.status === "Growing" ? "default" : item.status === "Declining" ? "destructive" : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
