import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [newPost, setNewPost] = useState('')

  const stats = [
    { label: 'Total Certificates', value: '1,247', change: '+12%', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'green' },
    { label: 'Active Students', value: '856', change: '+8%', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z', color: 'emerald' },
    { label: 'Templates Used', value: '23', change: '+3', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'teal' }
  ]

  const feedPosts = [
    {
      id: 1,
      author: 'Certificate Portal',
      avatar: 'CP',
      time: '2h',
      content: '🎉 New certificate issued to John Doe for completing the Advanced Web Development course!',
      image: null,
      likes: 12,
      comments: 3,
      shares: 2,
      type: 'achievement'
    },
    {
      id: 2,
      author: 'System Admin',
      avatar: 'SA',
      time: '5h',
      content: 'New certificate template "Professional Achievement" has been uploaded and is now available for use.',
      image: null,
      likes: 8,
      comments: 1,
      shares: 0,
      type: 'update'
    },
    {
      id: 3,
      author: 'Certificate Portal',
      avatar: 'CP',
      time: '1d',
      content: 'Bulk certificate generation completed successfully. 50 certificates issued to graduating students.',
      image: null,
      likes: 15,
      comments: 5,
      shares: 3,
      type: 'bulk'
    }
  ]

  const handlePost = () => {
    if (newPost.trim()) {
      // Handle posting logic here
      setNewPost('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post */}
      <div className="bg-white rounded-lg border border-gray-300 p-4">
        <div className="flex space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold">A</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share an update about certificates..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
              rows="3"
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Photo</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className="text-sm">Write article</span>
                </button>
              </div>
              <button
                onClick={handlePost}
                disabled={!newPost.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-300 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-sm text-green-600 font-medium">{stat.change}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feed Posts */}
      <div className="space-y-4">
        {feedPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg border border-gray-300 p-4">
            {/* Post Header */}
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                post.type === 'achievement' ? 'bg-green-100' :
                post.type === 'update' ? 'bg-blue-100' : 'bg-purple-100'
              }`}>
                <span className={`text-sm font-semibold ${
                  post.type === 'achievement' ? 'text-green-700' :
                  post.type === 'update' ? 'text-blue-700' : 'text-purple-700'
                }`}>
                  {post.avatar}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-600">{post.time}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-3">
              <p className="text-gray-900">{post.content}</p>
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-300 p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/certificates" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">New Certificate</p>
              <p className="text-sm text-gray-600">Create a new certificate</p>
            </div>
          </Link>
          <Link to="/upload-excel" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Upload Excel</p>
              <p className="text-sm text-gray-600">Bulk upload data</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
