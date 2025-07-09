"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  ChevronLeft, 
  ChevronRight, 
  Search,
  PlusCircle
} from "lucide-react"
import { getAllCadastroModules, getCadastroGroups } from "@/lib/cadastro-modules"

interface CadastroSidebarProps {
  activeGroup?: string
}

export function CadastroSidebar({ activeGroup }: CadastroSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [persistedState, setPersistedState] = useState<{
    lastVisitedModule?: string;
    expandedGroups?: string[];
  }>({})
  
  const cadastroModules = getAllCadastroModules()
  const cadastroGroups = getCadastroGroups()
  
  // Load persisted state from localStorage
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('cadastro-sidebar-state')
      if (savedState) {
        setPersistedState(JSON.parse(savedState))
      }
    } catch (error) {
      console.error('Error loading persisted state:', error)
    }
  }, [])
  
  // Save state to localStorage
  const updatePersistedState = (newState: Partial<typeof persistedState>) => {
    const updatedState = { ...persistedState, ...newState }
    setPersistedState(updatedState)
    
    try {
      localStorage.setItem('cadastro-sidebar-state', JSON.stringify(updatedState))
    } catch (error) {
      console.error('Error saving persisted state:', error)
    }
  }
  
  // Filter modules based on search and active group
  const filteredModules = Object.values(cadastroModules).filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          module.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesGroup = !activeGroup || activeGroup === 'all' || module.group === activeGroup
    
    return matchesSearch && matchesGroup
  })
  
  // Group modules by their group
  const groupedModules: Record<string, typeof filteredModules> = {}
  
  filteredModules.forEach(module => {
    if (!groupedModules[module.group]) {
      groupedModules[module.group] = []
    }
    groupedModules[module.group].push(module)
  })
  
  // Track current module visit
  useEffect(() => {
    if (pathname.startsWith('/cadastros/') && pathname !== '/cadastros/') {
      const moduleId = pathname.split('/')[2]
      updatePersistedState({ lastVisitedModule: moduleId })
    }
  }, [pathname])
  
  return (
    <div className={`border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-full transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-72'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Cadastros
            </h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Search */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <Input
                placeholder="Buscar cadastros..."
                className="pl-10 bg-white dark:bg-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}
        
        {/* Module List */}
        <ScrollArea className="flex-1">
          <div className="p-4">
            {Object.keys(groupedModules).length > 0 ? (
              Object.entries(groupedModules).map(([groupKey, modules]) => (
                <div key={groupKey} className="mb-6">
                  {!isCollapsed && (
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                        {cadastroGroups[groupKey as keyof typeof cadastroGroups]?.icon}
                        <span className="ml-2">{cadastroGroups[groupKey as keyof typeof cadastroGroups]?.name}</span>
                      </span>
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    {modules.map(module => (
                      <Link
                        key={module.id}
                        href={`/cadastros/${module.id}`}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          pathname === `/cadastros/${module.id}`
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        } ${isCollapsed ? 'justify-center' : ''}`}
                        onClick={() => updatePersistedState({ lastVisitedModule: module.id })}
                      >
                        <span className="flex-shrink-0">{module.icon}</span>
                        {!isCollapsed && (
                          <span className="truncate">{module.name}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {searchTerm ? (
                  <>
                    <p>Nenhum cadastro encontrado</p>
                    <Button 
                      variant="link" 
                      className="mt-2 text-blue-600 dark:text-blue-400"
                      onClick={() => setSearchTerm("")}
                    >
                      Limpar busca
                    </Button>
                  </>
                ) : (
                  <p>Nenhum cadastro disponível</p>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button className="w-full" variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Novo Cadastro
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}