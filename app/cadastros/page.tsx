"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
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
  Car,
  Building2,
  Users,
  FileText,
  Package,
  Warehouse,
  AlertTriangle,
  QrCode,
  UserCheck,
  DollarSign,
  Receipt,
  Calculator,
  Briefcase,
  MapPin,
  MessageSquare,
  UserPlus,
  Award,
  Folder,
  Star,
  ClipboardList,
  ShoppingCart,
  PieChart,
  Handshake,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Settings,
  RotateCcw,
} from "lucide-react"

export default function CadastrosPage() {
  const [activeTab, setActiveTab] = useState("veiculos")
  const [showInactive, setShowInactive] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [visibleCadastros, setVisibleCadastros] = useState<string[]>(
    ["veiculos", "unidades", "clientes", "contratos", "produtos", "estoques", "ocorrencias", "itens", "prestadores", "tarifas", "despesasExtras", "taxas", "tarifasUnidade", "tarifasServico", "setoresTarifarios", "motivos", "grupos", "habilidades", "categorias", "avaliacoes", "formularios", "acordosCompra", "segmentosContabeis", "relacionamentoComercial"]
  )

  // Função para alternar visibilidade de um cadastro
  const toggleCadastroVisibility = (cadastroId: string) => {
    setVisibleCadastros(prev => 
      prev.includes(cadastroId) 
        ? prev.filter(id => id !== cadastroId)
        : [...prev, cadastroId]
    )
  }

  // Função para mostrar todos os cadastros
  const showAllCadastros = () => {
    setVisibleCadastros(["veiculos", "unidades", "clientes", "contratos", "produtos", "estoques", "ocorrencias", "itens", "prestadores", "tarifas", "despesasExtras", "taxas", "tarifasUnidade", "tarifasServico", "setoresTarifarios", "motivos", "grupos", "habilidades", "categorias", "avaliacoes", "formularios", "acordosCompra", "segmentosContabeis", "relacionamentoComercial"])
  }

  // Função para ocultar todos os cadastros
  const hideAllCadastros = () => {
    setVisibleCadastros([])
  }

  // Função para resetar para padrão (todos visíveis)
  const resetToDefault = () => {
    setVisibleCadastros(["veiculos", "unidades", "clientes", "contratos", "produtos", "estoques", "ocorrencias", "itens", "prestadores", "tarifas", "despesasExtras", "taxas", "tarifasUnidade", "tarifasServico", "setoresTarifarios", "motivos", "grupos", "habilidades", "categorias", "avaliacoes", "formularios", "acordosCompra", "segmentosContabeis", "relacionamentoComercial"])
  }

  const tabsData = [
    {
      id: "veiculos",
      label: "Veículos",
      icon: <Car className="h-5 w-5" />,
      count: 89,
      data: [
        { id: 1, nome: "Caminhão Mercedes", tipo: "Caminhão", placa: "ABC-1234", motorista: "João Silva", peso: "15t", volume: "45m³", status: "Ativo" },
        { id: 2, nome: "Van Iveco", tipo: "Van", placa: "XYZ-5678", motorista: "Maria Santos", peso: "3.5t", volume: "12m³", status: "Ativo" },
        { id: 3, nome: "Carreta Scania", tipo: "Carreta", placa: "DEF-9012", motorista: "Carlos Lima", peso: "25t", volume: "80m³", status: "Manutenção" },
        { id: 4, nome: "Utilitário Ford", tipo: "Utilitário", placa: "GHI-3456", motorista: "Ana Costa", peso: "1.5t", volume: "8m³", status: "Ativo" },
        { id: 5, nome: "Truck Volvo", tipo: "Truck", placa: "JKL-7890", motorista: "Pedro Oliveira", peso: "18t", volume: "55m³", status: "Inativo" },
      ]
    },
    {
      id: "unidades",
      label: "Unidades",
      icon: <Building2 className="h-5 w-5" />,
      count: 15,
      data: [
        { id: 1, nome: "Unidade São Paulo", empresa: "Matriz", intercompanhia: "Sim", status: "Ativa" },
        { id: 2, nome: "Unidade Rio de Janeiro", empresa: "Filial RJ", intercompanhia: "Não", status: "Ativa" },
        { id: 3, nome: "Unidade Belo Horizonte", empresa: "Filial MG", intercompanhia: "Sim", status: "Ativa" },
        { id: 4, nome: "Unidade Salvador", empresa: "Filial BA", intercompanhia: "Não", status: "Ativa" },
        { id: 5, nome: "Unidade Recife", empresa: "Filial PE", intercompanhia: "Sim", status: "Inativa" },
      ]
    },
    {
      id: "clientes",
      label: "Clientes",
      icon: <Users className="h-5 w-5" />,
      count: 234,
      data: [
        { id: 1, nome: "Cliente ABC Ltda", cnpj: "12.345.678/0001-90", endereco: "Av. Paulista, 1000", telefone: "(11) 99999-9999", contrato: "CT001", janelas: "08:00-18:00", status: "Ativo" },
        { id: 2, nome: "Empresa XYZ S.A.", cnpj: "98.765.432/0001-10", endereco: "Rua Augusta, 500", telefone: "(11) 88888-8888", contrato: "CT002", janelas: "09:00-17:00", status: "Ativo" },
        { id: 3, nome: "Indústria DEF", cnpj: "11.222.333/0001-44", endereco: "Rod. Anhanguera, Km 25", telefone: "(11) 77777-7777", contrato: "CT003", janelas: "06:00-22:00", status: "Ativo" },
        { id: 4, nome: "Comércio GHI", cnpj: "55.666.777/0001-88", endereco: "Av. Faria Lima, 2000", telefone: "(11) 66666-6666", contrato: "CT004", janelas: "10:00-16:00", status: "Ativo" },
        { id: 5, nome: "Serviços JKL", cnpj: "99.888.777/0001-66", endereco: "Rua Oscar Freire, 800", telefone: "(11) 55555-5555", contrato: "CT005", janelas: "08:00-20:00", status: "Inativo" },
      ]
    },
    {
      id: "contratos",
      label: "Contratos",
      icon: <FileText className="h-5 w-5" />,
      count: 45,
      data: [
        { id: 1, nome: "Contrato Logística ABC", unidade: "São Paulo", usuarios: "João, Maria", inventario: "Sim", retornaveis: "Não", status: "Ativo" },
        { id: 2, nome: "Contrato Distribuição XYZ", unidade: "Rio de Janeiro", usuarios: "Carlos, Ana", inventario: "Não", retornaveis: "Sim", status: "Ativo" },
        { id: 3, nome: "Contrato Transporte DEF", unidade: "Belo Horizonte", usuarios: "Pedro, Lucia", inventario: "Sim", retornaveis: "Sim", status: "Ativo" },
        { id: 4, nome: "Contrato Express GHI", unidade: "Salvador", usuarios: "Roberto, Fernanda", inventario: "Não", retornaveis: "Não", status: "Ativo" },
        { id: 5, nome: "Contrato Premium JKL", unidade: "Recife", usuarios: "Marcos, Julia", inventario: "Sim", retornaveis: "Sim", status: "Inativo" },
      ]
    },
    {
      id: "produtos",
      label: "Produtos",
      icon: <Package className="h-5 w-5" />,
      count: 567,
      data: [
        { id: 1, nome: "Produto A", sku: "SKU001", unidadeMedida: "UN", status: "Ativo" },
        { id: 2, nome: "Produto B", sku: "SKU002", unidadeMedida: "KG", status: "Ativo" },
        { id: 3, nome: "Produto C", sku: "SKU003", unidadeMedida: "LT", status: "Ativo" },
        { id: 4, nome: "Produto D", sku: "SKU004", unidadeMedida: "M", status: "Ativo" },
        { id: 5, nome: "Produto E", sku: "SKU005", unidadeMedida: "CX", status: "Inativo" },
      ]
    },
    {
      id: "estoques",
      label: "Estoques",
      icon: <Warehouse className="h-5 w-5" />,
      count: 1234,
      data: [
        { id: 1, produto: "Produto A", quantidade: 150, local: "Depósito Central", status: "Disponível" },
        { id: 2, produto: "Produto B", quantidade: 75, local: "Depósito Norte", status: "Disponível" },
        { id: 3, produto: "Produto C", quantidade: 0, local: "Depósito Sul", status: "Esgotado" },
        { id: 4, produto: "Produto D", quantidade: 200, local: "Depósito Leste", status: "Disponível" },
        { id: 5, produto: "Produto E", quantidade: 50, local: "Depósito Oeste", status: "Baixo" },
      ]
    },
    {
      id: "ocorrencias",
      label: "Ocorrências",
      icon: <AlertTriangle className="h-5 w-5" />,
      count: 89,
      data: [
        { id: 1, descricao: "Atraso na entrega", contratoVinculado: "CT001", tipoTarefa: "Entrega", status: "Aberta" },
        { id: 2, descricao: "Produto danificado", contratoVinculado: "CT002", tipoTarefa: "Coleta", status: "Em análise" },
        { id: 3, descricao: "Endereço não localizado", contratoVinculado: "CT003", tipoTarefa: "Entrega", status: "Resolvida" },
        { id: 4, descricao: "Cliente ausente", contratoVinculado: "CT004", tipoTarefa: "Entrega", status: "Aberta" },
        { id: 5, descricao: "Veículo quebrado", contratoVinculado: "CT005", tipoTarefa: "Transporte", status: "Fechada" },
      ]
    },
    {
      id: "itens",
      label: "Itens",
      icon: <QrCode className="h-5 w-5" />,
      count: 2345,
      data: [
        { id: 1, nome: "Item Ativo A", cliente: "Cliente ABC", qrcode: "QR001", localizacao: "Setor A1", descricao: "Equipamento industrial", valor: "R$ 15.000", statusOracle: "Ativo" },
        { id: 2, nome: "Item Passageiro B", cliente: "Empresa XYZ", qrcode: "QR002", localizacao: "Setor B2", descricao: "Material temporário", valor: "R$ 2.500", statusOracle: "Passageiro" },
        { id: 3, nome: "Item Ativo C", cliente: "Indústria DEF", qrcode: "QR003", localizacao: "Setor C3", descricao: "Máquina operacional", valor: "R$ 25.000", statusOracle: "Ativo" },
        { id: 4, nome: "Item Passageiro D", cliente: "Comércio GHI", qrcode: "QR004", localizacao: "Setor D4", descricao: "Produto em trânsito", valor: "R$ 1.200", statusOracle: "Passageiro" },
        { id: 5, nome: "Item Ativo E", cliente: "Serviços JKL", qrcode: "QR005", localizacao: "Setor E5", descricao: "Ferramenta especializada", valor: "R$ 8.500", statusOracle: "Inativo" },
      ]
    },
    {
      id: "prestadores",
      label: "Prestadores",
      icon: <UserCheck className="h-5 w-5" />,
      count: 156,
      data: [
        { id: 1, nome: "Prestador Alpha", unidade: "São Paulo", email: "alpha@prestador.com", avaliacao: 4.8, status: "Ativo" },
        { id: 2, nome: "Prestador Beta", unidade: "Rio de Janeiro", email: "beta@prestador.com", avaliacao: 4.5, status: "Ativo" },
        { id: 3, nome: "Prestador Gamma", unidade: "Belo Horizonte", email: "gamma@prestador.com", avaliacao: 4.2, status: "Ativo" },
        { id: 4, nome: "Prestador Delta", unidade: "Salvador", email: "delta@prestador.com", avaliacao: 4.9, status: "Ativo" },
        { id: 5, nome: "Prestador Epsilon", unidade: "Recife", email: "epsilon@prestador.com", avaliacao: 3.8, status: "Inativo" },
      ]
    },
    {
      id: "tarifas",
      label: "Tarifas",
      icon: <DollarSign className="h-5 w-5" />,
      count: 78,
      data: [
        { id: 1, prestador: "Prestador Alpha", tipoContrato: "Dedicado", diarias: "R$ 250", km: "R$ 2.50", heHaComum: "R$ 35", heHaEspecial: "R$ 50", status: "Ativa" },
        { id: 2, prestador: "Prestador Beta", tipoContrato: "Eventual", diarias: "R$ 300", km: "R$ 3.00", heHaComum: "R$ 40", heHaEspecial: "R$ 60", status: "Ativa" },
        { id: 3, prestador: "Prestador Gamma", tipoContrato: "Dedicado", diarias: "R$ 280", km: "R$ 2.80", heHaComum: "R$ 38", heHaEspecial: "R$ 55", status: "Ativa" },
        { id: 4, prestador: "Prestador Delta", tipoContrato: "Eventual", diarias: "R$ 320", km: "R$ 3.20", heHaComum: "R$ 42", heHaEspecial: "R$ 65", status: "Ativa" },
        { id: 5, prestador: "Prestador Epsilon", tipoContrato: "Dedicado", diarias: "R$ 260", km: "R$ 2.60", heHaComum: "R$ 36", heHaEspecial: "R$ 52", status: "Inativa" },
      ]
    },
    {
      id: "despesasExtras",
      label: "Despesas Extras",
      icon: <Receipt className="h-5 w-5" />,
      count: 45,
      data: [
        { id: 1, unidade: "São Paulo", nome: "Pedágio", status: "Ativa" },
        { id: 2, unidade: "Rio de Janeiro", nome: "Combustível Extra", status: "Ativa" },
        { id: 3, unidade: "Belo Horizonte", nome: "Estacionamento", status: "Ativa" },
        { id: 4, unidade: "Salvador", nome: "Taxa de Urgência", status: "Ativa" },
        { id: 5, unidade: "Recife", nome: "Seguro Adicional", status: "Inativa" },
      ]
    },
    {
      id: "taxas",
      label: "Taxas",
      icon: <Calculator className="h-5 w-5" />,
      count: 23,
      data: [
        { id: 1, nome: "Taxa Rodoviário", valorRodoviario: "R$ 15.00", valorAereo: "R$ 25.00", valorMaritimo: "R$ 20.00", status: "Ativa" },
        { id: 2, nome: "Taxa Urgência", valorRodoviario: "R$ 30.00", valorAereo: "R$ 50.00", valorMaritimo: "R$ 40.00", status: "Ativa" },
        { id: 3, nome: "Taxa Seguro", valorRodoviario: "R$ 10.00", valorAereo: "R$ 20.00", valorMaritimo: "R$ 15.00", status: "Ativa" },
        { id: 4, nome: "Taxa Handling", valorRodoviario: "R$ 8.00", valorAereo: "R$ 35.00", valorMaritimo: "R$ 25.00", status: "Ativa" },
        { id: 5, nome: "Taxa Especial", valorRodoviario: "R$ 20.00", valorAereo: "R$ 40.00", valorMaritimo: "R$ 30.00", status: "Inativa" },
      ]
    },
    {
      id: "tarifasUnidade",
      label: "Tarifas por Unidade",
      icon: <Briefcase className="h-5 w-5" />,
      count: 34,
      data: [
        { id: 1, nome: "Tarifa SP Urbano", urbano: "R$ 45.00", viagemPlanejada: "R$ 120.00", viagemNaoPlanejada: "R$ 180.00", status: "Ativa" },
        { id: 2, nome: "Tarifa RJ Urbano", urbano: "R$ 50.00", viagemPlanejada: "R$ 130.00", viagemNaoPlanejada: "R$ 190.00", status: "Ativa" },
        { id: 3, nome: "Tarifa BH Urbano", urbano: "R$ 40.00", viagemPlanejada: "R$ 110.00", viagemNaoPlanejada: "R$ 170.00", status: "Ativa" },
        { id: 4, nome: "Tarifa SSA Urbano", urbano: "R$ 42.00", viagemPlanejada: "R$ 115.00", viagemNaoPlanejada: "R$ 175.00", status: "Ativa" },
        { id: 5, nome: "Tarifa REC Urbano", urbano: "R$ 38.00", viagemPlanejada: "R$ 105.00", viagemNaoPlanejada: "R$ 165.00", status: "Inativa" },
      ]
    },
    {
      id: "tarifasServico",
      label: "Tarifas de Serviço",
      icon: <MapPin className="h-5 w-5" />,
      count: 67,
      data: [
        { id: 1, nome: "Serviço Carga/Descarga", valorHora: "R$ 85.00", periodo: "Diurno", dispendio: "Baixo", status: "Ativa" },
        { id: 2, nome: "Serviço Conferência", valorHora: "R$ 65.00", periodo: "Integral", dispendio: "Médio", status: "Ativa" },
        { id: 3, nome: "Serviço Embalagem", valorHora: "R$ 75.00", periodo: "Diurno", dispendio: "Alto", status: "Ativa" },
        { id: 4, nome: "Serviço Montagem", valorHora: "R$ 95.00", periodo: "Noturno", dispendio: "Alto", status: "Ativa" },
        { id: 5, nome: "Serviço Limpeza", valorHora: "R$ 55.00", periodo: "Integral", dispendio: "Baixo", status: "Inativa" },
      ]
    },
    {
      id: "setoresTarifarios",
      label: "Setores Tarifários",
      icon: <MessageSquare className="h-5 w-5" />,
      count: 89,
      data: [
        { id: 1, codigo: "ST001", nome: "Setor Centro", valorEvento: "R$ 25.00", valorDiaria: "R$ 150.00", status: "Ativo" },
        { id: 2, codigo: "ST002", nome: "Setor Norte", valorEvento: "R$ 30.00", valorDiaria: "R$ 180.00", status: "Ativo" },
        { id: 3, codigo: "ST003", nome: "Setor Sul", valorEvento: "R$ 28.00", valorDiaria: "R$ 170.00", status: "Ativo" },
        { id: 4, codigo: "ST004", nome: "Setor Leste", valorEvento: "R$ 32.00", valorDiaria: "R$ 190.00", status: "Ativo" },
        { id: 5, codigo: "ST005", nome: "Setor Oeste", valorEvento: "R$ 26.00", valorDiaria: "R$ 160.00", status: "Inativo" },
      ]
    },
    {
      id: "motivos",
      label: "Motivos",
      icon: <UserPlus className="h-5 w-5" />,
      count: 45,
      data: [
        { id: 1, nome: "Atraso no Trânsito", unidade: "São Paulo", referencia: "AT001", status: "Ativo" },
        { id: 2, nome: "Cliente Ausente", unidade: "Rio de Janeiro", referencia: "CA002", status: "Ativo" },
        { id: 3, nome: "Endereço Incorreto", unidade: "Belo Horizonte", referencia: "EI003", status: "Ativo" },
        { id: 4, nome: "Produto Danificado", unidade: "Salvador", referencia: "PD004", status: "Ativo" },
        { id: 5, nome: "Falta de Documentação", unidade: "Recife", referencia: "FD005", status: "Inativo" },
      ]
    },
    {
      id: "grupos",
      label: "Grupos",
      icon: <Award className="h-5 w-5" />,
      count: 23,
      data: [
        { id: 1, nomeGrupo: "Grupo Logística", lider: "João Silva", membros: "João, Maria, Carlos", status: "Ativo" },
        { id: 2, nomeGrupo: "Grupo Transporte", lider: "Ana Costa", membros: "Ana, Pedro, Lucia", status: "Ativo" },
        { id: 3, nomeGrupo: "Grupo Distribuição", lider: "Roberto Mendes", membros: "Roberto, Fernanda, Marcos", status: "Ativo" },
        { id: 4, nomeGrupo: "Grupo Operações", lider: "Julia Santos", membros: "Julia, Rafael, Camila", status: "Ativo" },
        { id: 5, nomeGrupo: "Grupo Suporte", lider: "Diego Lima", membros: "Diego, Patrícia, Bruno", status: "Inativo" },
      ]
    },
    {
      id: "habilidades",
      label: "Habilidades",
      icon: <Folder className="h-5 w-5" />,
      count: 67,
      data: [
        { id: 1, nome: "Condução de Veículos Pesados", descricao: "Habilitação categoria D ou E", status: "Ativa" },
        { id: 2, nome: "Operação de Empilhadeira", descricao: "Certificação para operar empilhadeiras", status: "Ativa" },
        { id: 3, nome: "Manuseio de Cargas Perigosas", descricao: "Curso MOPP obrigatório", status: "Ativa" },
        { id: 4, nome: "Atendimento ao Cliente", descricao: "Técnicas de relacionamento", status: "Ativa" },
        { id: 5, nome: "Primeiros Socorros", descricao: "Certificação em primeiros socorros", status: "Inativa" },
      ]
    },
    {
      id: "categorias",
      label: "Categorias",
      icon: <Star className="h-5 w-5" />,
      count: 34,
      data: [
        { id: 1, nome: "Categoria A", codigoExterno: "CAT001", contaContabil: "1.1.001", estimativaCusto: "R$ 5.000", status: "Ativa" },
        { id: 2, nome: "Categoria B", codigoExterno: "CAT002", contaContabil: "1.1.002", estimativaCusto: "R$ 8.000", status: "Ativa" },
        { id: 3, nome: "Categoria C", codigoExterno: "CAT003", contaContabil: "1.1.003", estimativaCusto: "R$ 12.000", status: "Ativa" },
        { id: 4, nome: "Categoria D", codigoExterno: "CAT004", contaContabil: "1.1.004", estimativaCusto: "R$ 15.000", status: "Ativa" },
        { id: 5, nome: "Categoria E", codigoExterno: "CAT005", contaContabil: "1.1.005", estimativaCusto: "R$ 20.000", status: "Inativa" },
      ]
    },
    {
      id: "avaliacoes",
      label: "Avaliações",
      icon: <ClipboardList className="h-5 w-5" />,
      count: 156,
      data: [
        { id: 1, descricao: "Excelente atendimento e pontualidade", avaliacao: 5, status: "Ativa" },
        { id: 2, descricao: "Bom serviço, mas pode melhorar comunicação", avaliacao: 4, status: "Ativa" },
        { id: 3, descricao: "Serviço dentro do esperado", avaliacao: 3, status: "Ativa" },
        { id: 4, descricao: "Atraso na entrega, mas produto íntegro", avaliacao: 2, status: "Ativa" },
        { id: 5, descricao: "Serviço insatisfatório", avaliacao: 1, status: "Inativa" },
      ]
    },
    {
      id: "formularios",
      label: "Formulários",
      icon: <ShoppingCart className="h-5 w-5" />,
      count: 23,
      data: [
        { id: 1, nome: "Formulário Cadastro Cliente", tipoCadastro: "Clientes", status: "Ativo" },
        { id: 2, nome: "Formulário Cadastro Veículo", tipoCadastro: "Veículos", status: "Ativo" },
        { id: 3, nome: "Formulário Avaliação Serviço", tipoCadastro: "Avaliações", status: "Ativo" },
        { id: 4, nome: "Formulário Ocorrência", tipoCadastro: "Ocorrências", status: "Ativo" },
        { id: 5, nome: "Formulário Prestador", tipoCadastro: "Prestadores", status: "Inativo" },
      ]
    },
    {
      id: "acordosCompra",
      label: "Acordos de Compra",
      icon: <PieChart className="h-5 w-5" />,
      count: 45,
      data: [
        { id: 1, tipo: "Combustível", fornecedor: "Posto Alpha", dataInicio: "01/01/2024", dataFim: "31/12/2024", itens: "Diesel, Gasolina", status: "Ativo" },
        { id: 2, tipo: "Manutenção", fornecedor: "Oficina Beta", dataInicio: "15/02/2024", dataFim: "15/02/2025", itens: "Peças, Serviços", status: "Ativo" },
        { id: 3, tipo: "Pneus", fornecedor: "Pneus Gamma", dataInicio: "01/03/2024", dataFim: "28/02/2025", itens: "Pneus Diversos", status: "Ativo" },
        { id: 4, tipo: "Seguro", fornecedor: "Seguradora Delta", dataInicio: "01/01/2024", dataFim: "31/12/2024", itens: "Seguro Frota", status: "Ativo" },
        { id: 5, tipo: "Limpeza", fornecedor: "Limpeza Epsilon", dataInicio: "01/06/2023", dataFim: "31/05/2024", itens: "Produtos Limpeza", status: "Expirado" },
      ]
    },
    {
      id: "segmentosContabeis",
      label: "Segmentos Contábeis",
      icon: <Handshake className="h-5 w-5" />,
      count: 67,
      data: [
        { id: 1, tipo: "Receita", valor: "R$ 150.000", descricao: "Receita de transporte", status: "Ativo" },
        { id: 2, tipo: "Despesa", valor: "R$ 45.000", descricao: "Combustível e manutenção", status: "Ativo" },
        { id: 3, tipo: "Investimento", valor: "R$ 200.000", descricao: "Aquisição de veículos", status: "Ativo" },
        { id: 4, tipo: "Custo", valor: "R$ 80.000", descricao: "Folha de pagamento", status: "Ativo" },
        { id: 5, tipo: "Provisão", valor: "R$ 25.000", descricao: "Provisão para contingências", status: "Inativo" },
      ]
    },
    {
      id: "relacionamentoComercial",
      label: "Relacionamento Comercial",
      icon: <Users className="h-5 w-5" />,
      count: 89,
      data: [
        { id: 1, nome: "Empresa Comercial Alpha", codigo: "ECA001", cnpj: "12.345.678/0001-90", contatos: "João Silva", enderecos: "Av. Paulista, 1000", bancos: "Banco do Brasil", status: "Ativo" },
        { id: 2, nome: "Fornecedor Beta Ltda", codigo: "FBL002", cnpj: "98.765.432/0001-10", contatos: "Maria Santos", enderecos: "Rua Augusta, 500", bancos: "Itaú", status: "Ativo" },
        { id: 3, nome: "Cliente Gamma S.A.", codigo: "CGS003", cnpj: "11.222.333/0001-44", contatos: "Carlos Lima", enderecos: "Rod. Anhanguera, Km 25", bancos: "Bradesco", status: "Ativo" },
        { id: 4, nome: "Parceiro Delta", codigo: "PD004", cnpj: "55.666.777/0001-88", contatos: "Ana Costa", enderecos: "Av. Faria Lima, 2000", bancos: "Santander", status: "Ativo" },
        { id: 5, nome: "Distribuidor Epsilon", codigo: "DE005", cnpj: "99.888.777/0001-66", contatos: "Pedro Oliveira", enderecos: "Rua Oscar Freire, 800", bancos: "Caixa", status: "Inativo" },
      ]
    }
  ]

  // Filtrar cadastros visíveis
  const filteredTabsData = tabsData.filter(tab => 
    visibleCadastros.includes(tab.id)
  )

  const currentTabData = filteredTabsData.find(tab => tab.id === activeTab)

  const filteredData = currentTabData?.data.filter(item => {
    const matchesSearch = searchTerm === "" || Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
    const matchesStatus = showInactive || item.status.toLowerCase().includes("ativ")
    return matchesSearch && matchesStatus
  }) || []

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
    ))
  }

  const renderTableHeaders = (tabId: string) => {
    switch (tabId) {
      case "veiculos":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Tipo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Placa</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Motorista</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Peso</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Volume</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "unidades":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Empresa</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Intercompanhia</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "clientes":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">CNPJ</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Telefone</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Contrato</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Janelas</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "contratos":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Unidade</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Usuários</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Inventário</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Retornáveis</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "produtos":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">SKU</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Unidade de Medida</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "estoques":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Produto</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Quantidade</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Local</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "ocorrencias":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Descrição</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Contrato</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Tipo de Tarefa</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "itens":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Cliente</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">QR Code</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Localização</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Valor</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status Oracle</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "prestadores":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Unidade</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Email</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Avaliação</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "tarifas":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Prestador</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Tipo Contrato</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Diárias</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Km</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">HE/HA Comum</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "despesasExtras":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Unidade</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "taxas":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Rodoviário</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Aéreo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Marítimo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "tarifasUnidade":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Urbano</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Viagem Planejada</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Viagem Não Planejada</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "tarifasServico":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Valor Hora</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Período</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Dispêndio</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "setoresTarifarios":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Código</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Valor Evento</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Valor Diária</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "motivos":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Unidade</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Referência</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "grupos":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome do Grupo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Líder</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Membros</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "habilidades":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Descrição</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "categorias":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Código Externo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Conta Contábil</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Estimativa Custo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "avaliacoes":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Descrição</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Avaliação</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "formularios":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Tipo de Cadastro</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "acordosCompra":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Tipo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Fornecedor</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Data Início</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Data Fim</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Itens</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "segmentosContabeis":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Tipo</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Valor</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Descrição</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      case "relacionamentoComercial":
        return (
          <>
            <TableHead className="text-gray-700 dark:text-gray-300">Nome</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Código</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">CNPJ</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Contatos</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Ações</TableHead>
          </>
        )
      default:
        return null
    }
  }

  const renderTableCells = (item: any, tabId: string) => {
    const getStatusBadge = (status: string) => {
      const statusLower = status?.toLowerCase() || ""
      if (statusLower.includes("ativ")) {
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
      } else if (statusLower.includes("manut") || statusLower.includes("análise")) {
        return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
      } else if (statusLower.includes("esgot") || statusLower.includes("baixo")) {
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
      } else if (statusLower.includes("expirado") || statusLower.includes("fechada")) {
        return "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
      } else {
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
      }
    }

    switch (tabId) {
      case "veiculos":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.tipo}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.placa}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.motorista}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.peso}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.volume}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "unidades":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.empresa}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.intercompanhia}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "clientes":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.cnpj}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.telefone}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.contrato}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.janelas}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "contratos":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.unidade}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.usuarios}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.inventario}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.retornaveis}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "produtos":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.sku}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.unidadeMedida}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "estoques":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.produto}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.quantidade}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.local}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "ocorrencias":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.descricao}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.contratoVinculado}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.tipoTarefa}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "itens":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.cliente}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.qrcode}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.localizacao}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.valor}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.statusOracle)}>{item.statusOracle}</Badge>
            </TableCell>
          </>
        )
      case "prestadores":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.unidade}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.email}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-1">
                {renderStars(Math.floor(item.avaliacao))}
                <span className="ml-1 text-sm">({item.avaliacao})</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "tarifas":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.prestador}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.tipoContrato}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.diarias}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.km}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.heHaComum}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "despesasExtras":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.unidade}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "taxas":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.valorRodoviario}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.valorAereo}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.valorMaritimo}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "tarifasUnidade":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.urbano}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.viagemPlanejada}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.viagemNaoPlanejada}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "tarifasServico":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.valorHora}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.periodo}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.dispendio}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "setoresTarifarios":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.codigo}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.valorEvento}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.valorDiaria}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "motivos":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.unidade}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.referencia}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "grupos":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nomeGrupo}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.lider}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.membros}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "habilidades":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.descricao}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "categorias":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.codigoExterno}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.contaContabil}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.estimativaCusto}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "avaliacoes":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.descricao}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-1">
                {renderStars(item.avaliacao)}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "formularios":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.tipoCadastro}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "acordosCompra":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.tipo}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.fornecedor}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.dataInicio}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.dataFim}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.itens}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "segmentosContabeis":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.tipo}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.valor}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.descricao}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
            </TableCell>
          </>
        )
      case "relacionamentoComercial":
        return (
          <>
            <TableCell className="font-medium text-gray-900 dark:text-gray-100">{item.nome}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.codigo}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.cnpj}</TableCell>
            <TableCell className="text-gray-900 dark:text-gray-100">{item.contatos}</TableCell>
            <TableCell>
              <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
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
        <div className="flex items-center gap-3">
          {/* Seletor de Visibilidade de Cadastros */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurar Cadastros
                <Badge 
                  variant="secondary" 
                  className="ml-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {visibleCadastros.length}/24
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
              <DropdownMenuLabel className="text-gray-900 dark:text-gray-100 font-semibold">
                Selecionar Cadastros Visíveis
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />
              
              {/* Ações rápidas */}
              <div className="px-2 py-2 space-y-1">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={showAllCadastros}
                    className="flex-1 h-8 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    Mostrar Todos
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={hideAllCadastros}
                    className="flex-1 h-8 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <EyeOff className="mr-1 h-3 w-3" />
                    Ocultar Todos
                  </Button>
                </div>
              </div>
              
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />
              
              {/* Lista de cadastros */}
              <div className="max-h-64 overflow-y-auto">
                {tabsData.map((cadastro) => (
                  <DropdownMenuItem
                    key={cadastro.id}
                    className="flex items-center space-x-3 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600"
                    onSelect={(e) => e.preventDefault()}
                    onClick={() => toggleCadastroVisibility(cadastro.id)}
                  >
                    <Checkbox
                      checked={visibleCadastros.includes(cadastro.id)}
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <span className="text-lg">{cadastro.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm ${
                        visibleCadastros.includes(cadastro.id) 
                          ? "text-gray-900 dark:text-gray-100" 
                          : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {cadastro.label}
                      </span>
                    </div>
                    {visibleCadastros.includes(cadastro.id) ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
              
              <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-600" />
              
              {/* Opção de reset */}
              <DropdownMenuItem
                onClick={resetToDefault}
                className="flex items-center space-x-2 px-3 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="text-sm font-medium">Restaurar Padrão</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border-white/20 dark:border-gray-700/30 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Cadastros do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <TabsList className="h-auto bg-transparent p-0 flex flex-wrap gap-4">
                {filteredTabsData.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 px-4 py-3 bg-transparent border-0 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none text-gray-600 dark:text-gray-400 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    {tab.icon}
                    <span className="font-medium text-sm">{tab.label}</span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700 rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5 text-xs"
                    >
                      {tab.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {filteredTabsData.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                <div className="space-y-4">
                  {/* Action Bar */}
                  <div className="flex gap-3 items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm dark:bg-gray-800/80 dark:border-gray-700 overflow-x-auto">
                    <div className="flex gap-3 items-center flex-shrink-0">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
                        <Input
                          placeholder={`Buscar ${tab.label.toLowerCase()}...`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="show-inactive"
                          checked={showInactive}
                          onCheckedChange={setShowInactive}
                          className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                        <label
                          htmlFor="show-inactive"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                        >
                          Ver Inativos
                        </label>
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
                        Adicionar
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
                        {paginatedData.map((item) => (
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
                                  {item.status?.toLowerCase().includes("ativ") ? "Inativar" : "Ativar"}
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
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length} registros
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Registros por página:</span>
                        <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                          setItemsPerPage(Number(value))
                          setCurrentPage(1)
                        }}>
                          <SelectTrigger className="w-20 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="border-gray-200 text-gray-600 bg-transparent dark:border-gray-600 dark:text-gray-300"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Anterior
                      </Button>
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = i + 1
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className={currentPage === page 
                                ? "bg-blue-500 text-white border-blue-500" 
                                : "border-gray-200 text-gray-600 bg-transparent dark:border-gray-600 dark:text-gray-300"
                              }
                            >
                              {page}
                            </Button>
                          )
                        })}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="border-gray-200 text-gray-600 bg-transparent dark:border-gray-600 dark:text-gray-300"
                      >
                        Próximo
                        <ChevronRight className="h-4 w-4 ml-1" />
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