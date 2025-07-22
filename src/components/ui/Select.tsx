interface SelectProps {
	className?: string;
	options: { label: string; value: string }[];
	value?: string;
	onChange?: (value: string) => void;
	onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
	isInvalid?: boolean;
	label?: string;
	errorMessage?: string;
	name: string;
	isDisabled?: boolean;
	placeholder?: string;
	classContainer?: string;
}

export default function Select({
	classContainer,
	className,
	options,
	value,
	onChange,
	onBlur,
	isInvalid,
	label,
	errorMessage,
	name,
	placeholder = "Seleccionar",
	isDisabled,
}: SelectProps) {
	return (
		<div className={`w-full md:w-[30%] ${classContainer}`}>
			{label && <p className="pb-2">{label}</p>}
			<select
				id={name}
				name={name}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				onBlur={onBlur}
				disabled={isDisabled}
				className={`w-full h-16 rounded-2xl border-2 border-gray-300 ${
					isInvalid ? "border-red-500" : ""
				} p-2 ${className}`}
			>
				<option value="">{placeholder}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{isInvalid && <p className="text-red-500 text-sm">{errorMessage}</p>}
		</div>
	);
}
