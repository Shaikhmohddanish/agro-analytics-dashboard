"use client"

import { create } from "zustand"

interface Product {
  name: string
  quantity: number
}

interface Order {
  date: string
  products: Product[]
}

interface Retailer {
  name: string
  orders: Order[]
}

interface ProductOrder {
  date: string
  retailer: string
  quantity: number
  clubbing: string[]
}

interface ProductData {
  name: string
  orders: ProductOrder[]
}

interface AnalyticsStore {
  retailers: Retailer[]
  products: ProductData[]
  loadRetailers: () => void
  loadProducts: () => void
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  retailers: [],
  products: [],

  loadRetailers: () => {
    // Mock retailer data
    const mockRetailers: Retailer[] = [
      {
        name: "Retailer A",
        orders: [
          {
            date: "2024-05-12",
            products: [
              { name: "Product X", quantity: 10 },
              { name: "Product Y", quantity: 5 },
            ],
          },
          {
            date: "2024-06-15",
            products: [
              { name: "Product Z", quantity: 8 },
              { name: "Product X", quantity: 12 },
            ],
          },
          {
            date: "2024-07-20",
            products: [
              { name: "Product Y", quantity: 15 },
              { name: "Product W", quantity: 6 },
            ],
          },
        ],
      },
      {
        name: "Retailer B",
        orders: [
          {
            date: "2024-05-18",
            products: [
              { name: "Product A", quantity: 20 },
              { name: "Product B", quantity: 10 },
            ],
          },
          {
            date: "2024-06-22",
            products: [
              { name: "Product X", quantity: 7 },
              { name: "Product C", quantity: 14 },
            ],
          },
        ],
      },
      {
        name: "Retailer C",
        orders: [
          {
            date: "2024-05-25",
            products: [
              { name: "Product D", quantity: 25 },
              { name: "Product E", quantity: 18 },
            ],
          },
          {
            date: "2024-06-30",
            products: [
              { name: "Product F", quantity: 9 },
              { name: "Product G", quantity: 11 },
            ],
          },
          {
            date: "2024-07-10",
            products: [
              { name: "Product H", quantity: 13 },
              { name: "Product I", quantity: 7 },
            ],
          },
        ],
      },
      {
        name: "Retailer D",
        orders: [
          {
            date: "2024-06-05",
            products: [
              { name: "Product J", quantity: 16 },
              { name: "Product K", quantity: 22 },
            ],
          },
          {
            date: "2024-07-15",
            products: [
              { name: "Product L", quantity: 8 },
              { name: "Product M", quantity: 19 },
            ],
          },
        ],
      },
    ]

    set({ retailers: mockRetailers })
  },

  loadProducts: () => {
    // Mock product data
    const mockProducts: ProductData[] = [
      {
        name: "Product X",
        orders: [
          {
            date: "2024-05-12",
            retailer: "Retailer A",
            quantity: 10,
            clubbing: ["Product Y", "Product Z"],
          },
          {
            date: "2024-06-15",
            retailer: "Retailer A",
            quantity: 12,
            clubbing: ["Product Z", "Product W"],
          },
          {
            date: "2024-06-22",
            retailer: "Retailer B",
            quantity: 7,
            clubbing: ["Product C", "Product A"],
          },
        ],
      },
      {
        name: "Product Y",
        orders: [
          {
            date: "2024-05-12",
            retailer: "Retailer A",
            quantity: 5,
            clubbing: ["Product X", "Product Z"],
          },
          {
            date: "2024-07-20",
            retailer: "Retailer A",
            quantity: 15,
            clubbing: ["Product W", "Product V"],
          },
        ],
      },
      {
        name: "Product Z",
        orders: [
          {
            date: "2024-06-15",
            retailer: "Retailer A",
            quantity: 8,
            clubbing: ["Product X", "Product Y"],
          },
        ],
      },
      {
        name: "Product A",
        orders: [
          {
            date: "2024-05-18",
            retailer: "Retailer B",
            quantity: 20,
            clubbing: ["Product B", "Product C"],
          },
        ],
      },
      {
        name: "Product B",
        orders: [
          {
            date: "2024-05-18",
            retailer: "Retailer B",
            quantity: 10,
            clubbing: ["Product A", "Product C"],
          },
        ],
      },
      {
        name: "Product C",
        orders: [
          {
            date: "2024-06-22",
            retailer: "Retailer B",
            quantity: 14,
            clubbing: ["Product X", "Product D"],
          },
        ],
      },
      {
        name: "Product D",
        orders: [
          {
            date: "2024-05-25",
            retailer: "Retailer C",
            quantity: 25,
            clubbing: ["Product E", "Product F"],
          },
        ],
      },
      {
        name: "Product E",
        orders: [
          {
            date: "2024-05-25",
            retailer: "Retailer C",
            quantity: 18,
            clubbing: ["Product D", "Product F"],
          },
        ],
      },
    ]

    set({ products: mockProducts })
  },
}))
