import { type TableColumn } from '../components/ui/Table'
import type { Business } from '../types/Business'
import { StatusBadge, ActionButtons } from '../components/business'

export const getBusinessTableColumns = (): TableColumn<Business>[] => [
  {
    key: 'logo',
    title: 'Logo',
    width: '10%',
    hideOnMobile: true,
    render: (logo: string, business: Business) => (
      <div className="flex-shrink-0 h-10 w-10 lg:h-12 lg:w-12">
        <img
          className="h-10 w-10 lg:h-12 lg:w-12 rounded-full object-cover border-2 border-white shadow-sm"
          src={logo}
          alt={`Logo de ${business.name}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/images/vector-icon.svg'
          }}
        />
      </div>
    )
  },
  {
    key: 'name',
    title: 'Comercio',
    width: '25%',
    render: (name: string, business: Business) => (
      <div className="w-full overflow-hidden">
        <div className="text-sm font-semibold text-gray-900 truncate">
          {name}
        </div>
        <div className="text-xs lg:text-sm text-gray-500 truncate">
          {business.description}
        </div>
      </div>
    )
  },
  {
    key: 'status',
    title: 'Estado',
    width: '10%',
    render: (status: string) => <StatusBadge status={status} />
  },
  {
    key: 'address',
    title: 'Dirección',
    width: '30%',
    hideOnMobile: true,
    hideOnTablet: true,
    render: (address: string, business: Business) => (
      <div className="w-full overflow-hidden">
        <div className="text-sm text-gray-900 truncate">
          {address}
        </div>
        <div className="text-xs text-gray-500 flex items-center mt-1">
          <span className="mr-1 flex-shrink-0">📞</span>
          <span className="truncate">{business.phone}</span>
        </div>
      </div>
    )
  },
  {
    key: 'userId',
    title: 'Propietario',
    width: '15%',
    hideOnMobile: true,
    render: (userId: string) => (
      <div className="text-sm text-gray-600 w-full truncate" title={userId}>
        ID: {userId.substring(0, 8)}...
      </div>
    )
  },
  {
    key: 'actions',
    title: 'Acciones',
    width: '10%',
    hideOnMobile: true,
    render: (_, business: Business) => <ActionButtons business={business} />
  }
]

// Configuración alternativa con columnas adicionales para vista extendida
export const getExtendedBusinessTableColumns = (): TableColumn<Business>[] => [
  ...getBusinessTableColumns().slice(0, -1), // Todas excepto la última (acciones)
  {
    key: 'open',
    title: 'Estado',
    width: '8%',
    hideOnMobile: true,
    render: (open: boolean) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        open 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {open ? '🟢 Abierto' : '🔴 Cerrado'}
      </span>
    )
  },
  {
    key: 'rating',
    title: 'Rating',
    width: '10%',
    hideOnMobile: true,
    hideOnTablet: true,
    render: (rating: number | null) => (
      <div className="flex items-center">
        {rating ? (
          <>
            <span className="text-yellow-400 mr-1">⭐</span>
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </>
        ) : (
          <span className="text-gray-400 text-xs">Sin rating</span>
        )}
      </div>
    )
  },
  {
    key: 'actions',
    title: 'Acciones',
    width: '10%',
    hideOnMobile: true,
    render: (_, business: Business) => <ActionButtons business={business} />
  }
] 