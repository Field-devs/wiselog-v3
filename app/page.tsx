"use client"

import { useState, useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import {
  Home,
  Users,
  Activity, 
  TrendingUp,
  Wifi,
  Battery,
  Gauge,
  MapPin,
  Clock,
  RefreshCw,
  ChevronLeft,
  ChevronRight, 
  Database,
  Settings,
  FileText,
  Truck,
  DollarSign,
  Briefcase,
  ShoppingBag,
  BarChart3,
  Calendar,
  PlusCircle
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { GlassCard, AnimatedContainer } from "@/components/design-system"
import Link from "next/link"

// Mock data (inalterado)
const mockData = { /* ... o mesmo conteúdo mock que você já possui ... */ }

export default function HomePage() {
  const [selectedCompany, setSelectedCompany] = useState("1")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [stats, setStats] = useState({
    activeUsers: 0,
    pendingTasks: 0,
    completedTasks: 0,
    totalRevenue: 0
  })
  
  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        activeUsers: 216,
        pendingTasks: 18,
        completedTasks: 342,
        totalRevenue: 28750
      })
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ThemeToggle />
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedContainer delay={100} animation="fadeIn">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Usuários Ativos</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</h3>
              </div>
            </div>
          </GlassCard>
        </AnimatedContainer>
        
        <AnimatedContainer delay={200} animation="fadeIn">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tarefas Pendentes</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pendingTasks}</h3>
              </div>
            </div>
          </GlassCard>
        </AnimatedContainer>
        
        <AnimatedContainer delay={300} animation="fadeIn">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tarefas Concluídas</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completedTasks}</h3>
              </div>
            </div>
          </GlassCard>
        </AnimatedContainer>
        
        <AnimatedContainer delay={400} animation="fadeIn">
          <GlassCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Receita Total</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">R$ {stats.totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </GlassCard>
        </AnimatedContainer>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Access */}
        <AnimatedContainer delay={500} animation="fadeIn" className="lg:col-span-2">
          <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                Acesso Rápido
              </CardTitle>
              <CardDescription>Módulos mais utilizados do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Link href="/cadastros" className="group">
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 hover:shadow-md">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                      <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Cadastros</span>
                  </div>
                </Link>
                
                <Link href="/teams" className="group">
                  <div className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-200 hover:shadow-md">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
                      <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">Equipes</span>
                  </div>
                </Link>
                
                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200 hover:shadow-md group">
                  <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                    <Truck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Operacional</span>
                </div>
                
                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-200 dark:hover:border-amber-800 transition-all duration-200 hover:shadow-md group">
                  <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50 transition-colors">
                    <DollarSign className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Financeiro</span>
                </div>
                
                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:border-rose-200 dark:hover:border-rose-800 transition-all duration-200 hover:shadow-md group">
                  <div className="h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center group-hover:bg-rose-200 dark:group-hover:bg-rose-800/50 transition-colors">
                    <Briefcase className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Comercial</span>
                </div>
                
                <div className="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 hover:shadow-md group">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                    <Settings className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Configurações</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
        
        {/* Recent Activity */}
        <AnimatedContainer delay={600} animation="fadeIn">
          <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Atividades Recentes
              </CardTitle>
              <CardDescription>Últimas ações no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <PlusCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Novo cadastro criado</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Veículo ABC-1234 adicionado</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Há 10 minutos</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Usuário atualizado</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">João Silva - Permissões modificadas</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Há 25 minutos</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Relatório gerado</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Relatório mensal de operações</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Há 2 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                    <Settings className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Configuração alterada</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Parâmetros do sistema atualizados</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Há 1 dia</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </div>
      
      {/* Calendar and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <AnimatedContainer delay={700} animation="fadeIn" className="lg:col-span-2">
          <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Calendário de Eventos
              </CardTitle>
              <CardDescription>Próximos eventos e compromissos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border border-blue-100 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Reunião de Planejamento</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sala de Conferência</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-100">Hoje</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">14:00 - 15:30</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Entrega Programada</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Cliente XYZ</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-100">Amanhã</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">09:00 - 11:00</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Apresentação de Resultados</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Auditório Principal</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-gray-100">Quinta-feira</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">15:00 - 16:30</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
        
        {/* Tasks */}
        <AnimatedContainer delay={800} animation="fadeIn">
          <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Tarefas Pendentes
              </CardTitle>
              <CardDescription>Suas tarefas para hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex-shrink-0">
                    <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-gray-100">Revisar relatório mensal</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Prioridade alta</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex-shrink-0">
                    <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-gray-100">Atualizar cadastro de clientes</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Prioridade média</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex-shrink-0">
                    <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-gray-100">Agendar reunião com fornecedores</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Prioridade baixa</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex-shrink-0">
                    <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-gray-100">Preparar apresentação trimestral</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Prioridade alta</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </div>
    </div>
  )
}
