"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  X,
  Home,
  Users,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Pin,
  PinOff,
  Database,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Home",
    icon: <Home className="h-5 w-5" />,
    href: "/",
  },
  {
    id: "teams",
    label: "Equipes",
    icon: <Users className="h-5 w-5" />,
    href: "/teams",
  },
  {
    id: "cadastros",
    label: "Cadastros",
    icon: <Database className="h-5 w-5" />,
    href: "/cadastros",
  },
  {
    id: "configuration",
    label: "Configurações",
    icon: <Settings className="h-5 w-5" />,
    href: "/configuration",
    children: [
      {
        id: "profile",
        label: "My Profile",
        icon: <User className="h-4 w-4" />,
        href: "/profile",
      },
      {
        id: "logout",
        label: "Logout",
        icon: <LogOut className="h-4 w-4" />,
        href: "/logout",
      },
    ],
  },
]

export function FrostedSidebar({ className = "" }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isPinned, setIsPinned] = useState(false)
  const [isProximityOpen, setIsProximityOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [mouseX, setMouseX] = useState(0)
  const pathname = usePathname()
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)

  const shouldShowSidebar = isPinned || isProximityOpen

  // Proximity detection settings
  const PROXIMITY_THRESHOLD = 80 // pixels from left edge
  const HOVER_DELAY = 300 // milliseconds delay before closing

  // Handle client-side mounting and responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024
      setIsDesktop(desktop)

      if (!desktop) {
        setIsCollapsed(false)
        setIsPinned(false)
        setIsProximityOpen(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Mouse position tracking for proximity detection with hover area
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = e.clientX
      setMouseX(x)

      // Only check proximity on desktop and when not pinned
      if (isDesktop && !isPinned) {
        const shouldOpen = x <= PROXIMITY_THRESHOLD

        if (shouldOpen) {
          // Clear any existing timeout when entering proximity
          if (hoverTimeout) {
            clearTimeout(hoverTimeout)
            setHoverTimeout(null)
          }
          setIsProximityOpen(true)
        } else if (isProximityOpen) {
          // Only close if mouse is far enough away (beyond sidebar width)
          const sidebarWidth = shouldShowSidebar ? 320 : 80
          if (x > sidebarWidth + 50) {
            // 50px buffer
            // Add delay before closing
            const timeout = setTimeout(() => {
              setIsProximityOpen(false)
            }, HOVER_DELAY)
            setHoverTimeout(timeout)
          }
        }
      }
    },
    [isPinned, isDesktop, isProximityOpen, hoverTimeout],
  )

  useEffect(() => {
    if (isDesktop) {
      document.addEventListener("mousemove", handleMouseMove)
      return () => document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [handleMouseMove, isDesktop])

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  const toggleExpanded = (itemId: string) => {
    if (isCollapsed && !shouldShowSidebar) return
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const togglePin = () => {
    setIsPinned(!isPinned)
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    console.log("Logging out...")
    // Don't collapse sidebar if it's pinned
    if (!isPinned && isDesktop) {
      setIsProximityOpen(false)
    }
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const active = isActive(item.href)
    const showCollapsed = isCollapsed && !shouldShowSidebar

    if (item.id === "logout") {
      return (
        <button
          key={item.id}
          onClick={handleLogout}
          className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            level > 0 ? "ml-4 pl-8" : ""
          } text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/20 hover:backdrop-blur-sm`}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          {!showCollapsed && <span className="font-medium truncate">{item.label}</span>}
        </button>
      )
    }

    return (
      <div key={item.id} className="w-full">
        <div
          className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
            level > 0 ? "ml-4 pl-8" : ""
          } ${
            active
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 shadow-lg backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30"
              : "text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/40 hover:backdrop-blur-sm hover:text-gray-900 dark:hover:text-white hover:shadow-md"
          }`}
        >
          {hasChildren ? (
            <button
              onClick={() => {
                toggleExpanded(item.id)
                // Don't collapse sidebar if it's pinned when clicking expandable items
              }}
              className="flex items-center gap-3 w-full text-left"
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!showCollapsed && (
                <>
                  <span className="font-medium truncate flex-1">{item.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </>
              )}
            </button>
          ) : (
            <Link
              href={item.href}
              className="flex items-center gap-3 w-full"
              onClick={(e) => {
                // Don't collapse sidebar if it's pinned
                if (!isPinned && isDesktop) {
                  setIsProximityOpen(false)
                }
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!showCollapsed && <span className="font-medium truncate">{item.label}</span>}
            </Link>
          )}
        </div>

        {/* Submenu */}
        {hasChildren && isExpanded && !showCollapsed && (
          <div className="mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const handleSidebarMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
  }

  const handleSidebarMouseLeave = (e: React.MouseEvent) => {
    if (isDesktop && !isPinned && isProximityOpen) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX

      // Only start closing timer if mouse is actually outside the sidebar
      if (x > rect.right + 20) {
        const timeout = setTimeout(() => {
          setIsProximityOpen(false)
        }, HOVER_DELAY)
        setHoverTimeout(timeout)
      }
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:bg-white dark:hover:bg-gray-800"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Proximity Indicator */}
      {isDesktop && !isPinned && mouseX <= PROXIMITY_THRESHOLD && (
        <div
          className="fixed left-0 top-1/2 transform -translate-y-1/2 z-30 w-1 h-20 bg-gradient-to-b from-blue-500/70 to-purple-500/70 rounded-r-full transition-all duration-300 shadow-lg"
          style={{
            opacity: Math.max(0.3, 1 - mouseX / PROXIMITY_THRESHOLD),
            width: `${Math.max(2, 6 - (mouseX / PROXIMITY_THRESHOLD) * 4)}px`,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-full transition-all duration-300 ease-out ${
          isCollapsed && !shouldShowSidebar ? "w-20" : "w-80"
        } ${
          // Desktop behavior
          isDesktop
            ? shouldShowSidebar
              ? "translate-x-0"
              : isCollapsed
                ? "-translate-x-16"
                : "-translate-x-80"
            : // Mobile behavior
              isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
        } bg-white/10 dark:bg-gray-900/10 backdrop-blur-2xl border-r border-white/20 dark:border-gray-700/30 shadow-2xl ${className}`}
        style={{
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 100%
          )`,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 dark:border-gray-700/20">
            {!(isCollapsed && !shouldShowSidebar) && (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <div className="h-6 w-6 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="h-3 w-3 rounded bg-white"></div>
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-xl text-gray-900 dark:text-white">Dashboard</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Management Portal</p>
                </div>
              </div>
            )}

            {isDesktop && (
              <div className="flex items-center gap-2">
                {/* Pin Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePin}
                  className={`transition-all duration-200 rounded-xl ${
                    isPinned
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/40"
                  } backdrop-blur-sm`}
                  title={isPinned ? "Unpin sidebar" : "Pin sidebar"}
                >
                  {isPinned ? <Pin className="h-4 w-4" /> : <PinOff className="h-4 w-4" />}
                </Button>

                {/* Collapse Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/40 backdrop-blur-sm rounded-xl"
                >
                  {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </Button>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-white/10 dark:border-gray-700/20">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-white/30 dark:ring-gray-700/50 shadow-lg">
                <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                  JD
                </AvatarFallback>
              </Avatar>
              {!(isCollapsed && !shouldShowSidebar) && (
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">John Doe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">Administrator</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 shadow-sm animate-pulse"></div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Online</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
            <div className="space-y-2">{menuItems.map((item) => renderMenuItem(item))}</div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 dark:border-gray-700/20">
            {!(isCollapsed && !shouldShowSidebar) ? (
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-gray-700/30">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="h-4 w-4 rounded bg-white/80"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Pro Plan</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Unlimited access</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="h-4 w-4 rounded bg-white/80"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Spacer */}
      <div
        className={`transition-all duration-300 ${isPinned ? (isCollapsed ? "lg:ml-20" : "lg:ml-80") : "lg:ml-0"}`}
      />
    </>
  )
}
