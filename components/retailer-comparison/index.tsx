"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, ArrowUpRight, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Import components
import { RetailerSelector } from "./retailer-selector"
import { OverviewTab } from "./overview-tab"
import { TrendsTab } from "./trends-tab"

// Import data and types
import { retailersData } from "./data"
import { RetailerData } from "./types"

// Retailer Comparison Component
export default function RetailerComparison() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedRetailer1, setSelectedRetailer1] = useState("retailer1");
  const [selectedRetailer2, setSelectedRetailer2] = useState("retailer2");
  const [isLoading, setIsLoading] = useState(false);

  // Get selected retailer data
  const ret1Data = retailersData[selectedRetailer1];
  const ret2Data = retailersData[selectedRetailer2];
  const isSameRetailer = selectedRetailer1 === selectedRetailer2;

  // Generate comparison data for charts
  const comparisonData = useMemo(() => [
    {
      name: "Orders (K)",
      retailer1: ret1Data.monthlyTrend.reduce((sum, item) => sum + item.orders, 0) / 1000,
      retailer2: ret2Data.monthlyTrend.reduce((sum, item) => sum + item.orders, 0) / 1000
    },
    {
      name: "Revenue (Cr)",
      retailer1: ret1Data.monthlyTrend.reduce((sum, item) => sum + item.revenue, 0) / 10000000,
      retailer2: ret2Data.monthlyTrend.reduce((sum, item) => sum + item.revenue, 0) / 10000000
    },
    {
      name: "Customers (M)",
      retailer1: ret1Data.totalCustomers / 1000000,
      retailer2: ret2Data.totalCustomers / 1000000
    },
    {
      name: "Retention (%)",
      retailer1: ret1Data.customerRetention,
      retailer2: ret2Data.customerRetention
    },
    {
      name: "Market Share (%)",
      retailer1: ret1Data.marketShare,
      retailer2: ret2Data.marketShare
    }
  ], [ret1Data, ret2Data]);

  // Generate monthly trend data
  const trendData = useMemo(() => {
    return ret1Data.monthlyTrend.map((item, index) => {
      return {
        name: item.month,
        retailer1Orders: item.orders,
        retailer2Orders: ret2Data.monthlyTrend[index].orders,
        retailer1Revenue: item.revenue,
        retailer2Revenue: ret2Data.monthlyTrend[index].revenue
      };
    });
  }, [ret1Data, ret2Data]);

  // Generate performance data for radar charts
  const performanceData = useMemo(() => {
    return [
      { subject: "Service", retailer1: ret1Data.performance.serviceQuality, retailer2: ret2Data.performance.serviceQuality },
      { subject: "Delivery", retailer1: ret1Data.performance.deliverySpeed, retailer2: ret2Data.performance.deliverySpeed },
      { subject: "Pricing", retailer1: ret1Data.performance.pricing, retailer2: ret2Data.performance.pricing },
      { subject: "UX/UI", retailer1: ret1Data.performance.uiExperience, retailer2: ret2Data.performance.uiExperience },
      { subject: "Products", retailer1: ret1Data.performance.productRange, retailer2: ret2Data.performance.productRange },
      { subject: "Support", retailer1: ret1Data.performance.customerSupport, retailer2: ret2Data.performance.customerSupport }
    ];
  }, [ret1Data, ret2Data]);

  // Handle retailer change
  const handleRetailerChange = (retailer: string, position: "first" | "second") => {
    if (position === "first") {
      setSelectedRetailer1(retailer);
      // Show warning if same retailer is selected
      if (retailer === selectedRetailer2) {
        toast({
          title: "Same retailer selected",
          description: "You've selected the same retailer for comparison. Results might not be meaningful.",
          variant: "destructive"
        });
      }
    } else {
      setSelectedRetailer2(retailer);
      // Show warning if same retailer is selected
      if (retailer === selectedRetailer1) {
        toast({
          title: "Same retailer selected",
          description: "You've selected the same retailer for comparison. Results might not be meaningful.",
          variant: "destructive"
        });
      }
    }
  };

  // Handler for simulating data refresh
  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data Refreshed",
        description: "Comparison data has been updated with the latest information."
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            Retailer Comparison
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-auto" 
              onClick={handleRefreshData}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Refresh Data
                </>
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            Compare performance metrics between different retailers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Retailer Selection UI */}
          <RetailerSelector 
            selectedRetailer1={selectedRetailer1}
            selectedRetailer2={selectedRetailer2}
            handleRetailerChange={handleRetailerChange}
            isSameRetailer={isSameRetailer}
          />
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-6">
          <OverviewTab 
            ret1Data={ret1Data} 
            ret2Data={ret2Data} 
            comparisonData={comparisonData} 
          />
        </TabsContent>

        {/* Monthly Trends Tab Content */}
        <TabsContent value="trends" className="space-y-6">
          <TrendsTab 
            ret1Data={ret1Data} 
            ret2Data={ret2Data} 
            trendData={trendData} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
