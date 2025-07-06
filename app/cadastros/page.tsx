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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Truck, 
  DollarSign,
  Briefcase,
  Users,
  ShoppingBag,
  Settings,
  Database
} from "lucide-react"
import Link from "next/link"
import { getAllCadastroModules, getCadastroGroups } from "@/lib/cadastro-modules"

export default function CadastrosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)

  // Get all cadastro modules and groups
  const cadastroModules = getAllCadastroModules()
  const cadastroGroups = getCadastroGroups()

  // Toggle group expansion
  const toggleGroup = (groupKey: string) => {
    if (expandedGroup === groupKey) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(groupKey);
    }
  }

  // Get all cadastros for filtering
  const allCadastros = Object.values(cadastroModules).map(module => ({
    ...module,
    groupName: cadastroGroups[module.group as keyof typeof cadastroGroups].name,
    groupColor: cadastroGroups[module.group as keyof typeof cadastroGroups].color
  }));

  // Filter cadastros based on search term and active tab
  const filteredCadastros = allCadastros.filter(cadastro => {
    const matchesSearch = cadastro.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cadastro.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || cadastro.group === activeTab;
    return matchesSearch && matchesTab;
  });

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
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl overflow-hidden">
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
          {/* Main Tabs - All or by Group */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <TabsList className="h-auto bg-transparent p-0 px-6 space-x-8">
                <TabsTrigger
                  value="all"
                  className="flex items-center gap-3 px-0 py-4 bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                >
                  <Database className="h-5 w-5" />
              {Object.entries(cadastroGroups)
                .filter(([key]) => activeTab === "all" || key === activeTab)
                    className={`flex items-center gap-3 px-0 py-4 mr-8 bg-transparent border-0 border-b-2 border-transparent transition-all duration-200 whitespace-nowrap ${
              <div className="flex overflow-x-auto px-6 py-2">
                {Object.values(cadastroModules)
                  .filter(module => module.group === expandedGroup)
                  .map(module => (
                  <Link
                    key={module.id}
                    href={`/cadastros/${module.id}`}
                    className="flex items-center gap-2 px-4 py-2 mr-4 bg-white dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <span className="text-sm">{module.icon}</span>
                    <span className="text-sm font-medium">{module.name}</span>
                  </Link>
                ))}
              </TabsList>
            </div>

            {/* Group Tabs Content */}
            <TabsContent value={activeTab} className="mt-0">
              {/* First Level - Groups */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex overflow-x-auto px-6">
                  {Object.entries(cadastroGroups)
                    .filter(([_, group]) => activeTab === "all" || group.name.toLowerCase() === activeTab)
                    .map(([key, group]) => (
                      <button
                        key={key}
                        onClick={() => toggleGroup(key)}
                        className={`flex items-center gap-3 px-0 py-4 mr-8 bg-transparent border-0 border-b-2 border-transparent transition-all duration-200 whitespace-nowrap ${
                          expandedGroup === key
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
              {expandedGroup && (
                <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex overflow-x-auto px-6">
                    {cadastroGroups[expandedGroup].items.map((item: any) => (
                      <button
                        key={item.id}
                        onClick={() => handleItemSelect(item.id)}
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
                {activeItem ? (
                  <div className="space-y-6 animate-in fade-in-50 duration-300">
                    {/* Find current item */}
                    {(() => {
                      let currentItem = null;
                      let currentGroup = null;
                      
                      for (const [groupKey, group] of Object.entries(cadastroGroups)) {
                        const found = group.items.find((item: any) => item.id === activeItem);
                        if (found) {
                          currentItem = found;
                          currentGroup = { key: groupKey, ...group };
                          break;
                        }
                      }
                      
                      if (!currentItem) return null;
                      
                      return (
                        <>
                          {/* Current Item Header */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-xl bg-${currentGroup.color}-50 dark:bg-${currentGroup.color}-900/30 text-${currentGroup.color}-600 dark:text-${currentGroup.color}-400`}>
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
                          Novo {currentItem.name.endsWith('s') ? currentItem.name.slice(0, -1) : currentItem.name}
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
                      Novo {currentItem.name.endsWith('s') ? currentItem.name.slice(0, -1) : currentItem.name}
                    </Button>
                  </div>
                </div>

                {/* Fields and Relationships */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg">Campos</CardTitle>
                      <CardDescription>Campos principais deste cadastro</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {currentItem.fields.map((field: string, index: number) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-gray-900 dark:text-gray-100">{field}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-lg">Relacionamentos</CardTitle>
                      <CardDescription>Entidades relacionadas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {currentItem.relationships.length > 0 ? (
                        <div className="space-y-2">
                          {currentItem.relationships.map((rel: string, index: number) => (
                            <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                              <span className="text-gray-900 dark:text-gray-100">{rel}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 italic">Nenhum relacionamento definido</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Data Table */}
                <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-lg">Registros</CardTitle>
                    <CardDescription>Dados cadastrados</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200 dark:border-gray-700">
                          <TableHead className="text-gray-700 dark:text-gray-300">ID</TableHead>
                          {currentItem.fields.slice(0, 4).map((field: string, index: number) => (
                            <TableHead key={index} className="text-gray-700 dark:text-gray-300">{field}</TableHead>
                          ))}
                          <TableHead className="text-gray-700 dark:text-gray-300 text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {moduleData.map((record) => (
                          <TableRow key={record.id} className="border-gray-200 dark:border-gray-700">
                            <TableCell className="font-medium">{record.id}</TableCell>
                            {currentItem.fields.slice(0, 4).map((field: string, index: number) => (
                              <TableCell key={index}>{record[field]}</TableCell>
                            ))}
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                        </>
                      );
                    })()}
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}