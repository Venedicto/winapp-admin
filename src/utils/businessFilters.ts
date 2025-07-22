export const getBusinessSearchFilters = (
  statusFilter: string,
  openFilter: string,
  onStatusChange: (value: string) => void,
  onOpenChange: (value: string) => void
) => [
  {
    label: 'Estado',
    key: 'status',
    value: statusFilter,
    onChange: onStatusChange,
    options: [
      { label: 'Aceptado', value: 'Acepted' },
      { label: 'Pendiente', value: 'Pending' },
      { label: 'Rechazado', value: 'Rejected' }
    ]
  },
  {
    label: 'Disponibilidad',
    key: 'open',
    value: openFilter,
    onChange: onOpenChange,
    options: [
      { label: 'Abierto', value: 'open' },
      { label: 'Cerrado', value: 'closed' }
    ]
  }
]

// Configuración de opciones para diferentes tipos de filtros
export const businessStatusOptions = [
  { label: 'Aceptado', value: 'Acepted' },
  { label: 'Pendiente', value: 'Pending' },
  { label: 'Rechazado', value: 'Rejected' }
]

export const businessAvailabilityOptions = [
  { label: 'Abierto', value: 'open' },
  { label: 'Cerrado', value: 'closed' }
]

// Función para filtrar negocios
export const filterBusinesses = (
  businesses: any[], 
  searchQuery: string, 
  statusFilter: string, 
  openFilter: string
) => {
  return businesses.filter(business => {
    // Filtro de búsqueda (busca en nombre, descripción y dirección)
    const matchesSearch = searchQuery === '' || 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.address.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filtro por estado
    const matchesStatus = statusFilter === '' || business.status === statusFilter
    
    // Filtro por estado abierto/cerrado
    const matchesOpen = openFilter === '' || 
      (openFilter === 'open' && business.open) ||
      (openFilter === 'closed' && !business.open)
    
    return matchesSearch && matchesStatus && matchesOpen
  })
} 