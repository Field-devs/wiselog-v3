import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Home, 
  Database, 
  Users, 
  Building2, 
  Car, 
  MapPin, 
  Settings,
  Plus,
  Search,
  Filter
} from "lucide-react"

export default function CadastrosPage() {
  const cadastroModules = [
    {
      id: "usuarios",
      title: "Usuários",
      description: "Gerenciar usuários do sistema",
      icon: <Users className="h-8 w-8" />,
      count: 127,
      color: "bg-blue-500",
      href: "/cadastros/usuarios"
    },
    {
      id: "empresas",
      title: "Empresas",
      description: "Cadastro de empresas e filiais",
      icon: <Building2 className="h-8 w-8" />,
      count: 15,
      color: "bg-emerald-500",
      href: "/cadastros/empresas"
    },
    {
      id: "veiculos",
      title: "Veículos",
      description: "Cadastro de veículos da frota",
      icon: <Car className="h-8 w-8" />,
      count: 89,
      color: "bg-purple-500",
      href: "/cadastros/veiculos"
    },
    {
      id: "locais",
      title: "Locais",
      description: "Pontos de interesse e localizações",
      icon: <MapPin className="h-8 w-8" />,
      count: 234,
      color: "bg-orange-500",
      href: "/cadastros/locais"
    },
    {
      id: "configuracoes",
      title: "Configurações Gerais",
      description: "Parâmetros e configurações do sistema",
      icon: <Settings className="h-8 w-8" />,
      count: 45,
      color: "bg-gray-500",
      href: "/cadastros/configuracoes"
    }
  ]

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
              <BreadcrumbPage className="text-gray-900 dark:text-gray-100">Cadastros</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ThemeToggle />
      </div>

      {/* Page Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
            <Database className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Cadastros</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Gerencie todos os cadastros do sistema
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Plus className="h-5 w-5 text-blue-500" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
            <Button variant="outline" className="border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50">
              <Search className="mr-2 h-4 w-4" />
              Buscar Registros
            </Button>
            <Button variant="outline" className="border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50">
              <Filter className="mr-2 h-4 w-4" />
              Filtros Avançados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cadastroModules.map((module) => (
          <Card 
            key={module.id}
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl hover:-translate-y-1"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${module.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {module.icon}
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                >
                  {module.count}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {module.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
                  {module.description}
                </CardDescription>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20"
                >
                  Acessar módulo
                  <span className="ml-auto group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Statistics Summary */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Resumo dos Cadastros</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Visão geral dos registros no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {cadastroModules.map((module) => (
              <div key={module.id} className="text-center space-y-2">
                <div className={`w-12 h-12 mx-auto rounded-lg ${module.color} text-white flex items-center justify-center`}>
                  {React.cloneElement(module.icon, { className: "h-6 w-6" })}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{module.count}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{module.title}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}