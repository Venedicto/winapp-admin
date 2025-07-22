import { useState, useEffect, useMemo, useCallback } from 'react'
import Table, { usePagination } from '../components/ui/Table'
import { SearchWithFilters } from '../components/ui/Search'
import type { Business } from '../types/Business'
import { BusinessStats } from '../components/business'
import { getBusinessTableColumns, getBusinessSearchFilters, filterBusinesses } from '../utils'

// Datos de ejemplo para mostrar la tabla
const mockBusinesses: Business[] = [
  {
    "id": "8e1008e7-40e8-42c4-b0aa-b33a78d9da1e",
    "name": "Tim Hortons",
    "description": "Café, donuts y sabores icónicos.",
    "logo": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/business/user_2qJAlaqnXM3NSL1Ad8P1HfT19Ta2acc0a06e3b17e78b70509e40072048f",
    "banner": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/business/user_2qJAlaqnXM3NSL1Ad8P1HfT19Tadb5232fbbd4901eae90a836777dbfec5",
    "phone": "+5491167024429",
    "address": "Av Lázaro Cárdenas 2424, Zona Loma Larga Oriente, 66266 Monterrey, N.L., México",
    "longitude": -100.33304,
    "latitude": 25.652222,
    "status": "Acepted",
    "open": false,
    "workingTime": "09am a 22pm",
    "rating": null,
    "avgPreparationTime": null,
    "recentOrderCount": null,
    "userId": "user_2qJAlaqnXM3NSL1Ad8P1HfT19Ta",
    "categoryId": "9c4ad151-3bd9-4dca-9705-26d777340ed1",
    "createdAt": "2024-12-16T17:39:55.822Z",
    "updatedAt": "2024-12-16T17:48:20.955Z",
    "deletedAt": null
  },
  {
    "id": "9e1008e7-40e8-42c4-b0aa-b33a78d9da1f",
    "name": "McDonald's",
    "description": "Comida rápida internacional.",
    "logo": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/business/mcdonalds_logo.png",
    "banner": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/business/mcdonalds_banner.png",
    "phone": "+5491167024430",
    "address": "Av Reforma 1234, Centro, 01000 Ciudad de México, CDMX, México",
    "longitude": -99.1332,
    "latitude": 19.4326,
    "status": "Acepted",
    "open": true,
    "workingTime": "24 horas",
    "rating": 4.2,
    "avgPreparationTime": 15,
    "recentOrderCount": 245,
    "userId": "user_3rKBlaqnXM3NSL1Ad8P1HfT29Ub",
    "categoryId": "9c4ad151-3bd9-4dca-9705-26d777340ed1",
    "createdAt": "2024-12-15T10:20:30.500Z",
    "updatedAt": "2024-12-16T18:15:45.123Z",
    "deletedAt": null
  }
]



function BusinessList() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  
  // Estados para búsqueda y filtros
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [openFilter, setOpenFilter] = useState('')
  
  // Hook de paginación
  const {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  } = usePagination(5) // Comenzar con 5 elementos por página

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      // Generar más datos de ejemplo para mostrar la paginación
      const moreBusinesses: Business[] = []
      const statuses = ['Acepted', 'Pending', 'Rejected']
      const opens = [true, false]
      
      for (let i = 0; i < 25; i++) {
        moreBusinesses.push({
          ...mockBusinesses[i % mockBusinesses.length],
          id: `business-${i}`,
          name: `${mockBusinesses[i % mockBusinesses.length].name} ${i + 1}`,
          status: statuses[i % statuses.length],
          open: opens[i % opens.length],
        })
      }
      setBusinesses(moreBusinesses)
      setLoading(false)
    }, 1500)
  }, [])

  // Filtrar negocios usando la utilidad
  const filteredBusinesses = useMemo(() => {
    return filterBusinesses(businesses, searchQuery, statusFilter, openFilter)
  }, [businesses, searchQuery, statusFilter, openFilter])

  // Configuración de paginación (usar datos filtrados)
  const paginationConfig = {
    currentPage,
    pageSize,
    total: filteredBusinesses.length,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50]
  }

  // Configuración de búsqueda y filtros
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    handlePageChange(1) // Resetear a la primera página al buscar
  }, [handlePageChange])

  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    setStatusFilter('')
    setOpenFilter('')
    handlePageChange(1)
  }, [handlePageChange])

  // Obtener filtros usando la utilidad
  const searchFilters = getBusinessSearchFilters(
    statusFilter,
    openFilter,
    (value: string) => {
      setStatusFilter(value)
      handlePageChange(1)
    },
    (value: string) => {
      setOpenFilter(value)
      handlePageChange(1)
    }
  )

  // Obtener columnas de la tabla
  const columns = getBusinessTableColumns()

  const handleRowClick = (business: Business) => {
    console.log('Clicked business:', business.name)
    // Aquí podrías navegar a la página de detalles del comercio
  }

  return (
    <div className="space-y-8 bg-white">
     

      {/* Search and Filters */}
      <SearchWithFilters
        placeholder="Buscar comercios por nombre, descripción o dirección..."
        onSearch={handleSearch}
        onReset={handleResetFilters}
        filters={searchFilters}
      />

      

      {/* Stats cards */}
      <BusinessStats businesses={filteredBusinesses} />

      {/* Table */}
      
        <Table
          data={filteredBusinesses}
          columns={columns}
          loading={loading}
          emptyMessage="No hay comercios registrados"
          onRowClick={handleRowClick}
          pagination={paginationConfig}
        />

    </div>
  )
}

export default BusinessList 