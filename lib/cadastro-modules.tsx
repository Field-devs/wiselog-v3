import React from "react"
import { 
  Car, 
  Building2, 
  Package, 
  MapPin, 
  AlertTriangle, 
  DollarSign, 
  Briefcase, 
  Users, 
  ShoppingBag, 
  Settings, 
  FileText, 
  Truck, 
  Route, 
  HelpCircle, 
  Tag, 
  Building, 
  Receipt, 
  CreditCard, 
  Map, 
  Handshake, 
  UserCheck, 
  Heart, 
  Box, 
  ShoppingCart, 
  UserPlus, 
  Star, 
  ClipboardList
} from "lucide-react"

// Define all cadastro modules with their fields and relationships
const cadastroModules = {
  // Operacional
  "veiculos": {
    id: "veiculos",
    name: "Veículos",
    icon: <Car className="h-5 w-5" />,
    group: "operacional",
    description: "Cadastro de veículos da frota",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "tipo", type: "select", label: "Tipo", options: ["Carro", "Caminhão", "Moto", "Van", "Ônibus"], required: true, showInTable: true },
      { name: "placa", type: "text", label: "Placa", required: true, showInTable: true },
      { name: "motorista", type: "text", label: "Motorista", showInTable: true },
      { name: "peso", type: "number", label: "Peso (kg)" },
      { name: "volume", type: "number", label: "Volume (m³)" },
    ],
    relationships: ["Tarifas", "Unidades"]
  },
  "unidades": {
    id: "unidades",
    name: "Unidades",
    icon: <Building2 className="h-5 w-5" />,
    group: "operacional",
    description: "Unidades operacionais",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "empresa", type: "text", label: "Empresa", required: true, showInTable: true },
      { name: "intercompanhia", type: "checkbox", label: "Intercompanhia", showInTable: true },
      { name: "endereco", type: "text", label: "Endereço" },
      { name: "cidade", type: "text", label: "Cidade" },
      { name: "estado", type: "text", label: "Estado" },
    ],
    relationships: []
  },
  "estoques": {
    id: "estoques",
    name: "Estoques",
    icon: <Package className="h-5 w-5" />,
    group: "operacional",
    description: "Gestão de estoques",
    fields: [
      { name: "produto", type: "text", label: "Produto", required: true, showInTable: true },
      { name: "quantidade", type: "number", label: "Quantidade", required: true, showInTable: true },
      { name: "local", type: "text", label: "Local", required: true, showInTable: true },
      { name: "dataEntrada", type: "date", label: "Data de Entrada", showInTable: true },
      { name: "lote", type: "text", label: "Lote" },
      { name: "validade", type: "date", label: "Validade" },
    ],
    relationships: ["Produtos"]
  },
  "viagens": {
    id: "viagens",
    name: "Viagens",
    icon: <Route className="h-5 w-5" />,
    group: "operacional",
    description: "Cadastro de viagens",
    fields: [
      { name: "origem", type: "text", label: "Origem", required: true, showInTable: true },
      { name: "destino", type: "text", label: "Destino", required: true, showInTable: true },
      { name: "data", type: "date", label: "Data", required: true, showInTable: true },
      { name: "veiculo", type: "text", label: "Veículo", showInTable: true },
      { name: "motorista", type: "text", label: "Motorista" },
      { name: "distancia", type: "number", label: "Distância (km)" },
    ],
    relationships: ["Veículos", "Ocorrências"]
  },
  "motivos": {
    id: "motivos",
    name: "Motivos",
    icon: <HelpCircle className="h-5 w-5" />,
    group: "operacional",
    description: "Motivos operacionais",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "unidade", type: "text", label: "Unidade", showInTable: true },
      { name: "referencia", type: "text", label: "Referência", showInTable: true },
      { name: "status", type: "select", label: "Status", options: ["Ativo", "Inativo"], required: true, showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição" },
    ],
    relationships: ["Unidades"]
  },
  "ocorrencias": {
    id: "ocorrencias",
    name: "Ocorrências",
    icon: <AlertTriangle className="h-5 w-5" />,
    group: "operacional",
    description: "Cadastro de ocorrências",
    fields: [
      { name: "descricao", type: "textarea", label: "Descrição", required: true, showInTable: true },
      { name: "contratoVinculado", type: "text", label: "Contrato Vinculado", showInTable: true },
      { name: "tipoTarefa", type: "select", label: "Tipo de Tarefa", options: ["Entrega", "Coleta", "Manutenção", "Outro"], required: true, showInTable: true },
      { name: "data", type: "date", label: "Data", required: true, showInTable: true },
      { name: "responsavel", type: "text", label: "Responsável" },
      { name: "status", type: "select", label: "Status", options: ["Aberta", "Em andamento", "Resolvida", "Cancelada"], required: true, showInTable: true },
    ],
    relationships: ["Contratos"]
  },
  
  // Financeiro
  "tarifas": {
    id: "tarifas",
    name: "Tarifas",
    icon: <DollarSign className="h-5 w-5" />,
    group: "financeiro",
    description: "Tarifas gerais",
    fields: [
      { name: "prestador", type: "text", label: "Prestador", required: true, showInTable: true },
      { name: "tipoContrato", type: "select", label: "Tipo Contrato", options: ["Fixo", "Variável", "Misto"], required: true, showInTable: true },
      { name: "diarias", type: "currency", label: "Diárias", showInTable: true },
      { name: "km", type: "currency", label: "Valor por Km", showInTable: true },
      { name: "heComum", type: "currency", label: "HE/HA Comum" },
      { name: "heEspecial", type: "currency", label: "HE/HA Especial" },
    ],
    relationships: ["Prestadores"]
  },
  "tarifas-unidade": {
    id: "tarifas-unidade",
    name: "Tarifas por Unidade",
    icon: <Building className="h-5 w-5" />,
    group: "financeiro",
    description: "Tarifas específicas por unidade",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "unidade", type: "text", label: "Unidade", required: true, showInTable: true },
      { name: "urbanoPlaneado", type: "currency", label: "Urbano Planejado", showInTable: true },
      { name: "urbanoNaoPlaneado", type: "currency", label: "Urbano Não Planejado", showInTable: true },
      { name: "viagemPlaneada", type: "currency", label: "Viagem Planejada" },
      { name: "viagemNaoPlaneada", type: "currency", label: "Viagem Não Planejada" },
    ],
    relationships: ["Unidades", "Tarifas"]
  },
  "tarifas-servico": {
    id: "tarifas-servico",
    name: "Tarifas por Serviço",
    icon: <Tag className="h-5 w-5" />,
    group: "financeiro",
    description: "Tarifas específicas por serviço",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "valorHora", type: "currency", label: "Valor Hora", required: true, showInTable: true },
      { name: "periodo", type: "select", label: "Período", options: ["Diurno", "Noturno", "Integral"], required: true, showInTable: true },
      { name: "dispendio", type: "currency", label: "Dispêndio", showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição" },
    ],
    relationships: ["Tarifas"]
  },
  "taxas": {
    id: "taxas",
    name: "Taxas",
    icon: <Receipt className="h-5 w-5" />,
    group: "financeiro",
    description: "Taxas e impostos",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "valorCarro", type: "currency", label: "Valor Carro", showInTable: true },
      { name: "valorCaminhao", type: "currency", label: "Valor Caminhão", showInTable: true },
      { name: "valorMoto", type: "currency", label: "Valor Moto", showInTable: true },
      { name: "status", type: "select", label: "Status", options: ["Ativo", "Inativo"], required: true, showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição" },
    ],
    relationships: []
  },
  "setores-tarifarios": {
    id: "setores-tarifarios",
    name: "Setores Tarifários",
    icon: <Map className="h-5 w-5" />,
    group: "financeiro",
    description: "Setores para tarifação",
    fields: [
      { name: "codigo", type: "text", label: "Código", required: true, showInTable: true },
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "valorEvento", type: "currency", label: "Valor por Evento", showInTable: true },
      { name: "valorDiaria", type: "currency", label: "Valor por Diária", showInTable: true },
      { name: "regiao", type: "text", label: "Região" },
      { name: "descricao", type: "textarea", label: "Descrição" },
    ],
    relationships: ["Tarifas"]
  },
  "despesas-extras": {
    id: "despesas-extras",
    name: "Despesas Extras",
    icon: <CreditCard className="h-5 w-5" />,
    group: "financeiro",
    description: "Cadastro de despesas extras",
    fields: [
      { name: "unidade", type: "text", label: "Unidade", required: true, showInTable: true },
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "valor", type: "currency", label: "Valor", required: true, showInTable: true },
      { name: "data", type: "date", label: "Data", required: true, showInTable: true },
      { name: "status", type: "select", label: "Status", options: ["Pendente", "Aprovado", "Rejeitado"], required: true, showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição" },
    ],
    relationships: ["Unidades"]
  },
  "acordos-compra": {
    id: "acordos-compra",
    name: "Acordos de Compra",
    icon: <Handshake className="h-5 w-5" />,
    group: "financeiro",
    description: "Acordos comerciais de compra",
    fields: [
      { name: "tipo", type: "select", label: "Tipo", options: ["Compra Direta", "Licitação", "Contrato Anual"], required: true, showInTable: true },
      { name: "fornecedor", type: "text", label: "Fornecedor", required: true, showInTable: true },
      { name: "dataInicio", type: "date", label: "Data Início", required: true, showInTable: true },
      { name: "dataFim", type: "date", label: "Data Fim", required: true, showInTable: true },
      { name: "itens", type: "textarea", label: "Itens", required: true },
      { name: "valorTotal", type: "currency", label: "Valor Total", required: true, showInTable: true },
    ],
    relationships: ["Prestadores", "Itens"]
  },
  "categorias": {
    id: "categorias",
    name: "Categorias",
    icon: <Tag className="h-5 w-5" />,
    group: "financeiro",
    description: "Categorias financeiras",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "codigoExterno", type: "text", label: "Código Externo", showInTable: true },
      { name: "contaContabil", type: "text", label: "Conta Contábil", showInTable: true },
      { name: "estimativaCusto", type: "currency", label: "Estimativa de Custo", showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição" },
    ],
    relationships: []
  },
  "segmentos-contabeis": {
    id: "segmentos-contabeis",
    name: "Segmentos Contábeis",
    icon: <FileText className="h-5 w-5" />,
    group: "financeiro",
    description: "Segmentos para contabilidade",
    fields: [
      { name: "tipo", type: "select", label: "Tipo", options: ["Receita", "Despesa", "Investimento"], required: true, showInTable: true },
      { name: "valor", type: "currency", label: "Valor", required: true, showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição", required: true, showInTable: true },
      { name: "categoria", type: "text", label: "Categoria", showInTable: true },
      { name: "dataRegistro", type: "date", label: "Data de Registro", required: true },
    ],
    relationships: ["Categorias"]
  },
  
  // Comercial
  "clientes": {
    id: "clientes",
    name: "Clientes",
    icon: <Users className="h-5 w-5" />,
    group: "comercial",
    description: "Cadastro de clientes",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "cnpj", type: "text", label: "CNPJ", required: true, showInTable: true },
      { name: "endereco", type: "text", label: "Endereço", showInTable: true },
      { name: "telefone", type: "tel", label: "Telefone", showInTable: true },
      { name: "contrato", type: "text", label: "Contrato" },
      { name: "janelasEntrega", type: "textarea", label: "Janelas de Entrega" },
      { name: "email", type: "email", label: "Email" },
    ],
    relationships: ["Contratos", "Projetos", "Produtos"]
  },
  "contratos": {
    id: "contratos",
    name: "Contratos",
    icon: <FileText className="h-5 w-5" />,
    group: "comercial",
    description: "Gestão de contratos",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "unidade", type: "text", label: "Unidade", required: true, showInTable: true },
      { name: "usuarios", type: "text", label: "Usuários", showInTable: true },
      { name: "inventario", type: "checkbox", label: "Inventário", showInTable: true },
      { name: "retornaveis", type: "checkbox", label: "Retornáveis", showInTable: true },
      { name: "dataInicio", type: "date", label: "Data Início", required: true },
      { name: "dataFim", type: "date", label: "Data Fim", required: true },
      { name: "valor", type: "currency", label: "Valor", required: true },
    ],
    relationships: ["Unidades", "Clientes"]
  },
  "prestadores": {
    id: "prestadores",
    name: "Prestadores",
    icon: <UserCheck className="h-5 w-5" />,
    group: "comercial",
    description: "Cadastro de prestadores",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "unidade", type: "text", label: "Unidade", required: true, showInTable: true },
      { name: "email", type: "email", label: "Email", required: true, showInTable: true },
      { name: "avaliacao", type: "select", label: "Avaliação", options: ["1", "2", "3", "4", "5"], showInTable: true },
      { name: "telefone", type: "tel", label: "Telefone" },
      { name: "endereco", type: "text", label: "Endereço" },
      { name: "cnpj", type: "text", label: "CNPJ" },
    ],
    relationships: ["Unidades", "Avaliações"]
  },
  "relacionamento": {
    id: "relacionamento",
    name: "Relacionamento",
    icon: <Heart className="h-5 w-5" />,
    group: "comercial",
    description: "Gestão de relacionamento",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "codigo", type: "text", label: "Código", required: true, showInTable: true },
      { name: "cnpj", type: "text", label: "CNPJ", required: true, showInTable: true },
      { name: "contatos", type: "textarea", label: "Contatos", showInTable: true },
      { name: "enderecos", type: "textarea", label: "Endereços" },
      { name: "bancos", type: "textarea", label: "Bancos" },
    ],
    relationships: ["Clientes", "Prestadores"]
  },
  
  // Produtos
  "itens": {
    id: "itens",
    name: "Itens",
    icon: <Box className="h-5 w-5" />,
    group: "produtos",
    description: "Cadastro de itens",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "cliente", type: "text", label: "Cliente", showInTable: true },
      { name: "qrcode", type: "text", label: "QRCode", showInTable: true },
      { name: "localizacao", type: "text", label: "Localização", showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição" },
      { name: "valor", type: "currency", label: "Valor", showInTable: true },
      { name: "statusOracle", type: "select", label: "Status Oracle", options: ["Ativo", "Inativo", "Pendente"], showInTable: true },
    ],
    relationships: ["Clientes", "Produtos"]
  },
  "produtos": {
    id: "produtos",
    name: "Produtos",
    icon: <ShoppingCart className="h-5 w-5" />,
    group: "produtos",
    description: "Cadastro de produtos",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "sku", type: "text", label: "SKU", required: true, showInTable: true },
      { name: "unidadeMedida", type: "select", label: "Unidade de Medida", options: ["UN", "KG", "L", "M", "M²", "M³"], required: true, showInTable: true },
      { name: "status", type: "select", label: "Status", options: ["Ativo", "Inativo", "Esgotado"], required: true, showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição" },
      { name: "preco", type: "currency", label: "Preço", showInTable: true },
    ],
    relationships: ["Estoques", "Clientes"]
  },
  
  // Pessoas
  "grupos": {
    id: "grupos",
    name: "Grupos",
    icon: <UserPlus className="h-5 w-5" />,
    group: "pessoas",
    description: "Grupos de pessoas",
    fields: [
      { name: "nomeGrupo", type: "text", label: "Nome do Grupo", required: true, showInTable: true },
      { name: "lider", type: "text", label: "Líder", required: true, showInTable: true },
      { name: "membros", type: "textarea", label: "Membros", showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição" },
      { name: "dataFormacao", type: "date", label: "Data de Formação" },
    ],
    relationships: ["Habilidades"]
  },
  "habilidades": {
    id: "habilidades",
    name: "Habilidades",
    icon: <Star className="h-5 w-5" />,
    group: "pessoas",
    description: "Cadastro de habilidades",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição", required: true, showInTable: true },
      { name: "nivel", type: "select", label: "Nível", options: ["Básico", "Intermediário", "Avançado", "Especialista"], showInTable: true },
      { name: "categoria", type: "text", label: "Categoria", showInTable: true },
    ],
    relationships: ["Grupos"]
  },
  "avaliacoes": {
    id: "avaliacoes",
    name: "Avaliações",
    icon: <ClipboardList className="h-5 w-5" />,
    group: "pessoas",
    description: "Avaliações de desempenho",
    fields: [
      { name: "descricao", type: "textarea", label: "Descrição", required: true, showInTable: true },
      { name: "avaliacao", type: "select", label: "Avaliação", options: ["1", "2", "3", "4", "5"], required: true, showInTable: true },
      { name: "avaliador", type: "text", label: "Avaliador", required: true, showInTable: true },
      { name: "avaliado", type: "text", label: "Avaliado", required: true, showInTable: true },
      { name: "data", type: "date", label: "Data", required: true, showInTable: true },
      { name: "comentarios", type: "textarea", label: "Comentários" },
    ],
    relationships: ["Prestadores", "Grupos"]
  },
  
  // Configurações
  "formularios": {
    id: "formularios",
    name: "Formulários",
    icon: <Settings className="h-5 w-5" />,
    group: "configuracoes",
    description: "Configuração de formulários",
    fields: [
      { name: "nome", type: "text", label: "Nome", required: true, showInTable: true },
      { name: "tipoCadastro", type: "text", label: "Tipo de Cadastro Vinculado", required: true, showInTable: true },
      { name: "campos", type: "textarea", label: "Campos", required: true },
      { name: "ativo", type: "checkbox", label: "Ativo", showInTable: true },
      { name: "descricao", type: "textarea", label: "Descrição" },
    ],
    relationships: []
  },
}

// Function to get a specific module
export function getCadastroModule(moduleId: string) {
  return cadastroModules[moduleId as keyof typeof cadastroModules] || null
}

// Function to get all modules
export function getAllCadastroModules() {
  return cadastroModules
}

// Function to get modules by group
export function getCadastroModulesByGroup(group: string) {
  return Object.values(cadastroModules).filter(module => module.group === group)
}

// Function to get all groups
export function getCadastroGroups() {
  const groups = {
    operacional: {
      name: "Operacional",
      icon: <Truck className="h-5 w-5" />,
      color: "blue",
    },
    financeiro: {
      name: "Financeiro",
      icon: <DollarSign className="h-5 w-5" />,
      color: "emerald",
    },
    comercial: {
      name: "Comercial",
      icon: <Briefcase className="h-5 w-5" />,
      color: "purple",
    },
    produtos: {
      name: "Produtos",
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "orange",
    },
    pessoas: {
      name: "Pessoas",
      icon: <Users className="h-5 w-5" />,
      color: "pink",
    },
    configuracoes: {
      name: "Configurações",
      icon: <Settings className="h-5 w-5" />,
      color: "gray",
    },
  }
  
  return groups
}