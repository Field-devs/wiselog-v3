"use client"

import { useState } from "react"
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
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  FileText, 
  Download, 
  Filter, 
  ArrowUpDown,
  Eye
} from "lucide-react"
import { CadastroForm } from "./cadastro-form"

interface CadastroModuleProps {
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

export function CadastroModule({ 
  moduleId, 
  moduleName, 
  moduleIcon, 
  moduleDescription,
  fields,
  relationships = []
}: CadastroModuleProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>(null)
  const [items, setItems] = useState<any[]>(() => {
    // Generate 5 mock items
    return Array.from({ length: 5 }, (_, i) => {
      const item: Record<string, any> = { id: i + 1 };
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

  const handleSave = (data: any) => {
    if (isEditing && currentItem) {
      // Update existing item
      setItems(items.map(item => 
        item.id === currentItem.id ? { ...data, id: item.id } : item
      ));
    } else {
      // Create new item
      const newId = Math.max(0, ...items.map(item => item.id)) + 1;
      setItems([...items, { ...data, id: newId }]);
    }
    
    setIsCreating(false);
    setIsEditing(false);
    setCurrentItem(null);
  }

  const handleEdit = (item: any) => {
    setCurrentItem(item);
    setIsEditing(true);
  }

  const handleDelete = (id: number) => {
    if (confirm(`Tem certeza que deseja excluir este ${moduleName}?`)) {
      setItems(items.filter(item => item.id !== id));
    }
  }

  const filteredItems = items.filter(item => {
    return Object.values(item).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Get fields to show in table
  const tableFields = fields.filter(field => field.showInTable !== false);

  return (
    <div className="space-y-6">
      {(isCreating || isEditing) ? (
        <CadastroForm
          moduleId={moduleId}
          moduleName={moduleName}
          fields={fields}
          onSave={handleSave}
          onCancel={() => {
            setIsCreating(false);
            setIsEditing(false);
            setCurrentItem(null);
          }}
          initialData={currentItem || {}}
        />
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
              <Button variant="outline" className="border-gray-200 dark:border-gray-600">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
              <Button variant="outline" className="border-gray-200 dark:border-gray-600">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Ordenar
              </Button>
              <Button variant="outline" className="border-gray-200 dark:border-gray-600">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">Lista de {moduleName}</CardTitle>
              <CardDescription>
                {filteredItems.length} {filteredItems.length === 1 ? 'registro encontrado' : 'registros encontrados'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 dark:border-gray-700">
                      <TableHead className="text-gray-700 dark:text-gray-300">ID</TableHead>
                      {tableFields.map(field => (
                        <TableHead key={field.name} className="text-gray-700 dark:text-gray-300">
                          {field.label}
                        </TableHead>
                      ))}
                      <TableHead className="text-right text-gray-700 dark:text-gray-300">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map(item => (
                        <TableRow key={item.id} className="border-gray-200 dark:border-gray-700">
                          <TableCell className="font-medium">{item.id}</TableCell>
                          {tableFields.map(field => (
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
                          ))}
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(item)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Visualizar
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-red-600 dark:text-red-400">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Excluir
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={tableFields.length + 2} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                            <Search className="h-8 w-8 mb-2" />
                            <p>Nenhum registro encontrado</p>
                            <Button 
                              variant="link" 
                              className="mt-2 text-blue-600 dark:text-blue-400"
                              onClick={() => setSearchTerm("")}
                            >
                              Limpar busca
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
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
    </div>
  )
}