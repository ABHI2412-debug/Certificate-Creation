import React from 'react';
import ExcelUploadForm from '../components/ExcelUploadForm';

export default function UploadExcel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Bulk Certificate Upload</h1>
          </div>
          <p className="text-gray-600 ml-13">
            Upload an Excel file containing student data to automatically generate and issue certificates
          </p>
        </div>

        {/* Upload Form */}
        <ExcelUploadForm />

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Automatic Processing</h3>
            <p className="text-sm text-gray-600">
              Certificates are automatically generated with QR codes and stored securely in the database
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Valid</h3>
            <p className="text-sm text-gray-600">
              Each certificate gets a unique ID and QR code for instant verification and fraud prevention
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bulk Processing</h3>
            <p className="text-sm text-gray-600">
              Process hundreds of certificates at once, saving hours of manual work and reducing errors
            </p>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Need Help?
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <details className="group">
              <summary className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                What format should my Excel file be in?
              </summary>
              <p className="mt-2 pl-4 text-gray-600">
                Your Excel file should have these columns: <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">studentName</span>, 
                <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">email</span>, 
                <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">course</span>, 
                <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">grade</span>, 
                <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">certificateId</span>, and 
                <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">issueDate</span>. Download the template to get started quickly.
              </p>
            </details>
            <details className="group">
              <summary className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                How do I generate unique certificate IDs?
              </summary>
              <p className="mt-2 pl-4 text-gray-600">
                Use a consistent format like CERT-2025-0001, CERT-2025-0002, etc. Make sure each ID is unique across all certificates.
              </p>
            </details>
            <details className="group">
              <summary className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                What happens if some certificates fail to upload?
              </summary>
              <p className="mt-2 pl-4 text-gray-600">
                You'll see a detailed report showing which certificates were successful and which failed, along with the specific error for each failure. Fix the errors and re-upload only the failed entries.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}