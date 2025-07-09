// Cadastro modules data and utility functions
import { 
  Package, 
  UserCheck, 
  Users, 
  Building, 
  FileText, 
  Box, 
  AlertTriangle, 
  Tag, 
  Truck, 
  DollarSign, 
  PlusCircle, 
  Percent, 
  BarChart, 
  Briefcase, 
  Star, 
  FileSpreadsheet, 
  ShoppingBag, 
  Layers, 
  FileBarChart, 
  Users2
} from "lucide-react"

export interface CadastroField {
  name: string
  type: "text" | "number" | "textarea" | "select" | "checkbox" | "date" | "email" | "tel" | "currency"
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
  showInTable?: boolean
}

export interface CadastroModule {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  fields: CadastroField[]
  relationships: string[]
  group: string
}

export interface CadastroGroup {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

// Cadastro groups definition
const cadastroGroups: Record<string, CadastroGroup> = {
  logistics: {
    id: 'logistics',
    name: 'Logística',
    description: 'Gestão de veículos e transporte',
    icon: <Truck className="h-5 w-5" />,
    color: 'blue'
  },
  commercial: {
    id: 'commercial',
    name: 'Comercial',
    description: 'Gestão de clientes e contratos',
    icon: <Briefcase className="h-5 w-5" />,
    color: 'emerald'
  },
  inventory: {
    id: 'inventory',
    name: 'Estoque',
    description: 'Gestão de produtos e estoque',
    icon: <Box className="h-5 w-5" />,
    color: 'purple'
  },
  financial: {
    id: 'financial',
    name: 'Financeiro',
    description: 'Gestão financeira e tarifas',
    icon: <DollarSign className="h-5 w-5" />,
    color: 'orange'
  },
  organization: {
    id: 'organization',
    name: 'Organização',
    description: 'Gestão organizacional',
    icon: <Building className="h-5 w-5" />,
    color: 'pink'
  }
}

// Cadastro modules definition
const cadastroModules: Record<string, CadastroModule> = {
  vehicles: {
    id: 'vehicles',
    name: 'Veículos',
    icon: <Truck className="h-5 w-5" />,
    description: 'Gerenciamento de veículos',
    group: 'logistics',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'type', label: 'Tipo', type: 'select', options: ['Carro', 'Caminhão', 'Moto', 'Van'] },
      { name: 'plate', label: 'Placa', type: 'text', required: true },
      { name: 'driver', label: 'Motorista', type: 'text' },
      { name: 'weight', label: 'Peso', type: 'number' },
      { name: 'volume', label: 'Volume', type: 'number' }
    ],
    relationships: ['Tarifas', 'Unidades']
  },
  units: {
    id: 'units',
    name: 'Unidades',
    icon: <Building className="h-5 w-5" />,
    description: 'Gerenciamento de unidades',
    group: 'organization',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'company', label: 'Empresa', type: 'text', required: true },
      { name: 'intercompany', label: 'Intercompanhia', type: 'checkbox' }
    ],
    relationships: []
  },
  clients: {
    id: 'clients',
    name: 'Clientes',
    icon: <UserCheck className="h-5 w-5" />,
    description: 'Base de clientes',
    group: 'commercial',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'cnpj', label: 'CNPJ', type: 'text', required: true },
      { name: 'address', label: 'Endereço', type: 'textarea' },
      { name: 'phone', label: 'Telefone', type: 'tel' },
      { name: 'contract', label: 'Contrato', type: 'text' },
      { name: 'deliveryWindows', label: 'Janelas de entrega', type: 'textarea' }
    ],
    relationships: ['Contratos', 'Projetos', 'Produtos']
  },
  contracts: {
    id: 'contracts',
    name: 'Contratos',
    icon: <FileText className="h-5 w-5" />,
    description: 'Gestão de contratos',
    group: 'commercial',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'unit', label: 'Unidade', type: 'text', required: true },
      { name: 'users', label: 'Usuários', type: 'text' },
      { name: 'inventory', label: 'Inventário', type: 'checkbox' },
      { name: 'returnables', label: 'Retornáveis', type: 'checkbox' }
    ],
    relationships: ['Clientes', 'Unidades']
  },
  products: {
    id: 'products',
    name: 'Produtos',
    icon: <Package className="h-5 w-5" />,
    description: 'Catálogo de produtos',
    group: 'inventory',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'sku', label: 'SKU', type: 'text', required: true },
      { name: 'unit', label: 'Unidade de medida', type: 'select', options: ['UN', 'KG', 'L', 'M', 'CX'] },
      { name: 'status', label: 'Status', type: 'select', options: ['Ativo', 'Inativo', 'Descontinuado'] }
    ],
    relationships: ['Estoques', 'Clientes']
  },
  inventory: {
    id: 'inventory',
    name: 'Estoques',
    icon: <Box className="h-5 w-5" />,
    description: 'Gestão de estoque',
    group: 'inventory',
    fields: [
      { name: 'product', label: 'Produto', type: 'text', required: true },
      { name: 'quantity', label: 'Quantidade', type: 'number', required: true },
      { name: 'location', label: 'Local', type: 'text', required: true }
    ],
    relationships: ['Produtos']
  },
  occurrences: {
    id: 'occurrences',
    name: 'Ocorrências',
    icon: <AlertTriangle className="h-5 w-5" />,
    description: 'Gestão de ocorrências',
    group: 'logistics',
    fields: [
      { name: 'description', label: 'Descrição', type: 'textarea', required: true },
      { name: 'contract', label: 'Contrato vinculado', type: 'text' },
      { name: 'taskType', label: 'Tipo de tarefa', type: 'select', options: ['Entrega', 'Coleta', 'Manutenção', 'Outro'] }
    ],
    relationships: ['Contratos']
  },
  items: {
    id: 'items',
    name: 'Itens',
    icon: <Tag className="h-5 w-5" />,
    description: 'Gestão de ativos ou passageiros',
    group: 'inventory',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'client', label: 'Cliente', type: 'text', required: true },
      { name: 'qrcode', label: 'QRCode', type: 'text' },
      { name: 'location', label: 'Localização', type: 'text' },
      { name: 'description', label: 'Descrição', type: 'textarea' },
      { name: 'value', label: 'Valor', type: 'currency' },
      { name: 'oracleStatus', label: 'Status Oracle', type: 'text' }
    ],
    relationships: ['Clientes']
  },
  providers: {
    id: 'providers',
    name: 'Prestadores',
    icon: <Users className="h-5 w-5" />,
    description: 'Gestão de prestadores de serviço',
    group: 'commercial',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'unit', label: 'Unidade', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'rating', label: 'Avaliação', type: 'number' }
    ],
    relationships: ['Tarifas', 'Unidades', 'Avaliações']
  },
  rates: {
    id: 'rates',
    name: 'Tarifas',
    icon: <DollarSign className="h-5 w-5" />,
    description: 'Gestão de tarifas',
    group: 'financial',
    fields: [
      { name: 'provider', label: 'Prestador', type: 'text', required: true },
      { name: 'contractType', label: 'Tipo contrato', type: 'select', options: ['Fixo', 'Variável', 'Misto'] },
      { name: 'daily', label: 'Diárias', type: 'currency' },
      { name: 'km', label: 'Km', type: 'currency' },
      { name: 'overtime', label: 'HE/HA (comum)', type: 'currency' },
      { name: 'specialOvertime', label: 'HE/HA (especial)', type: 'currency' }
    ],
    relationships: ['Prestadores', 'Veículos']
  },
  extraExpenses: {
    id: 'extraExpenses',
    name: 'Despesas Extras',
    icon: <PlusCircle className="h-5 w-5" />,
    description: 'Gestão de despesas extras',
    group: 'financial',
    fields: [
      { name: 'unit', label: 'Unidade', type: 'text', required: true },
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'status', label: 'Status', type: 'select', options: ['Ativo', 'Inativo'] }
    ],
    relationships: ['Unidades']
  },
  taxes: {
    id: 'taxes',
    name: 'Taxas',
    icon: <Percent className="h-5 w-5" />,
    description: 'Gestão de taxas',
    group: 'financial',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'carValue', label: 'Valor para carro', type: 'currency' },
      { name: 'truckValue', label: 'Valor para caminhão', type: 'currency' },
      { name: 'motorcycleValue', label: 'Valor para moto', type: 'currency' },
      { name: 'status', label: 'Status', type: 'select', options: ['Ativo', 'Inativo'] }
    ],
    relationships: []
  },
  unitRates: {
    id: 'unitRates',
    name: 'Tarifas por Unidade',
    icon: <BarChart className="h-5 w-5" />,
    description: 'Gestão de tarifas por unidade',
    group: 'financial',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'urbanPlanned', label: 'Urbano planejada', type: 'currency' },
      { name: 'urbanUnplanned', label: 'Urbano não planejada', type: 'currency' },
      { name: 'tripPlanned', label: 'Viagem planejada', type: 'currency' },
      { name: 'tripUnplanned', label: 'Viagem não planejada', type: 'currency' }
    ],
    relationships: ['Unidades']
  },
  serviceRates: {
    id: 'serviceRates',
    name: 'Tarifas de Serviço',
    icon: <Briefcase className="h-5 w-5" />,
    description: 'Gestão de tarifas de serviço',
    group: 'financial',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'hourValue', label: 'Valor hora', type: 'currency', required: true },
      { name: 'period', label: 'Período', type: 'text' },
      { name: 'expenditure', label: 'Dispêndio', type: 'currency' }
    ],
    relationships: []
  },
  rateSectors: {
    id: 'rateSectors',
    name: 'Setores Tarifários',
    icon: <FileBarChart className="h-5 w-5" />,
    description: 'Gestão de setores tarifários',
    group: 'financial',
    fields: [
      { name: 'code', label: 'Código', type: 'text', required: true },
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'eventValue', label: 'Valor por evento', type: 'currency' },
      { name: 'dailyValue', label: 'Valor por diária', type: 'currency' }
    ],
    relationships: []
  },
  reasons: {
    id: 'reasons',
    name: 'Motivos',
    icon: <FileText className="h-5 w-5" />,
    description: 'Gestão de motivos',
    group: 'organization',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'unit', label: 'Unidade', type: 'text', required: true },
      { name: 'reference', label: 'Referência', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: ['Ativo', 'Inativo'] }
    ],
    relationships: ['Unidades']
  },
  groups: {
    id: 'groups',
    name: 'Grupos',
    icon: <Users2 className="h-5 w-5" />,
    description: 'Gestão de grupos',
    group: 'organization',
    fields: [
      { name: 'name', label: 'Nome do grupo', type: 'text', required: true },
      { name: 'leader', label: 'Líder', type: 'text', required: true },
      { name: 'members', label: 'Membros', type: 'textarea' }
    ],
    relationships: []
  },
  skills: {
    id: 'skills',
    name: 'Habilidades',
    icon: <Layers className="h-5 w-5" />,
    description: 'Gestão de habilidades',
    group: 'organization',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'description', label: 'Descrição', type: 'textarea' }
    ],
    relationships: []
  },
  categories: {
    id: 'categories',
    name: 'Categorias',
    icon: <Tag className="h-5 w-5" />,
    description: 'Gestão de categorias',
    group: 'organization',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'externalCode', label: 'Código externo', type: 'text' },
      { name: 'accountingAccount', label: 'Conta contábil', type: 'text' },
      { name: 'costEstimate', label: 'Estimativa de custo', type: 'currency' }
    ],
    relationships: []
  },
  ratings: {
    id: 'ratings',
    name: 'Avaliações',
    icon: <Star className="h-5 w-5" />,
    description: 'Gestão de avaliações',
    group: 'commercial',
    fields: [
      { name: 'description', label: 'Descrição', type: 'textarea', required: true },
      { name: 'rating', label: 'Avaliação em estrelas', type: 'number', required: true }
    ],
    relationships: ['Prestadores']
  },
  forms: {
    id: 'forms',
    name: 'Formulários',
    icon: <FileSpreadsheet className="h-5 w-5" />,
    description: 'Gestão de formulários',
    group: 'organization',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'linkedType', label: 'Tipo de cadastro vinculado', type: 'select', options: ['Clientes', 'Prestadores', 'Veículos', 'Produtos'] }
    ],
    relationships: []
  },
  purchaseAgreements: {
    id: 'purchaseAgreements',
    name: 'Acordos de Compra',
    icon: <ShoppingBag className="h-5 w-5" />,
    description: 'Gestão de acordos de compra',
    group: 'commercial',
    fields: [
      { name: 'type', label: 'Tipo', type: 'select', options: ['Compra', 'Serviço', 'Misto'], required: true },
      { name: 'supplier', label: 'Fornecedor', type: 'text', required: true },
      { name: 'startDate', label: 'Data início', type: 'date' },
      { name: 'endDate', label: 'Data fim', type: 'date' },
      { name: 'items', label: 'Itens', type: 'textarea' }
    ],
    relationships: []
  },
  accountingSegments: {
    id: 'accountingSegments',
    name: 'Segmentos Contábeis',
    icon: <FileBarChart className="h-5 w-5" />,
    description: 'Gestão de segmentos contábeis',
    group: 'financial',
    fields: [
      { name: 'type', label: 'Tipo', type: 'text', required: true },
      { name: 'value', label: 'Valor', type: 'currency', required: true },
      { name: 'description', label: 'Descrição', type: 'textarea' }
    ],
    relationships: []
  },
  commercialRelationships: {
    id: 'commercialRelationships',
    name: 'Relacionamento Comercial',
    icon: <Briefcase className="h-5 w-5" />,
    description: 'Gestão de relacionamentos comerciais',
    group: 'commercial',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'code', label: 'Código', type: 'text', required: true },
      { name: 'cnpj', label: 'CNPJ', type: 'text', required: true },
      { name: 'contacts', label: 'Contatos', type: 'textarea' },
      { name: 'addresses', label: 'Endereços', type: 'textarea' },
      { name: 'banks', label: 'Bancos', type: 'textarea' }
    ],
    relationships: []
  }
}

// Utility functions
export function getAllCadastroModules(): Record<string, CadastroModule> {
  return cadastroModules
}

export function getCadastroModule(moduleId: string): CadastroModule | null {
  return cadastroModules[moduleId] || null
}

export function getCadastroGroups(): Record<string, CadastroGroup> {
  return cadastroGroups
}

export function getCadastroModulesByGroup(groupId: string): CadastroModule[] {
  return Object.values(cadastroModules).filter(module => module.group === groupId)
}