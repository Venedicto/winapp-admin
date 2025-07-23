import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Button from './Button'
import Input from './Input'

interface RejectBusinessModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
  isLoading?: boolean
  businessName: string
}

export default function RejectBusinessModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  businessName
}: RejectBusinessModalProps) {
  const [reason, setReason] = useState('')
  const [wasLoading, setWasLoading] = useState(false)

  const handleConfirm = () => {
    if (reason.trim() && !isLoading) {
      onConfirm(reason.trim())
    }
  }

  const handleClose = () => {
    setReason('')
    onClose()
  }

  // Limpiar textarea cuando la mutación termine (success o error)
  useEffect(() => {
    if (wasLoading && !isLoading) {
      // La mutación terminó (pasó de loading a no loading)
      setReason('')
    }
    setWasLoading(isLoading)
  }, [isLoading, wasLoading])

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-white p-6 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <Dialog.Title className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Rechazar Comercio
          </Dialog.Title>
          
          <Dialog.Description className="text-gray-600 mb-4">
            ¿Estás seguro que deseas rechazar el comercio <strong>{businessName}</strong>?
          </Dialog.Description>

          <div className="mb-6">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Motivo del rechazo *
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explica el motivo del rechazo..."
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              rows={4}
              disabled={isLoading}
              required
            />
            {reason.trim().length === 0 && (
              <p className="text-sm text-gray-500 mt-1">
                El motivo es obligatorio para rechazar un comercio
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button
                variant="secondary"
                size="md"
                isDisabled={isLoading}
              >
                Cancelar
              </Button>
            </Dialog.Close>
            <Button
              onClick={handleConfirm}
              variant="danger"
              size="md"
              isLoading={isLoading}
              isDisabled={isLoading || reason.trim().length === 0}
            >
              {isLoading ? 'Rechazando...' : 'Rechazar Comercio'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
} 