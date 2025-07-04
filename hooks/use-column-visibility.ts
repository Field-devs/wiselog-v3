"use client"

import { useState, useCallback } from "react"
import type { ColumnConfig } from "@/components/column-selector"

export function useColumnVisibility(initialColumns: ColumnConfig[], storageKey: string) {
  const [columns, setColumns] = useState<ColumnConfig[]>(initialColumns)

  const handleColumnChange = useCallback((newColumns: ColumnConfig[]) => {
    setColumns(newColumns)
  }, [])

  const getVisibleColumns = useCallback(() => {
    return columns.filter((col) => col.visible)
  }, [columns])

  const isColumnVisible = useCallback(
    (key: string) => {
      return columns.find((col) => col.key === key)?.visible ?? false
    },
    [columns],
  )

  return {
    columns,
    handleColumnChange,
    getVisibleColumns,
    isColumnVisible,
  }
}
