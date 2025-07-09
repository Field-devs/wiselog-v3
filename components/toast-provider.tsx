"use client"

import { Toaster } from "@/components/ui/sonner"

export function ToastProvider() {
  return (
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        className: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg",
      }}
    />
  )
}