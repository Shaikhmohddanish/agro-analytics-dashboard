// Define data types
export interface PieChartLabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
  name: string
}

export interface MonthlyData {
  month: string
  orders: number
  revenue: number
}

export interface CustomerSegment {
  name: string
  value: number
}

export interface RetailerData {
  id: string
  name: string
  avgOrderValue: number
  conversionRate: number
  customerRetention: number
  marketShare: number
  totalCustomers: number
  recoveryRatio: number
  orderFrequency: number
  rating: number
  growthRate: number
  performance: {
    serviceQuality: number
    deliverySpeed: number
    pricing: number
    uiExperience: number
    productRange: number
    customerSupport: number
  }
  monthlyTrend: MonthlyData[]
  customerSegments: CustomerSegment[]
}

// Placeholder colors for pie charts
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];
