"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
  Upload
} from "lucide-react"

export default function CadastrosPage() {
  const [activeTab, setActiveTab] = useState("usuarios")

  const tabsData = [
    {
      id: "usuarios",
      label: "Usuários",
      icon: <Users className="h-5 w-5" />,
      count: 127,
      data: [
        { id: 1, nome: "João Silva", email: "joao@empresa.com", perfil: "Administrador", status: "Ativo" },
        { id: 2, nome: "Maria Santos", email: "maria@empresa.com", perfil: "Operador", status: "Ativo" },
        { id: 3, nome: "Carlos Lima", email: "carlos@empresa.com", perfil: "Visualizador", status: "Inativo" },
        { id: 4, nome: "Ana Costa", email: "ana@empresa.com", perfil: "Operador", status: "Ativo" },
        { id: 5, nome: "Pedro Oliveira", email: "pedro@empresa.com", perfil: "Visualizador", status: "Ativo" },
      ]
    },
    {
      id: "empresas",
      label: "Empresas",
      icon: <Building2 className="h-5 w-5" />,
      count: 15,
      data: [
        { id: 1, nome: "Empresa Principal", cnpj: "12.345.678/0001-90", cidade: "São Paulo", status: "Ativa" },
        { id: 2, nome: "Filial Norte", cnpj: "12.345.678/0002-71", cidade: "Recife", status: "Ativa" },
        { id: 3, nome: "Filial Sul", cnpj: "12.345.678/0003-52", cidade: "Porto Alegre", status: "Ativa" },
        { id: 4, nome: "Filial Nordeste", cnpj: "12.345.678/0004-33", cidade: "Salvador", status: "Ativa" },
        { id: 5, nome: "Filial Centro-Oeste", cnpj: "12.345.678/0005-14", cidade: "Brasília", status: "Inativa" },
      ]
    },
    {
      id: "veiculos",
      label: "Veículos",
      icon: <Car className="h-5 w-5" />,
      count: 89,
      data: [
        { id: 1, placa: "ABC-1234", modelo: "Honda Civic", ano: "2022", status: "Ativo" },
        { id: 2, placa: "XYZ-5678", modelo: "Toyota Corolla", ano: "2021", status: "Ativo" },
        { id: 3, placa: "DEF-9012", modelo: "Volkswagen Gol", ano: "2020", status: "Manutenção" },
        { id: 4, placa: "GHI-3456", modelo: "Ford Ka", ano: "2023", status: "Ativo" },
        { id: 5, placa: "JKL-7890", modelo: "Chevrolet Onix", ano: "2022", status: "Ativo" },
      ]
    },
    {
      id: "locais",
      label: "Locais",
      icon: <MapPin className="h-5 w-5" />,
      count: 234,
      data: [
        { id: 1, nome: "Sede Principal", endereco: "Av. Paulista, 1000", tipo: "Escritório", status: "Ativo" },
        { id: 2, nome: "Depósito Norte", endereco: "Rua Industrial, 500", tipo: "Depósito", status: "Ativo" },
        { id: 3, nome: "Cliente A", endereco: "Rua Comercial, 200", tipo: "Cliente", status: "Ativo" },
        { id: 4, nome: "Filial Centro", endereco: "Av. Central, 800", tipo: "Filial", status: "Ativo" },
        { id: 5, nome: "Posto de Combustível", endereco: "Rod. BR-101, Km 45", tipo: "Posto", status: "Ativo" },
      ]
    },
    {
      id: "configuracoes",
      label: "Configurações",
      icon: <Settings className="h-5 w-5" />,
      count: 45,
      data: [
        { id: 1, parametro: "Timeout de Sessão", valor: "30 minutos", categoria: "Segurança", status: "Ativo" },
        { id: 2, parametro: "Intervalo de Atualização", valor: "5 segundos", categoria: "Sistema", status: "Ativo" },
        { id: 3, parametro: "Limite de Velocidade", valor: "80 km/h", categoria: "Monitoramento", status: "Ativo" },
        { id: 4, parametro: "Backup Automático", valor: "Diário às 02:00", categoria: "Sistema", status: "Ativo" },
        { id: 5, parametro: "Notificações Email", valor: "Habilitado", categoria: "Comunicação", status: "Ativo" },
      ]
    }
  ]

  const currentTabData = tabsData.find(tab => tab.id === activeTab)

  const renderTableHeaders = (tabId: string) => {
    switch (tabId) {
      case "usuarios":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Email</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Perfil</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "empresas":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">CNPJ</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Cidade</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "veiculos":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Placa</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Modelo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ano</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "locais":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Endereço</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Tipo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "configuracoes":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Parâmetro</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Valor</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Categoria</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      default:
        return null
    }
  }

  const renderTableCells = (item: any, tabId: string) => {
    switch (tabId) {
      case "usuarios":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.email}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.perfil}</TableCell>
            <TableCell>
              <Badge className={item.status === "Ativo" 
                ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              }>
                {item.status}
              </Badge>
            </TableCell>
          </>
        )
      case "empresas":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.cnpj}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.cidade}</TableCell>
            <TableCell>
              <Badge className={item.status === "Ativa" 
                ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              }>
                {item.status}
              </Badge>
            </TableCell>
          </>
        )
      case "veiculos":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.placa}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.modelo}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.ano}</TableCell>
            <TableCell>
              <Badge className={item.status === "Ativo" 
                ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                : item.status === "Manutenção"
                ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
                : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              }>
                {item.status}
              </Badge>
            </TableCell>
          </>
        )
      case "locais":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.endereco}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.tipo}</TableCell>
            <TableCell>
              <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">
                {item.status}
              </Badge>
            </TableCell>
          </>
        )
      case "configuracoes":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.parametro}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.valor}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.categoria}</TableCell>
            <TableCell>
              <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">
                {item.status}
              </Badge>
            </TableCell>
          </>
        )
      default:
        return null
    }
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

      {/* Main Content with Tabs - Seguindo o padrão da tela de equipes */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Cadastros do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <TabsList className="h-auto bg-transparent p-0 space-x-8">
                {tabsData.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-3 px-0 py-4 bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700 rounded-full min-w-[24px] h-6 flex items-center justify-center px-2"
                    >
                      {tab.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {tabsData.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-6">
                <div className="space-y-4">
                  {/* Action Bar */}
                  <div className="flex gap-3 items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm dark:bg-gray-800/80 dark:border-gray-700 overflow-x-auto">
                    <div className="flex gap-3 items-center flex-shrink-0">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                        <Input
                          placeholder={`Buscar ${tab.label.toLowerCase()}...`}
                          className="pl-10 w-64 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <Filter className="mr-2 h-4 w-4" />
                        Filtros
                      </Button>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white border-0 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Importar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar {tab.label.slice(0, -1)}
                      </Button>
                    </div>
                  </div>

                  {/* Data Table */}
                  <div className="border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200 dark:border-gray-700">
                          {renderTableHeaders(tab.id)}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tab.data.map((item) => (
                          <TableRow
                            key={item.id}
                            className="hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors border-gray-200 dark:border-gray-700"
                          >
                            {renderTableCells(item, tab.id)}
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Mostrando {tab.data.length} de {tab.count} registros
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="border-gray-200 text-gray-400 bg-transparent dark:border-gray-600 dark:text-gray-500"
                      >
                        Anterior
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-200 text-blue-600 bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:bg-blue-900/30"
                      >
                        1
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="border-gray-200 text-gray-400 bg-transparent dark:border-gray-600 dark:text-gray-500"
                      >
                        Próximo
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}