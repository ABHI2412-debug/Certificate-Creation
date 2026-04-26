import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function EmployerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCertificates: 0,
    totalStudents: 0,
    recentCertificates: [],
    systemHealth: 'Good'
  });

  useEffect(() => {
    // Fetch dashboard stats
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const [certResponse, studentResponse] = await Promise.all([
        fetch('http://localhost:5000/api/certificates', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/students', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (certResponse.ok && studentResponse.ok) {
        const certData = await certResponse.json();
        const studentData = await studentResponse.json();

        setStats({
          totalCertificates: certData.certificates?.length || 0,
          totalStudents: studentData.length || 0,
          recentCertificates: certData.certificates?.slice(0, 5) || [],
          systemHealth: 'Good'
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const quickActions = [
    {
      title: 'Create Certificate',
      description: 'Generate new certificates for students',
      icon: '📄',
      path: '/certificates',
      color: 'bg-blue-500'
    },
    {
      title: 'Add Student',
      description: 'Register new students in the system',
      icon: '👨‍🎓',
      path: '/students',
      color: 'bg-green-500'
    },
    {
      title: 'Bulk Upload',
      description: 'Upload certificates via Excel file',
      icon: '📊',
      path: '/upload',
      color: 'bg-purple-500'
    },
    {
      title: 'Templates',
      description: 'Manage certificate templates',
      icon: '🎨',
      path: '/templates',
      color: 'bg-orange-500'
    },
    {
      title: 'Activity Logs',
      description: 'Monitor system activities and logs',
      icon: '📋',
      path: '/activity-logs',
      color: 'bg-red-500'
    },
    {
      title: 'Settings',
      description: 'System configuration and settings',
      icon: '⚙️',
      path: '/settings',
      color: 'bg-gray-500'
    },
    {
      title: 'Search Certificates',
      description: 'Find and search certificates',
      icon: '🔍',
      path: '/search',
      color: 'bg-indigo-500'
    },
    {
      title: 'Verify Certificate',
      description: 'Verify certificate authenticity',
      icon: '✅',
      path: '/verify',
      color: 'bg-teal-500'
    },
    {
      title: 'Upload Excel',
      description: 'Bulk upload certificates from Excel',
      icon: '📊',
      path: '/upload',
      color: 'bg-cyan-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">Employer Dashboard - Full Administrative Access</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">📄</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Certificates</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalCertificates}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">👨‍🎓</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Students</h3>
              <p className="text-3xl font-bold text-green-600">{stats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.systemHealth}</p>
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

      {/* Recent Certificates */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Certificates</h2>
        {stats.recentCertificates.length > 0 ? (
          <div className="space-y-3">
            {stats.recentCertificates.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{cert.studentName}</p>
                  <p className="text-sm text-gray-600">{cert.course} - {cert.grade}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(cert.issueDate).toLocaleDateString()}
                  </p>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    cert.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {cert.valid ? 'Valid' : 'Invalid'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No certificates found</p>
        )}
      </div>

      {/* Admin Features */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Administrative Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/activity-logs"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-center">
              <span className="text-2xl mb-2 block">📋</span>
              <h3 className="font-medium">Activity Logs</h3>
              <p className="text-sm text-gray-600">Monitor system activities</p>
            </div>
          </Link>

          <Link
            to="/settings"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-center">
              <span className="text-2xl mb-2 block">⚙️</span>
              <h3 className="font-medium">Settings</h3>
              <p className="text-sm text-gray-600">System configuration</p>
            </div>
          </Link>

          <Link
            to="/search"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="text-center">
              <span className="text-2xl mb-2 block">🔍</span>
              <h3 className="font-medium">Search</h3>
              <p className="text-sm text-gray-600">Find certificates</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
