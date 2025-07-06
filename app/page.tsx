"use client"

import { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import {
  Home,
  Users,
  Activity,
  TrendingUp,
  Wifi,
  Battery,
  Gauge,
  MapPin,
  Clock,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data (inalterado)
const mockData = { /* ... o mesmo conteúdo mock que você já possui ... */ }

export default function HomePage() {
  const [selectedCompany, setSelectedCompany] = useState("1")
  const [activeTab, setActiveTab] = useState("monitoring")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const PieChart = ({ percentage, color, size = 120 }: { percentage: number; color: string; size?: number }) => {
    const radius = size / 2 - 10
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{percentage}%</span>
        </div>
      </div>
    )
  }

  const BarChart = ({ data, title }: { data: any; title: string }) => {
    const total = Object.values(data).reduce((sum: number, val: any) => sum + (val.value || val), 0)

    return (
      <div className="space-y-3">
        {Object.entries(data).map(([key, item]: [string, any]) => {
          const value = item.value || item
          const color = item.color || "#3B82F6"

          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize text-gray-600 dark:text-gray-400">{key}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{value}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-1000"
                  style={{
                    width: `${(value / total) * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* todo o conteúdo que você já tem permanece igual */}
    </div>
  )
}
