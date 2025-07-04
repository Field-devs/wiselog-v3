"use client"

import { useState } from "react"
import { UserCard } from "./user-card"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

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

interface UsersCardsViewProps {
  filters: {
    operation: string
    company: string
    search: string
  }
}

export function UsersCardsView({ filters }: UsersCardsViewProps) {
  const [users] = useState<MobileUser[]>([
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
    },
  ])

  const filteredUsers = users.filter((user) => {
    if (filters.search && !user.name.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const onlineCount = filteredUsers.filter((u) => u.connection === "online").length
  const offlineCount = filteredUsers.filter((u) => u.connection === "offline").length
  const activeCount = filteredUsers.filter((u) => u.status === "active").length

  return (
    <div className="space-y-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="h-12 w-12 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Nenhum usuário encontrado</h3>
          <p className="text-gray-500 dark:text-gray-400">Tente ajustar os filtros ou adicionar novos usuários.</p>
        </div>
      )}

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">Mostrando {filteredUsers.length} usuários</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="border-gray-200 dark:border-gray-600 bg-transparent"
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
              className="border-gray-200 dark:border-gray-600 bg-transparent"
            >
              Próximo
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
