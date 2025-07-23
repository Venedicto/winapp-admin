interface QuickAction {
  label: string
  onClick: () => void
  count?: number
  color: 'orange' | 'purple' | 'green'
  icon?: string
}

interface QuickActionsProps {
  actions: QuickAction[]
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Acceso Rápido</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <QuickActionButton
            key={index}
            label={action.label}
            onClick={action.onClick}
            count={action.count}
            color={action.color}
            icon={action.icon}
          />
        ))}
      </div>
    </div>
  )
}

interface QuickActionButtonProps {
  label: string
  onClick: () => void
  count?: number
  color: 'orange' | 'purple' | 'green'
  icon?: string
}

function QuickActionButton({ label, onClick, count, color, icon = '→' }: QuickActionButtonProps) {
  const colorClasses = {
    orange: 'from-orange-50 to-white border-orange-100',
    purple: 'from-purple-50 to-white border-purple-100',
    green: 'from-green-50 to-white border-green-100'
  }

  const textColorClasses = {
    orange: 'text-orange-600',
    purple: 'text-purple-600',
    green: 'text-green-600'
  }

  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-3 bg-gradient-to-r ${colorClasses[color]} border rounded-xl hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-700">{label}</span>
        <span className={`${textColorClasses[color]} ${count !== undefined ? 'font-bold' : ''}`}>
          {count !== undefined ? count : icon}
        </span>
      </div>
    </button>
  )
} 