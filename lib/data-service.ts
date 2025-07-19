"use client"

// Mock Excel data structure
export interface ExcelDataRow {
  retailerName: string
  customerName: string
  location: string
  metaTags: string[]
  orderDate: string
  productName: string
  orderQuantity: number
  orderValue: number
  recoveredAmount: number
  frequency: number
}

export interface RetailerProfile {
  name: string
  location: string
  metaTags: string[]
  orders: {
    date: string
    products: {
      name: string
      quantity: number
      value: number
    }[]
    totalValue: number
    recoveredAmount: number
  }[]
  totalOrdered: number
  totalRecovered: number
  recoveryRatio: number
  orderFrequency: "High" | "Medium" | "Low"
  rating: number
  monthlySales: {
    month: string
    total: number
    orders: number
  }[]
}

export interface ProductAnalytics {
  name: string
  movementTimeline: {
    date: string
    quantity: number
    retailer: string
    value: number
  }[]
  clubbing: {
    month: string
    products: {
      name: string
      frequency: number
    }[]
  }[]
  topBuyers: {
    retailer: string
    totalQuantity: number
    totalValue: number
    frequency: number
  }[]
  monthlyMovement: {
    month: string
    quantity: number
    value: number
  }[]
}

// Mock data generator
const generateMockData = (): ExcelDataRow[] => {
  const retailers = ["AgriCorp Ltd", "FarmTech Solutions", "GreenGrow Industries", "BioFarms Co", "CropCare Systems"]
  const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune", "Hyderabad"]
  const products = [
    "Micronutrient Mix",
    "Bio-Fertilizer",
    "Chelated Iron",
    "Organic Compost",
    "NPK Complex",
    "Potash",
    "Urea",
    "DAP",
  ]
  const metaTags = [
    ["Premium", "Bulk"],
    ["Standard", "Retail"],
    ["Organic", "Certified"],
    ["Chemical", "Industrial"],
  ]

  const data: ExcelDataRow[] = []

  for (let i = 0; i < 500; i++) {
    const retailer = retailers[Math.floor(Math.random() * retailers.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const product = products[Math.floor(Math.random() * products.length)]
    const orderDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const quantity = Math.floor(Math.random() * 100) + 10
    const value = quantity * (Math.random() * 500 + 100)
    const recovered = value * (0.7 + Math.random() * 0.3)

    data.push({
      retailerName: retailer,
      customerName: retailer,
      location,
      metaTags: metaTags[Math.floor(Math.random() * metaTags.length)],
      orderDate: orderDate.toISOString().split("T")[0],
      productName: product,
      orderQuantity: quantity,
      orderValue: value,
      recoveredAmount: recovered,
      frequency: Math.floor(Math.random() * 10) + 1,
    })
  }

  return data
}

export class DataService {
  private data: ExcelDataRow[]

  constructor() {
    this.data = generateMockData()
  }

  getRetailerProfiles(): RetailerProfile[] {
    const retailerMap = new Map<string, RetailerProfile>()

    this.data.forEach((row) => {
      if (!retailerMap.has(row.retailerName)) {
        retailerMap.set(row.retailerName, {
          name: row.retailerName,
          location: row.location,
          metaTags: row.metaTags,
          orders: [],
          totalOrdered: 0,
          totalRecovered: 0,
          recoveryRatio: 0,
          orderFrequency: "Low",
          rating: 0,
          monthlySales: [],
        })
      }

      const profile = retailerMap.get(row.retailerName)!

      // Find or create order for this date
      let order = profile.orders.find((o) => o.date === row.orderDate)
      if (!order) {
        order = {
          date: row.orderDate,
          products: [],
          totalValue: 0,
          recoveredAmount: 0,
        }
        profile.orders.push(order)
      }

      order.products.push({
        name: row.productName,
        quantity: row.orderQuantity,
        value: row.orderValue,
      })
      order.totalValue += row.orderValue
      order.recoveredAmount += row.recoveredAmount

      profile.totalOrdered += row.orderValue
      profile.totalRecovered += row.recoveredAmount
    })

    // Calculate derived metrics
    retailerMap.forEach((profile) => {
      profile.recoveryRatio = profile.totalRecovered / profile.totalOrdered
      profile.orderFrequency = profile.orders.length > 10 ? "High" : profile.orders.length > 5 ? "Medium" : "Low"
      profile.rating = Math.min(5, profile.recoveryRatio * 3 + profile.orders.length * 0.1)

      // Calculate monthly sales
      const monthlyMap = new Map<string, { total: number; orders: number }>()
      profile.orders.forEach((order) => {
        const month = new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
        if (!monthlyMap.has(month)) {
          monthlyMap.set(month, { total: 0, orders: 0 })
        }
        const monthly = monthlyMap.get(month)!
        monthly.total += order.totalValue
        monthly.orders += 1
      })

      profile.monthlySales = Array.from(monthlyMap.entries()).map(([month, data]) => ({
        month,
        total: data.total,
        orders: data.orders,
      }))
    })

    return Array.from(retailerMap.values())
  }

  getProductAnalytics(): ProductAnalytics[] {
    const productMap = new Map<string, ProductAnalytics>()

    this.data.forEach((row) => {
      if (!productMap.has(row.productName)) {
        productMap.set(row.productName, {
          name: row.productName,
          movementTimeline: [],
          clubbing: [],
          topBuyers: [],
          monthlyMovement: [],
        })
      }

      const product = productMap.get(row.productName)!

      product.movementTimeline.push({
        date: row.orderDate,
        quantity: row.orderQuantity,
        retailer: row.retailerName,
        value: row.orderValue,
      })
    })

    // Calculate derived analytics
    productMap.forEach((product) => {
      // Calculate top buyers
      const buyerMap = new Map<string, { quantity: number; value: number; frequency: number }>()
      product.movementTimeline.forEach((movement) => {
        if (!buyerMap.has(movement.retailer)) {
          buyerMap.set(movement.retailer, { quantity: 0, value: 0, frequency: 0 })
        }
        const buyer = buyerMap.get(movement.retailer)!
        buyer.quantity += movement.quantity
        buyer.value += movement.value
        buyer.frequency += 1
      })

      product.topBuyers = Array.from(buyerMap.entries())
        .map(([retailer, data]) => ({
          retailer,
          totalQuantity: data.quantity,
          totalValue: data.value,
          frequency: data.frequency,
        }))
        .sort((a, b) => b.totalValue - a.totalValue)
        .slice(0, 10)

      // Calculate monthly movement
      const monthlyMap = new Map<string, { quantity: number; value: number }>()
      product.movementTimeline.forEach((movement) => {
        const month = new Date(movement.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })
        if (!monthlyMap.has(month)) {
          monthlyMap.set(month, { quantity: 0, value: 0 })
        }
        const monthly = monthlyMap.get(month)!
        monthly.quantity += movement.quantity
        monthly.value += movement.value
      })

      product.monthlyMovement = Array.from(monthlyMap.entries()).map(([month, data]) => ({
        month,
        quantity: data.quantity,
        value: data.value,
      }))

      // Calculate product clubbing (simplified)
      const clubbingMap = new Map<string, Map<string, number>>()
      this.data.forEach((row) => {
        if (row.productName === product.name) {
          const month = new Date(row.orderDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })
          if (!clubbingMap.has(month)) {
            clubbingMap.set(month, new Map())
          }

          // Find other products ordered by same retailer in same month
          const sameMonthOrders = this.data.filter(
            (r) =>
              r.retailerName === row.retailerName &&
              new Date(r.orderDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }) === month &&
              r.productName !== product.name,
          )

          sameMonthOrders.forEach((order) => {
            const monthMap = clubbingMap.get(month)!
            monthMap.set(order.productName, (monthMap.get(order.productName) || 0) + 1)
          })
        }
      })

      product.clubbing = Array.from(clubbingMap.entries()).map(([month, products]) => ({
        month,
        products: Array.from(products.entries())
          .map(([name, frequency]) => ({ name, frequency }))
          .sort((a, b) => b.frequency - a.frequency)
          .slice(0, 5),
      }))
    })

    return Array.from(productMap.values())
  }

  getFilterOptions() {
    const retailers = [...new Set(this.data.map((row) => row.retailerName))]
    const locations = [...new Set(this.data.map((row) => row.location))]
    const products = [...new Set(this.data.map((row) => row.productName))]
    const metaTags = [...new Set(this.data.flatMap((row) => row.metaTags))]
    const months = [
      ...new Set(
        this.data.map((row) =>
          new Date(row.orderDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }),
        ),
      ),
    ].sort()

    return { retailers, locations, products, metaTags, months }
  }

  exportData(format: "csv" | "xlsx") {
    // Implementation for data export
    console.log(`Exporting data in ${format} format`)
    return this.data
  }
}

export const dataService = new DataService()
