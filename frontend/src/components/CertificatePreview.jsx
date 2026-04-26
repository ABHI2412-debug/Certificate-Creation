import React from 'react'

export default function CertificatePreview({cert}){
  return (
    <div className="bg-white border-2 border-green-200 rounded-2xl p-8 shadow-lg relative overflow-hidden">
      {/* Decorative border */}
      <div className="absolute inset-0 border-4 border-green-100 rounded-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-8 rounded-xl mb-6">
          <h1 className="text-3xl font-bold tracking-wide">CERTIFICATE</h1>
          <p className="text-green-100 text-sm mt-1">OF ACHIEVEMENT</p>
        </div>

        <div className="text-green-900">
          <p className="text-lg mb-2">This is to certify that</p>
          <h2 className="text-4xl font-bold text-green-800 mb-4">{cert?.recipient || 'Recipient Name'}</h2>
          <p className="text-lg mb-6">has successfully completed</p>
          <h3 className="text-2xl font-semibold text-green-700 mb-4">{cert?.title || 'Certificate Title'}</h3>
          {cert?.date && (
            <p className="text-green-600">on {new Date(cert.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
          )}
        </div>
      </div>

      {/* QR Code and Signature Area */}
      <div className="flex justify-between items-end mt-8">
        <div className="flex-1">
          <div className="w-20 h-20 bg-blue-100 border-2 border-blue-200 rounded-lg flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 15h4.01M12 21h4.01M12 18h4.01M12 9h4.01M12 6h4.01M6 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
            </svg>
          </div>
          <p className="text-xs text-blue-600 mt-2">Scan to verify</p>
        </div>

        <div className="text-center">
          <div className="border-t-2 border-blue-300 w-32 mx-auto mb-2"></div>
          <p className="text-sm text-blue-700">Authorized Signature</p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-blue-300 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-blue-300 rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-blue-300 rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-blue-300 rounded-br-lg"></div>
    </div>
  )
}
