import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	onClick?: () => void
	className?: string
	type?: "button" | "submit" | "reset"
	isLoading?: boolean
	isDisabled?: boolean
	disabled?: boolean
	variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost' | 'link'
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	fullWidth?: boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	loadingText?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
	children,
	onClick,
	className = '',
	type = "button",
	isLoading = false,
	isDisabled = false,
	disabled = false,
	variant = 'primary',
	size = 'md',
	fullWidth = false,
	leftIcon,
	rightIcon,
	loadingText,
	...props
}, ref) => {

	const isButtonDisabled = isDisabled || disabled || isLoading;

	// Base styles
	const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none shadow-sm hover:shadow-md active:scale-95"

	// Variant styles
	const variantStyles = {
		primary: "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 focus:ring-purple-300 active:from-purple-800 active:to-purple-900 shadow-purple-200",
		secondary: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 focus:ring-gray-300 active:from-gray-800 active:to-gray-900",
		danger: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-300 active:from-red-800 active:to-red-900 shadow-red-200",
		success: "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus:ring-green-300 active:from-green-800 active:to-green-900 shadow-green-200",
		outline: "border-2 border-purple-600 text-purple-600 bg-white hover:bg-purple-50 focus:ring-purple-300 active:bg-purple-100",
		ghost: "text-purple-600 bg-transparent hover:bg-purple-50 focus:ring-purple-300 active:bg-purple-100 shadow-none",
		link: "text-purple-600 bg-transparent hover:underline focus:ring-0 active:text-purple-800 shadow-none"
	}

	// Size styles
	const sizeStyles = {
		xs: "px-2.5 py-1.5 text-xs h-7 gap-1",
		sm: "px-3 py-2 text-sm h-9 gap-1.5",
		md: "px-4 py-2.5 text-sm h-10 gap-2",
		lg: "px-6 py-3 text-base h-12 gap-2",
		xl: "px-8 py-4 text-lg h-14 gap-2.5"
	}

	// Width styles
	const widthStyles = fullWidth ? "w-full" : ""

	// Loading spinner component
	const LoadingSpinner = () => (
		<svg
			className="animate-spin h-5 w-5"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	)

	// Combine all styles
	const buttonStyles = `
		${baseStyles}
		${variantStyles[variant]}
		${sizeStyles[size]}
		${widthStyles}
		${className}
	`.trim()

	return (
		<button
			ref={ref}
			type={type}
			disabled={isButtonDisabled}
			className={buttonStyles}
			onClick={onClick}
			{...props}
		>
			{isLoading ? (
				<>
					<LoadingSpinner />
					<span>{loadingText || 'Cargando...'}</span>
				</>
			) : (
				<>
					{leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
					<span>{children}</span>
					{rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
				</>
			)}
		</button>
	)
})

Button.displayName = 'Button'

export default Button
