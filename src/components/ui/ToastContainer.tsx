import Toast from './Toast'
import type { Toast as ToastType } from '../../types/Toast'

interface ToastContainerProps {
  toasts: ToastType[]
  onRemove: (id: string) => void
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

export default function ToastContainer({ 
  toasts, 
  onRemove, 
  position = 'top-right' 
}: ToastContainerProps) {
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  }

  if (toasts.length === 0) return null

  return (
    <div 
      className={`
        fixed ${positionStyles[position]} z-50 space-y-3 pointer-events-none
        w-full max-w-sm sm:max-w-md lg:max-w-lg
        px-4 sm:px-0
      `}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
} 