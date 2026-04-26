import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LanguageSelector from './LanguageSelector'
import DarkModeToggle from './DarkModeToggle'
import { useAuth } from '../context/AuthContext'

export default function Navbar(){
  const location = useLocation()
  const { isAuthenticated, logout, user } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Determine navigation items based on user role
  const isEmployer = user?.userType === 'employer' || user?.role === 'admin'

  const employerNavigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z', category: 'main' },
    { name: 'Certificates', path: '/certificates', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', category: 'management' },
    { name: 'Students', path: '/students', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z', category: 'management' },
    { name: 'Templates', path: '/templates', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', category: 'management' },
    { name: 'Activity Logs', path: '/activity-logs', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', category: 'reports' },
    { name: 'Settings', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', category: 'settings' },
    { name: 'Upload Excel', path: '/upload', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12', category: 'management' },
  ]

  const candidateNavigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z', category: 'main' },
    { name: 'Search Certificate', path: '/search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', category: 'main' },
    { name: 'Verify Certificate', path: '/verify', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', category: 'main' },
    { name: 'View Certificate', path: '/view', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z', category: 'main' },
    { name: 'Download Certificate', path: '/download', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', category: 'main' },
  ]

  const authenticatedNavigationItems = isEmployer ? employerNavigationItems : candidateNavigationItems

  const quickActions = [
    { name: 'Download Certificate', path: '/certificates', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Search Certificate', path: '/search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { name: 'Upload Excel', path: '/upload', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
    { name: 'Verify Certificate', path: '/verify', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'View Certificate', path: '/certificates', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ]

  const publicNavigationItems = [
    { name: 'Login', path: '/login', icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' },
    { name: 'Register', path: '/register', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
  ]

  const navigationItems = isAuthenticated ? authenticatedNavigationItems : publicNavigationItems

  const mainItems = navigationItems.filter(item => item.category === 'main')
  const managementItems = navigationItems.filter(item => item.category === 'management')
  const reportsItems = navigationItems.filter(item => item.category === 'reports')
  const settingsItems = navigationItems.filter(item => item.category === 'settings')

  const DropdownMenu = ({ title, items, icon }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-blue-700 hover:bg-blue-50 hover:text-blue-900"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
          {title}
          <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {items.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <header className="w-full border-b border-green-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold text-green-900">Certificate Portal</div>
              <div className="text-sm text-green-600">Admin Panel</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {/* Dashboard - Always visible */}
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${
                  location.pathname === '/dashboard'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                Dashboard
              </Link>
            )}

            {/* Dropdown Menus */}
            {isAuthenticated && managementItems.length > 0 && (
              <DropdownMenu
                title="Management"
                items={managementItems}
                icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            )}

            {isAuthenticated && reportsItems.length > 0 && (
              <DropdownMenu
                title="Reports"
                items={reportsItems}
                icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            )}

            {isAuthenticated && quickActions.length > 0 && (
              <DropdownMenu
                title="Quick Actions"
                items={quickActions}
                icon="M13 10V3L4 14h7v7l9-11h-7z"
              />
            )}

            {isAuthenticated && settingsItems.length > 0 && (
              <DropdownMenu
                title="Settings"
                items={settingsItems}
                icon="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
            )}

            {/* Public navigation */}
            {!isAuthenticated && navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-700 hover:bg-blue-50 hover:text-blue-900'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/profile"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    location.pathname === '/profile'
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-700 hover:bg-blue-50 hover:text-blue-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </Link>
                <span className="text-sm text-gray-700">Welcome, {user?.name || 'User'}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
            <LanguageSelector />
            <DarkModeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="space-y-2">
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${
                      location.pathname === '/dashboard'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    </svg>
                    Dashboard
                  </Link>

                  {managementItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        location.pathname === item.path
                          ? 'bg-blue-600 text-white'
                          : 'text-blue-700 hover:bg-blue-50 hover:text-blue-900'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.name}
                    </Link>
                  ))}

                  {reportsItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        location.pathname === item.path
                          ? 'bg-blue-600 text-white'
                          : 'text-blue-700 hover:bg-blue-50 hover:text-blue-900'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.name}
                    </Link>
                  ))}

                  {quickActions.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        location.pathname === item.path
                          ? 'bg-blue-600 text-white'
                          : 'text-blue-700 hover:bg-blue-50 hover:text-blue-900'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.name}
                    </Link>
                  ))}

                  {settingsItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        location.pathname === item.path
                          ? 'bg-blue-600 text-white'
                          : 'text-blue-700 hover:bg-blue-50 hover:text-blue-900'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      {item.name}
                    </Link>
                  ))}

                  <div className="border-t border-gray-200 pt-2 mt-4">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      Welcome, {user?.name || 'User'}
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full text-left px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}

              {!isAuthenticated && navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-700 hover:bg-blue-50 hover:text-blue-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
