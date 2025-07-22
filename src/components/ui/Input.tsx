import { forwardRef } from "react";

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
			...props
		},
		ref,
	) => {
		return (
			<div className={`flex flex-col py-4    relative ${classContainer}`}>
				{label && (
					<label
						className="text-xs md:text-sm font-medium text-gray-700 pb-[6px]"
						htmlFor={name}
					>
						{label}
					</label>
				)}
				<input
					ref={ref}
					className={`rounded-xl text-xs border-2 border-gray-300 p-2 outline-none focus:border-primary h-16 ${className} ${isInvalid && "border-red-500"
						}`}

					type={type}
					color="primary"
					placeholder={placeholder}
					value={value}
					readOnly={isReadOnly}
					{...props}
				/>

				{isInvalid && (
					<p className="text-red-500 text-xs pl-2 mt-[4px]">{errorMessage}</p>
				)}
			</div>
		);
	},
);

export default Input;
