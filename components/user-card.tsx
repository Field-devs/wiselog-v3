"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Edit,
  MessageCircle,
  RotateCcw,
  UserCheck,
  UserX,
  Settings,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  MapPin,
  Gauge,
  Car,
  Battery,
  Zap,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react"

import { EnhancedProgressBar } from "./enhanced-progress-bar"
import { StatusIndicator } from "./status-indicator"
import { UserAvatar } from "./user-avatar"

interface MobileUser {
  id: string
  name: string
  photo?: string
  vehicle: string
  group: string
  battery: number
  connection: "online" | "offline"
  speed: number
  location: string
  lastUpdate: string
  gpsAccuracy: number
  status: "active" | "inactive"
  isLocked?: boolean
  operation?: boolean
}

interface UserCardProps {
  user: MobileUser
}

export function UserCard({ user }: UserCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getSpeedColor = (speed: number) => {
    if (speed <= 60) return "text-slate-600 dark:text-slate-300"
    if (speed <= 120) return "text-amber-600 dark:text-amber-400"
    return "text-red-500 dark:text-red-400"
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar
              name={user.name}
              photo={user.photo}
              size="lg"
              showOnlineStatus={true}
              isOnline={user.connection === "online"}
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{user.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.group}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
              <DropdownMenuItem className="text-gray-900 dark:text-gray-100">
                <RotateCcw className="mr-2 h-4 w-4" />
                Resetar Senha
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 dark:text-gray-100">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 dark:text-gray-100">
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 dark:text-gray-100">
                {user.status === "active" ? (
                  <>
                    <UserX className="mr-2 h-4 w-4" />
                    Desativar
                  </>
                ) : (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Reativar
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 dark:text-gray-100">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-900 dark:text-gray-100">
                {user.isLocked ? (
                  <>
                    <Unlock className="mr-2 h-4 w-4" />
                    Desbloquear
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Bloquear
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge
            className={
              user.status === "active"
                ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
            }
          >
            <StatusIndicator status={user.status} size="sm" showLabel={false} />
            <span className="ml-1">{user.status === "active" ? "Ativo" : "Inativo"}</span>
          </Badge>

          <Badge
            className={
              user.connection === "online"
                ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700"
                : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            }
          >
            {user.connection === "online" ? <Wifi className="mr-1 h-3 w-3" /> : <WifiOff className="mr-1 h-3 w-3" />}
            {user.connection}
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Battery className="h-4 w-4" />
              <span>Bateria</span>
            </div>
            <EnhancedProgressBar value={user.battery} size="md" showLabel={true} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Zap className="h-4 w-4" />
              <span>Velocidade</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-semibold ${getSpeedColor(user.speed)}`}>{user.speed}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Km/h</span>
            </div>
          </div>
        </div>

        {/* Vehicle & Location */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Car className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 dark:text-gray-100 truncate" title={user.vehicle}>
              {user.vehicle}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 dark:text-gray-100 truncate" title={user.location}>
              {user.location}
            </span>
          </div>
        </div>

        {/* Operation Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-300">Em Operação</span>
          <button
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
              user.operation ? "bg-blue-400 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                user.operation ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Expandable Details Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleExpanded}
          className="w-full justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {isExpanded ? (
            <>
              Menos detalhes <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Mais detalhes <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        {/* Expandable Details Content */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200">
            {/* GPS and Last Update */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">GPS:</span>
                <p className="text-gray-900 dark:text-gray-100 mt-1">{user.gpsAccuracy} mts</p>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 font-medium">Última atualização:</span>
                <p className="text-gray-900 dark:text-gray-100 mt-1">{user.lastUpdate}</p>
              </div>
            </div>

            {/* Mini visualizations */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-100 dark:border-blue-800 p-3 text-center">
                <MapPin className="h-6 w-6 mx-auto mb-1 text-blue-500" />
                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">Localização</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg border border-emerald-100 dark:border-emerald-800 p-3 text-center">
                <Gauge className="h-6 w-6 mx-auto mb-1 text-emerald-500" />
                <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Performance</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">Telefone:</span>
                </div>
                <span className="text-gray-900 dark:text-gray-100 font-medium">(11) 99999-9999</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">E-mail:</span>
                </div>
                <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[150px]">
                  {user.name.toLowerCase().replace(" ", ".")}@empresa.com
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">CPF:</span>
                </div>
                <span className="text-gray-900 dark:text-gray-100 font-medium">123.456.789-00</span>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Phone className="mr-2 h-4 w-4" />
                Ligar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
