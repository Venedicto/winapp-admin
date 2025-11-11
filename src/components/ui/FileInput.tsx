import { forwardRef, useState, useRef, DragEvent } from 'react'

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
  disabled?: boolean
  helperText?: string
  showPreview?: boolean
  maxSize?: number // in MB
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
      disabled = false,
      helperText,
      showPreview = true,
      maxSize,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const isImage = accept.includes('image')

    const formatFileSize = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    const handleFiles = (files: FileList | null) => {
      if (!files || files.length === 0) return

      const filesArray = Array.from(files)

      // Validate file size if maxSize is provided
      if (maxSize) {
        const invalidFiles = filesArray.filter(file => file.size > maxSize * 1024 * 1024)
        if (invalidFiles.length > 0) {
          return
        }
      }

      setSelectedFiles(filesArray)

      // Create preview URLs for images
      if (showPreview && isImage) {
        const urls = filesArray.map(file => URL.createObjectURL(file))
        setPreviewUrls(urls)
      }

      // Create synthetic event and call onChange
      if (onChange && fileInputRef.current) {
        const syntheticEvent = {
          target: fileInputRef.current,
          currentTarget: fileInputRef.current
        } as React.ChangeEvent<HTMLInputElement>
        onChange(syntheticEvent)
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files)
      if (onChange) {
        onChange(e)
      }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        setIsDragging(true)
      }
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (!disabled) {
        handleFiles(e.dataTransfer.files)
      }
    }

    const handleRemoveFile = (index: number) => {
      const newFiles = selectedFiles.filter((_, i) => i !== index)
      const newUrls = previewUrls.filter((_, i) => i !== index)

      // Revoke old URL to prevent memory leaks
      if (previewUrls[index]) {
        URL.revokeObjectURL(previewUrls[index])
      }

      setSelectedFiles(newFiles)
      setPreviewUrls(newUrls)

      // Clear the input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

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

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`
            relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer
            ${isDragging
              ? 'border-purple-500 bg-purple-50/50 scale-[1.02]'
              : isInvalid
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50/30'
            }
            ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : ''}
            ${className}
          `}
        >
          <input
            ref={(node) => {
              if (typeof ref === 'function') {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
              if (node) {
                (fileInputRef as React.MutableRefObject<HTMLInputElement>).current = node
              }
            }}
            id={name}
            name={name}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            disabled={disabled}
            className="hidden"
            {...props}
          />

          <div className="px-6 py-8 text-center">
            <div className="flex justify-center mb-3">
              <div className={`
                p-3 rounded-full transition-colors
                ${isDragging ? 'bg-purple-100' : 'bg-gray-100'}
              `}>
                <svg className={`w-8 h-8 ${isDragging ? 'text-purple-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
            </div>

            <div className="mb-2">
              <p className="text-sm font-medium text-gray-700">
                {isDragging ? (
                  'Suelta los archivos aquí'
                ) : (
                  <>
                    <span className="text-purple-600 hover:text-purple-700">Haz clic para subir</span>
                    {' o arrastra y suelta'}
                  </>
                )}
              </p>
            </div>

            {accept && (
              <p className="text-xs text-gray-500">
                {accept === 'image/*' ? 'PNG, JPG, GIF hasta ' : 'Archivos aceptados: '}
                {maxSize ? `${maxSize}MB` : '10MB'}
              </p>
            )}
          </div>
        </div>

        {/* File list */}
        {selectedFiles.length > 0 && (
          <div className="mt-3 space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                {previewUrls[index] && (
                  <img
                    src={previewUrls[index]}
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-300"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveFile(index)
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

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
    )
  }
)

FileInput.displayName = 'FileInput'

export default FileInput 