interface StatsCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: string
  loading?: boolean
  onClick?: () => void
  growth?: {
    value: string
    isPositive: boolean
    icon?: 'arrow' | 'dot' | 'pulse'
  }
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  loading = false, 
  onClick,
  growth 
}: StatsCardProps) {
  const baseClasses = "bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 group"
  const clickableClasses = onClick ? "cursor-pointer" : ""

  const renderGrowthIcon = () => {
    if (!growth) return null

    switch (growth.icon) {
      case 'arrow':
        return (
          <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" />
          </svg>
        )
      case 'pulse':
        return <div className="w-3 h-3 bg-purple-500 rounded-full mr-1 animate-pulse"></div>
      case 'dot':
      default:
        return <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
    }
  }

  return (
    <div 
      className={`${baseClasses} ${clickableClasses}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-purple-600 group-hover:scale-110 transition-transform">
            {loading ? '...' : value}
          </p>
          {growth && (
            <div className="flex items-center mt-2 text-xs">
              {renderGrowthIcon()}
              <span className={`font-medium ${
                growth.isPositive ? 'text-green-600' : 
                growth.icon === 'pulse' ? 'text-purple-600' : 'text-orange-600'
              }`}>
                {growth.value}
              </span>
            </div>
          )}
          {subtitle && !growth && (
            <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
          )}
        </div>
        <div className="text-4xl group-hover:scale-110 transition-transform">{icon}</div>
      </div>
    </div>
  )
} 