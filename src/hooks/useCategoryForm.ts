import { useState, useEffect } from 'react'
import type { BusinessCategory, ProductCategory } from '../types/Category'

interface CategoryFormData {
  name: string
  image: string | File | null
}

interface UseCategoryFormProps {
  category?: BusinessCategory | ProductCategory | null
  isOpen: boolean
}

export function useCategoryForm({ category, isOpen }: UseCategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    image: null
  })
  
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('')
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when category changes or modal opens
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        image: category.image
      })
      setImagePreviewUrl(category.image)
    } else {
      setFormData({
        name: '',
        image: null
      })
      setImagePreviewUrl('')
    }
    setErrors({})
  }, [category, isOpen])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    // Para edición, la imagen es opcional si ya existe una
    // Para creación, la imagen es requerida
    if (!category && !formData.image) {
      newErrors.image = 'La imagen es requerida'
    } else if (formData.image instanceof File) {
      // Validar tipo de archivo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!validTypes.includes(formData.image.type)) {
        newErrors.image = 'El archivo debe ser una imagen (JPG, PNG, GIF, WebP)'
      }
      // Validar tamaño (máximo 5MB)
      if (formData.image.size > 5 * 1024 * 1024) {
        newErrors.image = 'La imagen debe ser menor a 5MB'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof CategoryFormData, value: string | File | null) => {
    if (field === 'image' && value instanceof File) {
      setFormData(prev => ({
        ...prev,
        image: value
      }))
      
      // Crear URL de vista previa
      const previewUrl = URL.createObjectURL(value)
      setImagePreviewUrl(previewUrl)
      
      // Limpiar URL anterior si existe
      return () => URL.revokeObjectURL(previewUrl)
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const getCleanFormData = () => ({
    name: formData.name.trim(),
    image: formData.image
  })

  return {
    formData,
    errors,
    imagePreviewUrl,
    validateForm,
    handleInputChange,
    getCleanFormData
  }
} 