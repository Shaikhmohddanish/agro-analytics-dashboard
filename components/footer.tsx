"use client"

import Link from "next/link"
import { BarChart3, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { useBreakpoint } from "@/hooks/use-mobile"

const footerLinks = {
  product: [
    { name: "Analytics", href: "/analytics" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Reports", href: "/reports" },
    { name: "API", href: "/api" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
    { name: "Status", href: "/status" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" },
    { name: "Cookies", href: "/cookies" },
  ],
}

const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "GitHub", href: "#", icon: Github },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Email", href: "mailto:contact@analyticspro.com", icon: Mail },
]

export default function Footer() {
  const { isXs, isSm } = useBreakpoint()
  const isSmallScreen = isXs || isSm
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold">Analytics Pro</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md text-sm sm:text-base">
              Comprehensive analytics platform for retailers and products. Gain insights into ordering patterns, product
              performance, and business trends.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">Product</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="hidden sm:block">
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="hidden sm:block">
            <h3 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs sm:text-sm">© {new Date().getFullYear()} Analytics Pro. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-3 md:mt-0">
              <span className="text-gray-400 text-xs sm:text-sm">Made with ❤️ for better analytics</span>
            </div>
          </div>
        </div>
        
        {/* Mobile-only additional footer links (collapsed) */}
        <div className="sm:hidden border-t border-gray-800 mt-6 pt-6 grid grid-cols-2 gap-x-4 gap-y-6">
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.slice(0, 2).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.slice(0, 2).map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
