import { UserButton } from '@clerk/clerk-react'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { 
  HiHome, 
  HiShoppingBag, 
  HiUsers, 
  HiFolder, 
  HiStar, 
  HiChartBar, 
  HiBell,
  HiChevronRight,
  HiOfficeBuilding,
  HiCube
} from 'react-icons/hi'

const menuItems = [
  {
    label: 'Dashboard',
    icon: HiHome,
    path: '/dashboard',
    description: 'Panel de control',
    active: false
  },
  {
    label: 'Comercios',
    icon: HiShoppingBag,
    path: '/dashboard/comercios',
    description: 'Gestionar tiendas',
    active: false
  },
  {
    label: 'Usuarios',
    icon: HiUsers,
    path: '/dashboard/usuarios',
    description: 'Base de usuarios',
    active: false
  },
  {
    label: 'Categorías',
    icon: HiFolder,
    path: '/dashboard/categorias',
    description: 'Organizar productos',
    active: false,
    hasSubmenu: true,
    submenu: [
      {
        label: 'Categorías de Negocio',
        icon: HiOfficeBuilding,
        path: '/dashboard/categorias/negocios',
        description: 'Gestionar categorías de comercios'
      },
      {
        label: 'Categorías de Producto',
        icon: HiCube,
        path: '/dashboard/categorias/productos',
        description: 'Gestionar categorías de productos'
      }
    ]
  },
  {
    label: 'Balance de Puntos',
    icon: HiStar,
    path: '/dashboard/puntos',
    description: 'Sistema de rewards',
    active: false
  },
  {
    label: 'Estadísticas',
    icon: HiChartBar,
    path: '/dashboard/estadisticas',
    description: 'Análisis y métricas',
    active: false
  },
  {
    label: 'Notificaciones',
    icon: HiBell,
    path: '/dashboard/notificaciones',
    description: 'Centro de mensajes',
    active: false
  }
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation()
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Auto-abrir submenús basado en la ruta actual
  useEffect(() => {
    if (location.pathname.startsWith('/dashboard/categorias')) {
      setOpenSubmenus(prev =>
        prev.includes('Categorías') ? prev : [...prev, 'Categorías']
      )
    }
  }, [location.pathname])

  // Cerrar menú mobile al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  const isSubmenuOpen = (label: string) => openSubmenus.includes(label)
  
  const isPathActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`w-64 lg:w-80 h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 overflow-hidden flex flex-col fixed left-0 top-0 z-40 lg:z-20 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-40 right-16 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-8 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10 px-4 lg:px-8 py-4 border-b border-white/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <img src="/images/iso.svg" alt="WinApp" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <h1 className="text-white text-lg lg:text-xl font-bold truncate">WinApp</h1>
                <p className="text-purple-200 text-sm lg:text-md truncate hidden lg:block">Panel administrador</p>
              </div>
            </div>
            {/* Botón cerrar para mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

      

        {/* Navigation */}
        <div className="relative z-10 px-3 lg:px-6 p-4 lg:p-6 pb-6 lg:pb-8 flex-1 overflow-y-auto">
          
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.hasSubmenu ? (
                  // Menu item with submenu
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`
                        group flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm w-full text-left
                        ${isPathActive(item.path) 
                          ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30' 
                          : 'hover:translate-x-1'
                        }
                      `}
                    >
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300 text-white">
                        <item.icon />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm truncate">{item.label}</p>
                        <p className="text-purple-200 text-xs truncate hidden lg:block">{item.description}</p>
                      </div>
                      <HiChevronRight 
                        className={`w-4 h-4 text-white/70 group-hover:text-white transition-all ${
                          isSubmenuOpen(item.label) ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                    
                    {/* Submenu */}
                    {isSubmenuOpen(item.label) && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.submenu?.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className={`
                              group flex items-center space-x-3 p-2 lg:p-3 rounded-lg transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm
                              ${location.pathname === subItem.path 
                                ? 'bg-white/30 shadow-md backdrop-blur-sm border border-white/40' 
                                : 'hover:translate-x-1'
                              }
                            `}
                          >
                            <div className="text-lg group-hover:scale-110 transition-transform duration-300 text-white">
                              <subItem.icon />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium text-xs truncate">{subItem.label}</p>
                              <p className="text-purple-200 text-xs truncate hidden lg:block">{subItem.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Regular menu item
                  <Link
                    to={item.path}
                    className={`
                      group flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm
                      ${isPathActive(item.path) 
                        ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30' 
                        : 'hover:translate-x-1'
                      }
                    `}
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300 text-white">
                      <item.icon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{item.label}</p>
                      <p className="text-purple-200 text-xs truncate hidden lg:block">{item.description}</p>
                    </div>
                    <HiChevronRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        </div>

       

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-80 w-full md:w-0 md:ml-0 ">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 lg:px-8 py-4 lg:py-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Botón hamburguesa para mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-6">
             <UserButton />
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-4 lg:p-8 overflow-auto">

            {children}
          </div>
      </div>
    </div>
  )
} 