import { Button } from '../ui'
import { useToastHelpers } from '../../hooks/useToastHelpers'

export default function ToastDemo() {
  const { showSuccess, showError, showWarning, showInfo } = useToastHelpers()

  const handleShowSuccess = () => {
    showSuccess(
      'Operación exitosa',
      'La acción se completó correctamente',
      4000
    )
  }

  const handleShowError = () => {
    showError(
      'Error en la operación',
      'Algo salió mal, por favor inténtalo de nuevo',
      6000
    )
  }

  const handleShowWarning = () => {
    showWarning(
      'Advertencia importante',
      'Esta acción podría tener consecuencias',
      5000
    )
  }

  const handleShowInfo = () => {
    showInfo(
      'Información relevante',
      'Aquí tienes algunos datos útiles',
      3000
    )
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Demo del Sistema de Toast
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={handleShowSuccess}
          variant="success"
          size="md"
        >
          Mostrar Éxito
        </Button>
        
        <Button
          onClick={handleShowError}
          variant="danger"
          size="md"
        >
          Mostrar Error
        </Button>
        
        <Button
          onClick={handleShowWarning}
          variant="secondary"
          size="md"
        >
          Mostrar Advertencia
        </Button>
        
        <Button
          onClick={handleShowInfo}
          variant="outline"
          size="md"
        >
          Mostrar Info
        </Button>
      </div>
    </div>
  )
} 