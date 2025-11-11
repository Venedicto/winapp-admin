/**
 * Función utilitaria temporal para manejar respuestas 400 "not found"
 * Cuando el backend retorna status 400 con mensajes de "no se encontraron" datos,
 * esta función permite retornar un array vacío en lugar de lanzar un error.
 *
 * @param response - Response object del fetch
 * @param emptyValue - Valor por defecto a retornar cuando no hay datos (default: [])
 * @returns Los datos parseados o el valor vacío si es un "not found"
 * @throws Error si es un error real que no es "not found"
 */
export async function handleEmptyListResponse<T>(
  response: Response,
  emptyValue: T = [] as T
): Promise<T> {
  // Si la respuesta es exitosa, parsear normalmente
  if (response.ok) {
    return response.json()
  }

  // Si es un 400 o 404, verificar si es un "not found"
  if (response.status === 400 || response.status === 404) {
    let errorData
    try {
      errorData = await response.json()
    } catch (parseError) {
      // Si es 404 sin JSON, asumir que no hay datos y retornar vacío
      return emptyValue
    }

    // Verificar mensajes comunes de "not found"
    const notFoundMessages = [
      'no se encontraron',
      'not found',
      'no encontrado',
      'sin resultados',
      'no results'
    ]

    const errorMessage = (errorData?.error || errorData?.message || errorData?.status || '').toLowerCase()
    const isNotFound = notFoundMessages.some(msg => errorMessage.includes(msg))

    // Si es un "not found", retornar valor vacío
    if (isNotFound) {
      return emptyValue
    }

    // Si es otro tipo de error 400/404, lanzarlo
    throw new Error(errorData?.error || errorData?.message || `Error ${response.status}`)
  }

  // Para otros códigos de error, lanzar error genérico
  throw new Error(`Error al obtener datos: ${response.statusText}`)
}
