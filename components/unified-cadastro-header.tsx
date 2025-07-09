"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Home, 
  Search,
  Search,
  Database,
  Truck, 
  DollarSign,
  Briefcase,
  ShoppingBag,
  Building,
  Menu,
  X
} from "lucide-react"
import { getCadastroGroups } from "@/lib/cadastro-modules"

  const pathname = usePathname()
export function UnifiedCadastroHeader({ activeGroup = 'all' }: UnifiedCadastroHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const cadastroGroups = getCadastroGroups()
  
  return (
    <div className="space-y-4">
      {/* Header with Breadcrumb and Theme Toggle */}
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
              <BreadcrumbLink href="/cadastros" className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Database className="h-4 w-4" />
                Cadastros
              </BreadcrumbLink>
            </BreadcrumbItem>
            
            {pathname.startsWith('/cadastros/') && pathname !== '/cadastros/' && (
              <>
                <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 dark:text-gray-100">
                    {activeGroup && cadastroGroups[activeGroup as keyof typeof cadastroGroups]?.name || "Detalhes"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <Input
              placeholder="Buscar em cadastros..."
              className="pl-10 bg-white dark:bg-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ThemeToggle />
          
          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Main Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <Tabs 
              value={activeGroup || 'all'} 
              className="w-full"
            >
              <TabsList className="h-auto bg-transparent p-0 px-4 space-x-6 flex w-full">
                <TabsTrigger
                  value="all"
                  asChild
                  className="flex items-center gap-2 px-1 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-none bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                >
                  <Link href="/cadastros" className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    <span className="font-medium">Todos</span>
                  </Link>
                </TabsTrigger>
                
                {Object.entries(cadastroGroups).map(([key, group]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    asChild
                    className="flex items-center gap-2 px-1 py-4 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 rounded-none bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    <Link href={`/cadastros?group=${key}`} className="flex items-center gap-2">
                      {group.icon}
                      <span className="font-medium">{group.name}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getBadgeColorClass(group.color)}`}
                      >
                        {/* This would be the count of modules in this group */}
                        {key === 'logistics' ? 3 : 
                         key === 'commercial' ? 5 : 
                         key === 'inventory' ? 4 : 
                         key === 'financial' ? 6 : 
                         key === 'organization' ? 4 : 0}
                      </Badge>
                    </Link>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Mobile search - only shown on mobile */}
        <div className="p-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <Input
              placeholder="Buscar em cadastros..."
              className="pl-10 bg-white dark:bg-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="p-4 space-y-2">
              <Link 
                href="/cadastros" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Database className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium">Todos os Cadastros</span>
              </Link>
              
              {Object.entries(cadastroGroups).map(([key, group]) => (
                <Link 
                  key={key}
                  href={`/cadastros?group=${key}`}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="h-5 w-5 text-gray-600 dark:text-gray-400">
                    {group.icon}
                  </span>
                  <span className="font-medium">{group.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Helper function to get badge color class
function getBadgeColorClass(color: string) {
  const colors = {
    blue: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
    purple: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
    orange: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
    pink: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700",
    gray: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700"
  }
  return colors[color as keyof typeof colors] || colors.gray
}