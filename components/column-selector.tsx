"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, RotateCcw, Eye, EyeOff } from "lucide-react"

export interface ColumnConfig {
  key: string
  label: string
  visible: boolean
  required?: boolean
}

interface ColumnSelectorProps {
  columns: ColumnConfig[]
  onColumnChange: (columns: ColumnConfig[]) => void
  storageKey?: string
}

export function ColumnSelector({ columns, onColumnChange, storageKey = "table-columns" }: ColumnSelectorProps) {
  const [localColumns, setLocalColumns] = useState<ColumnConfig[]>(columns)
  const [isOpen, setIsOpen] = useState(false)

  // Load saved column configuration from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const savedColumns = JSON.parse(saved)
        const updatedColumns = columns.map((col) => {
          const savedCol = savedColumns.find((s: ColumnConfig) => s.key === col.key)
          return savedCol ? { ...col, visible: savedCol.visible } : col
        })
        setLocalColumns(updatedColumns)
        onColumnChange(updatedColumns)
      }
    } catch (error) {
      console.error("Error loading column configuration:", error)
    }
  }, [columns, onColumnChange, storageKey])

  // Save column configuration to localStorage
  const saveColumns = (newColumns: ColumnConfig[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newColumns))
    } catch (error) {
      console.error("Error saving column configuration:", error)
    }
  }

  const toggleColumn = (key: string) => {
    const updatedColumns = localColumns.map((col) =>
      col.key === key && !col.required ? { ...col, visible: !col.visible } : col,
    )
    setLocalColumns(updatedColumns)
    onColumnChange(updatedColumns)
    saveColumns(updatedColumns)
  }

  const resetToDefault = () => {
    const defaultColumns = columns.map((col) => ({ ...col, visible: true }))
    setLocalColumns(defaultColumns)
    onColumnChange(defaultColumns)
    saveColumns(defaultColumns)
    setIsOpen(false)
  }

  const hideAllOptional = () => {
    const updatedColumns = localColumns.map((col) => ({
      ...col,
      visible: col.required || false,
    }))
    setLocalColumns(updatedColumns)
    onColumnChange(updatedColumns)
    saveColumns(updatedColumns)
  }

  const showAll = () => {
    const updatedColumns = localColumns.map((col) => ({ ...col, visible: true }))
    setLocalColumns(updatedColumns)
    onColumnChange(updatedColumns)
    saveColumns(updatedColumns)
  }

  const visibleCount = localColumns.filter((col) => col.visible).length
  const totalCount = localColumns.length

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
        <DropdownMenuLabel className="text-gray-900 dark:text-gray-100 font-semibold">
          Configurar Colunas
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />

        {/* Quick Actions */}
        <div className="px-2 py-2 space-y-1">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={showAll}
              className="flex-1 h-8 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <Eye className="mr-1 h-3 w-3" />
              Mostrar Todas
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={hideAllOptional}
              className="flex-1 h-8 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <EyeOff className="mr-1 h-3 w-3" />
              Ocultar Opcionais
            </Button>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />

        {/* Column List */}
        <div className="max-h-64 overflow-y-auto">
          {localColumns.map((column) => (
            <DropdownMenuItem
              key={column.key}
              className="flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
              onSelect={(e) => e.preventDefault()}
              onClick={() => toggleColumn(column.key)}
            >
              <Checkbox
                checked={column.visible}
                disabled={column.required}
                className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
              />
              <div className="flex-1 min-w-0">
                <span
                  className={`text-sm ${
                    column.visible ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                  } ${column.required ? "font-medium" : ""}`}
                >
                  {column.label}
                </span>
                {column.required && (
                  <span className="text-xs text-blue-600 dark:text-blue-400 ml-1">(obrigatória)</span>
                )}
              </div>
              {column.visible ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-400" />
              )}
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />

        {/* Reset Option */}
        <DropdownMenuItem
          onClick={resetToDefault}
          className="flex items-center space-x-2 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="text-sm font-medium">Restaurar Padrão</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
