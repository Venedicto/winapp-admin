interface EditButtonProps {
  onClick: () => void
  title?: string
  className?: string
}

export default function EditButton({ 
  onClick, 
  title = "Editar", 
  className = "" 
}: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors ${className}`}
      title={title}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
        />
      </svg>
    </button>
  )
} 