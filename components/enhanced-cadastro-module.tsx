"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  FileText, 
  Download, 
  Filter, 
  ArrowUpDown,
  Eye,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Clock,
  AlertTriangle,
  CheckCircle2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CadastroForm } from "./cadastro-form"
import { ColumnSelector, type ColumnConfig } from "./column-selector"
import { useColumnVisibility } from "../hooks/use-column-visibility"

interface EnhancedCadastroModuleProps {
  moduleId: string
  moduleName: string
  moduleIcon: React.ReactNode
  moduleDescription: string
  fields: Array<{
    name: string
    type: "text" | "number" | "textarea" | "select" | "checkbox" | "date" | "email" | "tel" | "currency"
    label: string
    placeholder?: string
    required?: boolean
    options?: string[]
    showInTable?: boolean
  }>
  relationships?: string[]
}

export function EnhancedCadastroModule({ 
  moduleId, 
  moduleName, 
  moduleIcon, 
  moduleDescription,
  fields,
  relationships = []
}: EnhancedCadastroModuleProps) {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isViewing, setIsViewing] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterDate, setFilterDate] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showHelpDialog, setShowHelpDialog] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  
  const ITEMS_PER_PAGE = 20

  // Generate mock items
  const [items, setItems] = useState<any[]>(() => {
    // Generate 50 mock items
    return Array.from({ length: 50 }, (_, i) => {
      const item: Record<string, any> = { id: i + 1 };
      
      // Add created_at and updated_at fields
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      item.created_at = date.toISOString().split('T')[0];
      
      const updateDate = new Date(date);
      updateDate.setDate(updateDate.getDate() + Math.floor(Math.random() * 10));
      item.updated_at = updateDate.toISOString().split('T')[0];
      
      // Add status field
      item.status = Math.random() > 0.7 ? 'Inativo' : 'Ativo';
      
      // Add other fields based on field definitions
      fields.forEach(field => {
        if (field.type === 'checkbox') {
          item[field.name] = Math.random() > 0.5;
        } else if (field.type === 'number') {
          item[field.name] = Math.floor(Math.random() * 100);
        } else if (field.type === 'select' && field.options) {
          item[field.name] = field.options[Math.floor(Math.random() * field.options.length)];
        } else if (field.type === 'currency') {
          item[field.name] = (Math.random() * 1000).toFixed(2);
        } else if (field.type === 'date') {
          const date = new Date();
          date.setDate(date.getDate() - Math.floor(Math.random() * 30));
          item[field.name] = date.toISOString().split('T')[0];
        } else {
          item[field.name] = `${field.label} ${i + 1}`;
        }
      });
      
      return item;
    });
  });

  // Setup column visibility
  const DEFAULT_COLUMNS: ColumnConfig[] = [
    { key: "id", label: "ID", visible: true, required: true },
    ...fields.map(field => ({
      key: field.name,
      label: field.label,
      visible: field.showInTable !== false,
    })),
    { key: "status", label: "Status", visible: true },
    { key: "created_at", label: "Data Criação", visible: true },
    { key: "updated_at", label: "Última Atualização", visible: false },
    { key: "actions", label: "Ações", visible: true, required: true }
  ];

  const { columns, handleColumnChange, isColumnVisible } = useColumnVisibility(
    DEFAULT_COLUMNS, 
    `cadastro-${moduleId}-columns`
  );

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Left/Right to navigate between records
      if (e.altKey && (isEditing || isViewing)) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          navigateToPreviousItem();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          navigateToNextItem();
        }
      }
      
      // Ctrl + S to save
      if (e.ctrlKey && e.key === 's' && (isCreating || isEditing)) {
        e.preventDefault();
        handleSave(currentItem);
      }
      
      // Esc to return to listing
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
      
      // F1 for help
      if (e.key === 'F1') {
        e.preventDefault();
        setShowHelpDialog(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditing, isViewing, currentItem]);

  // Auto-save functionality
  useEffect(() => {
    if ((isCreating || isEditing) && currentItem) {
      // Clear existing timer
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
      
      // Set new timer for 2 minutes
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 2 * 60 * 1000); // 2 minutes
      
      setAutoSaveTimer(timer);
    }
    
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [isCreating, isEditing, currentItem]);

  // Handle auto-save
  const handleAutoSave = () => {
    if (formRef.current) {
      // Get form data
      const formData = new FormData(formRef.current);
      const data: Record<string, any> = {};
      
      // Convert form data to object
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
      
      // Save data
      handleSave(data, true);
    }
  };

  // Apply filters and sorting
  const filteredItems = items.filter(item => {
    // Search filter
    const matchesSearch = Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Status filter
    const matchesStatus = filterStatus ? item.status === filterStatus : true;
    
    // Date filter
    const matchesDate = filterDate ? item.created_at === filterDate : true;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' 
      ? (aValue > bValue ? 1 : -1) 
      : (bValue > aValue ? 1 : -1);
  });

  // Pagination
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );
  
  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle save
  const handleSave = (data: any, isAutoSave = false) => {
    if (isEditing && currentItem) {
      // Update existing item
      setItems(items.map(item => 
        item.id === currentItem.id ? { 
          ...data, 
          id: item.id,
          updated_at: new Date().toISOString().split('T')[0]
        } : item
      ));
      
      if (!isAutoSave) {
        setIsEditing(false);
        setCurrentItem(null);
        
        toast({
          title: "Alterações salvas",
          description: `O cadastro foi atualizado com sucesso.`,
          variant: "default",
        });
      } else {
        setLastSaved(new Date());
      }
    } else if (isCreating) {
      // Create new item
      const newId = Math.max(0, ...items.map(item => item.id)) + 1;
      const newItem = { 
        ...data, 
        id: newId,
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0],
        status: 'Ativo'
      };
      
      setItems([...items, newItem]);
      
      if (!isAutoSave) {
        setIsCreating(false);
        setCurrentItem(null);
        
        toast({
          title: "Cadastro criado",
          description: `O novo cadastro foi criado com sucesso.`,
          variant: "default",
        });
      } else {
        setLastSaved(new Date());
      }
    }
  };

  // Handle edit
  const handleEdit = (item: any) => {
    setCurrentItem(item);
    setIsEditing(true);
    setIsViewing(false);
  };

  // Handle view
  const handleView = (item: any) => {
    setCurrentItem(item);
    setIsViewing(true);
    setIsEditing(false);
  };

  // Handle delete
  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
    setConfirmDelete(null);
    
    toast({
      title: "Cadastro excluído",
      description: `O cadastro foi excluído com sucesso.`,
      variant: "destructive",
    });
  };

  // Handle cancel
  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setIsViewing(false);
    setCurrentItem(null);
    
    // Clear auto-save timer
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
      setAutoSaveTimer(null);
    }
  };

  // Navigation between items
  const navigateToPreviousItem = useCallback(() => {
    if (!currentItem) return;
    
    const currentIndex = sortedItems.findIndex(item => item.id === currentItem.id);
    if (currentIndex > 0) {
      const prevItem = sortedItems[currentIndex - 1];
      setCurrentItem(prevItem);
      
      toast({
        title: "Navegação",
        description: `Cadastro anterior carregado.`,
      });
    }
  }, [currentItem, sortedItems]);

  const navigateToNextItem = useCallback(() => {
    if (!currentItem) return;
    
    const currentIndex = sortedItems.findIndex(item => item.id === currentItem.id);
    if (currentIndex < sortedItems.length - 1) {
      const nextItem = sortedItems[currentIndex + 1];
      setCurrentItem(nextItem);
      
      toast({
        title: "Navegação",
        description: `Próximo cadastro carregado.`,
      });
    }
  }, [currentItem, sortedItems]);

  // Get current item position
  const getCurrentItemPosition = () => {
    if (!currentItem) return null;
    
    const index = sortedItems.findIndex(item => item.id === currentItem.id);
    if (index === -1) return null;
    
    return {
      current: index + 1,
      total: sortedItems.length
    };
  };

  const itemPosition = getCurrentItemPosition();

  // Get fields to show in table
  const tableFields = fields.filter(field => field.showInTable !== false);

  return (
    <div className="space-y-6">
      {(isCreating || isEditing || isViewing) ? (
        <div className="space-y-6">
          {/* Header with navigation */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400`}>
                {moduleIcon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {isCreating ? `Novo ${moduleName}` : isEditing ? `Editar ${moduleName}` : `Visualizar ${moduleName}`}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {isCreating ? `Criando novo registro` : `ID: ${currentItem?.id}`}
                  {itemPosition && !isCreating && (
                    <span className="ml-2 text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      Registro {itemPosition.current} de {itemPosition.total}
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!isCreating && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={navigateToPreviousItem}
                    disabled={!itemPosition || itemPosition.current === 1}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={navigateToNextItem}
                    disabled={!itemPosition || itemPosition.current === itemPosition.total}
                    className="flex items-center gap-1"
                  >
                    Próximo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowHelpDialog(true)}
                className="ml-2"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancel}
                className="ml-2"
              >
                <X className="h-4 w-4 mr-2" />
                Fechar
              </Button>
            </div>
          </div>
          
          {/* Form or View */}
          {(isCreating || isEditing) ? (
            <div className="relative">
              {lastSaved && (
                <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Salvo automaticamente: {lastSaved.toLocaleTimeString()}
                </div>
              )}
              
              <form ref={formRef}>
                <CadastroForm
                  moduleId={moduleId}
                  moduleName={moduleName}
                  fields={fields}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  initialData={currentItem || {}}
                />
              </form>
            </div>
          ) : (
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Detalhes do {moduleName}
                </CardTitle>
                <CardDescription>
                  Visualizando informações completas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fields.map(field => (
                    <div key={field.name} className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {field.label}
                      </h3>
                      <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                        {field.type === 'checkbox' ? (
                          <Badge variant={currentItem[field.name] ? "default" : "secondary"}>
                            {currentItem[field.name] ? 'Sim' : 'Não'}
                          </Badge>
                        ) : field.type === 'currency' ? (
                          <span className="text-gray-900 dark:text-gray-100">R$ {currentItem[field.name]}</span>
                        ) : field.type === 'textarea' ? (
                          <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{currentItem[field.name]}</p>
                        ) : (
                          <span className="text-gray-900 dark:text-gray-100">{currentItem[field.name]}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </h3>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                      <Badge 
                        className={
                          currentItem.status === 'Ativo'
                            ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                            : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
                        }
                      >
                        {currentItem.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Data de Criação
                    </h3>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                      <span className="text-gray-900 dark:text-gray-100">{currentItem.created_at}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Última Atualização
                    </h3>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                      <span className="text-gray-900 dark:text-gray-100">{currentItem.updated_at}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Fechar
                  </Button>
                  <Button
                    onClick={() => handleEdit(currentItem)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400`}>
                {moduleIcon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {moduleName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {moduleDescription}
                </p>
              </div>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setIsCreating(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Novo {moduleName}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
              <Input
                placeholder={`Buscar ${moduleName.toLowerCase()}...`}
                className="pl-10 bg-white dark:bg-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-gray-200 dark:border-gray-600"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-200 dark:border-gray-600"
                onClick={() => {
                  // Reset sort if already sorting by ID, otherwise sort by ID
                  if (sortField === 'id') {
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortField('id');
                    setSortDirection('asc');
                  }
                }}
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Ordenar
              </Button>
              <Button variant="outline" className="border-gray-200 dark:border-gray-600">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <ColumnSelector 
                columns={columns} 
                onColumnChange={handleColumnChange} 
                storageKey={`cadastro-${moduleId}-columns`} 
              />
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </label>
                    <Select 
                      value={filterStatus || ""} 
                      onValueChange={(value) => setFilterStatus(value || null)}
                    >
                      <SelectTrigger className="border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Todos os status</SelectItem>
                        <SelectItem value="Ativo">Ativo</SelectItem>
                        <SelectItem value="Inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Data de Criação
                    </label>
                    <Input 
                      type="date" 
                      value={filterDate || ""} 
                      onChange={(e) => setFilterDate(e.target.value || null)}
                      className="border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
                    />
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <Button 
                      variant="outline" 
                      className="border-gray-200 dark:border-gray-600"
                      onClick={() => {
                        setFilterStatus(null);
                        setFilterDate(null);
                      }}
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Data Table */}
          <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Lista de {moduleName}</CardTitle>
                  <CardDescription>
                    {paginatedItems.length > 0 ? (
                      <>
                        Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} a {Math.min(currentPage * ITEMS_PER_PAGE, sortedItems.length)} de {sortedItems.length} registros
                      </>
                    ) : (
                      'Nenhum registro encontrado'
                    )}
                  </CardDescription>
                </div>
                
                {sortedItems.length > 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Página {currentPage} de {totalPages}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      {isColumnVisible("id") && (
                        <TableHead 
                          className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
                          onClick={() => handleSort('id')}
                        >
                          <div className="flex items-center">
                            ID
                            {sortField === 'id' && (
                              <ChevronRight className={`h-4 w-4 ml-1 transform ${sortDirection === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                            )}
                          </div>
                        </TableHead>
                      )}
                      
                      {tableFields.map(field => (
                        isColumnVisible(field.name) && (
                          <TableHead 
                            key={field.name} 
                            className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
                            onClick={() => handleSort(field.name)}
                          >
                            <div className="flex items-center">
                              {field.label}
                              {sortField === field.name && (
                                <ChevronRight className={`h-4 w-4 ml-1 transform ${sortDirection === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                              )}
                            </div>
                          </TableHead>
                        )
                      ))}
                      
                      {isColumnVisible("status") && (
                        <TableHead 
                          className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center">
                            Status
                            {sortField === 'status' && (
                              <ChevronRight className={`h-4 w-4 ml-1 transform ${sortDirection === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                            )}
                          </div>
                        </TableHead>
                      )}
                      
                      {isColumnVisible("created_at") && (
                        <TableHead 
                          className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
                          onClick={() => handleSort('created_at')}
                        >
                          <div className="flex items-center">
                            Data Criação
                            {sortField === 'created_at' && (
                              <ChevronRight className={`h-4 w-4 ml-1 transform ${sortDirection === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                            )}
                          </div>
                        </TableHead>
                      )}
                      
                      {isColumnVisible("updated_at") && (
                        <TableHead 
                          className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100"
                          onClick={() => handleSort('updated_at')}
                        >
                          <div className="flex items-center">
                            Última Atualização
                            {sortField === 'updated_at' && (
                              <ChevronRight className={`h-4 w-4 ml-1 transform ${sortDirection === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                            )}
                          </div>
                        </TableHead>
                      )}
                      
                      {isColumnVisible("actions") && (
                        <TableHead className="text-right text-gray-700 dark:text-gray-300">Ações</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedItems.length > 0 ? (
                      paginatedItems.map(item => (
                        <TableRow key={item.id} className="border-gray-200 dark:border-gray-700">
                          {isColumnVisible("id") && (
                            <TableCell className="font-medium">{item.id}</TableCell>
                          )}
                          
                          {tableFields.map(field => (
                            isColumnVisible(field.name) && (
                              <TableCell key={field.name}>
                                {field.type === 'checkbox' ? (
                                  <Badge variant={item[field.name] ? "default" : "secondary"}>
                                    {item[field.name] ? 'Sim' : 'Não'}
                                  </Badge>
                                ) : field.type === 'currency' ? (
                                  `R$ ${item[field.name]}`
                                ) : (
                                  String(item[field.name])
                                )}
                              </TableCell>
                            )
                          ))}
                          
                          {isColumnVisible("status") && (
                            <TableCell>
                              <Badge
                                className={
                                  item.status === 'Ativo'
                                    ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
                                    : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
                                }
                              >
                                {item.status}
                              </Badge>
                            </TableCell>
                          )}
                          
                          {isColumnVisible("created_at") && (
                            <TableCell>{item.created_at}</TableCell>
                          )}
                          
                          {isColumnVisible("updated_at") && (
                            <TableCell>{item.updated_at}</TableCell>
                          )}
                          
                          {isColumnVisible("actions") && (
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleView(item)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Visualizar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEdit(item)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => setConfirmDelete(item.id)} className="text-red-600 dark:text-red-400">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.filter(col => col.visible).length} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                            <Search className="h-8 w-8 mb-2" />
                            <p>Nenhum registro encontrado</p>
                            <Button 
                              variant="link" 
                              className="mt-2 text-blue-600 dark:text-blue-400"
                              onClick={() => {
                                setSearchTerm("");
                                setFilterStatus(null);
                                setFilterDate(null);
                              }}
                            >
                              Limpar filtros
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              {sortedItems.length > 0 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) setCurrentPage(currentPage - 1);
                          }}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                        let pageNumber;
                        
                        // Logic to show pages around current page
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }
                        
                        return (
                          <PaginationItem key={i}>
                            <PaginationLink 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(pageNumber);
                              }}
                              isActive={currentPage === pageNumber}
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationLink 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(totalPages);
                            }}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      
                      <PaginationItem>
                        <PaginationNext 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                          }}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Relationships */}
          {relationships.length > 0 && (
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Relacionamentos</CardTitle>
                <CardDescription>
                  Entidades relacionadas a este cadastro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {relationships.map(rel => (
                    <Badge key={rel} variant="outline" className="text-sm bg-gray-50 dark:bg-gray-700">
                      {rel}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5 text-green-600" />
                  Adicionar Novo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Criar um novo registro de {moduleName.toLowerCase()}
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setIsCreating(true)}
                >
                  Criar Novo
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Relatórios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Gerar relatórios de {moduleName.toLowerCase()}
                </p>
                <Button variant="outline" className="w-full">
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Download className="h-5 w-5 text-purple-600" />
                  Exportar Dados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Exportar dados para CSV ou Excel
                </p>
                <Button variant="outline" className="w-full">
                  Exportar
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmDelete !== null} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Confirmar exclusão
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este {moduleName.toLowerCase()}? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-start">
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmDelete !== null && handleDelete(confirmDelete)}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              Ajuda e Atalhos
            </DialogTitle>
            <DialogDescription>
              Atalhos de teclado e ajuda para o gerenciamento de {moduleName.toLowerCase()}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Atalhos de Teclado</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Alt + ←</span>
                  <span>Registro anterior</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Alt + →</span>
                  <span>Próximo registro</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Ctrl + S</span>
                  <span>Salvar alterações</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Esc</span>
                  <span>Voltar à listagem</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">F1</span>
                  <span>Mostrar esta ajuda</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tab</span>
                  <span>Navegar entre campos</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Recursos</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Salvamento automático a cada 2 minutos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Personalização de colunas visíveis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Filtros avançados de busca</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Navegação entre registros</span>
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowHelpDialog(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}