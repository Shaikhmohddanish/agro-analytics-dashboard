"use client"

import { AlertCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RetailerData } from "./types"

interface RetailerSelectorProps {
  selectedRetailer1: string
  selectedRetailer2: string
  handleRetailerChange: (retailer: string, position: "first" | "second") => void
  isSameRetailer: boolean
}

export function RetailerSelector({
  selectedRetailer1,
  selectedRetailer2,
  handleRetailerChange,
  isSameRetailer
}: RetailerSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Retailer 1 Selection */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-3 rounded-full bg-blue-600"></div>
          <label className="text-sm font-medium">First Retailer:</label>
        </div>
        <div>
          <Select value={selectedRetailer1} onValueChange={(value) => handleRetailerChange(value, "first")}>
            <SelectTrigger>
              <SelectValue placeholder="Select a retailer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retailer1">RetailX</SelectItem>
              <SelectItem value="retailer2">ShopWave</SelectItem>
              <SelectItem value="retailer3">QuickMart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Retailer 2 Selection */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-3 rounded-full bg-green-600"></div>
          <label className="text-sm font-medium">Second Retailer:</label>
        </div>
        <div>
          <Select value={selectedRetailer2} onValueChange={(value) => handleRetailerChange(value, "second")}>
            <SelectTrigger>
              <SelectValue placeholder="Select a retailer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retailer1">RetailX</SelectItem>
              <SelectItem value="retailer2">ShopWave</SelectItem>
              <SelectItem value="retailer3">QuickMart</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {isSameRetailer && (
          <div className="flex items-center gap-2 mt-2 text-red-500 text-xs">
            <AlertCircle className="h-3 w-3" />
            <span>Same retailer selected for comparison</span>
          </div>
        )}
      </div>
    </div>
  )
}
