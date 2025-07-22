import type { BusinessCategory, ProductCategory, CategoryType } from '../../types/Category'

interface CategoryStatsProps {
  categories: (BusinessCategory | ProductCategory)[]
  type: CategoryType
}

function CategoryStats({ categories, type }: CategoryStatsProps) {
  const typeConfig = {
    business: {
      title: 'Categorías de Negocio',
      icon: '🏪',
      activeIcon: '✅',
      recentIcon: '📈'
    },
    product: {
      title: 'Categorías de Producto',
      icon: '📦',
      activeIcon: '✅',
      recentIcon: '📈'
    }
  }

  const config = typeConfig[type]
  
  // Filtrar categorías activas (no eliminadas)
  const activeCategories = categories.filter(c => !c.deletedAt)
  
  // Calcular categorías recientes (últimos 30 días)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const recentCategories = activeCategories.filter(c => new Date(c.createdAt) >= thirtyDaysAgo)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1 truncate">Total {config.title}</p>
            <p className="text-xl lg:text-2xl font-bold text-purple-600">{categories.length}</p>
          </div>
          <div className="text-2xl lg:text-3xl flex-shrink-0 ml-2">{config.icon}</div>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1 truncate">Categorías Activas</p>
            <p className="text-xl lg:text-2xl font-bold text-green-600">
              {activeCategories.length}
            </p>
          </div>
          <div className="text-2xl lg:text-3xl flex-shrink-0 ml-2">{config.activeIcon}</div>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 min-w-0 sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs lg:text-sm font-medium text-gray-600 mb-1 truncate">Creadas (30 días)</p>
            <p className="text-xl lg:text-2xl font-bold text-blue-600">
              {recentCategories.length}
            </p>
          </div>
          <div className="text-2xl lg:text-3xl flex-shrink-0 ml-2">{config.recentIcon}</div>
        </div>
      </div>
    </div>
  )
}

export default CategoryStats 