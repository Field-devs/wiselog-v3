import { UnifiedCadastroHeader } from "@/components/unified-cadastro-header"
import { CadastroSidebar } from "@/components/cadastro-sidebar"
import { ToastProvider } from "@/components/toast-provider"
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider"
import { getAllCadastroModules } from "@/lib/cadastro-modules"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Search } from "lucide-react"
import Link from "next/link"

export default function CadastrosPage() {
  const cadastroModules = getAllCadastroModules()

  return (
    <KeyboardShortcutsProvider>
      <ToastProvider />
      <div className="p-6 space-y-6">
        <UnifiedCadastroHeader />
        
        <div className="flex h-[calc(100vh-200px)]">
          <CadastroSidebar activeGroup="all" />
          
          <div className="flex-1 p-6 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.values(cadastroModules).map(module => (
                <Link key={module.id} href={`/cadastros/${module.id}`}>
                  <Card className="h-full border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          {module.icon}
                        </div>
                        <CardTitle className="text-base">{module.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {module.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {module.fields.slice(0, 3).map((field, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {field.label}
                          </Badge>
                        ))}
                        {module.fields.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{module.fields.length - 3} campos
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {Object.values(cadastroModules).length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
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
        </div>
      </div>
    </KeyboardShortcutsProvider>
  )
}