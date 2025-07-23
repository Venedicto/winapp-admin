import { toast } from 'sonner'

export function useToastHelpers() {
  const showSuccess = (title: string, message?: string, duration?: number) => {
    toast.success(title, {
      description: message,
      duration: duration || 5000
    })
  }

  const showError = (title: string, message?: string, duration?: number) => {
    toast.error(title, {
      description: message,
      duration: duration || 7000 // Errores duran más tiempo por defecto
    })
  }

  const showWarning = (title: string, message?: string, duration?: number) => {
    toast.warning(title, {
      description: message,
      duration: duration || 5000
    })
  }

  const showInfo = (title: string, message?: string, duration?: number) => {
    toast.info(title, {
      description: message,
      duration: duration || 5000
    })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
} 