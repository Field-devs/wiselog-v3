# Sistema de Gerenciamento - Design System

Este é um projeto front-end que implementa um sistema de gerenciamento com design moderno e responsivo.

## 🎨 Design System

O projeto utiliza um design system consistente baseado em:

### Características Principais
- **Glass Morphism**: Efeitos de vidro fosco com backdrop-filter
- **Gradientes Suaves**: Transições de cor harmoniosas
- **Animações Fluidas**: Micro-interações e transições suaves
- **Dark Mode**: Suporte completo ao modo escuro
- **Responsividade**: Design adaptável para todos os dispositivos

### Paleta de Cores
- **Primária**: Azul (#3B82F6)
- **Sucesso**: Verde (#10B981)
- **Aviso**: Âmbar (#F59E0B)
- **Erro**: Vermelho (#EF4444)
- **Neutros**: Escala de cinzas completa

### Componentes do Design System
- `GlassCard`: Cards com efeito de vidro
- `StatusBadge`: Badges de status com cores semânticas
- `ProgressBar`: Barras de progresso animadas
- `GlassButton`: Botões com efeito de vidro
- `AnimatedContainer`: Containers com animações de entrada

### Efeitos Visuais
- **Backdrop Blur**: Desfoque de fundo para elementos glass
- **Box Shadows**: Sombras em múltiplas camadas
- **Hover Effects**: Elevação e transformações no hover
- **Smooth Transitions**: Transições suaves em todas as interações

## 🚀 Tecnologias

- **Next.js 14**: Framework React
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework de CSS utilitário
- **Radix UI**: Componentes acessíveis
- **Lucide React**: Ícones modernos

## 📱 Funcionalidades

- Dashboard principal com métricas
- Gerenciamento de usuários (Mobile e Web)
- Sidebar com navegação fluida
- Sistema de autenticação
- Perfil de usuário
- Modo escuro/claro
- Design responsivo

## 🎯 Padrões de Design

### Layout
- Sidebar com efeito frosted glass
- Cards com transparência e blur
- Gradientes de fundo sutis
- Espaçamentos consistentes (sistema de 8px)

### Tipografia
- Hierarquia clara de tamanhos
- Pesos de fonte balanceados
- Contraste adequado para acessibilidade

### Interações
- Hover states com elevação
- Loading states animados
- Feedback visual imediato
- Transições suaves entre estados

## 🔧 Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📋 Estrutura do Projeto

```
├── app/                    # Páginas Next.js
├── components/            # Componentes React
│   ├── design-system/    # Componentes do design system
│   └── ui/               # Componentes base (shadcn/ui)
├── styles/               # Estilos globais e design system
├── hooks/                # Custom hooks
└── lib/                  # Utilitários
```

Este design system garante consistência visual e experiência de usuário em todo o projeto.