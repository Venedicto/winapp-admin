import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBusinesses } from '../services/business'
import { useClients } from '../services/user'
import { useBusinessCategories, useProductCategories } from '../services/category'
import { BUSINESS_STATUS } from '../types/Business'
import { formatDateAgora } from '../utils/dateFormat'
import {
  DashboardHeader,
  StatsCard,
  RecentActivity,
  SystemStatus,
  QuickActions
} from '../components/dashboard'

export default function Dashboard() {
  const navigate = useNavigate()
  
  // Obtener datos reales de los servicios
  const { data: businessResponse, isLoading: businessLoading, error: businessError } = useBusinesses()
  const { data: clientsResponse, isLoading: clientsLoading, error: clientsError } = useClients()
  const { data: businessCategoriesResponse, isLoading: businessCategoriesLoading } = useBusinessCategories()
  const { data: productCategoriesResponse, isLoading: productCategoriesLoading } = useProductCategories()

  // Extraer datos de las respuestas
  const businesses = businessResponse?.data?.businesses || []
  const clients = clientsResponse?.data || []
  const businessCategories = businessCategoriesResponse?.data?.businessCategories || []
  const productCategories = productCategoriesResponse?.data?.productCategories || []

  // Calcular estadísticas dinámicas
  const stats = useMemo(() => {
    // Estadísticas de comercios
    const totalBusinesses = businesses.length
    const activeBusinesses = businesses.filter(b => b.status === BUSINESS_STATUS.ACCEPTED).length
    const pendingBusinesses = businesses.filter(b => b.status === BUSINESS_STATUS.PENDING).length
    const rejectedBusinesses = businesses.filter(b => b.status === BUSINESS_STATUS.REJECTED).length
    
    // Estadísticas de usuarios
    const totalUsers = clients.length
    const clientUsers = clients.filter(u => u.role === 'Client').length
    const partnerUsers = clients.filter(u => u.role === 'Partner').length
    
    // Estadísticas de categorías
    const totalCategories = businessCategories.length + productCategories.length
    
    // Calcular crecimiento simulado (en un proyecto real esto vendría del backend)
    const businessGrowth = totalBusinesses > 0 ? Math.floor((activeBusinesses / totalBusinesses) * 100) : 0
    const userGrowth = Math.floor(Math.random() * 50) + 10 // Simulado
    
    return {
      totalBusinesses,
      activeBusinesses,
      pendingBusinesses,
      rejectedBusinesses,
      totalUsers,
      clientUsers,
      partnerUsers,
      totalCategories,
      businessGrowth,
      userGrowth
    }
  }, [businesses, clients, businessCategories, productCategories])

  // Generar actividad reciente basada en datos reales
  const recentActivity = useMemo(() => {
    interface Activity {
      id: string
      type: string
      title: string
      description: string
      time: string
      icon: string
      color: string
      status?: string
      role?: string
    }
    
    const activities: Activity[] = []
    
    // Actividades de comercios más recientes (sin createdAt, usar orden del array)
    const recentBusinesses = businesses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 2)
    
    recentBusinesses.forEach((business, index) => {
      activities.push({
        id: `business-${business.id}`,
        type: 'business',
        title: 'Comercio registrado',
        description: `${business.name} en el sistema`,
        time: formatDateAgora(business.createdAt),
        icon: '🏪',
        color: 'purple',
        status: business.status
      })
    })
    
    // Actividades de usuarios más recientes (ordenar por fecha de creación si existe)
    const recentUsers = clients
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 2)
    
    recentUsers.forEach((user) => {
      activities.push({
        id: `user-${user.id}`,
        type: 'user',
        title: 'Usuario registrado',
        description: `${user.fullName} - ${user.email}`,
        time: formatDateAgora(user.createdAt),
        icon: '👤',
        color: 'green',
        role: user.role
      })
    })
    
    return activities.slice(0, 4)
  }, [businesses, clients])

  // Estado del sistema basado en las queries
  const systemStatus = {
    server: !businessError && !clientsError ? 'active' : 'error',
    database: !businessLoading && !clientsLoading ? 'active' : 'loading',
    api: businesses.length > 0 || clients.length > 0 ? 'active' : 'warning'
  }

  // Función helper para formatear números
  function formatNumber(num: number) {
    return num.toLocaleString('es-ES')
  }

  // Configuración de las tarjetas de estadísticas
  const statsCards = [
    {
      title: 'Comercios Activos',
      value: formatNumber(stats.activeBusinesses),
      icon: '🏪',
      loading: businessLoading,
      onClick: () => navigate('/dashboard/comercios'),
      growth: {
        value: `${stats.businessGrowth}% de aprobación`,
        isPositive: true,
        icon: 'arrow' as const
      }
    },
    {
      title: 'Comercios Pendientes',
      value: stats.pendingBusinesses,
      icon: '⏳',
      loading: businessLoading,
      onClick: () => navigate('/dashboard/comercios?status=pending'),
      growth: {
        value: 'Requieren revisión',
        isPositive: false,
        icon: 'dot' as const
      }
    },
    {
      title: 'Usuarios Registrados',
      value: formatNumber(stats.totalUsers),
      icon: '👥',
      loading: clientsLoading,
      onClick: () => navigate('/dashboard/usuarios'),
      growth: {
        value: `${stats.clientUsers} clientes activos`,
        isPositive: true,
        icon: 'arrow' as const
      }
    },
    {
      title: 'Total Categorías',
      value: stats.totalCategories,
      icon: '📋',
      loading: businessCategoriesLoading || productCategoriesLoading,
      growth: undefined
    }
  ]

  // Configuración de acciones rápidas
  const quickActions = [
    {
      label: 'Revisar Pendientes',
      onClick: () => navigate('/dashboard/comercios?status=pending'),
      count: stats.pendingBusinesses,
      color: 'orange' as const
    },
    {
      label: 'Gestionar Comercios',
      onClick: () => navigate('/dashboard/comercios'),
      color: 'purple' as const
    },
    {
      label: 'Ver Usuarios',
      onClick: () => navigate('/dashboard/usuarios'),
      color: 'green' as const
    }
  ]

  return (
    <div className="space-y-8">


      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value={card.value}
            subtitle=""
            icon={card.icon}
            loading={card.loading}
            onClick={card.onClick}
            growth={card.growth}
          />
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent activity */}
        <RecentActivity
          activities={recentActivity}
          loading={businessLoading || clientsLoading}
          onViewAll={() => navigate('/dashboard/comercios')}
        />

        {/* System status and quick actions */}
        <div className="space-y-6">
          <SystemStatus status={systemStatus} />
          <QuickActions actions={quickActions} />
        </div>
      </div>
    </div>
  )
} 