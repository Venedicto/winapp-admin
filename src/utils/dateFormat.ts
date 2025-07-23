


export const formatDateAgora = (date: string) => {
  const dateObj = new Date(date)
  const now = new Date()
  const diffInMs = now.getTime() - dateObj.getTime()
  
  // Convertir a diferentes unidades de tiempo
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30))
  const diffInYears = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365))

  // Retornar el formato apropiado
  if (diffInMinutes < 1) {
    return 'hace un momento'
  } else if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? 'hace 1 minuto' : `hace ${diffInMinutes} minutos`
  } else if (diffInHours < 24) {
    return diffInHours === 1 ? 'hace 1 hora' : `hace ${diffInHours} horas`
  } else if (diffInDays < 30) {
    return diffInDays === 1 ? 'hace 1 día' : `hace ${diffInDays} días`
  } else if (diffInMonths < 12) {
    return diffInMonths === 1 ? 'hace 1 mes' : `hace ${diffInMonths} meses`
  } else {
    return diffInYears === 1 ? 'hace 1 año' : `hace ${diffInYears} años`
  }
}