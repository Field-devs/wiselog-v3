"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface GlobalFiltersProps {
  onFilterChange: (filters: { operation: string; company: string; search: string }) => void
}

export function GlobalFilters({ onFilterChange }: GlobalFiltersProps) {
  const [filters, setFilters] = useState({
    operation: "",
    company: "",
    search: "",
  })

  const handleFilterUpdate = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="flex gap-3 items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm dark:bg-gray-800/80 dark:border-gray-700 overflow-x-auto">
      <div className="flex-shrink-0 min-w-[150px]">
        <Select onValueChange={(value) => handleFilterUpdate("operation", value)}>
          <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Operação" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <SelectItem value="op1" className="text-gray-900 dark:text-gray-100">
              Operação 1
            </SelectItem>
            <SelectItem value="op2" className="text-gray-900 dark:text-gray-100">
              Operação 2
            </SelectItem>
            <SelectItem value="op3" className="text-gray-900 dark:text-gray-100">
              Operação 3
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-shrink-0 min-w-[150px]">
        <Select onValueChange={(value) => handleFilterUpdate("company", value)}>
          <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <SelectValue placeholder="Empresa" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
            <SelectItem value="company1" className="text-gray-900 dark:text-gray-100">
              Empresa 1
            </SelectItem>
            <SelectItem value="company2" className="text-gray-900 dark:text-gray-100">
              Empresa 2
            </SelectItem>
            <SelectItem value="company3" className="text-gray-900 dark:text-gray-100">
              Empresa 3
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-shrink-0 min-w-[200px] relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
        <Input
          placeholder="Buscar usuários..."
          className="pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          value={filters.search}
          onChange={(e) => handleFilterUpdate("search", e.target.value)}
        />
      </div>
    </div>
  )
}
