import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import Students from './pages/Students';
import Certificates from './pages/Certificates';
import UploadExcel from './pages/UploadExcel';
import ActivityLogs from './pages/ActivityLogs';
import Settings from './pages/Settings';
import Templates from './pages/Templates';
import SearchCertificate from './pages/SearchCertificate';
import ViewCertificate from './pages/ViewCertificate';
import DownloadCertificate from './pages/DownloadCertificate';
import VerifyCertificate from './pages/VerifyCertificate';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Component to handle route persistence
function RoutePersistence() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Save current route when authenticated and not loading
    if (isAuthenticated && !isLoading && location.pathname !== '/login' && location.pathname !== '/register') {
      localStorage.setItem('lastRoute', location.pathname + location.search);
    }
  }, [location, isAuthenticated, isLoading]);

  useEffect(() => {
    // Restore route after authentication is loaded
    if (!isLoading && isAuthenticated) {
      const lastRoute = localStorage.getItem('lastRoute');
      if (lastRoute && lastRoute !== location.pathname + location.search && lastRoute !== '/login' && lastRoute !== '/register') {
        // Use replace to avoid adding to history
        window.history.replaceState(null, '', lastRoute);
      }
    }
  }, [isLoading, isAuthenticated, location]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <RoutePersistence />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-900 flex flex-col">
          <Navbar />

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Root route - shows dashboard based on user type */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {(user) => {
                      if (user?.userType === 'employer' || user?.role === 'admin') {
                        return <EmployerDashboard />;
                      } else {
                        return <CandidateDashboard />;
                      }
                    }}
                  </ProtectedRoute>
                }
              />

              {/* Role-based Dashboard Routing */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    {(user) => {
                      if (user?.userType === 'employer' || user?.role === 'admin') {
                        return <EmployerDashboard />;
                      } else {
                        return <CandidateDashboard />;
                      }
                    }}
                  </ProtectedRoute>
                }
              />

              {/* Employer/Admin Only Routes */}
              <Route
                path="/students"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Students />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/certificates"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Certificates />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <UploadExcel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/activity-logs"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ActivityLogs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/templates"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Templates />
                  </ProtectedRoute>
                }
              />

              {/* Profile Route */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Public Routes */}
              <Route path="/search" element={<SearchCertificate />} />
              <Route path="/view/:id" element={<ViewCertificate />} />
              <Route path="/download" element={<DownloadCertificate />} />
              <Route path="/download/:id" element={<DownloadCertificate />} />
              <Route path="/verify" element={<VerifyCertificate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
