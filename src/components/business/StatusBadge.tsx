interface StatusBadgeProps {
  status: string
}

function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Acepted':
        return { 
          text: 'Aceptado', 
          className: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300' 
        }
      case 'Pending':
        return { 
          text: 'Pendiente', 
          className: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300' 
        }
      default:
        return { 
          text: 'Rechazado', 
          className: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300' 
        }
    }
  }

  const config = getStatusConfig(status)
  
  return (
    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${config.className}`}>
      {config.text}
    </span>
  )
}

export default StatusBadge 