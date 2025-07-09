import { UnifiedCadastroHeader } from "@/components/unified-cadastro-header"
import { useState, useEffect } from "react"
import { getAllCadastroModules, getCadastroGroups } from "@/lib/cadastro-modules"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Search, AlertCircle, Filter } from "lucide-react"
import Link from "next/link"
import { ToastProvider } from "@/components/toast-provider"
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider"
import { AnimatedContainer, GlassCard } from "@/components/design-system"

export default function CadastrosPage({ searchParams }: { searchParams: { group?: string } }) {
  const cadastroModules = getAllCadastroModules()
  const cadastroGroups = getCadastroGroups()
  const selectedGroup = searchParams.group || 'all'
  const [searchTerm, setSearchTerm] = useState("")
  
  // Function to get badge color class based on group color
  const getBadgeColorClass = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
      emerald: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
      purple: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
      orange: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
      pink: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700",
      gray: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700"
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  // Filter modules based on selected group
  const filteredModules = Object.values(cadastroModules).filter(module => {
    if (selectedGroup === 'all') return true
    
    // Filter by group
    const groupMatch = module.group === selectedGroup
    
    // If there's a search term, also filter by that
    if (searchTerm) {
      return groupMatch && (
        module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return groupMatch
  })

  // Generate mock record counts for each module
  const getRecordCount = (moduleId: string) => {
    // This would be replaced with actual data in a real application
    const counts = {
      vehicles: 42,
      units: 15,
      clients: 87,
      contracts: 53,
      products: 124,
      inventory: 356,
      occurrences: 28,
      items: 215,
      providers: 34,
      rates: 19,
      extraExpenses: 47,
      taxes: 12,
      unitRates: 8,
      serviceRates: 23,
      rateSectors: 16,
      reasons: 31,
      groups: 9,
      skills: 25,
      categories: 18,
      ratings: 143,
      forms: 7,
      purchaseAgreements: 29,
      accountingSegments: 14,
      commercialRelationships: 63
    }
    return counts[moduleId as keyof typeof counts] || Math.floor(Math.random() * 100) + 5
  }

  return (
    <KeyboardShortcutsProvider>
      <ToastProvider />
      <div className="p-6 space-y-6 animate-in fade-in-50 duration-300">
        <UnifiedCadastroHeader activeGroup={selectedGroup} />
        
        {/* Search Bar */}
        <GlassCard className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
            <Input
              placeholder="Buscar cadastros..."
              className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </GlassCard>
        
        <AnimatedContainer animation="fadeIn" duration={300} className="transition-all">
          {/* Group Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
              <Database className="h-6 w-6 mb-2 text-blue-500 dark:text-blue-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Total de Cadastros</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Object.keys(cadastroModules).length}</p>
            </GlassCard>
            
            {Object.entries(cadastroGroups).slice(0, 4).map(([key, group]) => (
              <Link href={`/cadastros?group=${key}`} key={key}>
                <GlassCard 
                  className={`p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all duration-300 ${
                    selectedGroup === key ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                  }`}
                >
                  <div className={`h-6 w-6 mb-2 ${
                    group.color === 'blue' ? 'text-blue-500 dark:text-blue-400' :
                    group.color === 'emerald' ? 'text-emerald-500 dark:text-emerald-400' :
                    group.color === 'purple' ? 'text-purple-500 dark:text-purple-400' :
                    group.color === 'orange' ? 'text-orange-500 dark:text-orange-400' :
                    group.color === 'pink' ? 'text-pink-500 dark:text-pink-400' :
                    'text-gray-500 dark:text-gray-400'
                  }`}>
                    {group.icon}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{group.name}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {Object.values(cadastroModules).filter(m => m.group === key).length}
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
          
          {/* Filter Status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedGroup === 'all' 
                  ? 'Mostrando todos os cadastros' 
                  : `Filtrando por: ${cadastroGroups[selectedGroup as keyof typeof cadastroGroups]?.name}`}
                {searchTerm && ` • Busca: "${searchTerm}"`}
              </span>
            </div>
            
            {(selectedGroup !== 'all' || searchTerm) && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setSearchTerm("");
                  if (selectedGroup !== 'all') {
                    window.location.href = '/cadastros';
                  }
                }}
                className="text-xs"
              >
                Limpar filtros
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredModules.length > 0 ? (
              filteredModules.map(module => {
                const groupColor = cadastroGroups[module.group as keyof typeof cadastroGroups]?.color || 'gray';
                const recordCount = getRecordCount(module.id);
                
                return (
                  <Link key={module.id} href={`/cadastros/${module.id}`}>
                    <Card className="h-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600 hover:-translate-y-1">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-md ${
                              groupColor === 'blue' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                              groupColor === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                              groupColor === 'purple' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                              groupColor === 'orange' ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                              groupColor === 'pink' ? 'bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' :
                              'bg-gray-50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400'
                            }`}>
                              {module.icon}
                            </div>
                            <CardTitle className="text-base">{module.name}</CardTitle>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700">
                            {recordCount}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {module.description}
                        </p>
                        <div className="mt-3">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getBadgeColorClass(groupColor)}`}
                          >
                            {cadastroGroups[module.group as keyof typeof cadastroGroups]?.name}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <AlertCircle className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Nenhum cadastro encontrado
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-2">
                  {searchTerm 
                    ? `Não foram encontrados cadastros para a busca "${searchTerm}".`
                    : `Não existem cadastros disponíveis para o grupo ${cadastroGroups[selectedGroup as keyof typeof cadastroGroups]?.name || selectedGroup}.`}
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/cadastros">Voltar para Todos os Cadastros</Link>
                </Button>
              </div>
            )}
          
            {Object.values(cadastroModules).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 col-span-full">
                <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Database className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Nenhum cadastro encontrado
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  Não há cadastros disponíveis no momento.
                </p>
              </div>
            )}
          </div>
        </AnimatedContainer>
      </div>
      
      {/* Add a floating button to return to all cadastros when filtered */}
      {selectedGroup !== 'all' && (
        <div className="fixed bottom-6 right-6">
          <Button 
            asChild
            className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link href="/cadastros">
              <Database className="mr-2 h-4 w-4" />
              Todos os Cadastros
            </Link>
          </Button>
        </div>
      )}
    </KeyboardShortcutsProvider>
  )
}