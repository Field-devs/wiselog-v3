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
  PlusCircle,
  RotateCw,
  Target,
  Zap
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { GlassCard, AnimatedContainer } from "@/components/design-system"
import Link from "next/link"
import { EnhancedProgressBar } from "@/components/enhanced-progress-bar"

export default function HomePage() {
  const [selectedCompany, setSelectedCompany] = useState("1")
  const [activeTab, setActiveTab] = useState("monitoring")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [stats, setStats] = useState({
    onlineUsers: 0,
    totalUsers: 0,
    onSite: 0,
    offSite: 0,
    base: 0,
    totalTasks: 0,
    dailyProductivity: 0,
    timeInTransit: 0,
    transitPercentage: 0,
    plannedDistance: 0
  })
  
  // Simulate loading data
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setStats({
        onlineUsers: 216,
        totalUsers: 342,
        onSite: 124,
        offSite: 42,
        base: 50,
        totalTasks: 78,
        dailyProductivity: 4.5,
        timeInTransit: 3.2,
        transitPercentage: 65,
        plannedDistance: 1240
      })
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, name: "João Silva", hour: "14:30", location: "Av. Paulista", type: "map-marker", color: "emerald", description: "Check-in realizado" },
    { id: 2, name: "Maria Santos", hour: "14:15", location: "Matriz", type: "building", color: "blue", description: "Entrada registrada" },
    { id: 3, name: "Carlos Oliveira", hour: "13:45", location: "Cliente ABC", type: "user", color: "purple", description: "Visita iniciada" },
    { id: 4, name: "Ana Costa", hour: "13:30", location: "Rua Augusta", type: "map-marker", color: "emerald", description: "Check-in realizado" },
    { id: 5, name: "Pedro Lima", hour: "13:00", location: "Matriz", type: "building", color: "blue", description: "Saída registrada" },
    { id: 6, name: "Lucia Fernandes", hour: "12:45", location: "Cliente XYZ", type: "user", color: "purple", description: "Visita finalizada" },
    { id: 7, name: "Roberto Mendes", hour: "12:30", location: "Shopping Ibirapuera", type: "map-marker", color: "emerald", description: "Check-in realizado" },
  ]

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  // Calculate percentages for pie charts
  const onSitePercentage = Math.round((stats.onSite / (stats.onSite + stats.offSite + stats.base)) * 100) || 0
  const offSitePercentage = Math.round((stats.offSite / (stats.onSite + stats.offSite + stats.base)) * 100) || 0
  const basePercentage = Math.round((stats.base / (stats.onSite + stats.offSite + stats.base)) * 100) || 0
  const onlinePercentage = Math.round((stats.onlineUsers / stats.totalUsers) * 100) || 0

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
        <div className="flex items-center gap-4">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-[200px] bg-white dark:bg-gray-800">
              <SelectValue placeholder="Selecionar empresa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Empresa Principal</SelectItem>
              <SelectItem value="2">Filial São Paulo</SelectItem>
              <SelectItem value="3">Filial Rio de Janeiro</SelectItem>
            </SelectContent>
          </Select>
          <ThemeToggle />
        </div>
      </div>
      
      {/* Online Users Stats */}
      <AnimatedContainer delay={100} animation="fadeIn">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Usuários Online</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.onlineUsers}</h3>
              </div>
            </div>
            <div className="w-48">
              <EnhancedProgressBar value={onlinePercentage} size="md" color="blue" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{stats.onlineUsers} de {stats.totalUsers} usuários</p>
            </div>
          </div>
        </GlassCard>
      </AnimatedContainer>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatedContainer delay={200} animation="fadeIn">
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader className="pb-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="monitoring" onClick={refreshData} className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Monitoramento
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Tarefas
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="pt-4">
                <TabsContent value="monitoring" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      Dados de Monitoramento
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                          Atualizando...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Atualizar
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Connection Chart */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Wifi className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">Conexão</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Online</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 dark:bg-emerald-600" style={{ width: "72%" }}></div>
                              </div>
                              <span className="text-sm font-medium">72%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Offline</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-400 dark:bg-gray-500" style={{ width: "18%" }}></div>
                              </div>
                              <span className="text-sm font-medium">18%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Sem Sinal</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 dark:bg-amber-600" style={{ width: "10%" }}></div>
                              </div>
                              <span className="text-sm font-medium">10%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* GPS Precision Chart */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Target className="h-5 w-5 text-emerald-500" />
                        <span className="font-medium">Precisão GPS (m)</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">0-5m</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 dark:bg-emerald-600" style={{ width: "45%" }}></div>
                              </div>
                              <span className="text-sm font-medium">45%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">5-10m</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 dark:bg-blue-600" style={{ width: "30%" }}></div>
                              </div>
                              <span className="text-sm font-medium">30%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">10-20m</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 dark:bg-amber-600" style={{ width: "15%" }}></div>
                              </div>
                              <span className="text-sm font-medium">15%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">&gt;20m</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 dark:bg-red-600" style={{ width: "10%" }}></div>
                              </div>
                              <span className="text-sm font-medium">10%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Battery Chart */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Battery className="h-5 w-5 text-blue-500" />
                        <span className="font-medium">Bateria (%)</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">75-100%</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 dark:bg-emerald-600" style={{ width: "60%" }}></div>
                              </div>
                              <span className="text-sm font-medium">60%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">50-75%</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 dark:bg-blue-600" style={{ width: "25%" }}></div>
                              </div>
                              <span className="text-sm font-medium">25%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">25-50%</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 dark:bg-amber-600" style={{ width: "10%" }}></div>
                              </div>
                              <span className="text-sm font-medium">10%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">&lt;25%</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 dark:bg-red-600" style={{ width: "5%" }}></div>
                              </div>
                              <span className="text-sm font-medium">5%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Speed Chart */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Gauge className="h-5 w-5 text-purple-500" />
                        <span className="font-medium">Velocidades Máximas (Km/h)</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">0-40 Km/h</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 dark:bg-emerald-600" style={{ width: "35%" }}></div>
                              </div>
                              <span className="text-sm font-medium">35%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">40-60 Km/h</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 dark:bg-blue-600" style={{ width: "40%" }}></div>
                              </div>
                              <span className="text-sm font-medium">40%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">60-80 Km/h</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 dark:bg-amber-600" style={{ width: "20%" }}></div>
                              </div>
                              <span className="text-sm font-medium">20%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">&gt;80 Km/h</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 dark:bg-red-600" style={{ width: "5%" }}></div>
                              </div>
                              <span className="text-sm font-medium">5%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tasks" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Tarefas Programadas
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                          Atualizando...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Atualizar
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Task Stats */}
                    <div className="md:col-span-5 space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30 flex items-center justify-between">
                        <span className="text-lg text-gray-700 dark:text-gray-300 font-medium">TAREFAS PROGRAMADAS</span>
                        <span className="text-5xl font-bold text-blue-600 dark:text-blue-400">{stats.totalTasks}</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">PRODUTIVIDADE DIÁRIA</span>
                          <div className="flex items-end">
                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.dailyProductivity}</span>
                            <span className="text-sm text-blue-500 dark:text-blue-300 ml-1 mb-1">t/r</span>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">TEMPO EM TRÂNSITO</span>
                          <div className="flex items-end">
                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.timeInTransit}</span>
                            <span className="text-sm text-blue-500 dark:text-blue-300 ml-1 mb-1">h</span>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">TEMPO EM TRÂNSITO/TOTAL</span>
                          <div className="flex items-end">
                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.transitPercentage}</span>
                            <span className="text-sm text-blue-500 dark:text-blue-300 ml-1 mb-1">%</span>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">DESLOCAMENTO PLANEJADO</span>
                          <div className="flex items-end">
                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.plannedDistance}</span>
                            <span className="text-sm text-blue-500 dark:text-blue-300 ml-1 mb-1">Km</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Task Chart */}
                    <div className="md:col-span-7">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Tarefas por Grupo</h3>
                        <div className="flex-1 flex items-center justify-center">
                          <div className="w-full h-64 flex items-center justify-center">
                            <div className="relative w-48 h-48">
                              {/* Placeholder for pie chart */}
                              <div className="absolute inset-0 rounded-full border-8 border-blue-500 dark:border-blue-600 opacity-20"></div>
                              <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 dark:border-t-blue-600 animate-spin" style={{ animationDuration: '3s' }}></div>
                              <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">78</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">Iniciadas (45%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">Executadas (35%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">Não Executadas (20%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </AnimatedContainer>
          
          {/* Presence Stats */}
          <AnimatedContainer delay={300} animation="fadeIn">
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Presenças
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* OnSite */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="absolute inset-0 rounded-full border-8 border-emerald-100 dark:border-emerald-900/30"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-8 border-transparent border-t-emerald-500 dark:border-t-emerald-400"
                        style={{ 
                          transform: `rotate(${onSitePercentage * 3.6}deg)`,
                          transition: 'transform 1s ease-out'
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{onSitePercentage}%</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">OnSite</h3>
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700 text-base px-3 py-1">
                      {stats.onSite}
                    </Badge>
                  </div>
                  
                  {/* Base */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="absolute inset-0 rounded-full border-8 border-blue-100 dark:border-blue-900/30"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 dark:border-t-blue-400"
                        style={{ 
                          transform: `rotate(${basePercentage * 3.6}deg)`,
                          transition: 'transform 1s ease-out'
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{basePercentage}%</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Base</h3>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700 text-base px-3 py-1">
                      {stats.base}
                    </Badge>
                  </div>
                  
                  {/* OffSite */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="absolute inset-0 rounded-full border-8 border-purple-100 dark:border-purple-900/30"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-8 border-transparent border-t-purple-500 dark:border-t-purple-400"
                        style={{ 
                          transform: `rotate(${offSitePercentage * 3.6}deg)`,
                          transition: 'transform 1s ease-out'
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{offSitePercentage}%</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">OffSite</h3>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700 text-base px-3 py-1">
                      {stats.offSite}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
        
        {/* Right Column - Map and Activities */}
        <div className="space-y-6">
          {/* Map */}
          <AnimatedContainer delay={400} animation="fadeIn">
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Localização
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full h-[300px] bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex flex-col items-center justify-center">
                    <MapPin className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">Mapa de localização</p>
                  </div>
                  
                  {/* Sample Markers */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-emerald-500 rounded-full"></div>
                  
                  <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                  <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-blue-500 rounded-full"></div>
                  
                  <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
                  <div className="absolute top-3/4 left-1/4 w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
          
          {/* Recent Activities */}
          <AnimatedContainer delay={500} animation="fadeIn">
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Últimas Atividades
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableHead className="text-gray-700 dark:text-gray-300">Colab.</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Hora</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Local</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((activity) => (
                      <TableRow key={activity.id} className="border-gray-200 dark:border-gray-700">
                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">{activity.name}</TableCell>
                        <TableCell className="text-gray-900 dark:text-gray-100">{activity.hour}</TableCell>
                        <TableCell>
                          <Badge 
                            className={`
                              ${activity.color === 'emerald' ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700' : ''}
                              ${activity.color === 'blue' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700' : ''}
                              ${activity.color === 'purple' ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700' : ''}
                            `}
                          >
                            {activity.type === 'map-marker' && <MapPin className="h-3 w-3 mr-1" />}
                            {activity.type === 'building' && <Home className="h-3 w-3 mr-1" />}
                            {activity.type === 'user' && <Users className="h-3 w-3 mr-1" />}
                            {activity.location.length > 15 ? `${activity.location.substring(0, 15)}...` : activity.location}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {/* Pagination */}
                <div className="flex items-center justify-center p-4">
                  <div className="flex gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: Math.ceil(recentActivities.length / itemsPerPage) }).map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        className="h-8 w-8 p-0"
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(recentActivities.length / itemsPerPage)))}
                      disabled={currentPage === Math.ceil(recentActivities.length / itemsPerPage)}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  )
}