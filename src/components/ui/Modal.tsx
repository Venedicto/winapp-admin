import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, children, className = '' }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null)

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

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50" />
      <dialog
        ref={modalRef}
        className={`p-0 rounded-2xl shadow-2xl max-w-md w-full mx-auto self-center z-50 border-0 backdrop:bg-black/50 ${className}`}
      >
        {children}
      </dialog>
    </>
  )
} 