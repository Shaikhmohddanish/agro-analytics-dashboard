import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, Store, Package, TrendingUp, ArrowRight, 
  LineChart, PieChart, Users, Target, Zap, Award
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-32 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 left-32 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 text-center md:text-left">
              <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                Version 2.0 Released
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Agro Analytics <span className="text-blue-600">Dashboard</span>
              </h1>
              <p className="text-xl mb-8 max-w-2xl">
                Harness the power of data with our comprehensive agricultural analytics platform. 
                Transform raw data into actionable insights for farmers, retailers, and distributors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center md:justify-start">
                <Link href="/analytics">
                  <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-full sm:w-auto">
                    Explore Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/settings" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 gap-2">
                  <span>View Settings</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-3 p-4 w-full max-w-md">
                      <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                          <Store className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                          <div className="h-2 bg-gray-200 rounded-full w-1/2 mt-2"></div>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-md text-green-600">
                          <Package className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                          <div className="h-2 bg-gray-200 rounded-full w-1/2 mt-2"></div>
                        </div>
                      </div>
                      <div className="col-span-2 bg-white p-3 rounded-lg shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-md text-purple-600">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full w-full"></div>
                          <div className="h-8 bg-gray-100 rounded-md w-full mt-2 relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 h-6 w-1/4 bg-blue-500 rounded-sm"></div>
                            <div className="absolute bottom-0 left-1/4 h-4 w-1/4 bg-green-500 rounded-sm"></div>
                            <div className="absolute bottom-0 left-2/4 h-5 w-1/4 bg-yellow-500 rounded-sm"></div>
                            <div className="absolute bottom-0 left-3/4 h-3 w-1/4 bg-purple-500 rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Interactive
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Real-time Data
                    </Badge>
                  </div>
                  <div className="text-gray-400 text-sm">
                    Dashboard Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
            {/* Features Section */}
            {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Trusted by Data-Driven Retailers</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Join thousands of retailers who are transforming their business with our analytics platform
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <p className="text-gray-600">Active Retailers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">$1.2B+</div>
              <p className="text-gray-600">Revenue Analyzed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15M+</div>
              <p className="text-gray-600">Customer Insights</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">32%</div>
              <p className="text-gray-600">Avg. Revenue Increase</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100 shadow-md h-full">
              <p className="text-blue-600 text-4xl font-bold mb-2">92%</p>
              <p className="text-gray-600">Increased Efficiency</p>
            </div>
          
          <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100 shadow-md h-full">
              <p className="text-green-600 text-4xl font-bold mb-2">45+</p>
              <p className="text-gray-600">Analytics Reports</p>
            </div>
          
          <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-100 shadow-md h-full">
              <p className="text-purple-600 text-4xl font-bold mb-2">200+</p>
              <p className="text-gray-600">Active Retailers</p>
            </div>
          
          <div className="bg-yellow-50 rounded-xl p-6 text-center border border-yellow-100 shadow-md h-full">
              <p className="text-yellow-600 text-4xl font-bold mb-2">24/7</p>
              <p className="text-gray-600">Real-time Monitoring</p>
            </div>
        </div>
      </div>

      {/* CTA Section */}
            {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your retail analytics?</h2>
            <p className="mb-8 text-blue-100">
              Get started today and see how our platform can help you make better decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                Request Demo
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
