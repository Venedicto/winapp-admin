# Utilidades de Business

Este directorio contiene utilidades reutilizables para el manejo de datos de negocios en la aplicación.

## 📊 businessTableColumns.tsx

Define las configuraciones de columnas para las tablas de negocios.

### Funciones disponibles:

#### `getBusinessTableColumns()`
Retorna la configuración básica de columnas para mostrar negocios:
- Logo
- Nombre y descripción
- Dirección y teléfono
- Propietario
- Estado
- Acciones

#### `getExtendedBusinessTableColumns()`
Retorna una configuración extendida que incluye:
- Todas las columnas básicas
- Estado de apertura (abierto/cerrado)
- Rating
- Acciones

### Ejemplo de uso:
```tsx
import { getBusinessTableColumns } from '../utils'

const columns = getBusinessTableColumns()
```

## 🔍 businessFilters.ts

Contiene utilidades para filtrado y búsqueda de negocios.

### Funciones disponibles:

#### `getBusinessSearchFilters(statusFilter, openFilter, onStatusChange, onOpenChange)`
Genera la configuración de filtros para el componente SearchWithFilters.

**Parámetros:**
- `statusFilter`: string - Valor actual del filtro de estado
- `openFilter`: string - Valor actual del filtro de disponibilidad
- `onStatusChange`: function - Callback para cambios en el filtro de estado
- `onOpenChange`: function - Callback para cambios en el filtro de disponibilidad

#### `filterBusinesses(businesses, searchQuery, statusFilter, openFilter)`
Filtra un array de negocios basado en los criterios de búsqueda.

**Parámetros:**
- `businesses`: Business[] - Array de negocios a filtrar
- `searchQuery`: string - Texto de búsqueda
- `statusFilter`: string - Filtro por estado
- `openFilter`: string - Filtro por disponibilidad

**Retorna:** Business[] - Array filtrado

### Constantes exportadas:
- `businessStatusOptions`: Opciones para el filtro de estado
- `businessAvailabilityOptions`: Opciones para el filtro de disponibilidad

### Ejemplo de uso:
```tsx
import { getBusinessSearchFilters, filterBusinesses } from '../utils'

// Configurar filtros
const searchFilters = getBusinessSearchFilters(
  statusFilter,
  openFilter,
  setStatusFilter,
  setOpenFilter
)

// Filtrar datos
const filteredData = filterBusinesses(
  businesses, 
  searchQuery, 
  statusFilter, 
  openFilter
)
```

## 📦 index.ts

Archivo de re-exportación que permite importar todas las utilidades desde un solo punto:

```tsx
import { 
  getBusinessTableColumns, 
  getBusinessSearchFilters, 
  filterBusinesses 
} from '../utils'
```

## 🎯 Beneficios de esta arquitectura:

1. **Reutilización**: Las configuraciones pueden usarse en múltiples componentes
2. **Mantenimiento**: Cambios centralizados en un solo lugar
3. **Testabilidad**: Funciones puras fáciles de testear
4. **Legibilidad**: Componentes más limpios y enfocados en la lógica de UI
5. **Consistencia**: Garantiza que todas las tablas usen la misma configuración 