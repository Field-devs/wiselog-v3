"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface KeyboardShortcutsProviderProps {
  children: React.ReactNode
}

export function KeyboardShortcutsProvider({ children }: KeyboardShortcutsProviderProps) {
  const { toast } = useToast()
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global keyboard shortcuts
      if (e.key === 'F1') {
        e.preventDefault()
        toast({
          title: "Ajuda",
          description: "Mostrando ajuda contextual",
        })
      }
      
      // Ctrl + S for save
      if (e.ctrlKey && e.key === 's') {
        // This is handled in individual components
        e.preventDefault()
      }
      
      // Alt + Left/Right for navigation
      if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        // This is handled in individual components
        e.preventDefault()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  return <>{children}</>
}