"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
  Car, 
  Building, 
  MapPin, 
  Settings, 
  Plus, 
  Search, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  UserPlus,
  Zap
} from "lucide-react"

// Tipos de dados
interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  createdAt: string
}

interface Vehicle {
  id: string
  plate: string
  model: string
  brand: string
  year: number
  status: "active" | "maintenance" | "inactive"
  driver?: string
}

interface Company {
  id: string
  name: string
  cnpj: string
  address: string
  phone: string
  status: "active" | "inactive"
}

interface Location {
  id: string
  name: string
  address: string
  type: "base" | "client" | "warehouse"
  company: string
  coordinates?: string
}

export default function CadastrosPage() {
  const [activeTab, setActiveTab] = useState("users")
  const [searchTerm, setSearchTerm] = useState("")
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false)
  const [quickCreateType, setQuickCreateType] = useState<"user" | "vehicle" | "company" | "location">("user")

  // Estados dos modais
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false)
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  // Dados mock
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "João Silva", email: "joao@empresa.com", role: "Motorista", status: "active", createdAt: "2024-01-15" },
    { id: "2", name: "Maria Santos", email: "maria@empresa.com", role: "Supervisor", status: "active", createdAt: "2024-01-14" },
    { id: "3", name: "Carlos Lima", email: "carlos@empresa.com", role: "Técnico", status: "inactive", createdAt: "2024-01-13" },
  ])

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: "1", plate: "ABC-1234", model: "Civic", brand: "Honda", year: 2022, status: "active", driver: "João Silva" },
    { id: "2", plate: "XYZ-5678", model: "Corolla", brand: "Toyota", year: 2021, status: "maintenance" },
    { id: "3", plate: "DEF-9012", model: "Gol", brand: "Volkswagen", year: 2020, status: "active", driver: "Maria Santos" },
  ])

  const [companies, setCompanies] = useState<Company[]>([
    { id: "1", name: "Empresa Principal", cnpj: "12.345.678/0001-90", address: "Av. Paulista, 1000", phone: "(11) 1234-5678", status: "active" },
    { id: "2", name: "Filial Norte", cnpj: "12.345.678/0002-71", address: "Rua Augusta, 500", phone: "(11) 2345-6789", status: "active" },
  ])

  const [locations, setLocations] = useState<Location[]>([
    { id: "1", name: "Base Central", address: "Av. Paulista, 1000", type: "base", company: "Empresa Principal" },
    { id: "2", name: "Cliente A", address: "Rua Oscar Freire, 800", type: "client", company: "Empresa Principal" },
    { id: "3", name: "Depósito Sul", address: "Av. Faria Lima, 2000", type: "warehouse", company: "Filial Norte" },
  ])

  // Formulários
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    cpf: "",
    status: "active"
  })

  const [vehicleForm, setVehicleForm] = useState({
    plate: "",
    model: "",
    brand: "",
    year: new Date().getFullYear(),
    color: "",
    chassis: "",
    renavam: "",
    status: "active"
  })

  const [companyForm, setCompanyForm] = useState({
    name: "",
    cnpj: "",
    address: "",
    phone: "",
    email: "",
    contact: "",
    status: "active"
  })

  const [locationForm, setLocationForm] = useState({
    name: "",
    address: "",
    type: "base",
    company: "",
    coordinates: "",
    description: ""
  })

  const handleQuickCreate = (type: "user" | "vehicle" | "company" | "location") => {
    setQuickCreateType(type)
    setIsQuickCreateOpen(false)
    
    switch (type) {
      case "user":
        setIsUserModalOpen(true)
        break
      case "vehicle":
        setIsVehicleModalOpen(true)
        break
      case "company":
        setIsCompanyModalOpen(true)
        break
      case "location":
        setIsLocationModalOpen(true)
        break
    }
  }

  const resetForms = () => {
    setUserForm({ name: "", email: "", role: "", phone: "", cpf: "", status: "active" })
    setVehicleForm({ plate: "", model: "", brand: "", year: new Date().getFullYear(), color: "", chassis: "", renavam: "", status: "active" })
    setCompanyForm({ name: "", cnpj: "", address: "", phone: "", email: "", contact: "", status: "active" })
    setLocationForm({ name: "", address: "", type: "base", company: "", coordinates: "", description: "" })
  }

  const handleCreateUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userForm.name,
      email: userForm.email,
      role: userForm.role,
      status: userForm.status as "active" | "inactive",
      createdAt: new Date().toISOString().split('T')[0]
    }
    setUsers([...users, newUser])
    setIsUserModalOpen(false)
    resetForms()
  }

  const handleCreateVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      plate: vehicleForm.plate,
      model: vehicleForm.model,
      brand: vehicleForm.brand,
      year: vehicleForm.year,
      status: vehicleForm.status as "active" | "maintenance" | "inactive"
    }
    setVehicles([...vehicles, newVehicle])
    setIsVehicleModalOpen(false)
    resetForms()
  }

  const handleCreateCompany = () => {
    const newCompany: Company = {
      id: Date.now().toString(),
      name: companyForm.name,
      cnpj: companyForm.cnpj,
      address: companyForm.address,
      phone: companyForm.phone,
      status: companyForm.status as "active" | "inactive"
    }
    setCompanies([...companies, newCompany])
    setIsCompanyModalOpen(false)
    resetForms()
  }

  const handleCreateLocation = () => {
    const newLocation: Location = {
      id: Date.now().toString(),
      name: locationForm.name,
      address: locationForm.address,
      type: locationForm.type as "base" | "client" | "warehouse",
      company: locationForm.company
    }
    setLocations([...locations, newLocation])
    setIsLocationModalOpen(false)
    resetForms()
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
      inactive: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
      maintenance: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
    }
    
    const labels = {
      active: "Ativo",
      inactive: "Inativo", 
      maintenance: "Manutenção"
    }

    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const tabs = [
    { id: "users", label: "Usuários", icon: Users, count: users.length },
    { id: "vehicles", label: "Veículos", icon: Car, count: vehicles.length },
    { id: "companies", label: "Empresas", icon: Building, count: companies.length },
    { id: "locations", label: "Locais", icon: MapPin, count: locations.length },
  ]

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
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Gerenciamento de Cadastros
              </CardTitle>
            </div>
            <div className="flex items-center gap-3">
              {/* Botão de Criação Rápida */}
              <DropdownMenu open={isQuickCreateOpen} onOpenChange={setIsQuickCreateOpen}>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
                    <Zap className="mr-2 h-4 w-4" />
                    Criação Rápida
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                  <DropdownMenuItem 
                    onClick={() => handleQuickCreate("user")}
                    className="text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Novo Usuário
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleQuickCreate("vehicle")}
                    className="text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    <Car className="mr-2 h-4 w-4" />
                    Novo Veículo
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleQuickCreate("company")}
                    className="text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Nova Empresa
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleQuickCreate("location")}
                    className="text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Novo Local
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-0 py-4 border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600 dark:text-blue-400"
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {tab.count}
                    </Badge>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-gray-800/50"
              />
            </div>
            <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          {/* Content Tables */}
          {activeTab === "users" && (
            <div className="border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === "vehicles" && (
            <div className="border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Placa</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Ano</TableHead>
                    <TableHead>Motorista</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.plate}</TableCell>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.brand}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>{vehicle.driver || "-"}</TableCell>
                      <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === "companies" && (
            <div className="border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.cnpj}</TableCell>
                      <TableCell>{company.address}</TableCell>
                      <TableCell>{company.phone}</TableCell>
                      <TableCell>{getStatusBadge(company.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === "locations" && (
            <div className="border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell className="font-medium">{location.name}</TableCell>
                      <TableCell>{location.address}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {location.type === "base" ? "Base" : location.type === "client" ? "Cliente" : "Depósito"}
                        </Badge>
                      </TableCell>
                      <TableCell>{location.company}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Usuário */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Novo Usuário
            </DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo usuário no sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">Nome completo</Label>
                <Input
                  id="user-name"
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  placeholder="João Silva"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  placeholder="joao@empresa.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-role">Função</Label>
                <Select value={userForm.role} onValueChange={(value) => setUserForm({...userForm, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motorista">Motorista</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="tecnico">Técnico</SelectItem>
                    <SelectItem value="administrador">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-phone">Telefone</Label>
                <Input
                  id="user-phone"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="user-cpf">CPF</Label>
                <Input
                  id="user-cpf"
                  value={userForm.cpf}
                  onChange={(e) => setUserForm({...userForm, cpf: e.target.value})}
                  placeholder="123.456.789-00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-status">Status</Label>
                <Select value={userForm.status} onValueChange={(value) => setUserForm({...userForm, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateUser} className="bg-blue-500 hover:bg-blue-600">
              <UserPlus className="mr-2 h-4 w-4" />
              Criar Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Veículo */}
      <Dialog open={isVehicleModalOpen} onOpenChange={setIsVehicleModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-500" />
              Novo Veículo
            </DialogTitle>
            <DialogDescription>
              Preencha os dados para cadastrar um novo veículo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-plate">Placa</Label>
                <Input
                  id="vehicle-plate"
                  value={vehicleForm.plate}
                  onChange={(e) => setVehicleForm({...vehicleForm, plate: e.target.value})}
                  placeholder="ABC-1234"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-brand">Marca</Label>
                <Input
                  id="vehicle-brand"
                  value={vehicleForm.brand}
                  onChange={(e) => setVehicleForm({...vehicleForm, brand: e.target.value})}
                  placeholder="Honda"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-model">Modelo</Label>
                <Input
                  id="vehicle-model"
                  value={vehicleForm.model}
                  onChange={(e) => setVehicleForm({...vehicleForm, model: e.target.value})}
                  placeholder="Civic"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-year">Ano</Label>
                <Input
                  id="vehicle-year"
                  type="number"
                  value={vehicleForm.year}
                  onChange={(e) => setVehicleForm({...vehicleForm, year: parseInt(e.target.value)})}
                  placeholder="2024"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-color">Cor</Label>
                <Input
                  id="vehicle-color"
                  value={vehicleForm.color}
                  onChange={(e) => setVehicleForm({...vehicleForm, color: e.target.value})}
                  placeholder="Branco"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-status">Status</Label>
                <Select value={vehicleForm.status} onValueChange={(value) => setVehicleForm({...vehicleForm, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="maintenance">Manutenção</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-chassis">Chassi</Label>
                <Input
                  id="vehicle-chassis"
                  value={vehicleForm.chassis}
                  onChange={(e) => setVehicleForm({...vehicleForm, chassis: e.target.value})}
                  placeholder="9BWZZZ377VT004251"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-renavam">RENAVAM</Label>
                <Input
                  id="vehicle-renavam"
                  value={vehicleForm.renavam}
                  onChange={(e) => setVehicleForm({...vehicleForm, renavam: e.target.value})}
                  placeholder="12345678901"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVehicleModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateVehicle} className="bg-blue-500 hover:bg-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Criar Veículo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Empresa */}
      <Dialog open={isCompanyModalOpen} onOpenChange={setIsCompanyModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-500" />
              Nova Empresa
            </DialogTitle>
            <DialogDescription>
              Preencha os dados para cadastrar uma nova empresa.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da empresa</Label>
              <Input
                id="company-name"
                value={companyForm.name}
                onChange={(e) => setCompanyForm({...companyForm, name: e.target.value})}
                placeholder="Empresa Exemplo Ltda"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-cnpj">CNPJ</Label>
                <Input
                  id="company-cnpj"
                  value={companyForm.cnpj}
                  onChange={(e) => setCompanyForm({...companyForm, cnpj: e.target.value})}
                  placeholder="12.345.678/0001-90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-phone">Telefone</Label>
                <Input
                  id="company-phone"
                  value={companyForm.phone}
                  onChange={(e) => setCompanyForm({...companyForm, phone: e.target.value})}
                  placeholder="(11) 1234-5678"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-address">Endereço</Label>
              <Input
                id="company-address"
                value={companyForm.address}
                onChange={(e) => setCompanyForm({...companyForm, address: e.target.value})}
                placeholder="Av. Paulista, 1000 - São Paulo, SP"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-email">Email</Label>
                <Input
                  id="company-email"
                  type="email"
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({...companyForm, email: e.target.value})}
                  placeholder="contato@empresa.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-contact">Contato</Label>
                <Input
                  id="company-contact"
                  value={companyForm.contact}
                  onChange={(e) => setCompanyForm({...companyForm, contact: e.target.value})}
                  placeholder="João Silva"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-status">Status</Label>
              <Select value={companyForm.status} onValueChange={(value) => setCompanyForm({...companyForm, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCompanyModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateCompany} className="bg-blue-500 hover:bg-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Criar Empresa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Local */}
      <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Novo Local
            </DialogTitle>
            <DialogDescription>
              Preencha os dados para cadastrar um novo local.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="location-name">Nome do local</Label>
              <Input
                id="location-name"
                value={locationForm.name}
                onChange={(e) => setLocationForm({...locationForm, name: e.target.value})}
                placeholder="Base Central"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-address">Endereço</Label>
              <Input
                id="location-address"
                value={locationForm.address}
                onChange={(e) => setLocationForm({...locationForm, address: e.target.value})}
                placeholder="Av. Paulista, 1000 - São Paulo, SP"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location-type">Tipo</Label>
                <Select value={locationForm.type} onValueChange={(value) => setLocationForm({...locationForm, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="client">Cliente</SelectItem>
                    <SelectItem value="warehouse">Depósito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location-company">Empresa</Label>
                <Select value={locationForm.company} onValueChange={(value) => setLocationForm({...locationForm, company: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.name}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-coordinates">Coordenadas (opcional)</Label>
              <Input
                id="location-coordinates"
                value={locationForm.coordinates}
                onChange={(e) => setLocationForm({...locationForm, coordinates: e.target.value})}
                placeholder="-23.5505, -46.6333"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location-description">Descrição (opcional)</Label>
              <Textarea
                id="location-description"
                value={locationForm.description}
                onChange={(e) => setLocationForm({...locationForm, description: e.target.value})}
                placeholder="Descrição adicional do local..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLocationModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateLocation} className="bg-blue-500 hover:bg-blue-600">
              <Plus className="mr-2 h-4 w-4" />
              Criar Local
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}