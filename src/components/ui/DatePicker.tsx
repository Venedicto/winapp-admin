import { forwardRef, useState } from "react";

interface DatePickerProps {
	label?: string;
	name: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	isInvalid?: boolean;
	errorMessage?: string;
	className?: string;
	classContainer?: string;
	required?: boolean;
	disabled?: boolean;
	helperText?: string;
	minDate?: string;
	maxDate?: string;
	placeholder?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
	(
		{
			label,
			name,
			value,
			onChange,
			isInvalid,
			errorMessage,
			className,
			classContainer,
			required,
			disabled,
			helperText,
			minDate,
			maxDate,
			placeholder = "Selecciona una fecha",
			...props
		},
		ref
	) => {
		const [isFocused, setIsFocused] = useState(false);

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
					<div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
						<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					</div>

					<input
						ref={ref}
						id={name}
						name={name}
						type="date"
						className={`
							w-full rounded-xl text-sm border-2 pl-11 pr-4 py-3 outline-none transition-all duration-200
							${isInvalid
								? 'border-red-500 bg-red-50 focus:border-red-600 focus:bg-red-50'
								: isFocused
									? 'border-purple-500 bg-purple-50/50 shadow-md'
									: 'border-gray-300 bg-white hover:border-gray-400'
							}
							${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
							${className}
						`}
						value={value}
						onChange={onChange}
						disabled={disabled}
						min={minDate}
						max={maxDate}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						{...props}
					/>
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
	}
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
