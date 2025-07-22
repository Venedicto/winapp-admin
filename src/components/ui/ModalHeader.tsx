interface ModalHeaderProps {
  title: string
  gradient?: boolean
}

export default function ModalHeader({ title, gradient = true }: ModalHeaderProps) {
  const baseClasses = "p-6 text-white"
  const gradientClasses = gradient 
    ? "bg-gradient-to-r from-purple-600 to-blue-600" 
    : "bg-purple-600"

  return (
    <div className={`${baseClasses} ${gradientClasses}`}>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  )
} 