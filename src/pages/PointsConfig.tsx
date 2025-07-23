import { useState, useEffect } from 'react'
import { usePointsConfig, useUpdatePointsConfig } from '../services/points'
import Button from '../components/ui/Button'
import WithLoading from '../components/ui/WithLoading'

export default function PointsConfig() {
  const [pesosPerPoint, setPesosPerPoint] = useState<string>('20')
  const [hasChanges, setHasChanges] = useState(false)

  // Obtener configuración actual
  const { data: config, isLoading } = usePointsConfig()
  
  // Mutation para actualizar
  const updateConfig = useUpdatePointsConfig()

  // Sincronizar el estado local con los datos de la API
  useEffect(() => {
    if (config) {
      setPesosPerPoint(config.value.toString())
    }
  }, [config])

  // Detectar cambios
  useEffect(() => {
    if (config) {
      const currentValue = parseFloat(pesosPerPoint)
      setHasChanges(!isNaN(currentValue) && currentValue.toString() !== config.value)
    }
  }, [pesosPerPoint, config])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Permitir valores vacíos o que contengan solo números y punto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPesosPerPoint(value)
    }
  }

  const handleSave = async () => {
    if (!config || !hasChanges) return
    
    const numericValue = parseFloat(pesosPerPoint)
    if (isNaN(numericValue) || numericValue <= 0) {
      return // No guardar si el valor no es válido
    }
    
    try {
      await updateConfig.mutateAsync({
        value: numericValue.toString()
      })
      setHasChanges(false)
    } catch (error) {
      console.error('Error al guardar:', error)
    }
  }

  const handleReset = () => {
    if (config) {
      setPesosPerPoint(config.value.toString())
      setHasChanges(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <WithLoading isLoading={isLoading} isError={false}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {/* Título */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Modifica los puntos
              </h1>
              <p className="text-gray-600">
                Configura la tasa de conversión entre pesos mexicanos y puntos del sistema
              </p>
            </div>

            {/* Configuración de conversión */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 text-lg">
                <span className="text-gray-700">Cada</span>
                
                {/* Input para pesos */}
                <div className="relative">
                  <input
                    type="text"
                    value={pesosPerPoint}
                    onChange={handleInputChange}
                    placeholder="20"
                    className="w-24 px-4 py-3 text-center text-lg font-semibold border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-0 focus:outline-none transition-colors"
                  />
                </div>
                
                <span className="text-gray-700">Pesos Mexicano(s)</span>
                <span className="text-gray-700 text-xl font-semibold">=</span>
                <span className="text-gray-700">1</span>
                <span className="text-gray-700">Punto(s)</span>
              </div>

              {/* Información adicional */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-sm text-blue-800">
                  <strong>Ejemplos de conversión:</strong>
                  <ul className="mt-2 space-y-1">
                    {(() => {
                      const numValue = parseFloat(pesosPerPoint) || 0
                      return (
                        <>
                          <li>• ${numValue} MXN = 1 punto</li>
                          <li>• ${(numValue * 10).toFixed(2)} MXN = 10 puntos</li>
                          <li>• ${(numValue * 100).toFixed(2)} MXN = 100 puntos</li>
                        </>
                      )
                    })()}
                  </ul>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-center gap-4">
              {hasChanges && (
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  disabled={updateConfig.isPending}
                >
                  Cancelar
                </Button>
              )}
              
              <Button
                onClick={handleSave}
                disabled={!hasChanges || updateConfig.isPending || isNaN(parseFloat(pesosPerPoint)) || parseFloat(pesosPerPoint) <= 0}
                isLoading={updateConfig.isPending}
                className="px-8 py-3 text-lg"
              >
                Guardar Cambios
              </Button>
            </div>

            {/* Estado de los cambios */}
            <div className="mt-4 text-center">
              {hasChanges && (
                <p className="text-sm text-amber-600">
                  ⚠️ Tienes cambios sin guardar
                </p>
              )}
              {pesosPerPoint === '' && (
                <p className="text-sm text-gray-500">
                  💡 Ingresa un valor mayor a 0
                </p>
              )}
              {pesosPerPoint !== '' && (isNaN(parseFloat(pesosPerPoint)) || parseFloat(pesosPerPoint) <= 0) && (
                <p className="text-sm text-red-500">
                  ❌ El valor debe ser un número mayor a 0
                </p>
              )}
            </div>
          </div>
        </WithLoading>
      </div>
    </div>
  )
} 