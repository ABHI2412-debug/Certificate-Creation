import React from 'react'
import CertificatePreview from './CertificatePreview'

export default function CertificateCard({cert}){
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-green-900 mb-1">{cert.title || 'Certificate Title'}</h3>
            <p className="text-green-600 font-medium">{cert.recipient || 'Recipient Name'}</p>
            {cert.date && (
              <p className="text-sm text-green-500 mt-1">Issued on {new Date(cert.date).toLocaleDateString()}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Share">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <CertificatePreview cert={cert} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">Verified & Active</span>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
              Edit
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              View Full
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
