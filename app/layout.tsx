import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { FrostedSidebar } from "@/components/frosted-sidebar"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10">
        <ThemeProvider>
          <div className="flex min-h-screen">
            <FrostedSidebar />
            <main className="flex-1 transition-all duration-500 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-blue-500/5 dark:via-gray-800/5 dark:to-blue-900/5 pointer-events-none" />
              <div className="relative z-10">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
