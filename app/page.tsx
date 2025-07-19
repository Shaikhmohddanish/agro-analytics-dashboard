import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CardHoverEffect } from "@/components/card-hover-effect"
import { 
  BarChart3, Store, Package, TrendingUp, ArrowRight, 
  LineChart, PieChart, Users, Target, Zap, Award
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section with Animated Gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft"></div>
          <div className="absolute top-32 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft delay-200"></div>
          <div className="absolute -bottom-24 left-32 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-soft delay-400"></div>

          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 text-center md:text-left">
              <Badge className="mb-4 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full animate-fade-in">
                Version 2.0 Released
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight animate-slide-up">
                Agro Analytics <span className="text-blue-600">Dashboard</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl animate-slide-up delay-100">
                Harness the power of data with our comprehensive agricultural analytics platform. 
                Transform raw data into actionable insights for farmers, retailers, and distributors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center md:justify-start animate-slide-up delay-200">
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
            
            <div className="md:w-1/2 relative animate-fade-in delay-300">
              <div className="p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 animate-float">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-3 p-4 w-full max-w-md">
                      <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3 animate-slide-up delay-300">
                        <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                          <Store className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                          <div className="h-2 bg-gray-200 rounded-full w-1/2 mt-2"></div>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm flex items-center gap-3 animate-slide-up delay-400">
                        <div className="p-2 bg-green-100 rounded-md text-green-600">
                          <Package className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                          <div className="h-2 bg-gray-200 rounded-full w-1/2 mt-2"></div>
                        </div>
                      </div>
                      <div className="col-span-2 bg-white p-3 rounded-lg shadow-sm flex items-center gap-3 animate-slide-up delay-500">
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
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 animate-fade-in delay-300">
                      Interactive
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-fade-in delay-400">
                      Real-time Data
                    </Badge>
                  </div>
                  <div className="text-gray-400 text-sm animate-fade-in delay-500">
                    Dashboard Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50 backdrop-blur-sm border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Analytics Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of analytical tools helps you make data-driven decisions to optimize your agro-business operations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CardHoverEffect intensity={10} className="animate-slide-up">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-xl animate-pulse-soft">
                      <Store className="h-7 w-7 text-blue-600" />
                    </div>
                    <CardTitle>Retailer Analytics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">Track comprehensive retailer performance, order history, and product preferences</CardDescription>
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 animate-fade-in delay-100">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Customer segmentation</span>
                    </div>
                    <div className="flex items-center gap-2 animate-fade-in delay-200">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Performance metrics</span>
                    </div>
                    <div className="flex items-center gap-2 animate-fade-in delay-300">
                      <LineChart className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Trend analysis</span>
                    </div>
                  </div>
                  <Link href="/analytics?tab=retailers" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 pt-2 gap-1 text-sm font-medium">
                    <span>Explore Retailer Analytics</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </CardHoverEffect>

            <CardHoverEffect intensity={10} className="animate-slide-up delay-100">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-xl animate-pulse-soft">
                      <Package className="h-7 w-7 text-green-600" />
                    </div>
                    <CardTitle>Product Insights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">Deep dive into product trends, clubbing patterns, and demand forecasting</CardDescription>
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 animate-fade-in delay-100">
                      <PieChart className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">Product mix analysis</span>
                    </div>
                    <div className="flex items-center gap-2 animate-fade-in delay-200">
                      <Zap className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">Seasonal demand patterns</span>
                    </div>
                    <div className="flex items-center gap-2 animate-fade-in delay-300">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">Growth opportunities</span>
                    </div>
                  </div>
                  <Link href="/analytics?tab=products" className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors duration-300 pt-2 gap-1 text-sm font-medium">
                    <span>Explore Product Insights</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </CardHoverEffect>

            <CardHoverEffect intensity={10} className="animate-slide-up delay-200">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-xl animate-pulse-soft">
                      <BarChart3 className="h-7 w-7 text-purple-600" />
                    </div>
                    <CardTitle>Advanced Visualizations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">Interactive charts and comprehensive reports with drill-down capabilities</CardDescription>
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 animate-fade-in delay-100">
                      <Award className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Benchmark comparisons</span>
                    </div>
                    <div className="flex items-center gap-2 animate-fade-in delay-200">
                      <LineChart className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Custom reporting</span>
                    </div>
                    <div className="flex items-center gap-2 animate-fade-in delay-300">
                      <Target className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-600">Goal tracking</span>
                    </div>
                  </div>
                  <Link href="/analytics?tab=advanced" className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-300 pt-2 gap-1 text-sm font-medium">
                    <span>Explore Advanced Analytics</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </CardHoverEffect>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CardHoverEffect intensity={8} className="animate-fade-in">
            <div className="bg-blue-50 rounded-xl p-6 text-center border border-blue-100 shadow-md h-full">
              <p className="text-blue-600 text-4xl font-bold mb-2 animate-slide-up">92%</p>
              <p className="text-gray-600">Increased Efficiency</p>
            </div>
          </CardHoverEffect>
          
          <CardHoverEffect intensity={8} className="animate-fade-in delay-100">
            <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100 shadow-md h-full">
              <p className="text-green-600 text-4xl font-bold mb-2 animate-slide-up delay-100">45+</p>
              <p className="text-gray-600">Analytics Reports</p>
            </div>
          </CardHoverEffect>
          
          <CardHoverEffect intensity={8} className="animate-fade-in delay-200">
            <div className="bg-purple-50 rounded-xl p-6 text-center border border-purple-100 shadow-md h-full">
              <p className="text-purple-600 text-4xl font-bold mb-2 animate-slide-up delay-200">200+</p>
              <p className="text-gray-600">Active Retailers</p>
            </div>
          </CardHoverEffect>
          
          <CardHoverEffect intensity={8} className="animate-fade-in delay-300">
            <div className="bg-yellow-50 rounded-xl p-6 text-center border border-yellow-100 shadow-md h-full">
              <p className="text-yellow-600 text-4xl font-bold mb-2 animate-slide-up delay-300">24/7</p>
              <p className="text-gray-600">Real-time Monitoring</p>
            </div>
          </CardHoverEffect>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-24 right-24 w-96 h-96 bg-white rounded-full mix-blend-overlay opacity-5 animate-pulse-soft"></div>
          <div className="absolute top-32 -left-24 w-72 h-72 bg-white rounded-full mix-blend-overlay opacity-5 animate-pulse-soft delay-300"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 relative">
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your agro-business?</h2>
            <p className="text-blue-100 max-w-xl">
              Get started with our comprehensive analytics dashboard and make data-driven decisions today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
            <Link href="/analytics">
              <CardHoverEffect intensity={5} className="inline-block">
                <Button size="lg" variant="secondary" className="px-8 py-6 text-blue-700 hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
                  <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-100 to-blue-50 transition-all duration-500 ease-out group-hover:w-full"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    Start Exploring
                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </CardHoverEffect>
            </Link>
            <Link href="/settings">
              <CardHoverEffect intensity={5} className="inline-block">
                <Button size="lg" variant="outline" className="px-8 py-6 text-white border-white hover:bg-white/20 transition-all duration-300 group">
                  <span className="flex items-center gap-2">
                    Configure Settings
                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </CardHoverEffect>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
