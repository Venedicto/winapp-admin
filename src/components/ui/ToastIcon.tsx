interface ToastIconProps {
  type: 'success' | 'error' | 'warning' | 'info'
}

export default function ToastIcon({ type }: ToastIconProps) {
  const iconConfig = {
    success: {
      color: 'text-green-600',
      path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    error: {
      color: 'text-red-600', 
      path: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    warning: {
      color: 'text-yellow-600',
      path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z'
    },
    info: {
      color: 'text-blue-600',
      path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  }

  const config = iconConfig[type]

  return (
    <svg 
      className={`w-5 h-5 ${config.color} flex-shrink-0`} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d={config.path} 
      />
    </svg>
  )
} 