"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Home, 
  Search, 
  Plus, 
  MoreHorizontal, 
  Car, 
  Building2, 
  Package, 
  MapPin, 
  AlertTriangle, 
  DollarSign, 
  Briefcase, 
  Users, 
  ShoppingBag, 
  Settings, 
  FileText, 
  Truck, 
  Warehouse, 
  Route, 
  HelpCircle, 
  Tag, 
  Building, 
  Receipt, 
  CreditCard, 
  Map, 
  PlusCircle, 
  Handshake, 
  UserCheck, 
  Heart, 
  Box, 
  ShoppingCart, 
  UserPlus, 
  Star, 
  ClipboardList, 
  Database
} from "lucide-react"

export default function CadastrosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeGroup, setActiveGroup] = useState("operacional")
  const [activeItem, setActiveItem] = useState("veiculos")

  // Define all cadastros organized by groups
  const cadastroGroups = {
    operacional: {
      name: "Operacional",
      icon: <Truck className="h-5 w-5" />,
      color: "blue",
      items: [
        { id: "veiculos", name: "Veículos", icon: <Car className="h-5 w-5" />, description: "Cadastro de veículos da frota" },
        { id: "unidades", name: "Unidades", icon: <Building2 className="h-5 w-5" />, description: "Unidades operacionais" },
        { id: "estoques", name: "Estoques", icon: <Package className="h-5 w-5" />, description: "Gestão de estoques" },
        { id: "viagens", name: "Viagens", icon: <Route className="h-5 w-5" />, description: "Cadastro de viagens" },
        { id: "motivos", name: "Motivos", icon: <HelpCircle className="h-5 w-5" />, description: "Motivos operacionais" },
        { id: "ocorrencias", name: "Ocorrências", icon: <AlertTriangle className="h-5 w-5" />, description: "Cadastro de ocorrências" },
      ]
    },
    financeiro: {
      name: "Financeiro",
      icon: <DollarSign className="h-5 w-5" />,
      color: "emerald",
      items: [
        { id: "tarifas", name: "Tarifas", icon: <DollarSign className="h-5 w-5" />, description: "Tarifas gerais" },
        { id: "tarifas-unidade", name: "Tarifas por Unidade", icon: <Building className="h-5 w-5" />, description: "Tarifas específicas por unidade" },
        { id: "tarifas-servico", name: "Tarifas por Serviço", icon: <Tag className="h-5 w-5" />, description: "Tarifas específicas por serviço" },
        { id: "taxas", name: "Taxas", icon: <Receipt className="h-5 w-5" />, description: "Taxas e impostos" },
        { id: "setores-tarifarios", name: "Setores Tarifários", icon: <Map className="h-5 w-5" />, description: "Setores para tarifação" },
        { id: "despesas-extras", name: "Despesas Extras", icon: <CreditCard className="h-5 w-5" />, description: "Cadastro de despesas extras" },
        { id: "acordos-compra", name: "Acordos de Compra", icon: <Handshake className="h-5 w-5" />, description: "Acordos comerciais de compra" },
        { id: "categorias", name: "Categorias", icon: <Tag className="h-5 w-5" />, description: "Categorias financeiras" },
        { id: "segmentos-contabeis", name: "Segmentos Contábeis", icon: <FileText className="h-5 w-5" />, description: "Segmentos para contabilidade" },
      ]
    },
    comercial: {
      name: "Comercial",
      icon: <Briefcase className="h-5 w-5" />,
      color: "purple",
      items: [
        { id: "clientes", name: "Clientes", icon: <Users className="h-5 w-5" />, description: "Cadastro de clientes" },
        { id: "contratos", name: "Contratos", icon: <FileText className="h-5 w-5" />, description: "Gestão de contratos" },
        { id: "prestadores", name: "Prestadores", icon: <UserCheck className="h-5 w-5" />, description: "Cadastro de prestadores" },
        { id: "relacionamento", name: "Relacionamento", icon: <Heart className="h-5 w-5" />, description: "Gestão de relacionamento" },
      ]
    },
    produtos: {
      name: "Produtos",
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "orange",
      items: [
        { id: "itens", name: "Itens", icon: <Box className="h-5 w-5" />, description: "Cadastro de itens" },
        { id: "produtos", name: "Produtos", icon: <ShoppingCart className="h-5 w-5" />, description: "Cadastro de produtos" },
      ]
    },
    pessoas: {
      name: "Pessoas",
      icon: <Users className="h-5 w-5" />,
      color: "pink",
      items: [
        { id: "grupos", name: "Grupos", icon: <UserPlus className="h-5 w-5" />, description: "Grupos de pessoas" },
        { id: "habilidades", name: "Habilidades", icon: <Star className="h-5 w-5" />, description: "Cadastro de habilidades" },
        { id: "avaliacoes", name: "Avaliações", icon: <ClipboardList className="h-5 w-5" />, description: "Avaliações de desempenho" },
      ]
    },
    configuracoes: {
      name: "Configurações",
      icon: <Settings className="h-5 w-5" />,
      color: "gray",
      items: [
        { id: "formularios", name: "Formulários", icon: <Settings className="h-5 w-5" />, description: "Configuração de formulários" },
      ]
    }
  }

  // Get current group and item
  const currentGroup = cadastroGroups[activeGroup as keyof typeof cadastroGroups]
  const currentItem = currentGroup?.items.find(item => item.id === activeItem)

  // Handle group change
  const handleGroupChange = (groupKey: string) => {
    setActiveGroup(groupKey)
    // Set first item of the group as active
    const group = cadastroGroups[groupKey as keyof typeof cadastroGroups]
    if (group && group.items.length > 0) {
      setActiveItem(group.items[0].id)
    }
  }

  // Get badge color class based on group
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

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <Input
            placeholder="Buscar cadastros..."
            className="pl-10 bg-white dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Novo Cadastro
        </Button>
      </div>

      {/* Two-Level Navigation */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Database className="h-5 w-5 text-blue-500" />
            Cadastros
          </CardTitle>
          <CardDescription>
            Gerencie todos os cadastros do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {/* First Level - Groups */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto px-6">
              {Object.entries(cadastroGroups).map(([key, group]) => (
                <button
                  key={key}
                  onClick={() => handleGroupChange(key)}
                  className={`flex items-center gap-3 px-0 py-4 mr-8 bg-transparent border-0 border-b-2 border-transparent transition-all duration-200 whitespace-nowrap ${
                    activeGroup === key
                      ? "border-blue-500 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  {group.icon}
                  <span className="font-medium">{group.name}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getBadgeColorClass(group.color)}`}
                  >
                    {group.items.length}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
          
          {/* Second Level - Items */}
          {currentGroup && (
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex overflow-x-auto px-6">
                {currentGroup.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`flex items-center gap-2 px-0 py-3 mr-6 bg-transparent border-0 border-b-2 border-transparent transition-all duration-200 whitespace-nowrap ${
                      activeItem === item.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Content Area */}
          <div className="p-6">
            {currentItem ? (
              <div className="space-y-6">
                {/* Current Item Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      {currentItem.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {currentItem.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {currentItem.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4 mr-2" />
                          Ações
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Plus className="mr-2 h-4 w-4" />
                          Novo {currentItem.name.slice(0, -1)}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Search className="mr-2 h-4 w-4" />
                          Visualizar Lista
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Configurações
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Novo {currentItem.name.slice(0, -1)}
                    </Button>
                  </div>
                </div>

                {/* Content Placeholder */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Quick Actions */}
                  <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="h-5 w-5 text-green-600" />
                        Adicionar Novo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Criar um novo registro de {currentItem.name.toLowerCase()}
                      </p>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Criar Novo
                      </Button>
                    </CardContent>
                  </Card>

                  {/* View All */}
                  <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Search className="h-5 w-5 text-blue-600" />
                        Visualizar Todos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Ver lista completa de {currentItem.name.toLowerCase()}
                      </p>
                      <Button variant="outline" className="w-full">
                        Ver Lista
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Settings */}
                  <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Settings className="h-5 w-5 text-gray-600" />
                        Configurações
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Configurar campos e validações
                      </p>
                      <Button variant="outline" className="w-full">
                        Configurar
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Atividade Recente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              Novo registro adicionado
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              há {i} hora{i > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Database className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Selecione um cadastro
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  Escolha um grupo e um item de cadastro para começar a trabalhar.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}