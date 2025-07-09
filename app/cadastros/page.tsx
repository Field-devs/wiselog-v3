import { UnifiedCadastroHeader } from "@/components/unified-cadastro-header"
import { useState } from "react"
import { getAllCadastroModules, getCadastroGroups } from "@/lib/cadastro-modules"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Search, AlertCircle } from "lucide-react"
import Link from "next/link"
import { ToastProvider } from "@/components/toast-provider"
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider"
import { AnimatedContainer } from "@/components/design-system"

export default function CadastrosPage({ searchParams }: { searchParams: { group?: string } }) {
  const cadastroModules = getAllCadastroModules()
  const cadastroGroups = getCadastroGroups()
  const selectedGroup = searchParams.group || 'all'
  
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
    return module.group === selectedGroup
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
      <div className="p-6 space-y-6">
        <UnifiedCadastroHeader activeGroup={selectedGroup} />
        
        <AnimatedContainer animation="fadeIn" duration={300}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredModules.length > 0 ? (
              filteredModules.map(module => {
                const groupColor = cadastroGroups[module.group as keyof typeof cadastroGroups]?.color || 'gray';
                const recordCount = getRecordCount(module.id);
                
                return (
                  <Link key={module.id} href={`/cadastros/${module.id}`}>
                    <Card className="h-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600">
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
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  Não existem cadastros disponíveis para o grupo selecionado.
                </p>
                <Button className="mt-6" asChild>
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
    </KeyboardShortcutsProvider>
  )
}