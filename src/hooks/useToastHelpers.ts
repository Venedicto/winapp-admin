import { useToast } from '../contexts/ToastContext'

export function useToastHelpers() {
  const { addToast } = useToast()

  const showSuccess = (title: string, message?: string, duration?: number) => {
    addToast({
      type: 'success',
      title,
      message,
      duration
    })
  }

  const showError = (title: string, message?: string, duration?: number) => {
    addToast({
      type: 'error',
      title,
      message,
      duration: duration || 7000 // Errores duran más tiempo por defecto
    })
  }

  const showWarning = (title: string, message?: string, duration?: number) => {
    addToast({
      type: 'warning',
      title,
      message,
      duration
    })
  }

  const showInfo = (title: string, message?: string, duration?: number) => {
    addToast({
      type: 'info',
      title,
      message,
      duration
    })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
} 