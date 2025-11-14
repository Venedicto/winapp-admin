import { useState } from 'react'
import type { Business } from '../../types/Business'
import { useDeleteBusiness } from '../../services/business/mutations'
import { useToastHelpers } from '../../hooks/useToastHelpers'
import { AreYouSureModal } from '../ui'

interface ActionButtonsProps {
  business: Business
}

function ActionButtons({ business }: ActionButtonsProps) {
  const deleteBusiness = useDeleteBusiness()
  const { showSuccess, showError } = useToastHelpers()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    deleteBusiness.mutate({
      businessId: business.id
    }, {
      onSuccess: () => {
        setShowDeleteModal(false)
        showSuccess('Comercio eliminado', 'El comercio ha sido eliminado exitosamente')
      },
      onError: (error) => {
        showError('Error al eliminar', error.message)
      }
    })
  }

  return (
    <>
      <div className="flex space-x-1">
        <button
          onClick={handleDelete}
          disabled={deleteBusiness.isPending}
          className="text-red-600 hover:text-red-900 hover:bg-red-50 p-2 rounded-lg transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
          title="Eliminar comercio"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Modal de confirmación para eliminar */}
      <AreYouSureModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteBusiness.isPending}
        title="Eliminar Comercio"
        message={`¿Estás seguro que deseas eliminar el comercio "${business.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </>
  )
}

export default ActionButtons 