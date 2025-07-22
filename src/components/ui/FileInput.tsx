import { forwardRef } from 'react'

interface FileInputProps {
  label?: string
  name: string
  accept?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isInvalid?: boolean
  errorMessage?: string
  className?: string
  classContainer?: string
  multiple?: boolean
  required?: boolean
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label,
      name,
      accept = "image/*",
      onChange,
      isInvalid,
      errorMessage,
      className = "",
      classContainer = "",
      multiple = false,
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col py-4 relative ${classContainer}`}>
        {label && (
          <label
            className="text-xs md:text-sm font-medium text-gray-700 pb-[6px]"
            htmlFor={name}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onChange}
          className={`
            w-full rounded-xl text-xs border-2 border-gray-300 p-2 
            outline-none focus:border-purple-500 h-16 
            file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 
            file:text-xs file:font-medium file:bg-purple-50 file:text-purple-700
            hover:file:bg-purple-100 transition-colors
            ${isInvalid ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {isInvalid && errorMessage && (
          <p className="text-red-500 text-xs pl-2 mt-[4px]">{errorMessage}</p>
        )}
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'

export default FileInput 