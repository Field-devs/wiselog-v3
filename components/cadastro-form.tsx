"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Save, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CadastroFormProps {
  moduleId: string
  moduleName: string
  fields: Array<{
    name: string
    type: "text" | "number" | "textarea" | "select" | "checkbox" | "date" | "email" | "tel" | "currency"
    label: string
    placeholder?: string
    required?: boolean
    options?: string[]
  }>
  onSave: (data: any) => void
  onCancel: () => void
  initialData?: any
}

export function CadastroForm({ 
  moduleId, 
  moduleName, 
  fields, 
  onSave, 
  onCancel, 
  initialData = {} 
}: CadastroFormProps) {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when field is changed
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = {...prev}
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} é obrigatório`
      }
      
      if (field.type === 'email' && formData[field.name] && 
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData[field.name])) {
        newErrors[field.name] = 'Email inválido'
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      
      // Simulate API call
      setTimeout(() => {
        onSave(formData)
        setIsSubmitting(false)
      }, 1000)
    }
  }

  const renderField = (field: CadastroFormProps['fields'][0]) => {
    const value = formData[field.name] || ''
    const error = errors[field.name]
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
      case 'number':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name} className="text-gray-700 dark:text-gray-300">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                error ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        )
        
      case 'textarea':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name} className="text-gray-700 dark:text-gray-300">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                error ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        )
        
      case 'select':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name} className="text-gray-700 dark:text-gray-300">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select 
              value={value} 
              onValueChange={(value) => handleChange(field.name, value)}
            >
              <SelectTrigger className={`border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                error ? 'border-red-500 focus:ring-red-500' : ''
              }`}>
                <SelectValue placeholder={field.placeholder || `Selecione ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        )
        
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2" key={field.name}>
            <Checkbox
              id={field.name}
              checked={!!value}
              onCheckedChange={(checked) => handleChange(field.name, checked)}
              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <Label
              htmlFor={field.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
            >
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        )
        
      case 'currency':
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name} className="text-gray-700 dark:text-gray-300">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
              <Input
                id={field.name}
                type="text"
                placeholder={field.placeholder}
                value={value}
                onChange={(e) => {
                  // Format as currency
                  const value = e.target.value.replace(/[^\d]/g, '')
                  const formattedValue = value ? (parseInt(value) / 100).toFixed(2) : ''
                  handleChange(field.name, formattedValue)
                }}
                className={`pl-10 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${
                  error ? 'border-red-500 focus:ring-red-500' : ''
                }`}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {initialData.id ? `Editar ${moduleName}` : `Novo ${moduleName}`}
        </CardTitle>
        <CardDescription>
          Preencha os campos abaixo para {initialData.id ? 'atualizar' : 'criar'} o cadastro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.keys(errors).length > 0 && (
            <Alert
              variant="destructive"
              className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Por favor, corrija os erros no formulário antes de continuar.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(renderField)}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300"
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}