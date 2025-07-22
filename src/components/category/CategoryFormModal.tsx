import { useState, useEffect, useRef } from 'react'
import type { BusinessCategory, ProductCategory, CategoryType } from '../../types/Category'
import Button from '../ui/Button'
import Input from '../ui/Input'

interface CategoryFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (categoryData: Omit<BusinessCategory | ProductCategory, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => void
  category?: BusinessCategory | ProductCategory | null
  type: CategoryType
  isLoading?: boolean
}

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSave,
  category,
  type,
  isLoading = false
}: CategoryFormModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    image: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  const typeConfig = {
    business: {
      title: category ? 'Editar Categoría de Negocio' : 'Nueva Categoría de Negocio',
      namePlaceholder: 'Ej: Restaurante, Tienda, Farmacia...'
    },
    product: {
      title: category ? 'Editar Categoría de Producto' : 'Nueva Categoría de Producto',
      namePlaceholder: 'Ej: Comida, Bebidas, Electrónicos...'
    }
  }

  const config = typeConfig[type]

  // Reset form when category changes or modal opens
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        image: category.image
      })
    } else {
      setFormData({
        name: '',
        image: ''
      })
    }
    setErrors({})
  }, [category, isOpen])

  // Handle modal open/close
  useEffect(() => {
    const modalElement = modalRef.current
    if (modalElement) {
      if (isOpen) {
        if (!modalElement.open) {
          modalElement.showModal()
          document.body.classList.add('overflow-hidden')
        }
      } else {
        if (modalElement.open) {
          modalElement.close()
        }
      }
    }

    return () => {
      if (document.body.classList.contains('overflow-hidden')) {
        document.body.classList.remove('overflow-hidden')
      }
      if (modalElement?.open) {
        modalElement.close()
      }
    }
  }, [isOpen])

  useEffect(() => {
    const modalElement = modalRef.current
    const handleDialogClose = () => {
      if (isOpen) {
        onClose()
        document.body.classList.remove('overflow-hidden')
      }
    }

    modalElement?.addEventListener('close', handleDialogClose)

    return () => {
      modalElement?.removeEventListener('close', handleDialogClose)
      if (document.body.classList.contains('overflow-hidden')) {
        document.body.classList.remove('overflow-hidden')
      }
    }
  }, [onClose, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!formData.image.trim()) {
      newErrors.image = 'La URL de la imagen es requerida'
    } else {
      // Validación básica de URL
      try {
        new URL(formData.image)
      } catch {
        newErrors.image = 'Debe ser una URL válida'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onSave({
      name: formData.name.trim(),
      image: formData.image.trim()
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50" />
      <dialog
        ref={modalRef}
        className="p-0 rounded-2xl shadow-2xl max-w-md w-full mx-auto self-center z-50 border-0 backdrop:bg-black/50"
      >
        <div className="bg-white rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <h2 className="text-xl font-bold">{config.title}</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
                         <div>
               <Input
                 label="Nombre de la categoría"
                 name="name"
                 type="text"
                 placeholder={config.namePlaceholder}
                 value={formData.name}
                 onChange={(e) => handleInputChange('name', e.target.value)}
                 isInvalid={!!errors.name}
                 errorMessage={errors.name}
               />
             </div>

             <div>
               <Input
                 label="URL de la imagen"
                 name="image"
                 type="url"
                 placeholder="https://ejemplo.com/imagen.jpg"
                 value={formData.image}
                 onChange={(e) => handleInputChange('image', e.target.value)}
                 isInvalid={!!errors.image}
                 errorMessage={errors.image}
               />
             </div>

            {/* Image preview */}
            {formData.image && !errors.image && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vista previa:
                </label>
                <div className="flex justify-center">
                  <img
                    src={formData.image}
                    alt="Vista previa"
                    className="h-20 w-20 rounded-lg object-cover border-2 border-gray-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/images/vector-icon.svg'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="secondary"
                size="md"
                isDisabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                {category ? 'Actualizar' : 'Crear'} Categoría
              </Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
} 