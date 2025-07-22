import { useState } from 'react'
import type { BusinessCategory, ProductCategory, CategoryType } from '../../types/Category'
import { EditButton, DeleteButton, AreYouSureModal } from '../ui'

interface CategoryActionButtonsProps {
  category: BusinessCategory | ProductCategory
  type: CategoryType
  onEdit?: (category: BusinessCategory | ProductCategory) => void
  onDelete?: (categoryId: string) => void
}

const typeConfig = {
  business: {
    deleteTitle: 'Eliminar Categoría de Negocio',
    deleteMessage: '¿Estás seguro de que quieres eliminar esta categoría de negocio? Esta acción no se puede deshacer.'
  },
  product: {
    deleteTitle: 'Eliminar Categoría de Producto',
    deleteMessage: '¿Estás seguro de que quieres eliminar esta categoría de producto? Esta acción no se puede deshacer.'
  }
}

function CategoryActionButtons({ category, type, onEdit, onDelete }: CategoryActionButtonsProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const config = typeConfig[type]

  const handleEdit = () => {
    onEdit?.(category)
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    onDelete?.(category.id)
    setShowDeleteModal(false)
  }

  return (
    <div className="flex items-center gap-2">
      <EditButton 
        onClick={handleEdit}
        title="Editar categoría"
      />
      
      <DeleteButton 
        onClick={handleDelete}
        title="Eliminar categoría"
      />

      <AreYouSureModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title={config.deleteTitle}
        message={config.deleteMessage}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  )
}

export default CategoryActionButtons 