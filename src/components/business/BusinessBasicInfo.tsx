import type { Business } from '../../types/Business'
import { useBusinessCategoryById } from '../../services/category'

interface BusinessBasicInfoProps {
  business: Business
}

function BusinessBasicInfo({ business }: BusinessBasicInfoProps) {
  const { data: categoryResponse,isLoading,error } = useBusinessCategoryById(business.categoryId)
  const category = categoryResponse?.data?.businessCategory
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Banner */}
      <div className="h-48 bg-gradient-to-r from-purple-500 to-purple-700 relative">
        <div className="absolute inset-0 bg-black/20" />
        {/* Logo */}
        <div className="absolute bottom-4 left-6">
          <div className="w-20 h-20 bg-white rounded-xl shadow-lg overflow-hidden border-4 border-white">
            <img 
              src={business.logo || '/placeholder-logo.png'} 
              alt={`Logo de ${business.name}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-logo.png';
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Información */}
      <div className="p-6 pt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{business.name}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">{business.description}</p>
        
        {/* Categoría */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">Categoría:</span>
          <div className="flex items-center gap-2">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
              </div>
            ) : category ? (
              <>
                {category.image && (
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-5 h-5 rounded object-cover"
                  />
                )}
                <span className="text-sm font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                  {category.name}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {business.categoryId}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessBasicInfo