import { Input, FileInput, ImagePreview } from '../ui'
import type { CategoryType } from '../../types/Category'

interface CategoryFormProps {
  formData: {
    name: string
    image: string | File | null
  }
  errors: Record<string, string>
  type: CategoryType
  imagePreviewUrl: string
  onInputChange: (field: 'name' | 'image', value: string | File | null) => void
}

const typeConfig = {
  business: {
    namePlaceholder: 'Ej: Restaurante, Tienda, Farmacia...'
  },
  product: {
    namePlaceholder: 'Ej: Comida, Bebidas, Electrónicos...'
  }
}

export default function CategoryForm({ 
  formData, 
  errors, 
  type, 
  imagePreviewUrl,
  onInputChange 
}: CategoryFormProps) {
  const config = typeConfig[type]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onInputChange('image', file)
  }
  
  return (
    <div className="space-y-4">
      <div>
        <Input
          label="Nombre de la categoría"
          name="name"
          type="text"
          placeholder={config.namePlaceholder}
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          isInvalid={!!errors.name}
          errorMessage={errors.name}
        />
      </div>

      <FileInput
        label="Imagen de la categoría"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        isInvalid={!!errors.image}
        errorMessage={errors.image}
        required
      />

      {/* Image preview */}
      {imagePreviewUrl && !errors.image && (
        <ImagePreview imageUrl={imagePreviewUrl} />
      )}
    </div>
  )
} 