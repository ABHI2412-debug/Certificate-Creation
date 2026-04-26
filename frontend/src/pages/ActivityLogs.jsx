import React, { useState } from 'react'

export default function ActivityLogs(){
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const activities = [
    {
      id: 1,
      action: 'Certificate Issued',
      details: 'Completion Certificate issued to John Doe',
      user: 'Admin',
      type: 'certificate',
      time: '2 hours ago',
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      action: 'Excel File Uploaded',
      details: 'Bulk student data uploaded successfully',
      user: 'Admin',
      type: 'upload',
      time: '5 hours ago',
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    },
    {
      id: 3,
      action: 'QR Code Generated',
      details: 'QR code generated for Certificate #1234',
      user: 'System',
      type: 'qr',
      time: '1 day ago',
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M12 15h4.01M12 21h4.01M12 18h4.01M12 9h4.01M12 6h4.01M6 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      )
    },
    {
      id: 4,
      action: 'Student Profile Updated',
      details: 'Profile information updated for Jane Smith',
      user: 'Admin',
      type: 'student',
      time: '2 days ago',
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 5,
      action: 'Template Created',
      details: 'New certificate template "Achievement Award" created',
      user: 'Admin',
      type: 'template',
      time: '3 days ago',
      icon: (
        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 6,
      action: 'Certificate Verified',
      details: 'Certificate #5678 verified successfully',
      user: 'System',
      type: 'verification',
      time: '4 days ago',
      icon: (
        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 7,
      action: 'User Login',
      details: 'User logged in from IP 192.168.1.1',
      user: 'Bob Johnson',
      type: 'auth',
      time: '5 days ago',
      icon: (
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
      )
    },
    {
      id: 8,
      action: 'Certificate Downloaded',
      details: 'Certificate #9012 downloaded by Alice Brown',
      user: 'Alice Brown',
      type: 'download',
      time: '1 week ago',
      icon: (
        <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    }
  ]

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || activity.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Activity Logs</h1>
          <p className="text-blue-600">Monitor system activities and user actions</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-green-200 shadow-xl">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search activities..."
                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-green-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors bg-white"
            >
              <option value="all">All Types</option>
              <option value="certificate">Certificates</option>
              <option value="upload">Uploads</option>
              <option value="qr">QR Codes</option>
              <option value="student">Students</option>
              <option value="template">Templates</option>
              <option value="verification">Verifications</option>
              <option value="auth">Authentication</option>
              <option value="download">Downloads</option>
            </select>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Export Logs
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <div className="flex-shrink-0 mt-1">
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-blue-900">{activity.action}</h3>
                  <span className="text-sm text-blue-600">{activity.time}</span>
                </div>
                <p className="text-blue-700 mt-1">{activity.details}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-blue-600">by {activity.user}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activity.type === 'certificate' ? 'bg-green-100 text-green-800' :
                    activity.type === 'upload' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'qr' ? 'bg-purple-100 text-purple-800' :
                    activity.type === 'student' ? 'bg-orange-100 text-orange-800' :
                    activity.type === 'template' ? 'bg-indigo-100 text-indigo-800' :
                    activity.type === 'verification' ? 'bg-teal-100 text-teal-800' :
                    activity.type === 'auth' ? 'bg-gray-100 text-gray-800' :
                    'bg-cyan-100 text-cyan-800'
                  }`}>
                    {activity.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-green-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-green-900 mb-2">No activities found</h3>
            <p className="text-green-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
