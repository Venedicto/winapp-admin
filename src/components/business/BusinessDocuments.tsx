import { useMemo } from 'react'
import type { Business, BusinessDocument } from '../../types/Business'
import { useBusinessDocuments } from '../../services/business'

interface BusinessDocumentsProps {
  business: Business
}

const documentTypeLabels: Record<string, string> = {
  bankingCertified: 'Certificado Bancario',
  dni: 'DNI',
  constitutiveAct: 'Acta Constitutiva',
  attorneyPower: 'Poder Notarial'
}




function BusinessDocuments({ business }: BusinessDocumentsProps) {
  const { data: documentsResponse, isLoading } = useBusinessDocuments()
  
  // Filtrar documentos por businessId
  const businessDocuments = useMemo(() => {
    if (!documentsResponse?.data?.businessDocs) return []
    return documentsResponse.data.businessDocs.filter(
      (doc: BusinessDocument) => doc.businessId === business.id
    )
  }, [documentsResponse, business.id])

  const handleViewDocument = (url: string) => {
    window.open(url, '_blank')
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Documentos
        </h2>
        <div className="flex items-center justify-center py-4">
          <div className="animate-pulse text-gray-500">Cargando documentos...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Documentos ({businessDocuments.length})
      </h2>
      
      {businessDocuments.length === 0 ? (
        <div className="text-center py-6">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500">No hay documentos registrados</p>
        </div>
      ) : (
        <div className="space-y-3">
          {businessDocuments.map((document: BusinessDocument) => (
            <div key={document.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">
                  {documentTypeLabels[document.type] || document.type}
                </h3>
                
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Subido: {new Date(document.createdAt).toLocaleDateString('es-ES')}
                </p>
                <button
                  onClick={() => handleViewDocument(document.url)}
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BusinessDocuments 