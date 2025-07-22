import { useState } from 'react'
import type { BusinessCategory, ProductCategory, CategoryType } from '../../types/Category'
import AreYouSureModal from '../ui/AreYouSureModal'

interface CategoryActionButtonsProps {
  category: BusinessCategory | ProductCategory
  type: CategoryType
  onEdit?: (category: BusinessCategory | ProductCategory) => void
  onDelete?: (categoryId: string) => void
}

function CategoryActionButtons({ category, type, onEdit, onDelete }: CategoryActionButtonsProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

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

  const config = typeConfig[type]

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleEdit}
        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
        title="Editar categoría"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      
      <button
        onClick={handleDelete}
        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
        title="Eliminar categoría"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

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