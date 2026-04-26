import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCertificates: 0
  });
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // Fetch certificates from backend
  const fetchCertificates = async (page = 1) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/certificates?page=${page}&limit=12`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Certificates response:', response.data);

      setCertificates(response.data.certificates || []);
      setFilteredCertificates(response.data.certificates || []);
      setPagination(response.data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalCertificates: 0
      });
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast.error('Failed to load certificates');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Filter certificates based on search and status
  useEffect(() => {
    let filtered = certificates;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(cert =>
        cert.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.certificateId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.course?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(cert => {
        if (filterStatus === 'valid') return cert.valid === true;
        if (filterStatus === 'invalid') return cert.valid === false;
        return true;
      });
    }

    setFilteredCertificates(filtered);
  }, [searchTerm, filterStatus, certificates]);

  // Handle certificate download
  const handleDownload = async (cert) => {
    try {
      if (!cert.pdfPath) {
        toast.error('PDF not available for this certificate');
        return;
      }

      const pdfUrl = `http://localhost:5000${cert.pdfPath}`;
      window.open(pdfUrl, '_blank');
      toast.success('Opening certificate PDF...');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download certificate');
    }
  };

  // Handle view details
  const handleViewDetails = (cert) => {
    setSelectedCertificate(cert);
    setShowModal(true);
  };

  // Handle delete certificate
  const handleDelete = async (certId) => {
    if (!window.confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/certificates/${certId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Certificate deleted successfully');
      fetchCertificates(pagination.currentPage);
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete certificate');
    }
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    fetchCertificates(newPage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Certificates</h1>
            <p className="text-gray-600 text-lg mt-1">
              Manage and view all issued certificates ({pagination.totalCertificates} total)
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, certificate ID, or course..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors bg-white"
              >
                <option value="all">All Status</option>
                <option value="valid">Valid</option>
                <option value="invalid">Invalid</option>
              </select>
              <button
                onClick={() => navigate('/upload')}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Certificate
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Certificates Grid */}
        {!isLoading && (
          <>
            {filteredCertificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCertificates.map((cert) => (
                  <div
                    key={cert._id}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Certificate Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                          {cert.course || 'Certificate'}
                        </h3>
                        <p className="text-gray-600 font-medium truncate">{cert.studentName}</p>
                        {cert.issueDate && (
                          <p className="text-sm text-gray-500 mt-1">
                            Issued: {new Date(cert.issueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          cert.valid
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}
                      >
                        {cert.valid ? 'Valid' : 'Invalid'}
                      </span>
                    </div>

                    {/* Certificate Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Certificate ID:</span>
                        <span className="font-mono font-medium text-gray-900 text-xs">
                          {cert.certificateId}
                        </span>
                      </div>
                      {cert.grade && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Grade:</span>
                          <span className="font-semibold text-green-600">{cert.grade}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(cert)}
                        className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </button>
                      <button
                        onClick={() => handleDownload(cert)}
                        disabled={!cert.pdfPath}
                        className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-medium flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </button>
                      <button
                        onClick={() => handleDelete(cert._id)}
                        className="px-3 py-2.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-lg">
                <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No certificates found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterStatus !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Upload an Excel file to generate certificates'}
                </p>
                <button
                  onClick={() => navigate('/upload')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Certificates
                </button>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  {[...Array(pagination.totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePageChange(idx + 1)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        pagination.currentPage === idx + 1
                          ? 'bg-green-600 text-white'
                          : 'bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Certificate Details Modal */}
        {showModal && selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Certificate Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Student Name</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedCertificate.studentName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Certificate ID</label>
                    <p className="text-lg font-mono font-semibold text-gray-900">{selectedCertificate.certificateId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Course</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedCertificate.course}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Grade</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedCertificate.grade || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Issue Date</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(selectedCertificate.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <p className={`text-lg font-semibold ${selectedCertificate.valid ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedCertificate.valid ? 'Valid' : 'Invalid'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleDownload(selectedCertificate)}
                    disabled={!selectedCertificate.pdfPath}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}