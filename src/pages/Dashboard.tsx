export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Comercios Activos</p>
              <p className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform">124</p>
              <div className="flex items-center mt-2 text-xs">
                <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" />
                </svg>
                <span className="text-green-600 font-medium">+12% vs mes anterior</span>
              </div>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">🏪</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Comercios Pendientes</p>
              <p className="text-3xl font-bold text-orange-500 group-hover:scale-110 transition-transform">8</p>
              <div className="flex items-center mt-2 text-xs">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
                <span className="text-orange-600 font-medium">Requieren revisión</span>
              </div>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">⏳</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Usuarios Registrados</p>
              <p className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform">2,847</p>
              <div className="flex items-center mt-2 text-xs">
                <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" />
                </svg>
                <span className="text-green-600 font-medium">+247 esta semana</span>
              </div>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">👥</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Balance de Puntos</p>
              <p className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform">45,220</p>
              <div className="flex items-center mt-2 text-xs">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-1 animate-pulse"></div>
                <span className="text-purple-600 font-medium">Sistema activo</span>
              </div>
            </div>
            <div className="text-4xl group-hover:scale-110 transition-transform">⭐</div>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent activity */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Actividad Reciente</h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium hover:underline">
              Ver todas
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-white rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
                🏪
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Nuevo comercio registrado</p>
                <p className="text-sm text-gray-600">Burger King solicitó afiliación</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Hace 2 horas</p>
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-white rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl">
                👤
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Usuario nuevo</p>
                <p className="text-sm text-gray-600">María González se registró</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Hace 4 horas</p>
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-white rounded-xl border border-yellow-100 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-white text-xl">
                ⭐
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">Puntos canjeados</p>
                <p className="text-sm text-gray-600">Usuario canjeó 500 puntos</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Hace 6 horas</p>
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-6">
          

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Estado del Sistema</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Servidor</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Activo</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Base de datos</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Activo</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">API</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Operativo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 