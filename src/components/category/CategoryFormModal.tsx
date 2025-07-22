import type { BusinessCategory, ProductCategory, CategoryType } from '../../types/Category'
import { Modal, ModalHeader, FormActions } from '../ui'
import CategoryForm from './CategoryForm'
import { useCategoryForm } from '../../hooks/useCategoryForm'

interface CategoryFormData {
  name: string
  image: string | File | null
}

interface CategoryFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (categoryData: CategoryFormData) => void
  category?: BusinessCategory | ProductCategory | null
  type: CategoryType
  isLoading?: boolean
}

const typeConfig = {
  business: {
    title: (isEdit: boolean) => isEdit ? 'Editar Categoría de Negocio' : 'Nueva Categoría de Negocio'
  },
  product: {
    title: (isEdit: boolean) => isEdit ? 'Editar Categoría de Producto' : 'Nueva Categoría de Producto'
  }
}

export default function CategoryFormModal({
  isOpen,
  onClose,
  onSave,
  category,
  type,
  isLoading = false
}: CategoryFormModalProps) {
  const { formData, errors, imagePreviewUrl, validateForm, handleInputChange, getCleanFormData } = useCategoryForm({
    category,
    isOpen
  })

  const config = typeConfig[type]
  const isEdit = Boolean(category)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onSave(getCleanFormData())
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-2xl overflow-hidden">
        <ModalHeader title={config.title(isEdit)} />
        
        <form onSubmit={handleSubmit} className="p-6">
          <CategoryForm
            formData={formData}
            errors={errors}
            type={type}
            imagePreviewUrl={imagePreviewUrl}
            onInputChange={handleInputChange}
          />
          
          <FormActions
            onCancel={onClose}
            isLoading={isLoading}
            submitText={isEdit ? 'Actualizar Categoría' : 'Crear Categoría'}
          />
        </form>
      </div>
    </Modal>
  )
} 