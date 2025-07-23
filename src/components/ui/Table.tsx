import { type ReactNode, useState, useMemo } from 'react'

/* 
  Ejemplo de uso con paginación:

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  const paginationConfig = {
    currentPage,
    pageSize,
    total: data.length, // o el total desde tu API
    onPageChange: setCurrentPage,
    onPageSizeChange: (size: number) => {
      setPageSize(size)
      setCurrentPage(1) // Resetear a la primera página
    },
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100]
  }

  <Table
    data={data}
    columns={columns}
    pagination={paginationConfig}
    // ... otras props
  />
*/

interface TableColumn<T> {
  key: keyof T | string
  title: string
  render?: (value: any, row: T, index: number) => ReactNode
  className?: string
  width?: string
  sortable?: boolean
  hideOnMobile?: boolean
  hideOnTablet?: boolean
  align?: 'left' | 'center' | 'right'
}

interface PaginationConfig {
  currentPage: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  showSizeChanger?: boolean
  pageSizeOptions?: number[]
}

interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (row: T, index: number) => void
  className?: string
  mobileCardView?: boolean
  striped?: boolean
  hover?: boolean
  compact?: boolean
  pagination?: PaginationConfig
}

// Componente de carga mejorado
function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-40 sm:h-48 lg:h-56">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 border-4 border-purple-200 border-t-purple-600"></div>
        <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 border-2 border-purple-400 opacity-20"></div>
      </div>
      <p className="mt-4 text-sm text-gray-500 animate-pulse">Cargando datos...</p>
    </div>
  )
}

// Estado vacío mejorado
function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 sm:py-16 lg:py-20">
      <div className="relative mb-6">
        <div className="text-6xl sm:text-7xl lg:text-8xl opacity-30 select-none">📋</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-50 animate-pulse"></div>
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Sin datos disponibles</h3>
      <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto px-4">{message}</p>
    </div>
  )
}

// Componente de paginación
function Pagination({ 
  currentPage, 
  pageSize, 
  total, 
  onPageChange, 
  onPageSizeChange,
  showSizeChanger = true,
  pageSizeOptions = [10, 20, 50, 100]
}: PaginationConfig) {
  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (currentPage - 1) * pageSize + 1
  const endIndex = Math.min(currentPage * pageSize, total)

  const getVisiblePages = () => {
    const delta = 2
    const pages: (number | string)[] = []
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - delta; i <= currentPage + delta; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  if (total === 0) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-gray-50/50 border-t border-gray-200/50">
      {/* Información de registros */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Mostrando {startIndex} - {endIndex} de {total} registros
        </span>
        
        {/* Selector de tamaño de página */}
        {showSizeChanger && onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Mostrar:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="text-sm border border-gray-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Controles de navegación */}
      <div className="flex items-center gap-1">
        {/* Botón anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Números de página */}
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-purple-600 text-white'
                  : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Botón siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Vista de tarjetas móvil mejorada
function MobileCardView<T extends Record<string, any>>({ 
  data, 
  columns, 
  onRowClick,
  striped = false
}: { 
  data: T[], 
  columns: TableColumn<T>[], 
  onRowClick?: (row: T, index: number) => void,
  striped?: boolean
}) {
  const getValue = (row: T, key: keyof T | string): any => {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce((obj, k) => obj?.[k], row)
    }
    return row[key as keyof T]
  }

      return (
      <div className="space-y-4">
        {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200/80 ${
            onRowClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
          } ${striped && rowIndex % 2 === 1 ? 'bg-gray-50/50' : ''}`}
          onClick={() => onRowClick?.(row, rowIndex)}
        >
          {/* Efecto de brillo al hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          <div className="relative p-4 sm:p-5">
            {columns
              .filter(column => !column.hideOnMobile)
              .map((column, colIndex) => {
                const value = getValue(row, column.key)
                const content = column.render ? column.render(value, row, rowIndex) : value
                const alignment = column.align || 'left'
                
                return (
                  <div key={colIndex} className={`flex items-center justify-between py-2 ${colIndex === 0 ? 'pt-0' : ''} ${colIndex === columns.filter(c => !c.hideOnMobile).length - 1 ? 'pb-0' : 'border-b border-gray-100/50'}`}>
                    <span className="text-sm font-medium text-gray-600 min-w-0 flex-shrink-0 mr-4">
                      {column.title}
                    </span>
                    <span className={`text-sm text-gray-900 min-w-0 font-medium ${
                      alignment === 'center' ? 'text-center' : 
                      alignment === 'right' ? 'text-right' : 'text-left'
                    }`}>
                      {content}
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}

// Hook para ordenamiento - CORREGIDO
function useSorting<T extends Record<string, any>>(data: T[]) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return [...data]

    return [...data].sort((a, b) => {
      const getValue = (obj: T, key: keyof T | string): any => {
        if (typeof key === 'string' && key.includes('.')) {
          return key.split('.').reduce((o: any, k) => o?.[k], obj)
        }
        return obj[key as keyof T]
      }

      const aValue = getValue(a, sortConfig.key!)
      const bValue = getValue(b, sortConfig.key!)

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [data, sortConfig])

  const requestSort = (key: keyof T | string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  return { sortedData, sortConfig, requestSort }
}

// Hook para paginación LOCAL
function usePagination(initialPageSize: number = 10) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1) // Resetear a la primera página cuando cambia el tamaño
  }

  const resetPagination = () => {
    setCurrentPage(1)
  }

  // Función para obtener información de paginación
  const getPaginationInfo = (totalItems: number) => {
    const totalPages = Math.ceil(totalItems / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, totalItems)
    
    return {
      totalPages,
      startIndex,
      endIndex,
      showingFrom: startIndex + 1,
      showingTo: endIndex,
      totalItems
    }
  }

  return {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    resetPagination,
    getPaginationInfo
  }
}

export default function Table<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  emptyMessage = "No hay datos disponibles",
  onRowClick,
  className = "",
  mobileCardView = true,
  striped = true,
  hover = true,
  compact = false,
  pagination
}: TableProps<T>) {
  const { sortedData, sortConfig, requestSort } = useSorting(data)

  // Aplicar paginación si está configurada
  const getPaginatedData = () => {
    if (!pagination) return sortedData
    
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize
    const endIndex = startIndex + pagination.pageSize
    return sortedData.slice(startIndex, endIndex)
  }

  const displayData = getPaginatedData()

  if (loading) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 ${className}`}>
        <LoadingSpinner />
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 ${className}`}>
        <EmptyState message={emptyMessage} />
        {pagination && (
          <Pagination 
            currentPage={pagination.currentPage} 
            pageSize={pagination.pageSize} 
            total={pagination.total} 
            onPageChange={pagination.onPageChange} 
            onPageSizeChange={pagination.onPageSizeChange} 
            showSizeChanger={pagination.showSizeChanger} 
            pageSizeOptions={pagination.pageSizeOptions}
          />
        )}
      </div>
    )
  }

  const getValue = (row: T, key: keyof T | string): any => {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce((obj, k) => obj?.[k], row)
    }
    return row[key as keyof T]
  }

  const getSortIcon = (columnKey: keyof T | string) => {
    if (sortConfig.key !== columnKey) {
      return (
        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    
    return sortConfig.direction === 'asc' ? (
      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
  }

  return (
    <div className={`rounded-3xl shadow-xl border-2 border-white/60 overflow-hidden transition-all duration-300 hover:shadow-2xl ${className}`}>
      {/* Vista de tarjetas para móvil */}
      {mobileCardView && (
        <div className="block lg:hidden p-4 sm:p-6">
          <MobileCardView 
            data={displayData} 
            columns={columns} 
            onRowClick={onRowClick}
            striped={striped}
          />
        </div>
      )}

      {/* Vista de tabla para desktop */}
      <div className={`${mobileCardView ? 'hidden lg:block' : 'block'} w-full overflow-scroll`}>
        <table className="w-full min-w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50/90 to-gray-100/80 backdrop-blur-sm">
              {columns.map((column, index) => {
                const responsiveClasses = [
                  column.hideOnMobile ? 'hidden sm:table-cell' : '',
                  column.hideOnTablet ? 'hidden lg:table-cell' : ''
                ].filter(Boolean).join(' ')

                const alignment = column.align || 'left'
                const alignmentClass = alignment === 'center' ? 'text-center' : 
                                    alignment === 'right' ? 'text-right' : 'text-left'

                return (
                  <th
                    key={index}
                    className={`group px-4 lg:px-6 py-4 lg:py-5 ${alignmentClass} text-xs lg:text-sm font-bold text-gray-700 uppercase tracking-wider ${column.className || ''} ${responsiveClasses} ${
                      column.sortable ? 'cursor-pointer hover:bg-gray-100/60 transition-colors select-none' : ''
                    } ${compact ? 'py-2 lg:py-3' : ''} whitespace-nowrap border-b border-gray-200/50`}
                    onClick={() => column.sortable && requestSort(column.key)}
                  >
                    <div className={`flex items-center gap-2 ${alignmentClass === 'text-center' ? 'justify-center' : alignmentClass === 'text-right' ? 'justify-end' : 'justify-start'}`}>
                      <span className="truncate">{column.title}</span>
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`group transition-all duration-200 ${
                  hover ? 'hover:bg-gradient-to-r hover:from-purple-50/60 hover:to-blue-50/40' : ''
                } ${
                  striped && rowIndex % 2 === 1 ? 'bg-gray-50/30' : ''
                } ${
                  onRowClick ? 'cursor-pointer hover:scale-[1.001] active:scale-[0.999]' : ''
                }`}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {columns.map((column, colIndex) => {
                  const value = getValue(row, column.key)
                  const content = column.render ? column.render(value, row, rowIndex) : value
                  
                  const responsiveClasses = [
                    column.hideOnMobile ? 'hidden sm:table-cell' : '',
                    column.hideOnTablet ? 'hidden lg:table-cell' : ''
                  ].filter(Boolean).join(' ')

                  const alignment = column.align || 'left'
                  const alignmentClass = alignment === 'center' ? 'text-center' : 
                                      alignment === 'right' ? 'text-right' : 'text-left'
                  
                  return (
                    <td
                      key={colIndex}
                      className={`px-4 lg:px-6 py-3 lg:py-4 text-sm lg:text-base text-gray-900 ${alignmentClass} ${column.className || ''} ${responsiveClasses} ${compact ? 'py-2 lg:py-3' : ''} whitespace-nowrap ${
                        rowIndex < displayData.length - 1 ? 'border-b border-gray-200/30' : ''
                      }`}
                    >
                      <div className="font-medium transition-colors group-hover:text-gray-800">
                        {content}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination 
          currentPage={pagination.currentPage} 
          pageSize={pagination.pageSize} 
          total={pagination.total} 
          onPageChange={pagination.onPageChange} 
          onPageSizeChange={pagination.onPageSizeChange} 
          showSizeChanger={pagination.showSizeChanger} 
          pageSizeOptions={pagination.pageSizeOptions}
        />
      )}
    </div>
  )
}

// Export tipos para reutilizar
export type { TableColumn, TableProps, PaginationConfig }

// Export hooks para reutilizar
export { usePagination } 