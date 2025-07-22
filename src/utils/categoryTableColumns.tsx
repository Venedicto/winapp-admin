import { type TableColumn } from '../components/ui/Table'
import type { BusinessCategory, ProductCategory, CategoryType } from '../types/Category'
import { CategoryActionButtons } from '../components/category'

export const getCategoryTableColumns = (
  type: CategoryType,
  onEdit?: (category: BusinessCategory | ProductCategory) => void,
  onDelete?: (categoryId: string) => void
): TableColumn<BusinessCategory | ProductCategory>[] => [
  {
    key: 'image',
    title: 'Imagen',
    width: '15%',
    hideOnMobile: true,
    render: (image: string, category: BusinessCategory | ProductCategory) => (
      <div className="flex-shrink-0 h-12 w-12 lg:h-16 lg:w-16">
        <img
          className="h-12 w-12 lg:h-16 lg:w-16 rounded-lg object-cover border-2 border-white shadow-sm"
          src={image}
          alt={`Imagen de ${category.name}`}
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
    title: 'Nombre',
    width: '35%',
    sortable: true,
    render: (name: string, category: BusinessCategory | ProductCategory) => (
      <div className="w-full overflow-hidden">
        <div className="text-sm lg:text-base font-semibold text-gray-900 truncate">
          {name}
        </div>
        <div className="text-xs lg:text-sm text-gray-500 truncate">
          ID: {category.id.substring(0, 8)}...
        </div>
      </div>
    )
  },
  {
    key: 'createdAt',
    title: 'Fecha de Creación',
    width: '20%',
    hideOnMobile: true,
    sortable: true,
    render: (createdAt: string) => {
      const date = new Date(createdAt)
      return (
        <div className="text-sm text-gray-900">
          <div>{date.toLocaleDateString('es-ES')}</div>
          <div className="text-xs text-gray-500">
            {date.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      )
    }
  },
  {
    key: 'updatedAt',
    title: 'Última Actualización',
    width: '20%',
    hideOnMobile: true,
    hideOnTablet: true,
    sortable: true,
    render: (updatedAt: string) => {
      const date = new Date(updatedAt)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - date.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      return (
        <div className="text-sm text-gray-900">
          <div>{date.toLocaleDateString('es-ES')}</div>
          <div className="text-xs text-gray-500">
            {diffDays === 1 ? 'Hace 1 día' : `Hace ${diffDays} días`}
          </div>
        </div>
      )
    }
  },
  {
    key: 'actions',
    title: 'Acciones',
    width: '10%',
    hideOnMobile: true,
    render: (_, category: BusinessCategory | ProductCategory) => (
      <CategoryActionButtons 
        category={category} 
        type={type}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    )
  }
] 