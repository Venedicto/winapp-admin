import { forwardRef, useState } from "react";

interface InputProps {
	placeholder: string;
	type: string;
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	isInvalid?: boolean;
	errorMessage?: string;
	name: string;
	className?: string;
	classContainer?: string;
	step?: string;
	isReadOnly?: boolean;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	icon?: React.ReactNode;
	helperText?: string;
	required?: boolean;
	disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			placeholder,
			type,
			value,
			name,
			label,
			isInvalid,
			errorMessage,
			className,
			step,
			isReadOnly,
			classContainer,
			icon,
			helperText,
			required,
			disabled,
			...props
		},
		ref,
	) => {
		const [isFocused, setIsFocused] = useState(false);
		const [showPassword, setShowPassword] = useState(false);

		const isPassword = type === 'password';
		const inputType = isPassword && showPassword ? 'text' : type;

		return (
			<div className={`flex flex-col py-2 relative ${classContainer}`}>
				{label && (
					<label
						className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1"
						htmlFor={name}
					>
						{label}
						{required && <span className="text-red-500">*</span>}
					</label>
				)}

				<div className="relative">
					{icon && (
						<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
							{icon}
						</div>
					)}

					<input
						ref={ref}
						id={name}
						name={name}
						className={`
							w-full rounded-xl text-sm border-2 px-4 py-3 outline-none transition-all duration-200
							${icon ? 'pl-11' : ''}
							${isPassword ? 'pr-11' : ''}
							${isInvalid
								? 'border-red-500 bg-red-50 focus:border-red-600 focus:bg-red-50'
								: isFocused
									? 'border-purple-500 bg-purple-50/50 shadow-md'
									: 'border-gray-300 bg-white hover:border-gray-400'
							}
							${isReadOnly || disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
							${className}
						`}
						type={inputType}
						placeholder={placeholder}
						value={value}
						readOnly={isReadOnly}
						disabled={disabled}
						onFocus={() => setIsFocused(true)}
						onBlur={(e) => {
							setIsFocused(false);
							props.onBlur?.(e);
						}}
						step={step}
						{...props}
					/>

					{isPassword && (
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
							tabIndex={-1}
						>
							{showPassword ? (
								<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
								</svg>
							) : (
								<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
								</svg>
							)}
						</button>
					)}
				</div>

				{helperText && !isInvalid && (
					<p className="text-xs text-gray-500 mt-1 ml-1">{helperText}</p>
				)}

				{isInvalid && errorMessage && (
					<div className="flex items-center gap-1 mt-1 ml-1">
						<svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
							<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
						</svg>
						<p className="text-red-500 text-xs font-medium">{errorMessage}</p>
					</div>
				)}
			</div>
		);
	},
);

Input.displayName = 'Input';

export default Input;
