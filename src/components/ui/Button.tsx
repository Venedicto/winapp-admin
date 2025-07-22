import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	onClick?: () => void
	className?: string
	type?: "button" | "submit" | "reset"
	isLoading?: boolean
	isDisabled?: boolean
	variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline'
	size?: 'sm' | 'md' | 'lg'
	fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
	children,
	onClick,
	className = '',
	type = "button",
	isLoading = false,
	isDisabled = false,
	variant = 'primary',
	size = 'md',
	fullWidth = false,
	...props
}, ref) => {
	
	// Base styles
	const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
	
	// Variant styles
	const variantStyles = {
		primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 active:bg-purple-800",
		secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800",
		danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800",
		success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800",
		outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500 active:bg-purple-100"
	}
	
	// Size styles
	const sizeStyles = {
		sm: "px-3 py-1.5 text-sm h-8",
		md: "px-4 py-2 text-sm h-10",
		lg: "px-6 py-3 text-base h-12"
	}
	
	// Width styles
	const widthStyles = fullWidth ? "w-full" : ""
	
	// Loading spinner component
	const LoadingSpinner = () => (
		<svg 
			className="animate-spin -ml-1 mr-2 h-4 w-4" 
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
			disabled={isDisabled || isLoading}
			className={buttonStyles}
			onClick={onClick}
			{...props}
		>
			{isLoading && <LoadingSpinner />}
			<span className={isLoading ? 'opacity-75' : ''}>
				{children}
			</span>
		</button>
	)
})

Button.displayName = 'Button'

export default Button
