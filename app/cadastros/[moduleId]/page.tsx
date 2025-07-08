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
import { CadastroModule } from "@/components/cadastro-module"
import { getCadastroModule, getAllCadastroModules } from "@/lib/cadastro-modules"

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
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Home className="h-4 w-4" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/cadastros" className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Database className="h-4 w-4" />
                  Cadastros
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900 dark:text-gray-100">Não Encontrado</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <ThemeToggle />
        </div>
        
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
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Home className="h-4 w-4" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500" />
            <BreadcrumbItem>
              <BreadcrumbLink href="/cadastros" className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Database className="h-4 w-4" />
                Cadastros
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400 dark:text-gray-500" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 dark:text-gray-100">{moduleData.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ThemeToggle />
      </div>

      {/* Module Content */}
      <CadastroModule
        moduleId={moduleData.id}
        moduleName={moduleData.name}
        moduleIcon={moduleData.icon}
        moduleDescription={moduleData.description}
        fields={moduleData.fields}
        relationships={moduleData.relationships}
      />
    </div>
  )
}