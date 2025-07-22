import type { Business } from '../../types/Business'

interface BusinessStatsProps {
  businesses: Business[]
}

function BusinessStats({ businesses }: BusinessStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1 truncate">Total Comercios</p>
            <p className="text-xl lg:text-2xl font-bold text-purple-600">{businesses.length}</p>
          </div>
          <div className="text-2xl lg:text-3xl flex-shrink-0 ml-2">🏪</div>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1 truncate">Comercios Activos</p>
            <p className="text-xl lg:text-2xl font-bold text-green-600">
              {businesses.filter(b => b.status === 'Acepted').length}
            </p>
          </div>
          <div className="text-2xl lg:text-3xl flex-shrink-0 ml-2">✅</div>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 min-w-0 sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1 truncate">Pendientes</p>
            <p className="text-xl lg:text-2xl font-bold text-orange-600">
              {businesses.filter(b => b.status === 'Pending').length}
            </p>
          </div>
          <div className="text-2xl lg:text-3xl flex-shrink-0 ml-2">⏳</div>
        </div>
      </div>
    </div>
  )
}

export default BusinessStats 