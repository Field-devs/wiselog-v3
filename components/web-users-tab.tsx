"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Monitor, UserPlus, Download, Upload } from "lucide-react"
import { ColumnSelector, type ColumnConfig } from "./column-selector"
import { useColumnVisibility } from "../hooks/use-column-visibility"

interface WebUsersTabProps {
  filters: {
    operation: string
    company: string
    search: string
  }
}

const DEFAULT_COLUMNS: ColumnConfig[] = [
  { key: "user", label: "Usuário", visible: true, required: true },
  { key: "role", label: "Função", visible: true },
  { key: "lastAccess", label: "Último Acesso", visible: true },
  { key: "status", label: "Status", visible: true },
  { key: "permissions", label: "Permissões", visible: true },
  { key: "actions", label: "Ações", visible: true, required: true },
]

export function WebUsersTab({ filters }: WebUsersTabProps) {
  const { columns, handleColumnChange, isColumnVisible } = useColumnVisibility(DEFAULT_COLUMNS, "web-users-columns")

  const webUsers = [
    {
      id: "1",
      name: "Ana Costa",
      email: "ana.costa@empresa.com",
      role: "Administrador",
      lastAccess: "2024-01-15 15:30",
      status: "online",
      permissions: ["Usuários", "Relatórios", "Configurações"],
    },
    {
      id: "2",
      name: "Pedro Lima",
      email: "pedro.lima@empresa.com",
      role: "Operador",
      lastAccess: "2024-01-15 14:15",
      status: "offline",
      permissions: ["Monitoramento", "Relatórios"],
    },
  ]

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex justify-between items-center p-4 bg-slate-50/50 rounded-lg border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Monitor className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          <span className="font-medium text-gray-900 dark:text-gray-100">Usuários Web</span>
        </div>
        <div className="flex gap-2">
          <ColumnSelector columns={columns} onColumnChange={handleColumnChange} storageKey="web-users-columns" />
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
        </div>
      </div>

      {/* Web Users Table */}
      <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                {isColumnVisible("user") && <TableHead className="text-gray-700 dark:text-gray-300">Usuário</TableHead>}
                {isColumnVisible("role") && <TableHead className="text-gray-700 dark:text-gray-300">Função</TableHead>}
                {isColumnVisible("lastAccess") && (
                  <TableHead className="text-gray-700 dark:text-gray-300">Último Acesso</TableHead>
                )}
                {isColumnVisible("status") && (
                  <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                )}
                {isColumnVisible("permissions") && (
                  <TableHead className="text-gray-700 dark:text-gray-300">Permissões</TableHead>
                )}
                {isColumnVisible("actions") && (
                  <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {webUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  {isColumnVisible("user") && (
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=32&width=32&query=${user.name}`} />
                          <AvatarFallback className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                  )}
                  {isColumnVisible("role") && (
                    <TableCell className="text-gray-900 dark:text-gray-100">{user.role}</TableCell>
                  )}
                  {isColumnVisible("lastAccess") && (
                    <TableCell className="text-gray-900 dark:text-gray-100">{user.lastAccess}</TableCell>
                  )}
                  {isColumnVisible("status") && (
                    <TableCell>
                      <Badge
                        variant={user.status === "online" ? "default" : "secondary"}
                        className={
                          user.status === "online"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700"
                            : "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                  )}
                  {isColumnVisible("permissions") && (
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.map((permission) => (
                          <Badge
                            key={permission}
                            variant="outline"
                            className="text-xs bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600"
                          >
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  )}
                  {isColumnVisible("actions") && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
                      >
                        Editar
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
