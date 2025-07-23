import * as Dialog from '@radix-ui/react-dialog'

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
      <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
    </div>
  )
} 