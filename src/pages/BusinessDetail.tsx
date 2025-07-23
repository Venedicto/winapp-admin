import { useParams } from 'react-router-dom'
import { useBusinessById } from '../services/business'
import { 
  BusinessBasicInfo, 
  BusinessContactInfo, 
  BusinessStatusInfo, 
  BusinessOwnerInfo, 
  BusinessDetailActions,
  BusinessDocuments
} from '../components/business'
import { WithLoading } from '../components/ui'

function BusinessDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: businessResponse, isLoading, error } = useBusinessById(id!)

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error al cargar el comercio</p>
          <p className="text-gray-500 text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <WithLoading isLoading={isLoading} isError={!!error}>
      {businessResponse?.data?.business && (
        <div className="space-y-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Detalle del Comercio</h1>
            <p className="text-gray-600">Información completa del comercio</p>
          </div>

          {/* Grid de información */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información básica */}
              <BusinessBasicInfo business={businessResponse.data.business} />
              
              {/* Información de contacto */}
              <BusinessContactInfo business={businessResponse.data.business} />
              
              {/* Información del propietario */}
              <BusinessOwnerInfo business={businessResponse.data.business} />
              
              {/* Documentos */}
              <BusinessDocuments business={businessResponse.data.business} />
            </div>

            {/* Columna lateral */}
            <div className="space-y-6">
              {/* Estado y métricas */}
              <BusinessStatusInfo business={businessResponse.data.business} />
              
              {/* Acciones */}
              <BusinessDetailActions business={businessResponse.data.business} />
            </div>
          </div>
        </div>
      )}
    </WithLoading>
  )
}

export default BusinessDetail 