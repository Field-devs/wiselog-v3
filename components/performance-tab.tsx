"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react"

interface PerformanceTabProps {
  filters: {
    operation: string
    company: string
    search: string
  }
}

export function PerformanceTab({ filters }: PerformanceTabProps) {
  const performanceMetrics = [
    {
      title: "Usuários Ativos",
      value: "89%",
      change: "+5%",
      trend: "up",
      description: "Usuários ativos nos últimos 7 dias",
    },
    {
      title: "Tempo Médio Online",
      value: "6.2h",
      change: "-0.3h",
      trend: "down",
      description: "Tempo médio de conexão diária",
    },
    {
      title: "Eficiência Operacional",
      value: "92%",
      change: "+2%",
      trend: "up",
      description: "Taxa de conclusão de tarefas",
    },
    {
      title: "Resposta Média",
      value: "2.1min",
      change: "-0.5min",
      trend: "up",
      description: "Tempo médio de resposta",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-gray-100">{metric.title}</CardTitle>
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-amber-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{metric.value}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge
                  variant={metric.trend === "up" ? "default" : "secondary"}
                  className={
                    metric.trend === "up"
                      ? "text-xs bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700"
                      : "text-xs bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
                  }
                >
                  {metric.change}
                </Badge>
                <span className="text-gray-500 dark:text-gray-400">vs. período anterior</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Activity className="h-5 w-5 text-blue-500" />
              Atividade por Hora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-sm w-12 text-gray-600 dark:text-gray-300">
                    {i.toString().padStart(2, "0")}:00
                  </span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 transition-all duration-300"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 w-12">
                    {Math.floor(Math.random() * 50)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Clock className="h-5 w-5 text-emerald-500" />
              Tempo de Resposta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-300">Excelente ({"< 1min"})</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 dark:bg-emerald-500 transition-all duration-300"
                      style={{ width: "75%" }}
                    />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-gray-100">75%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-300">Bom (1-3min)</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 dark:bg-blue-500 transition-all duration-300"
                      style={{ width: "20%" }}
                    />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-gray-100">20%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-300">Regular (3-5min)</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 dark:bg-amber-500 transition-all duration-300"
                      style={{ width: "4%" }}
                    />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-gray-100">4%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-300">Ruim ({"> 5min"})</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-400 dark:bg-rose-500 transition-all duration-300"
                      style={{ width: "1%" }}
                    />
                  </div>
                  <span className="text-sm text-gray-900 dark:text-gray-100">1%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
