import Button from './Button'

interface FormActionsProps {
  onCancel: () => void
  onSubmit?: () => void
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  submitVariant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline'
}

export default function FormActions({
  onCancel,
  onSubmit,
  isLoading = false,
  submitText = 'Guardar',
  cancelText = 'Cancelar',
  submitVariant = 'primary'
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-4">
      <Button
        type="button"
        onClick={onCancel}
        variant="secondary"
        size="md"
        isDisabled={isLoading}
      >
        {cancelText}
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        variant={submitVariant}
        size="md"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        {submitText}
      </Button>
    </div>
  )
} 