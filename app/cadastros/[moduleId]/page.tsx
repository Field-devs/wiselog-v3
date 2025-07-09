import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, Database } from "lucide-react"
import { EnhancedCadastroModule } from "@/components/enhanced-cadastro-module"
import { getCadastroModule, getAllCadastroModules } from "@/lib/cadastro-modules"
import { UnifiedCadastroHeader } from "@/components/unified-cadastro-header"
import { CadastroSidebar } from "@/components/cadastro-sidebar"
import { ToastProvider } from "@/components/toast-provider"
import { Button } from "@/components/ui/button"
import { KeyboardShortcutsProvider } from "@/components/keyboard-shortcuts-provider"
import Link from "next/link"

export async function generateStaticParams() {
  const modules = getAllCadastroModules()
  
  return Object.keys(modules).map((moduleId) => ({
    moduleId: moduleId,
  }))
}

export default async function CadastroModulePage({
  params,
}: {
  params: { moduleId: string }
}) {
  const { moduleId } = params
  const moduleData = getCadastroModule(moduleId)

  if (!moduleData) {
    return (
      <KeyboardShortcutsProvider>
        <ToastProvider />
        <div className="p-6 space-y-6">
          <UnifiedCadastroHeader />
          
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <Database className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
              Módulo não encontrado
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              O módulo de cadastro solicitado não foi encontrado. Verifique o URL ou retorne para a lista de cadastros.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/cadastros">Voltar para Cadastros</Link>
            </Button>
          </div>
        </div>
      </KeyboardShortcutsProvider>
    )
  }

  return (
    <KeyboardShortcutsProvider>
      <ToastProvider />
      <div className="p-6 space-y-6">
        <UnifiedCadastroHeader />
        
        <div className="flex-1 p-6 overflow-auto">
            <EnhancedCadastroModule
              moduleId={moduleData.id}
              moduleName={moduleData.name}
              moduleIcon={moduleData.icon}
              moduleDescription={moduleData.description}
              fields={moduleData.fields}
              relationships={moduleData.relationships}
            />
          </div>
      </div>
    </KeyboardShortcutsProvider>
  )
}