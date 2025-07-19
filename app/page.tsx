import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { 
  BarChart3, Store, Package, TrendingUp, ArrowRight, 
  LineChart, PieChart, Users, Target, Zap, Award
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative">
          {/* Background blobs - now more optimized for mobile */}
          <div className="absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-32 -left-24 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 left-32 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                Version 2.0 Released
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
                Agro Analytics <span className="text-blue-600">Dashboard</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl">
                Harness the power of data with our comprehensive agricultural analytics platform. 
                Transform raw data into actionable insights for farmers, retailers, and distributors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center md:justify-start">
                <Link href="/analytics" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center sm:justify-start gap-2">
                    Explore Dashboard
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/settings" className="flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors duration-300 gap-2">
                  <span>View Settings</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
              <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 p-2 sm:p-4 w-full max-w-md">
                      <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm flex items-center gap-2 sm:gap-3">
                        <div className="p-1 sm:p-2 bg-blue-100 rounded-md text-blue-600">
                          <Store className="h-3 w-3 sm:h-5 sm:w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-3/4"></div>
                          <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-1/2 mt-1 sm:mt-2"></div>
                        </div>
                      </div>
                      <div className="bg-white p-2 sm:p-3 rounded-lg shadow-sm flex items-center gap-2 sm:gap-3">
                        <div className="p-1 sm:p-2 bg-green-100 rounded-md text-green-600">
                          <Package className="h-3 w-3 sm:h-5 sm:w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-3/4"></div>
                          <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-1/2 mt-1 sm:mt-2"></div>
                        </div>
                      </div>
                      <div className="col-span-2 bg-white p-2 sm:p-3 rounded-lg shadow-sm flex items-center gap-2 sm:gap-3">
                        <div className="p-1 sm:p-2 bg-purple-100 rounded-md text-purple-600">
                          <BarChart3 className="h-3 w-3 sm:h-5 sm:w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full w-full"></div>
                          <div className="h-6 sm:h-8 bg-gray-100 rounded-md w-full mt-1 sm:mt-2 relative overflow-hidden">
                            <div className="absolute bottom-0 left-0 h-4 sm:h-6 w-1/4 bg-blue-500 rounded-sm"></div>
                            <div className="absolute bottom-0 left-1/4 h-3 sm:h-4 w-1/4 bg-green-500 rounded-sm"></div>
                            <div className="absolute bottom-0 left-2/4 h-3.5 sm:h-5 w-1/4 bg-yellow-500 rounded-sm"></div>
                            <div className="absolute bottom-0 left-3/4 h-2.5 sm:h-3 w-1/4 bg-purple-500 rounded-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col xs:flex-row justify-between items-center mt-3 sm:mt-4 gap-2 xs:gap-0">
                  <div className="flex flex-wrap items-center gap-2 justify-center xs:justify-start">
                    <Badge variant="outline" className="text-xs sm:text-sm bg-blue-50 text-blue-700 border-blue-200">
                      Interactive
                    </Badge>
                    <Badge variant="outline" className="text-xs sm:text-sm bg-green-50 text-green-700 border-green-200">
                      Real-time Data
                    </Badge>
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">
                    Dashboard Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Advanced Analytics Features</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Powerful tools to give you complete visibility into your agricultural performance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <LineChart className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Trend Analysis</h3>
              <p className="text-gray-500">Identify emerging patterns and forecast future performance with AI-powered trend analysis.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Farmer Segmentation</h3>
              <p className="text-gray-500">Segment agricultural operations based on size, crop types, and farming practices.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Yield Analysis</h3>
              <p className="text-gray-500">Benchmark your agricultural yield against regional averages and identify improvement opportunities.</p>
            </div>
          </div>
        </div>
      </div>
            {/* Stats Section */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Trusted by Data-Driven Farmers</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Join thousands of agricultural businesses who are transforming their operations with our analytics platform
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <p className="text-sm sm:text-base text-gray-600">Active Farmers</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">$1.2B+</div>
              <p className="text-sm sm:text-base text-gray-600">Crops Analyzed</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">15M+</div>
              <p className="text-sm sm:text-base text-gray-600">Field Insights</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">32%</div>
              <p className="text-sm sm:text-base text-gray-600">Avg. Yield Increase</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Key Performance Metrics</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Our platform helps you track what matters most to your agricultural business
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="bg-blue-50 rounded-xl p-4 sm:p-6 text-center border border-blue-100 shadow-md h-full">
              <p className="text-blue-600 text-2xl sm:text-3xl md:text-4xl font-bold mb-2">92%</p>
              <p className="text-sm sm:text-base text-gray-600">Increased Efficiency</p>
            </div>
          
          <div className="bg-green-50 rounded-xl p-4 sm:p-6 text-center border border-green-100 shadow-md h-full">
              <p className="text-green-600 text-2xl sm:text-3xl md:text-4xl font-bold mb-2">45+</p>
              <p className="text-sm sm:text-base text-gray-600">Analytics Reports</p>
            </div>
          
          <div className="bg-purple-50 rounded-xl p-4 sm:p-6 text-center border border-purple-100 shadow-md h-full">
              <p className="text-purple-600 text-2xl sm:text-3xl md:text-4xl font-bold mb-2">200+</p>
              <p className="text-sm sm:text-base text-gray-600">Active Farmers</p>
            </div>
          
          <div className="bg-yellow-50 rounded-xl p-4 sm:p-6 text-center border border-yellow-100 shadow-md h-full">
              <p className="text-yellow-600 text-2xl sm:text-3xl md:text-4xl font-bold mb-2">24/7</p>
              <p className="text-sm sm:text-base text-gray-600">Real-time Monitoring</p>
            </div>
        </div>
      </div>      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to transform your agricultural analytics?</h2>
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

      <Footer />
    </div>
  )
}
