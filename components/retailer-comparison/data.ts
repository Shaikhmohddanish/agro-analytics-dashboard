import { RetailerData } from "./types";

// Sample data for retailers
export const retailersData: Record<string, RetailerData> = {
  retailer1: {
    id: "retailer1",
    name: "RetailX",
    avgOrderValue: 3450,
    conversionRate: 4.8,
    customerRetention: 76,
    marketShare: 28,
    totalCustomers: 12500000,
    recoveryRatio: 68.5,
    orderFrequency: 3.8,
    rating: 4.2,
    growthRate: 16.5,
    performance: {
      serviceQuality: 85,
      deliverySpeed: 78,
      pricing: 70,
      uiExperience: 92,
      productRange: 76,
      customerSupport: 80
    },
    monthlyTrend: [
      { month: "Jan", orders: 25000, revenue: 86250000 },
      { month: "Feb", orders: 28000, revenue: 96600000 },
      { month: "Mar", orders: 27000, revenue: 93150000 },
      { month: "Apr", orders: 29500, revenue: 101775000 },
      { month: "May", orders: 32000, revenue: 110400000 },
      { month: "Jun", orders: 35000, revenue: 120750000 }
    ],
    customerSegments: [
      { name: "Young Adults", value: 35 },
      { name: "Middle Age", value: 40 },
      { name: "Seniors", value: 15 },
      { name: "Students", value: 10 }
    ]
  },
  retailer2: {
    id: "retailer2",
    name: "ShopWave",
    avgOrderValue: 2970,
    conversionRate: 3.9,
    customerRetention: 68,
    marketShare: 22,
    totalCustomers: 9800000,
    recoveryRatio: 62.5,
    orderFrequency: 2.5,
    rating: 3.9,
    growthRate: 12.8,
    performance: {
      serviceQuality: 78,
      deliverySpeed: 82,
      pricing: 85,
      uiExperience: 75,
      productRange: 80,
      customerSupport: 72
    },
    monthlyTrend: [
      { month: "Jan", orders: 18000, revenue: 53460000 },
      { month: "Feb", orders: 19500, revenue: 57915000 },
      { month: "Mar", orders: 21000, revenue: 62370000 },
      { month: "Apr", orders: 22000, revenue: 65340000 },
      { month: "May", orders: 24000, revenue: 71280000 },
      { month: "Jun", orders: 26500, revenue: 78705000 }
    ],
    customerSegments: [
      { name: "Young Adults", value: 25 },
      { name: "Middle Age", value: 45 },
      { name: "Seniors", value: 20 },
      { name: "Students", value: 10 }
    ]
  },
  retailer3: {
    id: "retailer3",
    name: "QuickMart",
    avgOrderValue: 1870,
    conversionRate: 5.2,
    customerRetention: 72,
    marketShare: 18,
    totalCustomers: 7600000,
    recoveryRatio: 59.5,
    orderFrequency: 2.9,
    rating: 4.1,
    growthRate: 14.2,
    performance: {
      serviceQuality: 82,
      deliverySpeed: 90,
      pricing: 76,
      uiExperience: 70,
      productRange: 65,
      customerSupport: 85
    },
    monthlyTrend: [
      { month: "Jan", orders: 15000, revenue: 28050000 },
      { month: "Feb", orders: 16200, revenue: 30294000 },
      { month: "Mar", orders: 17500, revenue: 32725000 },
      { month: "Apr", orders: 18800, revenue: 35156000 },
      { month: "May", orders: 20000, revenue: 37400000 },
      { month: "Jun", orders: 22000, revenue: 41140000 }
    ],
    customerSegments: [
      { name: "Young Adults", value: 30 },
      { name: "Middle Age", value: 35 },
      { name: "Seniors", value: 15 },
      { name: "Students", value: 20 }
    ]
  }
};
