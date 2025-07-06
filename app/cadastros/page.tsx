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
  const [activeTab, setActiveTab] = useState("all")

  // Define all cadastros with their groups and icons
  const cadastros = [
    // Operacional
    { id: "veiculos", name: "Veículos", icon: <Car className="h-5 w-5" />, group: "operacional", description: "Cadastro de veículos da frota" },
    { id: "unidades", name: "Unidades", icon: <Building2 className="h-5 w-5" />, group: "operacional", description: "Unidades operacionais" },
    { id: "estoques", name: "Estoques", icon: <Package className="h-5 w-5" />, group: "operacional", description: "Gestão de estoques" },
    { id: "viagens", name: "Viagens", icon: <Route className="h-5 w-5" />, group: "operacional", description: "Cadastro de viagens" },
    { id: "motivos", name: "Motivos", icon: <HelpCircle className="h-5 w-5" />, group: "operacional", description: "Motivos operacionais" },
    { id: "ocorrencias", name: "Ocorrências", icon: <AlertTriangle className="h-5 w-5" />, group: "operacional", description: "Cadastro de ocorrências" },
    
    // Financeiro
    { id: "tarifas", name: "Tarifas", icon: <DollarSign className="h-5 w-5" />, group: "financeiro", description: "Tarifas gerais" },
    { id: "tarifas-unidade", name: "Tarifas por Unidade", icon: <Building className="h-5 w-5" />, group: "financeiro", description: "Tarifas específicas por unidade" },
    { id: "tarifas-servico", name: "Tarifas por Serviço", icon: <Tag className="h-5 w-5" />, group: "financeiro", description: "Tarifas específicas por serviço" },
    { id: "taxas", name: "Taxas", icon: <Receipt className="h-5 w-5" />, group: "financeiro", description: "Taxas e impostos" },
    { id: "setores-tarifarios", name: "Setores Tarifários", icon: <Map className="h-5 w-5" />, group: "financeiro", description: "Setores para tarifação" },
    { id: "despesas-extras", name: "Despesas Extras", icon: <CreditCard className="h-5 w-5" />, group: "financeiro", description: "Cadastro de despesas extras" },
    { id: "acordos-compra", name: "Acordos de Compra", icon: <Handshake className="h-5 w-5" />, group: "financeiro", description: "Acordos comerciais de compra" },
    { id: "categorias", name: "Categorias", icon: <Tag className="h-5 w-5" />, group: "financeiro", description: "Categorias financeiras" },
    { id: "segmentos-contabeis", name: "Segmentos Contábeis", icon: <FileText className="h-5 w-5" />, group: "financeiro", description: "Segmentos para contabilidade" },
    
    // Comercial
    { id: "clientes", name: "Clientes", icon: <Users className="h-5 w-5" />, group: "comercial", description: "Cadastro de clientes" },
    { id: "contratos", name: "Contratos", icon: <FileText className="h-5 w-5" />, group: "comercial", description: "Gestão de contratos" },
    { id: "prestadores", name: "Prestadores", icon: <UserCheck className="h-5 w-5" />, group: "comercial", description: "Cadastro de prestadores" },
    { id: "relacionamento", name: "Relacionamento", icon: <Heart className="h-5 w-5" />, group: "comercial", description: "Gestão de relacionamento" },
    
    // Produtos
    { id: "itens", name: "Itens", icon: <Box className="h-5 w-5" />, group: "produtos", description: "Cadastro de itens" },
    { id: "produtos", name: "Produtos", icon: <ShoppingCart className="h-5 w-5" />, group: "produtos", description: "Cadastro de produtos" },
    
    // Pessoas
    { id: "grupos", name: "Grupos", icon: <UserPlus className="h-5 w-5" />, group: "pessoas", description: "Grupos de pessoas" },
    { id: "habilidades", name: "Habilidades", icon: <Star className="h-5 w-5" />, group: "pessoas", description: "Cadastro de habilidades" },
    { id: "avaliacoes", name: "Avaliações", icon: <ClipboardList className="h-5 w-5" />, group: "pessoas", description: "Avaliações de desempenho" },
    
    // Configurações
    { id: "formularios", name: "Formulários", icon: <Settings className="h-5 w-5" />, group: "configuracoes", description: "Configuração de formulários" },
  ]

  // Group icons for tabs
  const groupIcons = {
    "operacional": <Truck className="h-5 w-5" />,
    "financeiro": <DollarSign className="h-5 w-5" />,
    "comercial": <Briefcase className="h-5 w-5" />,
    "produtos": <ShoppingBag className="h-5 w-5" />,
    "pessoas": <Users className="h-5 w-5" />,
    "configuracoes": <Settings className="h-5 w-5" />,
  }

  // Filter cadastros based on search term and active tab
  const filteredCadastros = cadastros.filter(cadastro => {
    const matchesSearch = cadastro.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cadastro.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === "all" || cadastro.group === activeTab
    return matchesSearch && matchesTab
  })

  // Group cadastros by their group
  const groupedCadastros = filteredCadastros.reduce((acc, cadastro) => {
    if (!acc[cadastro.group]) {
      acc[cadastro.group] = []
    }
    acc[cadastro.group].push(cadastro)
    return acc
  }, {})

  // Group names for display
  const groupNames = {
    "operacional": "Operacional",
    "financeiro": "Financeiro",
    "comercial": "Comercial",
    "produtos": "Produtos",
    "pessoas": "Pessoas",
    "configuracoes": "Configurações",
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

      {/* Search and Filter */}
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 overflow-x-auto flex w-full">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>Todos</span>
          </TabsTrigger>
          <TabsTrigger value="operacional" className="flex items-center gap-2">
            {groupIcons.operacional}
            <span>Operacional</span>
          </TabsTrigger>
          <TabsTrigger value="financeiro" className="flex items-center gap-2">
            {groupIcons.financeiro}
            <span>Financeiro</span>
          </TabsTrigger>
          <TabsTrigger value="comercial" className="flex items-center gap-2">
            {groupIcons.comercial}
            <span>Comercial</span>
          </TabsTrigger>
          <TabsTrigger value="produtos" className="flex items-center gap-2">
            {groupIcons.produtos}
            <span>Produtos</span>
          </TabsTrigger>
          <TabsTrigger value="pessoas" className="flex items-center gap-2">
            {groupIcons.pessoas}
            <span>Pessoas</span>
          </TabsTrigger>
          <TabsTrigger value="configuracoes" className="flex items-center gap-2">
            {groupIcons.configuracoes}
            <span>Configurações</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={activeTab} className="mt-6">
          {Object.keys(groupedCadastros).length > 0 ? (
            <div className="space-y-8">
              {Object.entries(groupedCadastros).map(([group, items]) => (
                <div key={group} className="space-y-4">
                  {activeTab === "all" && (
                    <div className="flex items-center gap-2">
                      {groupIcons[group]}
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{groupNames[group]}</h2>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {items.map((cadastro) => (
                      <Card key={cadastro.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                {cadastro.icon}
                              </div>
                              <CardTitle className="text-lg">{cadastro.name}</CardTitle>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                          <CardDescription>{cadastro.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">
                              {groupNames[cadastro.group]}
                            </Badge>
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600 dark:text-blue-400">
                              Acessar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhum cadastro encontrado</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Não encontramos nenhum cadastro com os critérios de busca atuais. Tente ajustar sua pesquisa.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}