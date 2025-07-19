# Agro Analytics Dashboard

A comprehensive agricultural analytics platform that transforms raw data into actionable insights for farmers, retailers, and distributors.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38b2ac)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Analytics Components](#analytics-components)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Agro Analytics Dashboard is a modern, responsive web application built with Next.js and React that provides in-depth analytics for the agricultural sector. The dashboard presents complex data through intuitive visualizations and interactive components, enabling users to make data-driven decisions quickly and efficiently.

![Dashboard Preview](public/placeholder.svg)

## 🚀 Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Interactive Analytics**: Real-time data visualizations using Recharts
- **Modular Components**: Well-organized component structure for easy maintenance
- **Multiple Data Views**: Analyze data through various perspectives (retailers, products, customers)
- **Dark/Light Mode Support**: Theme toggle for user preference
- **Performance Optimized**: Lazy loading and optimized rendering for better performance

## 📁 Project Structure

```
├── app/                    # Next.js App Router structure
│   ├── analytics/          # Analytics page
│   ├── settings/           # Settings page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── advanced-analytics.tsx
│   ├── customer-segmentation.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── product-analytics.tsx
│   ├── product-analytics-enhanced.tsx
│   ├── retailer-analytics.tsx
│   ├── retailer-analytics-enhanced.tsx
│   ├── retailer-comparison.tsx
│   ├── retailer-comparison/  # Modularized component
│   │   ├── data.ts
│   │   ├── index.tsx
│   │   ├── overview-tab.tsx
│   │   ├── retailer-selector.tsx
│   │   ├── trends-tab.tsx
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── theme-provider.tsx
│   └── ui/                 # Shadcn UI components
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                    # Utility functions and services
│   ├── data-service.ts
│   ├── store.ts
│   └── utils.ts
├── public/                 # Static assets
├── styles/                 # Additional styles
│   └── globals.css
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 💻 Technology Stack

### Core

- **Next.js**: React framework with App Router for server components and routing
- **React 18**: UI library with hooks for state management
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework

### UI Components

- **Shadcn UI**: Component collection based on Radix UI primitives
- **Lucide Icons**: Modern icon library
- **Recharts**: Responsive charting library for data visualization

### State Management & Utilities

- **Zustand**: Lightweight state management
- **React Hook Form**: Form validation and handling
- **Zod**: Schema validation

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/agro-analytics-dashboard.git
cd agro-analytics-dashboard
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
# or
pnpm build
pnpm start
```

## 📊 Analytics Components

### Retailer Analytics

The Retailer Analytics module provides comprehensive insights into retailer performance metrics including:

- Sales performance over time
- Conversion rates
- Customer retention
- Order frequency analysis
- Market share comparison

### Product Analytics

The Product Analytics module offers detailed insights into product performance:

- Product sales trends
- Inventory management metrics
- Product category analysis
- Seasonal performance patterns
- Profit margin visualization

### Customer Segmentation

This module helps analyze customer behavior through:

- Demographic segmentation
- Purchase behavior analysis
- Customer lifetime value
- Loyalty metrics
- Retention analysis

### Retailer Comparison

The Retailer Comparison tool enables side-by-side analysis of retailers:

- Performance metrics comparison
- Market share visualization
- Monthly trend analysis
- Key performance indicators

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ for the agricultural analytics community