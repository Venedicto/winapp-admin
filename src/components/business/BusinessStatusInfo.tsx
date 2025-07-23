import type { Business } from '../../types/Business'
import StatusBadge from './StatusBadge'

interface BusinessStatusInfoProps {
  business: Business
}

function BusinessStatusInfo({ business }: BusinessStatusInfoProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Estado y Métricas
      </h2>
      
      <div className="space-y-4">
        {/* Estado */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Estado del Comercio</span>
          <StatusBadge status={business.status} />
        </div>
        
        {/* Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Calificación</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium text-gray-900">
              {business.rating ? business.rating.toFixed(1) : 'Sin calificar'}
            </span>
          </div>
        </div>
        
        
      </div>
    </div>
  )
}

export default BusinessStatusInfo 