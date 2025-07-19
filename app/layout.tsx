import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Analytics Dashboard",
  description: "Comprehensive retailer and product analytics dashboard",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 overflow-x-hidden">{children}</main>
        </div>
      </body>
    </html>
  )
}
