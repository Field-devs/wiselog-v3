"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
  const [activeTab, setActiveTab] = useState("all")

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

  // Filter cadastros based on search term
  const filteredCadastros = Object.entries(cadastroGroups).reduce((acc, [groupKey, group]) => {
    if (!searchTerm) return true
    
    const groupMatches = group.name.toLowerCase().includes(searchTerm.toLowerCase())
    const itemMatches = group.items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    if (groupMatches || itemMatches) {
      acc[groupKey] = group
    }
    
    return acc
  }, {} as typeof cadastroGroups)
  
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
            {/* Main Tabs - Groups */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <TabsList className="h-auto bg-transparent p-0 px-6 space-x-8">
                <TabsTrigger
                  value="all"
                  className="flex items-center gap-3 px-0 py-4 bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                >
                  <Database className="h-5 w-5" />
                  <span className="font-medium">Todos</span>
                </TabsTrigger>
                
                {Object.entries(cadastroGroups).map(([key, group]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex items-center gap-3 px-0 py-4 bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                  >
                    {group.icon}
                    <span className="font-medium">{group.name}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getBadgeColorClass(group.color)}`}
                    >
                      {group.items.length}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {/* Tab Contents */}
            <div className="p-6">
              {/* All Cadastros Tab */}
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Object.entries(filteredCadastros).flatMap(([groupKey, group]) =>
                    group.items.map((item) => (
                      <CadastroItem 
                        key={`${groupKey}-${item.id}`} 
                        item={item} 
                        groupName={group.name} 
                        groupColor={group.color} 
                      />
                    ))
                  )}
                </div>
                
                {/* No Results State */}
                {searchTerm && Object.keys(filteredCadastros).length === 0 && (
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
              </TabsContent>
              
              {/* Group Tabs */}
              {Object.entries(cadastroGroups).map(([key, group]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {group.items
                      .filter(item => 
                        !searchTerm || 
                        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((item) => (
                        <CadastroItem 
                          key={item.id} 
                          item={item} 
                          groupName={group.name} 
                          groupColor={group.color} 
                        />
                      ))
                    }
                  </div>
                  
                  {/* Empty Search Results */}
                  {searchTerm && group.items.filter(item => 
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <Search className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Nenhum resultado encontrado
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                        Não encontramos nenhum cadastro com os critérios de busca "{searchTerm}" neste grupo. Tente ajustar sua pesquisa.
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}

// Cadastro Item Component
interface CadastroItemProps {
  item: {
    id: string
    name: string
    icon: React.ReactNode
    description: string
  }
  groupName: string
  groupColor: string
}

function CadastroItem({ item, groupName, groupColor }: CadastroItemProps) {
  const getBadgeClass = (color: string) => {
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
    <Card className="group cursor-pointer transition-all duration-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md">
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
          <Badge variant="outline" className={`text-xs ${getBadgeClass(groupColor)}`}>
            {groupName}
          </Badge>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
            Acessar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}