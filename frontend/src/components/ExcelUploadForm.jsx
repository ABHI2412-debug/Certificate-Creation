import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ExcelUploadForm() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Validate file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel' // .xls
    ];

    if (!validTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(xlsx|xls)$/i)) {
      toast.error('Please upload a valid Excel file (.xlsx or .xls)');
      e.target.value = '';
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (selectedFile.size > maxSize) {
      toast.error('File size must be less than 10MB');
      e.target.value = '';
      return;
    }

    setFile(selectedFile);
    setUploadResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select an Excel file first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('/api/certificates/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });

      console.log('Upload response:', response.data);

      setUploadResult(response.data.report);
      
      const successCount = response.data.report?.success?.length || 0;
      const failCount = response.data.report?.failed?.length || 0;

      if (successCount > 0 && failCount === 0) {
        toast.success(`🎉 Successfully uploaded ${successCount} certificate(s)!`);
      } else if (successCount > 0 && failCount > 0) {
        toast.warning(`Uploaded ${successCount} certificate(s), ${failCount} failed`);
      } else {
        toast.error('All uploads failed. Please check the error report.');
      }

      // Reset form
      setFile(null);
      const fileInput = document.getElementById('excel-file-input');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Upload error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to upload Excel file';
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const downloadTemplate = () => {
    // Create sample data for template
    const sampleData = [
      ['studentName', 'email', 'course', 'grade', 'certificateId', 'issueDate'],
      ['John Doe', 'john@example.com', 'Web Development', 'A+', 'CERT-2025-0001', '2025-01-15'],
      ['Jane Smith', 'jane@example.com', 'Data Science', 'A', 'CERT-2025-0002', '2025-01-15'],
      ['Bob Johnson', 'bob@example.com', 'Machine Learning', 'B+', 'CERT-2025-0003', '2025-01-15']
    ];

    // Convert to CSV
    const csvContent = sampleData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'certificate_upload_template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success('Template downloaded! Fill it with your data.');
  };

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Bulk Certificate Upload</h2>
            <p className="text-sm text-gray-600 mt-1">Upload an Excel file to generate multiple certificates at once</p>
          </div>
          <button
            type="button"
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Template
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
            <div className="space-y-2">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="flex text-sm text-gray-600 justify-center">
                <label
                  htmlFor="excel-file-input"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                >
                  <span>Upload a file</span>
                  <input
                    id="excel-file-input"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileChange}
                    className="sr-only"
                    disabled={isUploading}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">Excel files (.xlsx, .xls) up to 10MB</p>
            </div>

            {/* Selected File Display */}
            {file && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-700 bg-blue-50 py-2 px-4 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium">{file.name}</span>
                <span className="text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                {!isUploading && (
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      document.getElementById('excel-file-input').value = '';
                    }}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Uploading and processing...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Upload Button */}
          <button
            type="submit"
            disabled={!file || isUploading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload and Generate Certificates
              </>
            )}
          </button>
        </form>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">📋 Instructions:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Download the template and fill in student details</li>
            <li>Required columns: <span className="font-mono bg-blue-100 px-1">studentName</span>, <span className="font-mono bg-blue-100 px-1">course</span>, <span className="font-mono bg-blue-100 px-1">certificateId</span></li>
            <li>Optional columns: <span className="font-mono bg-blue-100 px-1">email</span>, <span className="font-mono bg-blue-100 px-1">grade</span>, <span className="font-mono bg-blue-100 px-1">issueDate</span></li>
            <li>Each certificate ID must be unique</li>
            <li>Date format: YYYY-MM-DD (e.g., 2025-01-15)</li>
          </ul>
        </div>
      </div>

      {/* Upload Results */}
      {uploadResult && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Results</h3>
          
          {/* Success Summary */}
          {uploadResult.success && uploadResult.success.length > 0 && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-green-900">
                  Successfully processed {uploadResult.success.length} certificate(s)
                </span>
              </div>
              <div className="max-h-40 overflow-y-auto">
                <ul className="text-sm text-green-800 space-y-1">
                  {uploadResult.success.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Row {item.row}: {item.certificateId}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Error Summary */}
          {uploadResult.failed && uploadResult.failed.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-red-900">
                  Failed to process {uploadResult.failed.length} certificate(s)
                </span>
              </div>
              <div className="max-h-40 overflow-y-auto">
                <ul className="text-sm text-red-800 space-y-1">
                  {uploadResult.failed.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">✗</span>
                      <div>
                        <span className="font-medium">Row {item.row}:</span> {item.reason}
                        {item.certificateId && <span className="text-gray-600"> ({item.certificateId})</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}