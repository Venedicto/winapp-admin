import { Button } from '../ui'
import { toast } from 'sonner'

export default function ToastDemo() {
  const handleShowSuccess = () => {
    toast.success('Operación exitosa', {
      description: 'La acción se completó correctamente',
      duration: 4000
    })
  }

  const handleShowError = () => {
    toast.error('Error en la operación', {
      description: 'Algo salió mal, por favor inténtalo de nuevo',
      duration: 6000
    })
  }

  const handleShowWarning = () => {
    toast.warning('Advertencia importante', {
      description: 'Esta acción podría tener consecuencias',
      duration: 5000
    })
  }

  const handleShowInfo = () => {
    toast.info('Información relevante', {
      description: 'Aquí tienes algunos datos útiles',
      duration: 3000
    })
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Demo del Sistema de Toast (Sonner)
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