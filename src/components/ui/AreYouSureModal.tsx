import * as Dialog from '@radix-ui/react-dialog'
import Button from "./Button"

interface AreYouSureModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	message: string
	title?: string
	confirmText?: string
	cancelText?: string
	isLoading?: boolean
}

export default function AreYouSureModal({
	isOpen,
	onClose,
	onConfirm,
	message,
	title = "Confirmar Acción",
	confirmText = "Confirmar",
	cancelText = "Cancelar",
	isLoading = false,
}: AreYouSureModalProps) {
	const handleConfirm = () => {
		if (!isLoading) {
			onConfirm()
		}
	}

	return (
		<Dialog.Root open={isOpen} onOpenChange={onClose}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
				<Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-xs translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
					<Dialog.Title className="text-lg font-semibold mb-4">
						{title}
					</Dialog.Title>
					<Dialog.Description className="text-sm text-gray-600 mb-6">
						{message}
					</Dialog.Description>
					<div className="flex justify-end gap-3">
						<Dialog.Close asChild>
							<Button
								variant="secondary"
								size="md"
								isDisabled={isLoading}
							>
								{cancelText}
							</Button>
						</Dialog.Close>
						<Button
							onClick={handleConfirm}
							variant="danger"
							size="md"
							isLoading={isLoading}
							isDisabled={isLoading}
						>
							{confirmText}
						</Button>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
