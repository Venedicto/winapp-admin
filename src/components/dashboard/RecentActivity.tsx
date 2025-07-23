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

interface RecentActivityProps {
  activities: Activity[]
  loading: boolean
  onViewAll: () => void
}

export function RecentActivity({ activities, loading, onViewAll }: RecentActivityProps) {
  if (loading) {
    return (
      <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Actividad Reciente</h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-500 mt-2">Cargando actividad reciente...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Actividad Reciente</h2>
        <button 
          onClick={onViewAll}
          className="text-purple-600 hover:text-purple-700 text-sm font-medium hover:underline"
        >
          Ver todas
        </button>
      </div>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay actividad reciente</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ActivityItem({ activity }: { activity: Activity }) {
  return (
    <div 
      className={`flex items-center space-x-4 p-4 bg-gradient-to-r from-${activity.color}-50 to-white rounded-xl border border-${activity.color}-100 hover:shadow-md transition-all duration-300`}
    >
      <div className={`w-12 h-12 bg-gradient-to-br from-${activity.color}-500 to-${activity.color}-600 rounded-xl flex items-center justify-center text-white text-xl`}>
        {activity.icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{activity.title}</p>
        <p className="text-sm text-gray-600">{activity.description}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">{activity.time}</p>
        <span className={`inline-block w-2 h-2 bg-${activity.color}-500 rounded-full`}></span>
      </div>
    </div>
  )
} 