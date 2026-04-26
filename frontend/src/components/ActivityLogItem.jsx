import React from 'react'

export default function ActivityLogItem({item}){
  return (
    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
      <div className="flex-shrink-0 mt-1">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-lg font-bold text-blue-900">{item?.action || 'Action'}</h4>
        <p className="text-blue-700 mt-1">{item?.details || 'Activity details'}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-blue-600">by {item?.user || 'User'}</span>
          <span className="text-xs text-blue-500">•</span>
          <span className="text-xs text-blue-600">{item?.time || 'Time'}</span>
        </div>
      </div>
    </div>
  )
}
