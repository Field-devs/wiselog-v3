"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  Home,
  Users,
  Smartphone,
  Monitor,
  BarChart3,
  FileText,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  HelpCircle,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: string | number
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/",
  },
  {
    id: "users",
    label: "Usuários",
    icon: <Users className="h-5 w-5" />,
    href: "/users",
    badge: 216,
    children: [
      {
        id: "mobile-users",
        label: "Mobile",
        icon: <Smartphone className="h-4 w-4" />,
        href: "/users/mobile",
        badge: 127,
      },
      {
        id: "web-users",
        label: "Web",
        icon: <Monitor className="h-4 w-4" />,
        href: "/users/web",
        badge: 89,
      },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "/performance",
  },
  {
    id: "reports",
    label: "Relatórios",
    icon: <FileText className="h-5 w-5" />,
    href: "/reports",
    badge: "Novo",
  },
  {
    id: "notifications",
    label: "Notificações",
    icon: <Bell className="h-5 w-5" />,
    href: "/notifications",
    badge: 3,
  },
  {
    id: "search",
    label: "Busca Avançada",
    icon: <Search className="h-5 w-5" />,
    href: "/search",
  },
  {
    id: "settings",
    label: "Configurações",
    icon: <Settings className="h-5 w-5" />,
    href: "/settings",
  },
  {
    id: "help",
    label: "Ajuda & Suporte",
    icon: <HelpCircle className="h-5 w-5" />,
    href: "/help",
  },
]

export function Sidebar({ className = "" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["users"])
  const pathname = usePathname()

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const active = isActive(item.href)

    return (
      <div key={item.id} className="w-full">
        <div
          className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
            level > 0 ? "ml-4 pl-6" : ""
          } ${
            active
              ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 shadow-sm"
              : "text-gray-700 dark:text-gray-300 hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          {hasChildren ? (
            <button onClick={() => toggleExpanded(item.id)} className="flex items-center gap-3 w-full text-left">
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="font-medium truncate">{item.label}</span>
                  <div className="ml-auto flex items-center gap-2">
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                      >
                        {item.badge}
                      </Badge>
                    )}
                    {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                </>
              )}
            </button>
          ) : (
            <Link href={item.href} className="flex items-center gap-3 w-full">
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="font-medium truncate">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-auto text-xs bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          )}
        </div>

        {/* Submenu */}
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">{item.children?.map((child) => renderMenuItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/80 backdrop-blur-sm border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-72"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-xl ${className}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 dark:text-white">UserManager</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">v2.1.0</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
                <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                  JS
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">João Silva</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Administrador</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">{menuItems.map((item) => renderMenuItem(item))}</nav>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
            <Link
              href="/profile"
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive("/profile")
                  ? "bg-blue-500/20 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <User className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">Meu Perfil</span>}
            </Link>

            <button className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full">
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">Sair</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Spacer */}
      <div className={`transition-all duration-300 ${isCollapsed ? "lg:ml-16" : "lg:ml-72"}`} />
    </>
  )
}
