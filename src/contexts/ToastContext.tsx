import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Toast, ToastContextType } from '../types/Toast'
import ToastContainer from '../components/ui/ToastContainer'

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

export function ToastProvider({ children, position = 'top-right' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2) + Date.now().toString(36)
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000, // 5 segundos por defecto
      isVisible: true
    }

    setToasts(prev => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const clearAllToasts = () => {
    setToasts([])
  }

  const contextValue: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    clearAllToasts
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        onRemove={removeToast}
        position={position}
      />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
} 