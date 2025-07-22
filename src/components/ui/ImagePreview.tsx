interface ImagePreviewProps {
  imageUrl: string
  alt?: string
  className?: string
  fallbackSrc?: string
}

export default function ImagePreview({ 
  imageUrl, 
  alt = "Vista previa", 
  className = "h-20 w-20",
  fallbackSrc = "/images/vector-icon.svg"
}: ImagePreviewProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.src = fallbackSrc
  }

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Vista previa:
      </label>
      <div className="flex justify-center">
        <img
          src={imageUrl}
          alt={alt}
          className={`${className} rounded-lg object-cover border-2 border-gray-200`}
          onError={handleImageError}
        />
      </div>
    </div>
  )
} 