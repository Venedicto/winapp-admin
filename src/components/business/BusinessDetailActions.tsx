import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import type { Business } from '../../types/Business'
import { BUSINESS_STATUS } from '../../types/Business'
import { useUpdateBusinessStatus, useDeleteBusiness } from '../../services/business/mutations'
import { useToastHelpers } from '../../hooks/useToastHelpers'
import { RejectBusinessModal, SuspendBusinessModal, AreYouSureModal } from '../ui'

interface BusinessDetailActionsProps {
  business: Business
}

function BusinessDetailActions({ business }: BusinessDetailActionsProps) {
  const navigate = useNavigate()
  const updateBusinessStatus = useUpdateBusinessStatus()
  const deleteBusiness = useDeleteBusiness()
  const { showSuccess, showError } = useToastHelpers()
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleGoBack = () => {
    navigate('/dashboard/comercios')
  }

  const handleApprove = () => {
    updateBusinessStatus.mutate({
      businessId: business.id,
      status: BUSINESS_STATUS.ACCEPTED
    }, {
      onSuccess: () => {
        showSuccess('Comercio aprobado', 'El comercio ha sido aprobado exitosamente')
      },
      onError: (error) => {
        showError('Error al aprobar', error.message)
      }
    })
  }

  const handleReject = () => {
    setShowRejectModal(true)
  }

  const handleConfirmReject = (reason: string) => {
    updateBusinessStatus.mutate({
      businessId: business.id,
      status: BUSINESS_STATUS.REJECTED,
      reason
    }, {
      onSuccess: () => {
        setShowRejectModal(false)
        showSuccess('Comercio rechazado', 'El comercio ha sido rechazado con el motivo especificado')
      },
      onError: (error) => {
        showError('Error al rechazar', error.message)
      }
    })
  }

  const handleSuspend = () => {
    setShowSuspendModal(true)
  }

  const handleConfirmSuspend = (reason: string) => {
    updateBusinessStatus.mutate({
      businessId: business.id,
      status: BUSINESS_STATUS.SUSPENDED,
      reason
    }, {
      onSuccess: () => {
        setShowSuspendModal(false)
        showSuccess('Comercio suspendido', 'El comercio ha sido suspendido con el motivo especificado')
      },
      onError: (error) => {
        showError('Error al suspender', error.message)
      }
    })
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    deleteBusiness.mutate({
      businessId: business.id
    }, {
      onSuccess: () => {
        setShowDeleteModal(false)
        showSuccess('Comercio eliminado', 'El comercio ha sido eliminado exitosamente')
        // Redirigir a la lista después de eliminar
        navigate('/dashboard/comercios')
      },
      onError: (error) => {
        showError('Error al eliminar', error.message)
      }
    })
  }

  const renderStatusButtons = () => {
    switch (business.status) {
      case BUSINESS_STATUS.PENDING:
        return (
          <>
            {/* Botón aprobar */}
            <button
              onClick={handleApprove}
              disabled={updateBusinessStatus.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {updateBusinessStatus.isPending ? 'Procesando...' : 'Aprobar'}
            </button>
            
            {/* Botón rechazar */}
            <button
              onClick={handleReject}
              disabled={updateBusinessStatus.isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {updateBusinessStatus.isPending ? 'Procesando...' : 'Rechazar'}
            </button>
          </>
        )
      
      case BUSINESS_STATUS.ACCEPTED:
        return (
          <button
            onClick={handleSuspend}
            disabled={updateBusinessStatus.isPending}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {updateBusinessStatus.isPending ? 'Procesando...' : 'Suspender'}
          </button>
        )
      
      case BUSINESS_STATUS.SUSPENDED:
        return (
          <button
            onClick={handleApprove}
            disabled={updateBusinessStatus.isPending}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {updateBusinessStatus.isPending ? 'Procesando...' : 'Reactivar Comercio'}
          </button>
        )
      
      default:
        return null
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
          Acciones
        </h2>
        
        <div className="space-y-3">
          {/* Botón volver */}
          <button
            onClick={handleGoBack}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-purple-200 text-purple-700 bg-white rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a la Lista
          </button>
          
          {/* Botones según estado */}
          {renderStatusButtons()}

          {/* Botón eliminar - siempre disponible */}
          <button
            onClick={handleDelete}
            disabled={deleteBusiness.isPending}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {deleteBusiness.isPending ? 'Eliminando...' : 'Eliminar Comercio'}
          </button>
        </div>
      </div>

      {/* Modal de rechazo */}
      <RejectBusinessModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleConfirmReject}
        isLoading={updateBusinessStatus.isPending}
        businessName={business.name}
      />

      {/* Modal de suspensión */}
      <SuspendBusinessModal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleConfirmSuspend}
        isLoading={updateBusinessStatus.isPending}
        businessName={business.name}
      />

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

export default BusinessDetailActions 