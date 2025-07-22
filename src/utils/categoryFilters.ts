import type { BusinessCategory, ProductCategory } from '../types/Category'

export function filterCategories(
  categories: (BusinessCategory | ProductCategory)[],
  searchQuery: string
): (BusinessCategory | ProductCategory)[] {
  if (!searchQuery.trim()) {
    return categories
  }

  const query = searchQuery.toLowerCase().trim()
  
  return categories.filter(category => {
    // Buscar en el nombre
    const nameMatch = category.name.toLowerCase().includes(query)
    
    // Buscar en el ID
    const idMatch = category.id.toLowerCase().includes(query)
    
    return nameMatch || idMatch
  })
}

export function getCategorySearchFilters() {
  return [] // Por ahora no agregamos filtros adicionales, solo búsqueda de texto
} 