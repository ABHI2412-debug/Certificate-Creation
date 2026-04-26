import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [myCertificates, setMyCertificates] = useState([]);

  useEffect(() => {
    // Fetch user's certificates
    fetchMyCertificates();
  }, []);

  const fetchMyCertificates = async () => {
    try {
      // For candidates, we'll show certificates where studentName matches their name
      // In a real app, you'd have a proper relationship between users and certificates
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/certificates', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        // Filter certificates that might belong to this candidate
        // In production, you'd have proper user-certificate relationships
        const userCertificates = data.certificates?.filter(cert =>
          cert.studentName?.toLowerCase().includes(user?.name?.toLowerCase()) ||
          cert.studentName?.toLowerCase().includes(user?.email?.split('@')[0]?.toLowerCase())
        ) || [];

        setMyCertificates(userCertificates);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const quickActions = [
    {
      title: 'Verify Certificate',
      description: 'Verify authenticity of certificates',
      icon: '✅',
      path: '/verify',
      color: 'bg-green-500'
    },
    {
      title: 'Search Certificate',
      description: 'Find and view certificates',
      icon: '🔍',
      path: '/search',
      color: 'bg-blue-500'
    },
    {
      title: 'Download Certificate',
      description: 'Download your certificates',
      icon: '📥',
      path: '/download',
      color: 'bg-purple-500'
    },
    {
      title: 'View Certificate',
      description: 'View certificate details',
      icon: '👁️',
      path: '/view',
      color: 'bg-orange-500'
    },
    {
      title: 'Templates',
      description: 'Browse available certificate templates',
      icon: '🎨',
      path: '/templates',
      color: 'bg-pink-500'
    },
    {
      title: 'Activity Logs',
      description: 'View your activity history',
      icon: '📋',
      path: '/activity-logs',
      color: 'bg-red-500'
    },
    {
      title: 'Settings',
      description: 'Manage your account settings',
      icon: '⚙️',
      path: '/settings',
      color: 'bg-gray-500'
    },
    {
      title: 'Certificates',
      description: 'View all certificates',
      icon: '📄',
      path: '/certificates',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-green-100">Candidate Dashboard - Access Your Certificates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">📄</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">My Certificates</h3>
              <p className="text-3xl font-bold text-blue-600">{myCertificates.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Verified Certificates</h3>
              <p className="text-3xl font-bold text-green-600">
                {myCertificates.filter(cert => cert.valid).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.path}
              className={`${action.color} text-white rounded-lg p-4 hover:opacity-90 transition-opacity block`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* My Certificates */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">My Certificates</h2>
        {myCertificates.length > 0 ? (
          <div className="space-y-4">
            {myCertificates.map((cert, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{cert.studentName}</h3>
                    <p className="text-gray-600">{cert.course}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-500">
                        Grade: <span className="font-medium">{cert.grade}</span>
                      </span>
                      <span className="text-sm text-gray-500">
                        Issued: {new Date(cert.issueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      cert.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {cert.valid ? 'Valid' : 'Invalid'}
                    </span>
                    <Link
                      to={`/view/${cert.certificateId}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates Found</h3>
            <p className="text-gray-600 mb-4">
              You don't have any certificates associated with your account yet.
            </p>
            <Link
              to="/verify"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Verify a Certificate
            </Link>
          </div>
        )}
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-900">Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium mb-2">How to Verify Certificates</h3>
            <p className="text-sm text-gray-600 mb-3">
              Use the verification tool to check certificate authenticity using QR codes or certificate IDs.
            </p>
            <Link to="/verify" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Learn More →
            </Link>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-medium mb-2">Download Your Certificates</h3>
            <p className="text-sm text-gray-600 mb-3">
              Download PDF copies of your certificates for official use and record keeping.
            </p>
            <Link to="/download" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
