interface SystemStatusProps {
  status: {
    server: string
    database: string
    api: string
  }
}

export function SystemStatus({ status }: SystemStatusProps) {
  // Función para obtener color del estado
  function getStatusColor(statusType: string) {
    switch (statusType) {
      case 'active': return 'bg-green-500'
      case 'loading': return 'bg-yellow-500 animate-pulse'
      case 'error': return 'bg-red-500'
      case 'warning': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  // Función para obtener texto del estado
  function getStatusText(statusType: string) {
    switch (statusType) {
      case 'active': return 'Activo'
      case 'loading': return 'Cargando...'
      case 'error': return 'Error'
      case 'warning': return 'Advertencia'
      default: return 'Desconocido'
    }
  }

  // Función para obtener color del texto
  function getTextColor(statusType: string) {
    switch (statusType) {
      case 'active': return 'text-green-600'
      case 'loading': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      case 'warning': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Estado del Sistema</h3>
      <div className="space-y-4">
        <StatusItem
          label="Servidor API"
          status={status.server}
          color={getStatusColor(status.server)}
          text={getStatusText(status.server)}
          textColor={getTextColor(status.server)}
        />
        <StatusItem
          label="Base de datos"
          status={status.database}
          color={getStatusColor(status.database)}
          text={getStatusText(status.database)}
          textColor={getTextColor(status.database)}
        />
        <StatusItem
          label="Servicios"
          status={status.api}
          color={getStatusColor(status.api)}
          text={getStatusText(status.api)}
          textColor={getTextColor(status.api)}
          animated
        />
      </div>
    </div>
  )
}

interface StatusItemProps {
  label: string
  status: string
  color: string
  text: string
  textColor: string
  animated?: boolean
}

function StatusItem({ label, color, text, textColor, animated }: StatusItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 ${color} rounded-full ${animated ? 'animate-pulse' : ''}`}></div>
        <span className={`text-sm font-medium ${textColor}`}>
          {text}
        </span>
      </div>
    </div>
  )
} 