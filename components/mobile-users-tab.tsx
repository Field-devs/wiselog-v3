"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  UserPlus,
  Download,
  Upload,
  MoreHorizontal,
  Edit,
  MessageCircle,
  RotateCcw,
  UserCheck,
  UserX,
  ChevronDown,
  ChevronRight,
  Settings,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Car,
  Clock,
  Star,
} from "lucide-react"

import { ViewToggle } from "./view-toggle"
import { UsersCardsView } from "./users-cards-view"
import { EnhancedProgressBar } from "./enhanced-progress-bar"
import { StatusIndicator } from "./status-indicator"
import { UserAvatar } from "./user-avatar"
import { ColumnSelector, type ColumnConfig } from "./column-selector"
import { useColumnVisibility } from "../hooks/use-column-visibility"

const DEFAULT_COLUMNS: ColumnConfig[] = [
  { key: "user", label: "Colaborador", visible: true, required: true },
  { key: "vehicle", label: "Veículo", visible: true },
  { key: "group", label: "Grupo", visible: true },
  { key: "operation", label: "Operação", visible: true },
  { key: "battery", label: "Bateria", visible: true },
  { key: "connection", label: "Conexão", visible: true },
  { key: "speed", label: "Velocidade", visible: true },
  { key: "location", label: "Localização", visible: true },
  { key: "gps", label: "GPS", visible: true },
  { key: "status", label: "Status", visible: true },
  { key: "actions", label: "Ações", visible: true, required: true },
]

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
  isExpanded?: boolean
  isLocked?: boolean
  operation?: boolean
}

interface MobileUsersTabProps {
  filters: {
    operation: string
    company: string
    search: string
  }
}

export function MobileUsersTab({ filters }: MobileUsersTabProps) {
  const [users, setUsers] = useState<MobileUser[]>([
    {
      id: "1",
      name: "João Silva",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      vehicle: "Honda Civic - ABC-1234",
      group: "Motoristas",
      battery: 85,
      connection: "online",
      speed: 45,
      location: "Av. Paulista, 1000",
      lastUpdate: "2024-01-15 14:30",
      gpsAccuracy: 5,
      status: "active",
      isLocked: false,
      operation: true,
      isExpanded: false,
    },
    {
      id: "2",
      name: "Maria Santos",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      vehicle: "Toyota Corolla - XYZ-5678",
      group: "Supervisores",
      battery: 23,
      connection: "offline",
      speed: 0,
      location: "Rua Augusta, 500",
      lastUpdate: "2024-01-15 12:15",
      gpsAccuracy: 12,
      status: "active",
      isLocked: false,
      operation: false,
      isExpanded: false,
    },
    {
      id: "3",
      name: "Carlos Oliveira",
      photo: "https://randomuser.me/api/portraits/men/56.jpg",
      vehicle: "N/A",
      group: "Técnicos",
      battery: 67,
      connection: "online",
      speed: 25,
      location: "Centro - São Paulo",
      lastUpdate: "2024-01-15 14:45",
      gpsAccuracy: 8,
      status: "inactive",
      isLocked: true,
      operation: true,
      isExpanded: false,
    },
    {
      id: "4",
      name: "Ana Costa",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      vehicle: "Volkswagen Gol - DEF-9012",
      group: "Motoristas",
      battery: 92,
      connection: "online",
      speed: 65,
      location: "Av. Faria Lima, 2000",
      lastUpdate: "2024-01-15 15:00",
      gpsAccuracy: 3,
      status: "active",
      isLocked: false,
      operation: true,
      isExpanded: false,
    },
    {
      id: "5",
      name: "Pedro Lima",
      photo: "https://randomuser.me/api/portraits/men/23.jpg",
      vehicle: "Ford Ka - GHI-3456",
      group: "Entregadores",
      battery: 45,
      connection: "online",
      speed: 30,
      location: "Rua Oscar Freire, 800",
      lastUpdate: "2024-01-15 14:55",
      gpsAccuracy: 7,
      status: "active",
      isLocked: false,
      operation: true,
      isExpanded: false,
    },
    {
      id: "6",
      name: "Lucia Fernandes",
      photo: "https://randomuser.me/api/portraits/women/35.jpg",
      vehicle: "Chevrolet Onix - JKL-7890",
      group: "Supervisores",
      battery: 78,
      connection: "offline",
      speed: 0,
      location: "Shopping Iguatemi",
      lastUpdate: "2024-01-15 13:20",
      gpsAccuracy: 15,
      status: "active",
      isLocked: false,
      operation: false,
      isExpanded: false,
    },
    {
      id: "7",
      name: "Roberto Mendes",
      photo: "https://randomuser.me/api/portraits/men/41.jpg",
      vehicle: "Fiat Uno - MNO-4567",
      group: "Motoristas",
      battery: 56,
      connection: "online",
      speed: 40,
      location: "Vila Madalena",
      lastUpdate: "2024-01-15 15:10",
      gpsAccuracy: 6,
      status: "active",
      isLocked: false,
      operation: true,
      isExpanded: false,
    },
    {
      id: "8",
      name: "Fernanda Alves",
      photo: "https://randomuser.me/api/portraits/women/29.jpg",
      vehicle: "Nissan March - PQR-8901",
      group: "Entregadores",
      battery: 89,
      connection: "online",
      speed: 35,
      location: "Itaim Bibi",
      lastUpdate: "2024-01-15 15:05",
      gpsAccuracy: 4,
      status: "active",
      isLocked: false,
      operation: true,
      isExpanded: false,
    },
  ])

  const [showUnregistered, setShowUnregistered] = useState(false)
  const [showInactive, setShowInactive] = useState(false)
  const [connectivityFilter, setConnectivityFilter] = useState({
    online: true,
    offline: true,
  })

  const [view, setView] = useState<"table" | "cards">("table")

  const { columns, handleColumnChange, isColumnVisible } = useColumnVisibility(DEFAULT_COLUMNS, "mobile-users-columns")

  const filteredUsers = users.filter((user) => {
    if (!showInactive && user.status === "inactive") return false
    if (!connectivityFilter.online && user.connection === "online") return false
    if (!connectivityFilter.offline && user.connection === "offline") return false
    if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const toggleUserExpansion = (userId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, isExpanded: !user.isExpanded } : user)))
  }

  const getSpeedColor = (speed: number) => {
    if (speed <= 60) return "text-slate-600 dark:text-slate-300"
    if (speed <= 120) return "text-amber-600 dark:text-amber-400"
    return "text-red-500 dark:text-red-400"
  }

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex gap-3 items-center justify-between p-4 bg-gray-25 rounded-lg border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700 overflow-x-auto">
        <div className="flex gap-3 items-center flex-shrink-0">
          <ViewToggle view={view} onViewChange={setView} />

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Conectividade:
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Filtros <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                <DropdownMenuItem
                  className="text-gray-900 dark:text-gray-100"
                  onClick={() => setConnectivityFilter({ ...connectivityFilter, online: !connectivityFilter.online })}
                >
                  <Wifi className="mr-2 h-4 w-4" />
                  Online {connectivityFilter.online && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-gray-900 dark:text-gray-100"
                  onClick={() => setConnectivityFilter({ ...connectivityFilter, offline: !connectivityFilter.offline })}
                >
                  <WifiOff className="mr-2 h-4 w-4" />
                  Offline {connectivityFilter.offline && "✓"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">Não registrados</span>
            <button
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                showUnregistered ? "bg-blue-400 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-600"
              }`}
              onClick={() => setShowUnregistered(!showUnregistered)}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  showUnregistered ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">Ver Inativos</span>
            <button
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                showInactive ? "bg-blue-400 dark:bg-blue-500" : "bg-gray-200 dark:bg-gray-600"
              }`}
              onClick={() => setShowInactive(!showInactive)}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  showInactive ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
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
            <UserPlus className="mr-2 h-4 w-4" />
            Adicionar Usuário
          </Button>
          <ColumnSelector columns={columns} onColumnChange={handleColumnChange} storageKey="mobile-users-columns" />
        </div>
      </div>

      {/* Content */}
      {view === "table" ? (
        <>
          {/* Users Table */}
          <div className="border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 dark:border-gray-700">
                  {isColumnVisible("user") && (
                    <TableHead className="text-gray-700 dark:text-gray-300">Colaborador</TableHead>
                  )}
                  {isColumnVisible("vehicle") && (
                    <TableHead className="text-gray-700 dark:text-gray-300">Veículo</TableHead>
                  )}
                  {isColumnVisible("group") && (
                    <TableHead className="text-gray-700 dark:text-gray-300">Grupo</TableHead>
                  )}
                  {isColumnVisible("operation") && (
                    <TableHead className="text-gray-700 dark:text-gray-300">Op.</TableHead>
                  )}
                  {isColumnVisible("battery") && (
                    <TableHead className="text-gray-700 dark:text-gray-300">Bateria</TableHead>
                  )}
                  {isColumnVisible("connection") && (
                    <TableHead className="text-gray-700 dark:text-gray-300">Conexão</TableHead>
                  )}
                  {isColumnVisible("speed") && (
                    <TableHead className="text-gray-700 dark:text-gray-300">Vel.Max</TableHead>
                  )}
                  {isColumnVisible("location") && (
                    <TableHead className="text-gray-700 dark:text-gray-300">Última Localização</TableHead>
                  )}
                  {isColumnVisible("gps") && <TableHead className="text-gray-700 dark:text-gray-300">GPS</TableHead>}
                  {isColumnVisible("status") && (
                    <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                  )}
                  {isColumnVisible("actions") && (
                    <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <>
                    <TableRow
                      key={user.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-gray-700/50 transition-colors border-gray-200 dark:border-gray-700"
                    >
                      {isColumnVisible("user") && (
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleUserExpansion(user.id)}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            >
                              {user.isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                              )}
                            </button>
                            <UserAvatar
                              name={user.name}
                              photo={user.photo}
                              size="md"
                              showOnlineStatus={true}
                              isOnline={user.connection === "online"}
                            />
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{user.lastUpdate}</div>
                            </div>
                          </div>
                        </TableCell>
                      )}
                      {isColumnVisible("vehicle") && (
                        <TableCell>
                          <div className="max-w-[200px] truncate text-gray-900 dark:text-gray-100" title={user.vehicle}>
                            {user.vehicle}
                          </div>
                        </TableCell>
                      )}
                      {isColumnVisible("group") && (
                        <TableCell className="text-gray-900 dark:text-gray-100">{user.group}</TableCell>
                      )}
                      {isColumnVisible("operation") && (
                        <TableCell>
                          <div className="flex items-center">
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
                        </TableCell>
                      )}
                      {isColumnVisible("battery") && (
                        <TableCell>
                          <EnhancedProgressBar value={user.battery} className="w-24" size="sm" showLabel={true} />
                        </TableCell>
                      )}
                      {isColumnVisible("connection") && (
                        <TableCell>
                          <Badge
                            variant={user.connection === "online" ? "default" : "secondary"}
                            className={
                              user.connection === "online"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700"
                                : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            }
                          >
                            {user.connection === "online" ? (
                              <Wifi className="mr-1 h-3 w-3" />
                            ) : (
                              <WifiOff className="mr-1 h-3 w-3" />
                            )}
                            {user.connection}
                          </Badge>
                        </TableCell>
                      )}
                      {isColumnVisible("speed") && (
                        <TableCell>
                          <span className={getSpeedColor(user.speed)}>{user.speed} Km/h</span>
                        </TableCell>
                      )}
                      {isColumnVisible("location") && (
                        <TableCell>
                          <div
                            className="max-w-[150px] truncate text-gray-900 dark:text-gray-100"
                            title={user.location}
                          >
                            <MapPin className="inline mr-1 h-3 w-3" />
                            {user.location}
                          </div>
                        </TableCell>
                      )}
                      {isColumnVisible("gps") && (
                        <TableCell className="text-gray-900 dark:text-gray-100">{user.gpsAccuracy} mts</TableCell>
                      )}
                      {isColumnVisible("status") && (
                        <TableCell>
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
                        </TableCell>
                      )}
                      {isColumnVisible("actions") && (
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                            >
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
                        </TableCell>
                      )}
                    </TableRow>

                    {/* Linha expandida com detalhes */}
                    {user.isExpanded && (
                      <TableRow key={`${user.id}-expanded`} className="border-gray-200 dark:border-gray-700">
                        <TableCell
                          colSpan={columns.filter((col) => col.visible).length}
                          className="bg-gray-800 dark:bg-gray-900 p-0"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                            {/* Left Column - User Information */}
                            <div className="p-6 border-r border-gray-700">
                              <div className="flex items-center gap-4 mb-6">
                                <UserAvatar name={user.name} photo={user.photo} size="xl" />
                                <div>
                                  <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                                  <p className="text-gray-400">{user.group}</p>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-300">
                                  <Phone className="h-4 w-4 text-gray-400" />
                                  <span>+1 (555) 123-4567</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                  <Mail className="h-4 w-4 text-gray-400" />
                                  <span>{user.name.toLowerCase().replace(" ", ".")}@empresa.com</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                  <CreditCard className="h-4 w-4 text-gray-400" />
                                  <span>ID: 123.456.789-00</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                  <Car className="h-4 w-4 text-gray-400" />
                                  <span>Registry: REG001</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  <span>Work Hours: 08:00 - 17:00</span>
                                </div>

                                <div className="flex items-center gap-3 text-gray-300">
                                  <Star className="h-4 w-4 text-amber-400" />
                                  <div className="flex items-center">
                                    <span className="text-amber-400">★★★★</span>
                                    <span className="text-gray-600">★</span>
                                    <span className="ml-1 text-gray-300">(4.8)</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Middle Column - Map */}
                            <div className="relative bg-gray-800 flex items-center justify-center">
                              <div className="w-full h-full min-h-[300px]">
                                {/* Map Placeholder */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center">
                                  <MapPin className="h-12 w-12 text-gray-600 mb-2" />
                                  <h4 className="text-gray-400 text-lg">Location Map</h4>
                                  <p className="text-gray-500">{user.location}</p>
                                </div>
                              </div>
                            </div>

                            {/* Right Column - Stats */}
                            <div className="p-6 space-y-8 border-l border-gray-700">
                              {/* Performance Stats */}
                              <div>
                                <h4 className="text-lg font-medium text-white mb-4">Performance Stats</h4>

                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Distance Today</span>
                                    <span className="text-white font-medium">127 km</span>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Active Time</span>
                                    <span className="text-white font-medium">6h 30m</span>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Avg Speed</span>
                                    <span className="text-white font-medium">52 km/h</span>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">GPS Accuracy</span>
                                    <span className="text-white font-medium">{user.gpsAccuracy}m</span>
                                  </div>
                                </div>
                              </div>

                              {/* Device Status */}
                              <div>
                                <h4 className="text-lg font-medium text-white mb-4">Device Status</h4>

                                <div className="space-y-4">
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-gray-400">Battery Level</span>
                                      <span className="text-white font-medium">{user.battery}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                      <div className="h-full bg-emerald-500" style={{ width: `${user.battery}%` }} />
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Connection</span>
                                    <span className="text-white font-medium">
                                      {user.connection === "online" ? "4g" : "offline"}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Current Speed</span>
                                    <span className="text-white font-medium">{user.speed} km/h</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Mostrando {filteredUsers.length} de {users.length} registros
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
        </>
      ) : (
        <UsersCardsView filters={filters} />
      )}
    </div>
  )
}
