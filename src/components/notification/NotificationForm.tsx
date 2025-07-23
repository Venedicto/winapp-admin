import { useState, useEffect } from 'react'
import type { Notification, CreateNotificationRequest } from '../../types/Notification'
import Input from '../ui/Input'
import Button from '../ui/Button'
import Select from '../ui/Select'
import { useClients } from '../../services/user'

interface NotificationFormProps {
  notification?: Notification
  onSubmit: (data: CreateNotificationRequest) => void
  onCancel: () => void
  isLoading?: boolean
}

export function NotificationForm({ 
  notification, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}: NotificationFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    recipient: 'all' as 'all' | string,
    deliveryDate: ''
  })

  const { data: usersResponse } = useClients()
  const users = usersResponse?.data || []

  // Llenar formulario si estamos editando
  useEffect(() => {
    if (notification) {
      // Convertir deliveryDate a formato datetime-local si existe
      let formattedDate = ''
      if (notification.deliveryDate) {
        const date = new Date(notification.deliveryDate)
        formattedDate = date.toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm
      }

      setFormData({
        title: notification.title,
        body: notification.body,
        recipient: notification.userId || 'all',
        deliveryDate: formattedDate
      })
    }
  }, [notification])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData: CreateNotificationRequest = {
      title: formData.title,
      body: formData.body,
      userId: formData.recipient === 'all' ? null : formData.recipient,
      destination: formData.recipient === 'all' ? 'All' : 'Individual',
      deliveryDate: formData.deliveryDate ? new Date(formData.deliveryDate).toISOString() : null,
      data: { type: "Message" }
    }

    onSubmit(submitData)
  }

  const isFormValid = formData.title.trim() && formData.body.trim()

  // Opciones para el select de destinatario
  const recipientOptions = [
    { value: 'all', label: 'Todos los usuarios' },
    ...users.map(user => ({
      value: user.id,
      label: `${user.fullName} (${user.email})`
    }))
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Primera fila: Título y Destinatario */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título *
          </label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Ingresa el título de la notificación"
          />
        </div>

        {/* Destinatario */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destinatario *
          </label>
        <div className='w-full'> 
        <Select
        
            name="recipient"
            value={formData.recipient}
            onChange={(value) => handleInputChange('recipient', value)}
            options={recipientOptions}
            placeholder="Selecciona el destinatario"
          />
        </div>
        </div>
      </div>

      {/* Segunda fila: Descripción (ancho completo) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descripción *
        </label>
        <textarea
          value={formData.body}
          onChange={(e) => handleInputChange('body', e.target.value)}
          placeholder="Describe el contenido de la notificación"
          rows={3}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Tercera fila: Fecha y hora de envío */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha y hora de envío
          </label>
          <Input
            type="datetime-local"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
            placeholder="Programar envío (opcional)"
          />
        </div>
        <div className="flex items-end">
          {formData.deliveryDate && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleInputChange('deliveryDate', '')}
            >
              Limpiar fecha
            </Button>
          )}
        </div>
      </div>
      
      {/* Indicador de tipo de envío */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${formData.deliveryDate ? 'bg-blue-500' : 'bg-green-500'}`}></div>
          <p className="text-xs text-gray-600">
            {formData.deliveryDate 
              ? `📅 Programado para: ${new Date(formData.deliveryDate).toLocaleString('es-ES')}`
              : '⚡ Se enviará inmediatamente'
            }
          </p>
        </div>
      </div>

      {/* Validación y Botones */}
      <div className="pt-3 border-t border-gray-200">
        {/* Indicador de validación */}
        {!isFormValid && (
          <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
            <p className="text-amber-800">
              ⚠️ Completa todos los campos obligatorios para continuar
            </p>
          </div>
        )}
        
        {/* Botones */}
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid || isLoading}
            isLoading={isLoading}
          >
            {notification ? 'Actualizar' : 'Crear'} Notificación
          </Button>
        </div>
      </div>
    </form>
  )
} 