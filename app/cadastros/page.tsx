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
  Database,
  ChevronDown,
  ChevronRight
} from "lucide-react"

export default function CadastrosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

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

  const getColorClasses = (color: string, isActive: boolean = false) => {
    const colors = {
      blue: {
        tab: isActive 
          ? "border-blue-500 text-blue-600 dark:text-blue-400" 
          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
        badge: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
        item: "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700"
      },
      emerald: {
        tab: isActive 
          ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" 
          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700",
        item: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-700"
      },
      purple: {
        tab: isActive 
          ? "border-purple-500 text-purple-600 dark:text-purple-400" 
          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
        badge: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
        item: "hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-700"
      },
      orange: {
        tab: isActive 
          ? "border-orange-500 text-orange-600 dark:text-orange-400" 
          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
        badge: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
        item: "hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-200 dark:hover:border-orange-700"
      },
      pink: {
        tab: isActive 
          ? "border-pink-500 text-pink-600 dark:text-pink-400" 
          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
        badge: "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700",
        item: "hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:border-pink-200 dark:hover:border-pink-700"
      },
      gray: {
        tab: isActive 
          ? "border-gray-500 text-gray-600 dark:text-gray-400" 
          : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
        badge: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-700",
        item: "hover:bg-gray-50 dark:hover:bg-gray-900/20 hover:border-gray-200 dark:hover:border-gray-700"
      }
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  const handleGroupClick = (groupKey: string) => {
    setActiveGroup(activeGroup === groupKey ? null : groupKey)
  }

  const filteredGroups = Object.entries(cadastroGroups).filter(([key, group]) => {
    if (!searchTerm) return true
    
    const groupMatches = group.name.toLowerCase().includes(searchTerm.toLowerCase())
    const itemMatches = group.items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    return groupMatches || itemMatches
  })

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

      {/* Groups Navigation */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Database className="h-5 w-5 text-blue-500" />
            Grupos de Cadastros
          </CardTitle>
          <CardDescription>
            Selecione um grupo para visualizar os cadastros disponíveis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Groups Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2 md:gap-8 overflow-x-auto pb-0">
              {filteredGroups.map(([groupKey, group]) => {
                const isActive = activeGroup === groupKey
                const colorClasses = getColorClasses(group.color, isActive)
                
                return (
                  <button
                    key={groupKey}
                    onClick={() => handleGroupClick(groupKey)}
                    className={`flex items-center gap-3 px-0 py-4 bg-transparent border-0 border-b-2 rounded-none font-medium transition-all duration-200 whitespace-nowrap ${colorClasses.tab}`}
                  >
                    {group.icon}
                    <span>{group.name}</span>
                    <Badge variant="outline" className={`text-xs ${colorClasses.badge}`}>
                      {group.items.length}
                    </Badge>
                    {isActive ? (
                      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Expanded Items */}
          {activeGroup && (
            <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {cadastroGroups[activeGroup as keyof typeof cadastroGroups].name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cadastros disponíveis neste grupo
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cadastroGroups[activeGroup as keyof typeof cadastroGroups].items.map((item) => {
                  const colorClasses = getColorClasses(cadastroGroups[activeGroup as keyof typeof cadastroGroups].color)
                  
                  return (
                    <Card 
                      key={item.id} 
                      className={`cursor-pointer transition-all duration-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md ${colorClasses.item}`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                              {item.icon}
                            </div>
                            <CardTitle className="text-base">{item.name}</CardTitle>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Plus className="mr-2 h-4 w-4" />
                                Novo
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Search className="mr-2 h-4 w-4" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                Configurar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-sm mb-3">
                          {item.description}
                        </CardDescription>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-xs">
                            {cadastroGroups[activeGroup as keyof typeof cadastroGroups].name}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            Acessar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!activeGroup && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Database className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                Selecione um grupo
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Escolha um dos grupos acima para visualizar os cadastros disponíveis e começar a gerenciar seus dados.
              </p>
            </div>
          )}

          {/* No Results State */}
          {searchTerm && filteredGroups.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                Nenhum resultado encontrado
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Não encontramos nenhum cadastro com os critérios de busca "{searchTerm}". Tente ajustar sua pesquisa.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}