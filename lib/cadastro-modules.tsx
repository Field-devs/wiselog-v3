// Cadastro modules data and utility functions

export interface CadastroField {
  id: string
  name: string
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'date' | 'boolean'
  required?: boolean
  options?: string[]
  placeholder?: string
}

export interface CadastroRelationship {
  id: string
  name: string
  targetModule: string
  type: 'one-to-one' | 'one-to-many' | 'many-to-many'
}

export interface CadastroModule {
  id: string
  name: string
  icon: string
  description: string
  fields: CadastroField[]
  relationships?: CadastroRelationship[]
  group: string
}

export interface CadastroGroup {
  id: string
  name: string
  description: string
  modules: string[]
}

// Sample data - replace with your actual data source
const cadastroModules: Record<string, CadastroModule> = {
  users: {
    id: 'users',
    name: 'Usuários',
    icon: 'Users',
    description: 'Gerenciamento de usuários do sistema',
    group: 'core',
    fields: [
      { id: 'name', name: 'Nome', type: 'text', required: true, placeholder: 'Digite o nome completo' },
      { id: 'email', name: 'Email', type: 'email', required: true, placeholder: 'Digite o email' },
      { id: 'phone', name: 'Telefone', type: 'text', placeholder: 'Digite o telefone' },
      { id: 'role', name: 'Função', type: 'select', required: true, options: ['Admin', 'User', 'Manager'] },
      { id: 'active', name: 'Ativo', type: 'boolean' }
    ],
    relationships: [
      { id: 'user-profile', name: 'Perfil', targetModule: 'profiles', type: 'one-to-one' }
    ]
  },
  products: {
    id: 'products',
    name: 'Produtos',
    icon: 'Package',
    description: 'Catálogo de produtos',
    group: 'inventory',
    fields: [
      { id: 'name', name: 'Nome', type: 'text', required: true, placeholder: 'Nome do produto' },
      { id: 'description', name: 'Descrição', type: 'textarea', placeholder: 'Descrição detalhada' },
      { id: 'price', name: 'Preço', type: 'number', required: true, placeholder: '0.00' },
      { id: 'category', name: 'Categoria', type: 'select', options: ['Eletrônicos', 'Roupas', 'Casa', 'Esportes'] },
      { id: 'available', name: 'Disponível', type: 'boolean' }
    ]
  },
  customers: {
    id: 'customers',
    name: 'Clientes',
    icon: 'UserCheck',
    description: 'Base de clientes',
    group: 'crm',
    fields: [
      { id: 'name', name: 'Nome', type: 'text', required: true, placeholder: 'Nome do cliente' },
      { id: 'email', name: 'Email', type: 'email', required: true, placeholder: 'Email do cliente' },
      { id: 'company', name: 'Empresa', type: 'text', placeholder: 'Nome da empresa' },
      { id: 'phone', name: 'Telefone', type: 'text', placeholder: 'Telefone de contato' },
      { id: 'status', name: 'Status', type: 'select', options: ['Ativo', 'Inativo', 'Prospect'] }
    ]
  }
}

const cadastroGroups: Record<string, CadastroGroup> = {
  core: {
    id: 'core',
    name: 'Sistema',
    description: 'Módulos principais do sistema',
    modules: ['users']
  },
  inventory: {
    id: 'inventory',
    name: 'Estoque',
    description: 'Gestão de produtos e estoque',
    modules: ['products']
  },
  crm: {
    id: 'crm',
    name: 'CRM',
    description: 'Gestão de relacionamento com clientes',
    modules: ['customers']
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
  const group = cadastroGroups[groupId]
  if (!group) return []
  
  return group.modules
    .map(moduleId => cadastroModules[moduleId])
    .filter(Boolean)
}