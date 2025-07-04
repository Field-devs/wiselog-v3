"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock data
const mockData = {
  companies: [
    { id: "1", name: "Empresa Principal" },
    { id: "2", name: "Filial Norte" },
    { id: "3", name: "Filial Sul" },
  ],
  monitoring: {
    connection: {
      online: { value: 85, color: "#3B82F6" }, // blue
      offline: { value: 15, color: "#F87171" }, // light red
    },
    gpsAccuracy: {
      good: { value: 70, color: "#3B82F6" }, // blue
      fair: { value: 20, color: "#3B82F6" }, // blue
      poor: { value: 10, color: "#F87171" }, // light red
    },
    battery: {
      high: { value: 60, color: "#3B82F6" }, // blue
      medium: { value: 30, color: "#3B82F6" }, // blue
      low: { value: 10, color: "#F87171" }, // light red
    },
    maxSpeeds: {
      safe: { value: 75, color: "#3B82F6" }, // blue
      warning: { value: 20, color: "#3B82F6" }, // blue
      danger: { value: 5, color: "#F87171" }, // light red
    },
  },
  tasks: {
    totalTasks: 247,
    dailyProductivity: 8.5,
    timeInTransit: 6.2,
    totalTimeInTransit: 45,
    plannedDisplacement: 1250,
  },
  presence: {
    onsite: { count: 45, percentage: 65 },
    base: { count: 18, percentage: 26 },
    offsite: { count: 6, percentage: 9 },
  },
  onlineUsers: 68,
  totalUsers: 89,
  recentActivities: [
    { id: 1, name: "João Silva", time: "14:30", location: "Cliente A", type: "onsite", color: "green" },
    { id: 2, name: "Maria Santos", time: "14:25", location: "Em Trânsito", type: "transit", color: "blue" },
    { id: 3, name: "Carlos Lima", time: "14:20", location: "Base", type: "base", color: "cyan" },
    { id: 4, name: "Ana Costa", time: "14:15", location: "Cliente B", type: "onsite", color: "green" },
    { id: 5, name: "Pedro Oliveira", time: "14:10", location: "Oficina", type: "maintenance", color: "orange" },
  ],
}

export default function HomePage() {
  const [selectedCompany, setSelectedCompany] = useState("1")
  const [activeTab, setActiveTab] = useState("monitoring")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const PieChart = ({ percentage, color, size = 120 }: { percentage: number; color: string; size?: number }) => {
    const radius = size / 2 - 10
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{percentage}%</span>
        </div>
      </div>
    )
  }

  const BarChart = ({ data, title }: { data: any; title: string }) => {
    const total = Object.values(data).reduce((sum: number, val: any) => sum + (val.value || val), 0)

    return (
      <div className="space-y-3">
        {Object.entries(data).map(([key, item]: [string, any]) => {
          const value = item.value || item
          const color = item.color || "#3B82F6"

          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="capitalize text-gray-600 dark:text-gray-400">{key}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{value}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-1000"
                  style={{
                    width: `${(value / total) * 100}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
            </div>
          )
        })}
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
              <BreadcrumbPage className="text-gray-900 dark:text-gray-100">Painel Principal</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center gap-4">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-48 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30">
              <SelectValue placeholder="Selecionar empresa" />
            </SelectTrigger>
            <SelectContent>
              {mockData.companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ThemeToggle />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monitoring and Tasks Tabs */}
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b border-gray-200 dark:border-gray-700">
                <TabsList className="h-auto bg-transparent p-0 space-x-8">
                  <TabsTrigger
                    value="monitoring"
                    className="flex items-center gap-3 px-0 py-4 bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                  >
                    <Activity className="h-5 w-5 ml-4" />
                    <span className="font-medium ml-4">Monitoramento</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="tasks"
                    className="flex items-center gap-3 px-0 py-4 bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400"
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span className="font-medium">Tarefas</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monitoring" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-4">Dados de Monitoramento</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={refreshData}
                      disabled={isLoading}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Wifi className="h-5 w-5 text-blue-500" />
                          Conexão
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <BarChart data={mockData.monitoring.connection} title="Conexão" />
                      </CardContent>
                    </Card>

                    <Card className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <MapPin className="h-5 w-5 text-emerald-500" />
                          Precisão GPS (m)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <BarChart data={mockData.monitoring.gpsAccuracy} title="GPS" />
                      </CardContent>
                    </Card>

                    <Card className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Battery className="h-5 w-5 text-green-500" />
                          Bateria (%)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <BarChart data={mockData.monitoring.battery} title="Bateria" />
                      </CardContent>
                    </Card>

                    <Card className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Gauge className="h-5 w-5 text-orange-500" />
                          Velocidades Máximas (Km/h)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <BarChart data={mockData.monitoring.maxSpeeds} title="Velocidade" />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tarefas Programadas</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={refreshData}
                      disabled={isLoading}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-teal-200 dark:border-teal-700">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                                TAREFAS PROGRAMADAS
                              </p>
                            </div>
                            <div className="text-4xl font-bold text-teal-600 dark:text-teal-400">
                              {mockData.tasks.totalTasks}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg backdrop-blur-sm">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            PRODUTIVIDADE DIÁRIA
                          </span>
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {mockData.tasks.dailyProductivity} <span className="text-sm">t/r</span>
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg backdrop-blur-sm">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            TEMPO EM TRÂNSITO
                          </span>
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {mockData.tasks.timeInTransit} <span className="text-sm">h</span>
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg backdrop-blur-sm">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            TEMPO EM TRÂNSITO/TOTAL
                          </span>
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {mockData.tasks.totalTimeInTransit} <span className="text-sm">%</span>
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-white/40 dark:bg-gray-800/40 rounded-lg backdrop-blur-sm">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            DESLOCAMENTO PLANEJADO
                          </span>
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {mockData.tasks.plannedDisplacement} <span className="text-sm">Km</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <Card className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                          <div className="text-center">
                            <TrendingUp className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                            <p className="text-gray-600 dark:text-gray-400">Gráfico de Tarefas por Grupo</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Presence Section */}
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Clock className="h-5 w-5 text-blue-500" />
                Presenças
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-4">
                  <PieChart percentage={mockData.presence.onsite.percentage} color="#10B981" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">OnSite</h3>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mt-2">
                      {mockData.presence.onsite.count}
                    </Badge>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <PieChart percentage={mockData.presence.base.percentage} color="#3B82F6" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Base</h3>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mt-2">
                      {mockData.presence.base.count}
                    </Badge>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <PieChart percentage={mockData.presence.offsite.percentage} color="#F87171" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">OffSite</h3>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 mt-2">
                      {mockData.presence.offsite.count}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Right Side */}
        <div className="space-y-6">
          {/* Online Users */}
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="text-blue-600 dark:text-blue-400 font-bold">{mockData.onlineUsers}</span>
                Usuários Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 ease-out rounded-full"
                    style={{
                      width: `${(mockData.onlineUsers / mockData.totalUsers) * 100}%`,
                      backgroundColor: "#3B82F6",
                    }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{mockData.onlineUsers} online</span>
                  <span>{Math.round((mockData.onlineUsers / mockData.totalUsers) * 100)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Map */}
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <MapPin className="h-5 w-5 text-emerald-500" />
                Localização
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg flex items-center justify-center border border-emerald-200 dark:border-emerald-700">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-2 text-emerald-500" />
                  <p className="text-gray-600 dark:text-gray-400">Mapa Interativo</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Localização dos usuários</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Activity className="h-5 w-5 text-purple-500" />
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
                  {mockData.recentActivities.slice(0, itemsPerPage).map((activity) => (
                    <TableRow key={activity.id} className="border-gray-200 dark:border-gray-700">
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">{activity.name}</TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-400">{activity.time}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            activity.color === "green"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : activity.color === "blue"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                : activity.color === "cyan"
                                  ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
                                  : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                          }`}
                        >
                          {activity.location}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Página {currentPage} de {Math.ceil(mockData.recentActivities.length / itemsPerPage)}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="bg-white/50 dark:bg-gray-800/50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage(
                        Math.min(Math.ceil(mockData.recentActivities.length / itemsPerPage), currentPage + 1),
                      )
                    }
                    disabled={currentPage === Math.ceil(mockData.recentActivities.length / itemsPerPage)}
                    className="bg-white/50 dark:bg-gray-800/50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
