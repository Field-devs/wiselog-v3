"use client"

import { Button } from "@/components/ui/button"
import { Table, Grid3X3 } from "lucide-react"

interface ViewToggleProps {
  view: "table" | "cards"
  onViewChange: (view: "table" | "cards") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
      <Button
        variant={view === "table" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("table")}
        className={`h-8 px-3 transition-all duration-200 ${
          view === "table"
            ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-600"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
        }`}
      >
        <Table className="h-4 w-4 mr-2" />
        Tabela
      </Button>
      <Button
        variant={view === "cards" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewChange("cards")}
        className={`h-8 px-3 transition-all duration-200 ${
          view === "cards"
            ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-600"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600"
        }`}
      >
        <Grid3X3 className="h-4 w-4 mr-2" />
        Cards
      </Button>
    </div>
  )
}
