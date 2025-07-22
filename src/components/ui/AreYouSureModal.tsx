import { useRef, useEffect } from "react";
import Button from "./Button";

interface AreYouSureModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	message: string;
	title?: string;
	confirmText?: string;
	cancelText?: string;
	isLoading?: boolean;
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
	const modalRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const modalElement = modalRef.current;
		if (modalElement) {
			if (isOpen) {
				if (!modalElement.open) {
					modalElement.showModal();
					document.body.classList.add("overflow-hidden");
				}
			} else {
				if (modalElement.open) {
					modalElement.close();
				}
			}
		}

		return () => {
			if (document.body.classList.contains("overflow-hidden")) {
				document.body.classList.remove("overflow-hidden");
			}
			if (modalElement?.open) {
				modalElement.close();
			}
		};
	}, [isOpen]);

	useEffect(() => {
		const modalElement = modalRef.current;
		const handleDialogClose = () => {
			if (isOpen) {
				onClose();
				document.body.classList.remove("overflow-hidden");
			}
		};

		modalElement?.addEventListener("close", handleDialogClose);

		return () => {
			modalElement?.removeEventListener("close", handleDialogClose);
			if (document.body.classList.contains("overflow-hidden")) {
			}
		};
	}, [onClose, isOpen]);

	const handleConfirm = () => {
		if (!isLoading) {
			onConfirm();
		}
	};

	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-40 bg-black/50" />
			)}
			<dialog
				ref={modalRef}
				className="p-6 rounded-lg shadow-xl max-w-xs w-full mx-auto self-center z-50"
			>
				<h3 className="text-lg font-semibold mb-4">{title}</h3>
				<p className="text-sm text-gray-600 mb-6">{message}</p>
				<div className="flex justify-end gap-3">
					<Button
						onClick={onClose}
						variant="secondary"
						size="md"
						isDisabled={isLoading}
					>
						{cancelText}
					</Button>
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
			</dialog>
		</>
	);
}
