"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MobileUsersTab } from "@/components/mobile-users-tab"
import { WebUsersTab } from "@/components/web-users-tab"
import { PerformanceTab } from "@/components/performance-tab"
import { GlobalFilters } from "@/components/global-filters"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home } from "lucide-react"

interface UserCounts {
  mobile: number
  web: number
  performance: number
}

export function UsersManagement() {
  const [activeTab, setActiveTab] = useState("mobile")
  const [userCounts, setUserCounts] = useState<UserCounts>({
    mobile: 127,
    web: 89,
    performance: 0,
  })
  const [globalFilters, setGlobalFilters] = useState({
    operation: "",
    company: "",
    search: "",
  })

  const handleFilterChange = (filters: typeof globalFilters) => {
    setGlobalFilters(filters)
  }

  return (
    <div className="space-y-6">
      {/* Header with Theme Toggle */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Home className="h-4 w-4" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 dark:text-gray-100">Gerenciamento de Usuários</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ThemeToggle />
      </div>

      {/* Global Filters */}
      <GlobalFilters onFilterChange={handleFilterChange} />

      {/* Main Content */}
      <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Usuários da Equipe</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <TabsList className="h-auto bg-transparent p-0 space-x-8">
                <TabsTrigger
                  value="mobile"
                  className="flex items-center gap-3 px-0 py-4 bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
                    />
                  </svg>
                  <span className="font-medium">Mobile</span>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700 rounded-full min-w-[24px] h-6 flex items-center justify-center px-2"
                  >
                    {userCounts.mobile}
                  </Badge>
                </TabsTrigger>

                <TabsTrigger
                  value="web"
                  className="flex items-center gap-3 px-0 py-4 bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">Web</span>
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700 rounded-full min-w-[24px] h-6 flex items-center justify-center px-2"
                  >
                    {userCounts.web}
                  </Badge>
                </TabsTrigger>

                <TabsTrigger
                  value="performance"
                  className="flex items-center gap-3 px-0 py-4 bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span className="font-medium">Performance</span>
                  <Badge
                    variant="secondary"
                    className="bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700 rounded-full min-w-[24px] h-6 flex items-center justify-center px-2"
                  >
                    {userCounts.performance}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="mobile" className="mt-6">
              <MobileUsersTab filters={globalFilters} />
            </TabsContent>

            <TabsContent value="web" className="mt-6">
              <WebUsersTab filters={globalFilters} />
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <PerformanceTab filters={globalFilters} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
